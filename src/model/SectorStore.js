import { types } from 'mobx-state-tree'; // Initialize the data, access the stores

import AirspaceStore from './AirspaceModel';
import CoordinatePair from './CoordinatePair';

// Creating the model and store here
export const SectorModel = types.model('SectorModel', { // One sector
    sectorId: types.identifier,
    bottomFlightLevel: types.optional(types.number, 0),
    topFlightLevel: types.optional(types.number, 0),
});

// only way of manipulating data in MST is by creating Actions
export default types.model('SectorStore', { // SectorStore also known as configuration of airspace
    configurationId: types.optional(types.string, ''),
    edges: types.optional(types.array(CoordinatePair), []),
    sectors: types.map(SectorModel),
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
            if (store.sectors.has(includedAirspace.getVolumeid())) {
                // eslint-disable-next-line no-console
                console.trace('TODO updating');
            } else {
                store.sectors.put(SectorModel.create({
                    sectorId: includedAirspace.getVolumeid(),
                    bottomFlightLevel: includedAirspace.getBottomflightlevel(),
                    topFlightLevel: includedAirspace.getTopflightlevel(),

                }));
            }
        }
    },
}))
    .views((store) => ({
        get areaOfIncludedAirspaces() {
            const airspaceAreas = [...store.sectors]
                .map(([key]) => store.airspaceStore.getAreaFromId(key))
                .filter((area) => area !== undefined);
            return airspaceAreas;
        },
    }));
