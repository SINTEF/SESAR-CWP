import {
  action, computed, makeObservable, observable,
} from 'mobx';
import type { ObservableMap } from 'mobx';

import {
  WakeTurbulenceCategory,
} from '../proto/ProtobufAirTrafficSimulator';
import convertTimestamp from './convertTimestamp';
import type { FlightMilestonePositionMessage, NewFlightMessage, TargetReportMessage } from '../proto/ProtobufAirTrafficSimulator';
import type AircraftInfo from './AircraftInfo';
import type AircraftType from './AircraftType';
import type SimulatorStore from './SimulatorStore';

function convertToFlightMeters(alt: number): number {
  const feet = alt * 3.280_84;
  return feet / 100;
}

function convertMSToKnots(speed: number): number {
  return speed * 1.943_844_492_440_6;
}

export default class AircraftModel {
  aircraftId: string;

  assignedFlightId: string;

  callSign: string;

  lastKnownLongitude = 0;

  lastKnownLatitude = 0;

  lastKnownAltitude = 0;

  lastKnownBearing = 0;

  lastKnownSpeed = 0;

  arrivalAirport: string;

  departureAirport: string;

  lastTargetReportTime = 0;

  controlledBy = 'OTHER';

  nextSectorController = 'NS';

  milestoneTargetTimestamp = 0;

  milestoneTargetObjectId: string | undefined;

  assignedFlightLevel: number | undefined;

  aircraftInfo: ObservableMap<string, AircraftInfo>;

  aircraftTypes: ObservableMap<string, AircraftType>;

  simulatorStore: SimulatorStore;

  constructor({
    aircraftId,
    assignedFlightId,
    callSign,
    arrivalAirport,
    departureAirport,
    aircraftInfo,
    aircraftTypes,
    simulatorStore,
  }: {
    aircraftId: string;
    assignedFlightId: string;
    callSign: string;
    arrivalAirport: string;
    departureAirport: string;
    aircraftInfo: ObservableMap<string, AircraftInfo>;
    aircraftTypes: ObservableMap<string, AircraftType>;
    simulatorStore: SimulatorStore;
  }) {
    makeObservable(this, {
      aircraftId: false,
      assignedFlightId: false,
      callSign: false,
      milestoneTargetTimestamp: false,
      aircraftInfo: false,
      aircraftTypes: false,
      simulatorStore: false,
      lastKnownLongitude: observable,
      lastKnownLatitude: observable,
      lastKnownAltitude: observable,
      lastKnownBearing: observable,
      lastKnownSpeed: observable,
      arrivalAirport: observable,
      departureAirport: observable,
      controlledBy: observable,
      nextSectorController: observable,
      milestoneTargetObjectId: observable,
      assignedFlightLevel: observable,

      nextFix: computed,
      wakeTurbulenceCategory: computed,
      speedAndWakeTurbulenceLabel: computed,

      handleTargetReport: action.bound,
      handleTargetMilestone: action.bound,
      setController: action.bound,
      setAssignedFlightLevel: action.bound,
      setNextSectorController: action.bound,
    });

    this.aircraftId = aircraftId;
    this.assignedFlightId = assignedFlightId;
    this.callSign = callSign;
    this.arrivalAirport = arrivalAirport;
    this.departureAirport = departureAirport;
    this.aircraftInfo = aircraftInfo;
    this.aircraftTypes = aircraftTypes;
    this.simulatorStore = simulatorStore;
  }

  handleTargetReport(targetReport: TargetReportMessage): void {
    // Ignore target reports that are older than the previous one
    // This is because MQTT doesn't guarantie the order of the received messages
    // We could use a MQTT broker that is a message queue with an order, like RabbitMQ
    const {
      time, altitude, latitude, longitude, bearing, speed,
    } = targetReport;
    if (!time) {
      throw new Error('Missing time in target report message');
    }
    const timestamp = convertTimestamp(time);
    if (timestamp < this.lastTargetReportTime) {
      return;
    }
    this.lastTargetReportTime = timestamp;
    this.lastKnownAltitude = convertToFlightMeters(altitude);
    this.lastKnownLatitude = latitude;
    this.lastKnownLongitude = longitude;
    this.lastKnownBearing = bearing;
    this.lastKnownSpeed = speed;
  }

  handleTargetMilestone(milestone: FlightMilestonePositionMessage): void {
    const { timeStampSent, position } = milestone;
    if (!timeStampSent) {
      throw new Error('Missing timeStampSent in flight milestone message');
    }
    const timestamp = convertTimestamp(timeStampSent);
    if (timestamp < this.milestoneTargetTimestamp) {
      // Ignore older milestones
      return;
    }
    this.milestoneTargetTimestamp = timestamp;
    if (position) {
      this.milestoneTargetObjectId = position.objectId;
    }
  }

  setController(controller: string): void {
    this.controlledBy = controller;
  }

  get nextFix(): string {
    const simulatorTimestamp = this.simulatorStore.timestamp;
    if (this.milestoneTargetObjectId && this.milestoneTargetTimestamp >= simulatorTimestamp) {
      return this.milestoneTargetObjectId;
    }

    return this.arrivalAirport ?? 'UNKNOWN';
  }

  handleNewFlightUpdate(newFlight: NewFlightMessage): void {
    const {
      flightUniqueId, callSign, arrivalAirport, departureAirport,
    } = newFlight;

    this.assignedFlightId = flightUniqueId;
    this.callSign = callSign;
    this.arrivalAirport = arrivalAirport;
    this.departureAirport = departureAirport;
  }

  get wakeTurbulenceCategory(): WakeTurbulenceCategory {
    const aircraftInfo = this.aircraftInfo.get(this.aircraftId);
    if (!aircraftInfo) {
      return WakeTurbulenceCategory.WTC_UNKNOWN;
    }

    const { wakeTurbulenceCategory } = aircraftInfo;

    if (wakeTurbulenceCategory !== WakeTurbulenceCategory.WTC_UNKNOWN) {
      return wakeTurbulenceCategory;
    }

    const { aircraftType } = aircraftInfo;
    const aircraftTypeInfo = this.aircraftTypes.get(aircraftType);
    if (!aircraftTypeInfo) {
      return WakeTurbulenceCategory.WTC_UNKNOWN;
    }

    return aircraftTypeInfo.wakeTurbulenceCategory;
  }

  get speedAndWakeTurbulenceLabel(): string {
    const { wakeTurbulenceCategory, lastKnownSpeed } = this;
    const speed = Math.floor(convertMSToKnots(lastKnownSpeed));

    switch (wakeTurbulenceCategory) {
      case WakeTurbulenceCategory.WTC_LIGHT:
        return `L${speed}`;
      case WakeTurbulenceCategory.LOWER_MEDIUM:
      case WakeTurbulenceCategory.UPPER_MEDIUM:
        return `M${speed}`;
      case WakeTurbulenceCategory.LOWER_HEAVY:
      case WakeTurbulenceCategory.UPPER_HEAVY:
      case WakeTurbulenceCategory.JUMBO:
      case WakeTurbulenceCategory.WTC_ALL:
        return `H${speed}`;
      case WakeTurbulenceCategory.WTC_UNKNOWN:
        return `${speed}`;
      default:
        return `${speed}`;
    }
  }

  setAssignedFlightLevel(assignedFlightLevel: number): void {
    this.assignedFlightLevel = assignedFlightLevel;
  }

  setNextSectorController(nextSectorController: string): void {
    this.nextSectorController = nextSectorController;
  }
}
