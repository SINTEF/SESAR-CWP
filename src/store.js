import {types} from 'mobx-state-tree'; //Initialize the data, access the stores

//Fetching data here.
const URL = "something";

// const fetchAircrafts = async()=> {
//     const response = await fetch(URL);
//     return response.json();
// }
// //Creating the model and store here
// export const AircraftModel = types.model("AircraftModel",{
//     aircraftId: types.string,
//     assignedFlightId: types.string,
//     lastKnownLongitude: types.number,
//     lastKnownLatitude: types.number,
//     lastKnownAltitude: types.number
// })
// //only way of manipulating data in MST is by creating Actions
// export const AircraftStore = types.model("AircraftModel", {
//     aircrafts: types.array(AircraftModel)
// }).actions(store => ({
//     setAircrafts(newAircrafts){
//         store.aircrafts = newAircrafts;
//     },
//     async fetchAircrafts() {
//         const data = await fetchAircrafts() //Getting the aircrafts data
//         const newAircrafts = data.aircrafts.map(aircraft => ({
//             aircraftId: aircraft.aircraftId,
//             assignedFlightId: aircraft.assignedFlightId,
//             lastKnownLongitude: aircraft.lastKnownLongitude,
//             lastKnownLatitude: aircraft.lastKnownLatitude,
//             lastKnownAltitude: aircraft.lastKnownAltitude
//         }))
//         store.setAircrafts(newAircrafts)
//     }
// })); //passes instance of the store


// let _aircraftStore 
// export const useAircrafts = () => {
//     if (!_aircraftStore){ //instantiate of aircraftStore
//         _aircraftStore = AircraftStore.create({
//             aircrafts=[]
//         })
//     }
//     return _aircraftStore
// }