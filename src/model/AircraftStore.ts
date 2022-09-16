import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import { PlanningStage } from '../proto/ProtobufAirTrafficSimulator';
import AircraftInfo from './AircraftInfo';
import AircraftModel from './AircraftModel';
import AircraftType from './AircraftType';
import convertTimestamp from './convertTimestamp';
import CoordinatePair from './CoordinatePair';
import FlightRoute from './FlightRoute';
import Trajectory from './Trajectory';
import type {
  FlightEnteringAirspaceMessage, FlightMilestonePositionMessage,
  FlightRouteMessage, NewAircraftMessage,
  NewAircraftTypeMessage, NewFlightMessage,
  PositionAtObject, TargetReportMessage,
} from '../proto/ProtobufAirTrafficSimulator';
import type FlightInSectorModel from './FlightInSectorModel';
import type SimulatorStore from './SimulatorStore';

export default class AircraftStore {
  aircrafts: ObservableMap<string, AircraftModel> = observable.map(undefined, { deep: false });

  aircraftInfo: ObservableMap<string, AircraftInfo> = observable.map(undefined, { deep: false });

  aircraftTypes: ObservableMap<string, AircraftType> = observable.map(undefined, { deep: false });

  flightRoutes: ObservableMap<string, FlightRoute> = observable.map(undefined, { deep: false });

  flightsInSectorTimes:
  ObservableMap<string, FlightInSectorModel> = observable.map(undefined, { deep: false });

  simulatorStore: SimulatorStore;

  constructor({
    simulatorStore,
  }: {
    simulatorStore: SimulatorStore;
  }) {
    makeAutoObservable(this, {
      simulatorStore: false,
    }, { autoBind: true });
    this.simulatorStore = simulatorStore;
  }

  get aircraftsWithRecentTargetReport(): AircraftModel[] {
    const timestamp = this.simulatorStore.minuteRoundedTimestamp;
    return [...this.aircrafts.values()]
      .filter(({ lastTargetReportTime }) => (
        // Remove aircrafts with target reports older than 10 minutes
        // But keep the ones with no target report time because reasons
        (timestamp - lastTargetReportTime) < 600 || lastTargetReportTime === 0
      ));
  }

  get aircraftsWithPosition(): AircraftModel[] {
    return this.aircraftsWithRecentTargetReport.filter(({ lastKnownLongitude }) => (
      lastKnownLongitude !== 0
    ));
  }

  handleNewFlight(newFlight: NewFlightMessage): void {
    const id = newFlight.aircraftId;
    const aircraft = this.aircrafts.get(id);
    if (aircraft) {
      aircraft.handleNewFlightUpdate(newFlight);
    } else {
      this.aircrafts.set(id, new AircraftModel({
        aircraftId: id,
        assignedFlightId: newFlight.flightUniqueId,
        callSign: newFlight.callSign,
        arrivalAirport: newFlight.arrivalAirport,
        departureAirport: newFlight.departureAirport,
        aircraftInfo: this.aircraftInfo,
        aircraftTypes: this.aircraftTypes,
        flightInSectorTimes: this.flightsInSectorTimes,
        simulatorStore: this.simulatorStore,
      }));
    }
  }

  handleTargetReport(targetReport: TargetReportMessage): void {
    const { vehicleId } = targetReport;
    const aircraft = this.aircrafts.get(vehicleId);
    if (!aircraft) {
      // eslint-disable-next-line no-console
      console.warn('Received target report for unknown aircraft', vehicleId);
      return;
    }
    aircraft.handleTargetReport(targetReport);
  }

  handleNewAircraftMessage(newAircraftMessage: NewAircraftMessage): void {
    const { aircraftId, wakeTurbulenceCategory, aircraftType } = newAircraftMessage;
    const aircraftInfo = this.aircraftInfo.get(aircraftId);
    if (aircraftInfo) {
      aircraftInfo.setWakeTurbulenceCategory(wakeTurbulenceCategory);
    } else {
      this.aircraftInfo.set(aircraftId, new AircraftInfo({
        aircraftId,
        aircraftType,
        wakeTurbulenceCategory,
      }));
    }
  }

  handleNewFlightRoute(route: FlightRouteMessage): void {
    const id = route.flightUniqueId;

    // It seems that the trajectory list is ordered, and each time a positionAtObject is sent,
    // It is immediately followed by a position4D. We merge them together for simplicity
    let previousPositionObject: PositionAtObject | undefined;

    const trajectories = route.route?.trajectory?.map((area) => {
      let position4d;
      if (area.position.oneofKind === 'position4D') {
        position4d = area.position.position4D;
      } else if (area.position.oneofKind === 'positionAtObject') {
        previousPositionObject = area.position.positionAtObject;
        return undefined;
      } else {
        throw new Error('No position4d or positionatobject');
      }

      const { time, latitude, longitude } = position4d;
      if (!time) {
        throw new Error('Missing time in flight route message position4d');
      }
      const timestamp = convertTimestamp(time);

      let objectId: string | undefined;
      if (previousPositionObject && previousPositionObject.time) {
        const previousTimestamp = convertTimestamp(previousPositionObject.time);
        if (timestamp === previousTimestamp) {
          ({ objectId } = previousPositionObject);
        }
      }

      const trajectory = new Trajectory({
        trajectoryCoordinate: new CoordinatePair({
          latitude,
          longitude,
        }),
        timestamp,
        objectId,
      });

      previousPositionObject = undefined;
      return trajectory;
    })?.filter((trajectory): trajectory is Trajectory => trajectory !== undefined) ?? [];

    this.flightRoutes.set(id, new FlightRoute({
      flightId: id,
      trajectory: trajectories,
    }));
  }

  handleFlightNewMilestonePositions(milestone: FlightMilestonePositionMessage): void {
    const { planningStage } = milestone;

    if (planningStage === PlanningStage.TARGET) {
      const { flightUniqueId } = milestone;

      // find the aircraft in the this.aircrafts map with
      // an assignedFlightId matching the flightUniqueId
      let aircraft;
      for (const potentialAircraft of this.aircrafts.values()) {
        if (potentialAircraft.assignedFlightId === flightUniqueId) {
          aircraft = potentialAircraft;
          break;
        }
      }

      if (!aircraft) {
        // eslint-disable-next-line no-console
        console.warn('Received milestone position for unknown aircraft', flightUniqueId);
        return;
      }

      aircraft.handleTargetMilestone(milestone);
    }
  }

  handleNewSectorInFlightMessage(flightEnteringAirspaceMessage: FlightEnteringAirspaceMessage)
    : void {
    const {
      flightUniqueId,
    } = flightEnteringAirspaceMessage;
    const aircraft = this.aircrafts.get(flightUniqueId);
    if (!aircraft) {
      // eslint-disable-next-line no-console
      console.warn('Received sector in flight message for unknown aircraft', flightUniqueId);
      return;
    }
    aircraft.handleSectorInFlightMessage(flightEnteringAirspaceMessage);
  }

  handleNewAircraftTypeMessage(newAircraftTypeMessage: NewAircraftTypeMessage): void {
    const aircraftType = AircraftType.fromProto(newAircraftTypeMessage);
    this.aircraftTypes.set(aircraftType.vehicleTypeId, aircraftType);
  }

  handleFrontendFlightController(flightId: string, controller: string): void {
    this.aircrafts.get(flightId)?.setController(controller);
  }

  handleFrontendACCFlightLevel(flightId: string, flightLevel: string): void {
    this.aircrafts.get(flightId)?.setNextACCFL(flightLevel);
  }

  handleFrontendNextSectorFlightLevel(flightId: string, flightLevel: string): void {
    this.aircrafts.get(flightId)?.setNextSectorFL(flightLevel);
  }
}
