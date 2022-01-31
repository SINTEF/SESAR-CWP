import {types} from 'mobx-state-tree'; //Initialize the data, access the stores
import { airspaceStore } from '../state';


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
    handleNewAirspaceConfiguration(newConfig){
        store.configurationId = newConfig.getConfigurationid() //if configurationid is the same - update only sectors within?
        const newEdges =[]
        newConfig.getAreaList().map((area) => {
            newEdges.push(CoordinatePair.create({
                latitude: area.getPosition4d().getLatitude(),
                longitude: area.getPosition4d().getLongitude()
            }))      
        })
        store.edges = newEdges;
        //If sector if airspace - devide into different
        newConfig.getIncludedairspacevolumesList().map((includedAirspace) =>{
            if (store.sectors.has(includedAirspace.getVolumeid())){
                console.log("updating");
            } else {
            store.sectors.put(SectorModel.create({
                sectorId: includedAirspace.getVolumeid(),
                bottomFlightLevel: includedAirspace.getBottomflightlevel(),
                topFlightLevel: includedAirspace.getTopflightlevel()

            }))}
        })
    },
}))
.views(store => ({
        get areaOfIncludedAirspaces(){
            const airspaceAreas =[]
            Array.from(store.sectors).map(airspace => {
                if (airspaceStore.getAreaFromId(airspace[0]) !== undefined){
                    airspaceAreas.push(airspaceStore.getAreaFromId(airspace[0]));
                }
        
            })
            return airspaceAreas;
        }
    }))