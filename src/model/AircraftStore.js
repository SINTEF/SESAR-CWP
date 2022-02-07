import { types } from 'mobx-state-tree';
// import { aircraftStore } from '../state';

import AircraftModel from './AircraftModel';

// const fetchAircrafts = async()=> {
//   const response = await fetch(URL);
//   return response.json();
// }
const highest_altitude = 10000;
const lowest_altitude = 5000;
// Only way of manipulating data in MST is by creating Actions
export default types.model("AircraftStore", {
  aircrafts: types.map(AircraftModel),
}).views(store => ({
  get aircraftsWithPosition() {
    const aircrafts = Array.from(store.aircrafts.values()) //Here also use to filter aircrafts based on altitude
      .filter(({ lastKnownLongitude, lastKnownAltitude }) => lastKnownLongitude !== 0 && lastKnownAltitude > lowest_altitude && lastKnownAltitude < highest_altitude)
      // .filter(({ lastKnownAltitude }) => lastKnownAltitude > lowest_altitude && lastKnownAltitude < highest_altitude)
    //debugger;
    return aircrafts
  }
}))
  .actions(store => ({

    setAircrafts(newAircrafts) {
      store.aircrafts = newAircrafts;
    },
    handleNewFlight(newFlight) {
      // debugger;
      const id = newFlight.getAircraftid();
      if (store.aircrafts.has(id)) {
        console.log("updating");
        //store.aircrafts.get(id).update(newFlight);
      } else {
        store.aircrafts.set(id, AircraftModel.create({

          // TODO check what these contains because we may have some surprises
          aircraftId: newFlight.getAircraftid(),
          assignedFlightId: newFlight.getFlightuniqueid(),
        }));
      }
    },
    handleTargetReport(targetReport) {
      const vehicleId = targetReport.getVehicleid();
      const aircraft = store.aircrafts.get(vehicleId);
      if (!aircraft) {
        console.warn("Received target report for unknown aircraft", vehicleId);
        return;
      }
      aircraft.handleTargetReport(targetReport);
    },
  }));