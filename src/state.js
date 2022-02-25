import AircraftStore from './model/AircraftStore';
import AirspaceStore from './model/AirspaceStore';
import ConfigurationStore from './model/ConfigurationStore';

export const aircraftStore = AircraftStore.create({
    aircrafts: {},
});

export const airspaceStore = AirspaceStore.create({
    airspaces: {},
});

export const configurationStore = ConfigurationStore.create({
    configurationId: '',
    edges: [],
    sectors: {},
    airspaceStore,
    // eslint-disable-next-line eol-last
});