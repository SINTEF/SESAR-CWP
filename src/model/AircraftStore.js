import { types } from 'mobx-state-tree';
// import { aircraftStore } from '../state';

import AircraftModel from './AircraftModel';

// const fetchAircrafts = async()=> {
//   const response = await fetch(URL);
//   return response.json();
// }

// Only way of manipulating data in MST is by creating Actions
export default types.model("AircraftStore", {
  aircrafts: types.map(AircraftModel),
}).views(store => ({
  get aircraftsWithPosition(){
    const aircrafts = Array.from(store.aircrafts.values())
        .filter(({ lastKnownLongitude }) => lastKnownLongitude !== 0)
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
    //console.log(newFlight.getAircraftid())
    store.aircrafts.put(AircraftModel.create({

      // TODO check what these contains because we may have some surprises
      aircraftId: newFlight.getAircraftid(),
      assignedFlightId: newFlight.getFlightuniqueid(),
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
  // async fetchAircrafts(){
  //   const data = await fetchAircrafts() //Getting the aircrafts data
  //       const newAircrafts = data.map(aircraft => ({
  //           aircraftId: aircraft.aircraftId,
  //           assignedFlightId: aircraft.assignedFlightId,
  //           lastKnownLongitude: aircraft.lastKnownLongitude,
  //           lastKnownLatitude: aircraft.lastKnownLatitude,
  //           lastKnownAltitude: aircraft.lastKnownAltitude
  //       }))
  //       store.setAircrafts(newAircrafts)
  // }
}));

// let _aircraftStore
// export const useAircrafts = () => {
//   if(!aircraftStore){
//     _aircraftStore = AircraftModel.create({
//       aircrafts:[]
//     })
//   }
//   return _aircraftStore;
// };
