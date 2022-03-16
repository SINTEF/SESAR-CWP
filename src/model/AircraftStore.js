import { types } from 'mobx-state-tree';

import AircraftInfo from './AircraftInfo';
import AircraftModel from './AircraftModel';
import CoordinatePair from './CoordinatePair';
import FlightRoute from './FlightRoute';
import Trajectory from './Trajectory';

// Only way of manipulating data in MST is by creating Actions
export default types.model('AircraftStore', {
  aircrafts: types.map(AircraftModel),
  aircraftInfo: types.map(AircraftInfo),
  flightRoute: types.map(FlightRoute),
})
  .views((store) => ({
    get aircraftsWithPosition() {
      const aircrafts = [...store.aircrafts.values()]
        .filter(({ lastKnownLongitude }) => (
          lastKnownLongitude !== 0
        ));
      return aircrafts;
    },
  })).actions((store) => ({

    setAircrafts(newAircrafts) {
      store.aircrafts = newAircrafts;
    },
    handleNewFlight(newFlight) {
      // debugger;
      const id = newFlight.getAircraftid();
      if (store.aircrafts.has(id)) {
        // console.log('updating');
        // store.aircrafts.get(id).update(newFlight);
      } else {
        store.aircrafts.set(id, AircraftModel.create({

          // TODO check what these contains because we may have some surprises
          aircraftId: newFlight.getAircraftid(),
          assignedFlightId: newFlight.getFlightuniqueid(),
          callSign: newFlight.getCallsign(),
          wakeTurbulence: store.aircraftInfo.get(id).wakeTurbulence,
          arrivalAirport: newFlight.getArrivalairport(),
          departureAirport: newFlight.getDepartureairport(),
        }));
      }
    },
    handleTargetReport(targetReport) {
      const vehicleId = targetReport.getVehicleid();
      const aircraft = store.aircrafts.get(vehicleId);
      if (!aircraft) {
        // eslint-disable-next-line no-console
        console.warn('Received target report for unknown aircraft', vehicleId);
        return;
      }
      aircraft.handleTargetReport(targetReport);
    },
    handleNewAircraftMessage(newAircraftMessage) {
      const id = newAircraftMessage.getAircraftid();
      if (store.aircraftInfo.has(id)) {
        // console.warn('Received new aircraft message for unknown aircraft', id);
      } else {
        const wake = newAircraftMessage.getWaketurbulencecategory() === 0
          ? newAircraftMessage.getAircrafttype()
          : newAircraftMessage.getWaketurbulencecategory();
        store.aircraftInfo.set(id, AircraftInfo.create({
          aircraftId: newAircraftMessage.getAircraftid(),
          wakeTurbulence: wake,
        }));
      }
    },
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
          const trajectory = Trajectory.create({
            trajectoryCoordinate: CoordinatePair.create({
              latitude: area.getPosition4d().getLatitude(),
              longitude: area.getPosition4d().getLongitude(),
            }),
            timestamp,
          });
          return trajectory;
        }).filter((trajectory) => trajectory !== undefined);
      store.flightRoute.put(FlightRoute.create({
        flightId: id,
        trajectory: trajectories,
      }));
    },
  }));
