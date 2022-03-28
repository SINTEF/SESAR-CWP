import {
  action, computed, makeObservable, observable,
} from 'mobx';

import AirtrafficMessages from '../ProtobufAirTrafficSimulator_pb';

function convertToFlightMeters(alt) {
  const feet = alt * 3.280_84;
  return feet / 100;
}

function convertMSToKnots(speed) {
  return speed * 1.943_844_492_440_6;
}

export default class AircraftModel {
  aircraftId = undefined;

  assignedFlightId = undefined;

  callSign = undefined;

  lastKnownLongitude = 0;

  lastKnownLatitude = 0;

  lastKnownAltitude = 0;

  lastKnownBearing = 0;

  lastKnownSpeed = 0;

  arrivalAirport = undefined;

  departureAirport = undefined;

  lastTargetReportTime = 0;

  controlledBy = 'OTHER';

  nextSectorController = 'NS';

  milestoneTargetTimestamp = 0;

  milestoneTargetObjectId = undefined;

  assignedFlightLevel = undefined;

  aircraftInfo = undefined;

  aircraftTypes = undefined;

  simulatorStore = undefined;

  constructor({
    aircraftId,
    assignedFlightId,
    callSign,
    arrivalAirport,
    departureAirport,
    aircraftInfo,
    aircraftTypes,
    simulatorStore,
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

  handleTargetReport(targetReport) {
    // Ignore target reports that are older than the previous one
    // This is because MQTT doesn't guarantie the order of the received messages
    // We could use a MQTT broker that is a message queue with an order, like RabbitMQ
    const time = targetReport.getTime();
    const timestamp = time.getSeconds() + time.getNanos() * 1e-9;
    if (timestamp < this.lastTargetReportTime) {
      return;
    }
    this.lastTargetReportTime = timestamp;
    this.lastKnownAltitude = convertToFlightMeters(targetReport.getAltitude());
    this.lastKnownLatitude = targetReport.getLatitude();
    this.lastKnownLongitude = targetReport.getLongitude();
    this.lastKnownBearing = targetReport.getBearing();
    this.lastKnownSpeed = targetReport.getSpeed();
  }

  handleTargetMilestone(milestone) {
    const timestamp = milestone.getTimestampsent().getSeconds();
    if (timestamp < this.milestoneTargetTimestamp) {
      return;
    }
    this.milestoneTargetTimestamp = timestamp;
    this.milestoneTargetObjectId = milestone.getPosition().getObjectid();
  }

  setController(controller) {
    this.controlledBy = controller;
  }

  get nextFix() {
    const simulatorTimestamp = this.simulatorStore.timestamp;
    if (this.milestoneTargetObjectId && this.milestoneTargetTimestamp >= simulatorTimestamp) {
      return this.milestoneTargetObjectId;
    }

    return this.arrivalAirport ?? 'UNKNOWN';
  }

  handleNewFlightUpdate(newFlight) {
    this.assignedFlightId = newFlight.getFlightuniqueid();
    this.callSign = newFlight.getCallsign();
    this.arrivalAirport = newFlight.getArrivalairport();
    this.departureAirport = newFlight.getDepartureairport();
  }

  get wakeTurbulenceCategory() {
    const aircraftInfo = this.aircraftInfo.get(this.aircraftId);
    if (!aircraftInfo) {
      return AirtrafficMessages.WakeTurbulenceCategory.WTC_UNKNOWN;
    }

    const { wakeTurbulenceCategory } = aircraftInfo;

    if (wakeTurbulenceCategory !== AirtrafficMessages.WakeTurbulenceCategory.WTC_UNKNOWN) {
      return wakeTurbulenceCategory;
    }

    const { aircraftType } = aircraftInfo;
    const aircraftTypeInfo = this.aircraftTypes.get(aircraftType);
    if (!aircraftTypeInfo) {
      return AirtrafficMessages.WakeTurbulenceCategory.WTC_UNKNOWN;
    }

    return aircraftTypeInfo.wakeTurbulenceCategory;
  }

  get speedAndWakeTurbulenceLabel() {
    const { wakeTurbulenceCategory, lastKnownSpeed } = this;
    const speed = Math.floor(convertMSToKnots(lastKnownSpeed));

    switch (wakeTurbulenceCategory) {
      case AirtrafficMessages.WakeTurbulenceCategory.WTC_LIGHT:
        return `L${speed}`;
      case AirtrafficMessages.WakeTurbulenceCategory.LOWER_MEDIUM:
      case AirtrafficMessages.WakeTurbulenceCategory.UPPER_MEDIUM:
        return `M${speed}`;
      case AirtrafficMessages.WakeTurbulenceCategory.LOWER_HEAVY:
      case AirtrafficMessages.WakeTurbulenceCategory.UPPER_HEAVY:
      case AirtrafficMessages.WakeTurbulenceCategory.JUMBO:
      case AirtrafficMessages.WakeTurbulenceCategory.WTC_ALL:
        return `H${speed}`;
      case AirtrafficMessages.WakeTurbulenceCategory.WTC_UNKNOWN:
      default:
        return `${speed}`;
    }
  }

  setAssignedFlightLevel(assignedFlightLevel) {
    this.assignedFlightLevel = assignedFlightLevel;
  }

  setNextSectorController(nextSectorController) {
    this.nextSectorController = nextSectorController;
  }
}
