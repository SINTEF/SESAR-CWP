import {types} from 'mobx-state-tree'; //Initialize the data, access the stores

// const URL = "./test_aircrafts.json"; // Has to be public

// const fetchSectors = async()=> {
//     const response = await fetch(URL);
//     return response.json();
// }
export const CoordinatePair = types.model("CoordinatePair",{ //coordinates
    longitude: types.optional(types.number, 0),
    latitude: types.optional(types.number, 0)
}).actions(store=> ({
    setCoordinatePair(newLongitude,newLatitude){
        store.longitude = newLongitude;
        store.latitude = newLatitude;
    }
}))
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
    sectors: types.map(SectorModel)
}).actions(store => ({
    setConfiguration(newConfigId,newEdges){
        store.configurationId = newConfigId;
        store.edges = newEdges;
        // store.sectors = newSectors;
    },
    handleNewAirspaceConfiguration(newConfig){
        store.configurationId = newConfig.getConfigurationid() //if configurationid is the same - update only sectors within?
        const newEdges =[]
        // const newEdges = 
        newConfig.getAreaList().map((area) => {
            newEdges.push(CoordinatePair.create({
                latitude: area.getPosition4d().getLatitude(),
                longitude: area.getPosition4d().getLongitude()
            }))
            // store.edges.push(coordinatePair)
            // console.log(coordinatePair.latitude); Funker så hvorfor blir det ikke riktig            
        })
        store.edges = newEdges;
        // const newEdges = store.edges.push({
        //     id: Math.random
        //     longitude:12.44,
        //     latitude:9.23
        // })
        newConfig.getIncludedairspacevolumesList().map((includedAirspace) =>{
            store.sectors.put(SectorModel.create({
                sectorId: includedAirspace.getVolumeid(),
                bottomFlightLevel: includedAirspace.getBottomflightlevel(),
                topFlightLevel: includedAirspace.getTopflightlevel()

            }))
        })
        // store.setConfiguration(configurationId,newEdges);
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