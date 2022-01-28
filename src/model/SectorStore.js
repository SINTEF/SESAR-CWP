import {types} from 'mobx-state-tree'; //Initialize the data, access the stores
//Not yet in work
//Fetching data here.
const URL = "./test_aircrafts.json"; // Has to be public

// const fetchSectors = async()=> {
//     const response = await fetch(URL);
//     return response.json();
// }
export const CoordinatePair = types.model("CoordinatePair",{ //coordinates
    latitude: types.optional(types.number, 0),
    longitude: types.optional(types.number, 0)
})
//Creating the model and store here
export const SectorModel = types.model("SectorModel",{ // One sector
    sectorId: types.identifier,
    bottomFlightLevel: types.optional(types.number, 0),
    topFlightLevel: types.optional(types.number, 0),
    // coordinates: types.array(CoordinatePair)
})
//only way of manipulating data in MST is by creating Actions
export default types.model("SectorStore", { //SectorStore also known as configuration of airspace
    configurationId: types.optional(types.string,""),
    edges: types.optional(types.array(CoordinatePair),[]),
    sectors: types.optional(types.map(SectorModel),{})
}).actions(store => ({
    setSectors(newSectors){
        store.sectors = newSectors;
    },
    handleNewAirspaceConfiguration(newConfig){
        const configurationId = newConfig.getConfigurationid()
        // newConfig.getAreaList().map((area) => {
        //     console.log(area)
        //     store.edges.put(CoordinatePair.create({
        //         latitude: area.getPosition4d().getLatitude(),
        //         longitude: area.getPosition4d().getLongitude()
        //     }))
        // })
        newConfig.getIncludedairspacevolumesList().map((includedAirspace) =>{
            store.sectors.put(SectorModel.create({
                sectorId: includedAirspace.getVolumeid(),
                bottomFlightLevel: includedAirspace.getBottomflightlevel(),
                topFlightLevel: includedAirspace.getTopflightlevel()

            }))
        })
    },
    // async fetchSectors() {
    //     const data = await fetchSectors() //Getting the aircrafts data
    //     const newSectors = data.map(sector => ({
    //         aircraftId: sector.aircraftId,
    //         assignedFlightId: sector.assignedFlightId,
    //         lastKnownLongitude: sector.lastKnownLongitude,
    //         lastKnownLatitude: sector.lastKnownLatitude,
    //         lastKnownAltitude: sector.lastKnownAltitude
    //     }))
    //     store.setSectors(newSectors)
    // }
})); //passes instance of the store


// let _sectorStore 
// export const useSectors = () => {
//     if (!_sectorStore){ //instantiate of aircraftStore
//         _sectorStore = SectorStore.create({
//             sectors:[] //could it be to instantiate here already to solve issue of having to move map first?
//         })
//     }
//     return _sectorStore;
// };