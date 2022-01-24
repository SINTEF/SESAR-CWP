import {types} from 'mobx-state-tree'; //Initialize the data, access the stores
//Not yet in work
//Fetching data here.
const URL = "./test_aircrafts.json"; // Has to be public

const fetchSectors = async()=> {
    const response = await fetch(URL);
    return response.json();
}
//Creating the model and store here
export const SectorModel = types.model("SectorModel",{
    aircraftId: types.string,
    assignedFlightId: types.string,
    lastKnownLongitude: types.number,
    lastKnownLatitude: types.number,
    lastKnownAltitude: types.number
})
//only way of manipulating data in MST is by creating Actions
export const SectorStore = types.model("SectorModel", {
    sectors: types.array(SectorModel)
}).actions(store => ({
    setAircrafts(newAircrafts){
        store.aircrafts = newAircrafts;
    },
    async fetchSectors() {
        const data = await fetchSectors() //Getting the aircrafts data
        const newSectors = data.map(sector => ({
            aircraftId: sector.aircraftId,
            assignedFlightId: sector.assignedFlightId,
            lastKnownLongitude: sector.lastKnownLongitude,
            lastKnownLatitude: sector.lastKnownLatitude,
            lastKnownAltitude: sector.lastKnownAltitude
        }))
        store.setSectors(newSectors)
    }
})); //passes instance of the store


let _sectorStore 
export const useSectors = () => {
    if (!_sectorStore){ //instantiate of aircraftStore
        _sectorStore = SectorStore.create({
            sectors:[] //could it be to instantiate here already to solve issue of having to move map first?
        })
    }
    return _sectorStore;
};