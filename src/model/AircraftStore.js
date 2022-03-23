import { makeAutoObservable, observable } from 'mobx';

import AirtrafficMessages from '../ProtobufAirTrafficSimulator_pb';
import AircraftInfo from './AircraftInfo';
import AircraftModel from './AircraftModel';
import AircraftType from './AircraftType';
import CoordinatePair from './CoordinatePair';
import FlightRoute from './FlightRoute';
import Trajectory from './Trajectory';

// Only way of manipulating data in MST is by creating Actions
export default class AircraftStore {
  aircrafts = observable.map();

  aircraftInfo = observable.map();

  aircraftTypes = observable.map();

  flightRoutes = observable.map();

  simulatorStore = undefined;

  constructor({
    simulatorStore,
  }) {
    makeAutoObservable(this, {
      simulatorStore: false,
    }, { autoBind: true });
    this.simulatorStore = simulatorStore;
  }

  get aircraftsWithPosition() {
    const aircrafts = [...this.aircrafts.values()]
      .filter(({ lastKnownLongitude }) => (
        lastKnownLongitude !== 0
      ));
    return aircrafts;
  }

  handleNewFlight(newFlight) {
    const id = newFlight.getAircraftid();
    if (this.aircrafts.has(id)) {
      const aircraft = this.aircrafts.get(id);
      aircraft.handleNewFlightUpdate(newFlight);
    } else {
      this.aircrafts.set(id, new AircraftModel({
        aircraftId: id,
        assignedFlightId: newFlight.getFlightuniqueid(),
        callSign: newFlight.getCallsign(),
        arrivalAirport: newFlight.getArrivalairport(),
        departureAirport: newFlight.getDepartureairport(),
        aircraftInfo: this.aircraftInfo,
        aircraftTypes: this.aircraftTypes,
        simulatorStore: this.simulatorStore,
      }));
    }
  }

  handleTargetReport(targetReport) {
    const vehicleId = targetReport.getVehicleid();
    const aircraft = this.aircrafts.get(vehicleId);
    if (!aircraft) {
      // eslint-disable-next-line no-console
      console.warn('Received target report for unknown aircraft', vehicleId);
      return;
    }
    aircraft.handleTargetReport(targetReport);
  }

  handleNewAircraftMessage(newAircraftMessage) {
    const id = newAircraftMessage.getAircraftid();
    const wakeTurbulenceCategory = newAircraftMessage.getWaketurbulencecategory();

    if (this.aircraftInfo.has(id)) {
      this.aircraftInfo.get(id).setWakeTurbulenceCategory(wakeTurbulenceCategory);
    } else {
      this.aircraftInfo.set(id, new AircraftInfo({
        aircraftId: id,
        aircraftType: newAircraftMessage.getAircrafttype(),
        wakeTurbulenceCategory,
      }));
    }
  }

  handleNewFlightRoute(route) {
    const id = route.getFlightuniqueid();

    // It seems that the trajectory list is ordered, and each time a positionAtObject is sent,
    // It is immediately followed by a position4D. We merge them together for simplicity
    let previousPositionObject;

    const trajectories = route.getRoute().getTrajectoryList()
      .map((area) => {
        const position4d = area.getPosition4d();
        if (!position4d) {
          const positionAtObject = area.getPositionatobject();
          if (!positionAtObject) {
            throw new Error('No position4d or positionatobject');
          }
          previousPositionObject = positionAtObject;
          return undefined;
        }
        const time = position4d.getTime();
        const timestamp = time.getSeconds() + time.getNanos() * 1e-9;
        let objectId;
        if (previousPositionObject) {
          const previousTime = previousPositionObject.getTime();
          const previousTimestamp = previousTime.getSeconds() + previousTime.getNanos() * 1e-9;
          if (timestamp === previousTimestamp) {
            objectId = previousPositionObject.getObjectid();
          }
        }
        const trajectory = new Trajectory({
          trajectoryCoordinate: new CoordinatePair({
            latitude: area.getPosition4d().getLatitude(),
            longitude: area.getPosition4d().getLongitude(),
          }),
          timestamp,
          objectId,
        });
        previousPositionObject = undefined;
        return trajectory;
      }).filter((trajectory) => trajectory !== undefined);
    this.flightRoutes.set(id, new FlightRoute({
      flightId: id,
      trajectory: trajectories,
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  handleFlightNewMilestonePositions(milestone) {
    const planningStage = milestone.getPlanningstage();

    if (planningStage === AirtrafficMessages.PlanningStage.TARGET) {
      const flightUniqueId = milestone.getFlightuniqueid();

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

  handleNewAircraftTypeMessage(newAircraftTypeMessage) {
    const aircraftType = AircraftType.fromProto(newAircraftTypeMessage);
    this.aircraftTypes.set(aircraftType.vehicleTypeId, aircraftType);
  }
}
