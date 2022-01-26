import { types } from 'mobx-state-tree';

import AircraftModel from './AircraftModel';

// Only way of manipulating data in MST is by creating Actions
export default types.model("AircraftStore", {
  aircrafts: types.map(AircraftModel),
}).actions(store => ({
  setAircrafts(newAircrafts) {
    store.aircrafts = newAircrafts;
  },
  handleNewFlight(newFlight) {
    store.aircrafts.put(AircraftModel.create({
      // TODO check what these contains because we may have some surprises
      aircraftId: newFlight.getAircraftId(),
      assignedFlightId: newFlight.getFlightUniqueId(),
    }));
  },
  handleTargetReport(targetReport) {
    const vehicleId = targetReport.getVehicleid();
    const aircraft = store.aircrafts.get(vehicleId);
    if (!aircraft) {
      console.warn("Received target report for unknown aircraft", vehicleId);
      return;
    }
    aircraft.lastKnownAltitude = targetReport.getAltitude();
    aircraft.lastKnownLatitude = targetReport.getLatitude();
    aircraft.lastKnownLongitude = targetReport.getLongitude();
    aircraft.lastKnownBearing = targetReport.getBearing();
    aircraft.lastKnownSpeed = targetReport.getSpeed();
  },
}));
