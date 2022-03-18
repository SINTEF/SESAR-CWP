import { makeAutoObservable, observable } from 'mobx';

import AircraftInfo from './AircraftInfo';
import AircraftModel from './AircraftModel';
import CoordinatePair from './CoordinatePair';
import FlightRoute from './FlightRoute';
import Trajectory from './Trajectory';

// Only way of manipulating data in MST is by creating Actions
export default class AircraftStore {
  aircrafts = observable.map();

  aircraftInfo = observable.map();

  flightRoute = observable.map();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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
      // console.log('updating');
      // store.aircrafts.get(id).update(newFlight);
    } else {
      this.aircrafts.set(id, new AircraftModel({

        // TODO check what these contains because we may have some surprises
        aircraftId: newFlight.getAircraftid(),
        assignedFlightId: newFlight.getFlightuniqueid(),
        callSign: newFlight.getCallsign(),
        wakeTurbulence: this.aircraftInfo.get(id).wakeTurbulence,
        arrivalAirport: newFlight.getArrivalairport(),
        departureAirport: newFlight.getDepartureairport(),
        controlledBy: 'OTHER',
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
    if (this.aircraftInfo.has(id)) {
      // console.warn('Received new aircraft message for unknown aircraft', id);
    } else {
      const wake = newAircraftMessage.getWaketurbulencecategory() === 0
        ? newAircraftMessage.getAircrafttype()
        : newAircraftMessage.getWaketurbulencecategory();
      this.aircraftInfo.set(id, new AircraftInfo({
        aircraftId: newAircraftMessage.getAircraftid(),
        wakeTurbulence: wake,
      }));
    }
  }

  handleNewFlightRoute(route) {
    const id = route.getFlightuniqueid();
    const trajectories = route.getRoute().getTrajectoryList()
      .map((area) => {
        const position4d = area.getPosition4d();
        if (!position4d) {
          return undefined;
        }
        const time = position4d.getTime();
        const timestamp = time.getSeconds() + time.getNanos() * 1e-9;
        const trajectory = new Trajectory({
          trajectoryCoordinate: new CoordinatePair({
            latitude: area.getPosition4d().getLatitude(),
            longitude: area.getPosition4d().getLongitude(),
          }),
          timestamp,
        });
        return trajectory;
      }).filter((trajectory) => trajectory !== undefined);
    this.flightRoute.set(id, new FlightRoute({
      flightId: id,
      trajectory: trajectories,
    }));
  }
}
