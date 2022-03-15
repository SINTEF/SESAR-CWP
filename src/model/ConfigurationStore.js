import { types } from 'mobx-state-tree';

import AirspaceStore from './AirspaceStore';
import ConfigurationTime from './ConfigurationTime';
import CoordinatePair from './CoordinatePair';

// Creating the model and store here
export const SectorModel = types.model('SectorModel', { // One sector
    sectorId: types.identifier,
    bottomFlightLevel: types.optional(types.number, 0),
    topFlightLevel: types.optional(types.number, 0),
    sectorArea: types.optional(types.array(CoordinatePair), []),
});
export const CurrentConfiguration = types.model('CurrentConfiguration', {
    currentConfigurationId: types.optional(types.string, ''),
}).actions((self) => ({
    setCurrentConfiguration(configMessage) {
        self.currentConfigurationId = configMessage.getCurrentairspaceconfiguration();
    },
}));
export const ConfigurationModel = types.model('ConfigurationModel', {
    configurationId: types.identifier,
    edges: types.optional(types.array(CoordinatePair), []),
    includedAirspaces: types.map(SectorModel),
});

export default types.model('ConfigurationStore', {
    currentConfigurationId: types.optional(types.string, ''),
    configurations: types.map(ConfigurationModel),
    configurationPlan: types.map(ConfigurationTime),
    airspaceStore: AirspaceStore,
}).actions((store) => ({
    handleNewAirspaceConfiguration(newConfig) {
        const configId = newConfig.getConfigurationid();
        const newEdges = newConfig.getAreaList().map((area) => CoordinatePair.create({
            latitude: area.getPosition4d().getLatitude(),
            longitude: area.getPosition4d().getLongitude(),
        }));
        store.configurations.put(ConfigurationModel.create({
            configurationId: configId,
            edges: newEdges,
            // includedAirspaces: setIncludedAirspaces,
        }));
        for (const includedAirspace of newConfig.getIncludedairspacevolumesList()) {
            if (store.configurations.get(configId)
                .includedAirspaces.has(includedAirspace.getVolumeid())) {
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
                store.configurations.get(configId).includedAirspaces.put(SectorModel.create({
                    sectorId: includedAirspace.getVolumeid(),
                    bottomFlightLevel: includedAirspace.getBottomflightlevel(),
                    topFlightLevel: includedAirspace.getTopflightlevel(),
                    sectorArea,

                }));
            }
        }
    },
    setCurrentConfiguration(configMessage) {
        store.currentConfigurationId = configMessage.getCurrentairspaceconfiguration();
    },
    }))
    .views((store) => ({
        get areaOfIncludedAirspaces() {
            let config = [];
            try {
                config = store.configurations.get(store.currentConfigurationId).includedAirspaces;
            } catch (error) {
                console.log(error);
            }// console.log([...config]);
            const airspaceAreas = [...config]
                .filter((area) => store.airspaceStore.existIn(area[0]) !== false);
            return airspaceAreas;
        },
        get edgesOfCurrentConfiguration() {
            let edges = [];
            try {
                edges = store.configurations.get(store.currentConfigurationId).edges;
            } catch (error) {
                console.log(error);
            }
            return edges;
        },
        // eslint-disable-next-line eol-last
    }));