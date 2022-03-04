import AircraftStore from './model/AircraftStore';
import AirspaceStore from './model/AirspaceStore';
import ConfigurationStore from './model/ConfigurationStore';
import FixStore from './model/FixStore';

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
export const fixStore = FixStore.create({
    fixstore: {},
});
