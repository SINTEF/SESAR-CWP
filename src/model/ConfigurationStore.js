import { types } from 'mobx-state-tree'; // Initialize the data, access the stores

// import * as airspaceModel from './AirspaceModel';
import AirspaceStore from './AirspaceStore';
import CoordinatePair from './CoordinatePair';

// Creating the model and store here
export const SectorModel = types.model('SectorModel', { // One sector
    sectorId: types.identifier,
    bottomFlightLevel: types.optional(types.number, 0),
    topFlightLevel: types.optional(types.number, 0),
    sectorArea: types.optional(types.array(CoordinatePair), []),
});

// only way of manipulating data in MST is by creating Actions
export default types.model('ConfigurationStore', { // SectorStore also known as configuration of airspace
        configurationId: types.optional(types.string, ''),
        edges: types.optional(types.array(CoordinatePair), []),
        includedAirspaces: types.map(SectorModel),
        airspaceStore: AirspaceStore,
    }).actions((store) => ({
        handleNewAirspaceConfiguration(newConfig) {
            // if configurationid is the same - update only sectors within?
            store.configurationId = newConfig.getConfigurationid();
            const newEdges = newConfig.getAreaList().map((area) => CoordinatePair.create({
                latitude: area.getPosition4d().getLatitude(),
                longitude: area.getPosition4d().getLongitude(),
            }));
            store.edges = newEdges;
            // If sector is airspace - devide into different
            for (const includedAirspace of newConfig.getIncludedairspacevolumesList()) {
                if (store.includedAirspaces.has(includedAirspace.getVolumeid())) {
                    // eslint-disable-next-line no-console
                    console.trace('TODO updating');
                } else {
                    let sectorArea = [];
                    try {
                        sectorArea = store.airspaceStore
                            .getAreaFromId(includedAirspace.getVolumeid())
                            .airspaceArea.map((area) => CoordinatePair.create({
                                latitude: area.latitude,
                                longitude: area.longitude,
                            }));
                    } catch (error) {
                        console.log(error);
                    }
                    // (store.airspacemodel.getAirspaceArea(includedAirspace.getVolumeid()));
                    store.includedAirspaces.put(SectorModel.create({
                        sectorId: includedAirspace.getVolumeid(),
                        bottomFlightLevel: includedAirspace.getBottomflightlevel(),
                        topFlightLevel: includedAirspace.getTopflightlevel(),
                        sectorArea,

                    }));
                }
            }
        },
    }))
    .views((store) => ({
        get areaOfIncludedAirspaces() {
            const airspaceAreas = [...store.includedAirspaces]
                .filter((area) => store.airspaceStore.existIn(area[0]) !== false);
            return airspaceAreas;
        },
        // eslint-disable-next-line eol-last
    }));