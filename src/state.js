import AircraftStore from './model/AircraftStore';
import AirspaceStore from './model/AirspaceStore';
import ConfigurationStore from './model/ConfigurationStore';
import CWPStore from './model/CwpStore';
import FixStore from './model/FixStore';
import SimulatorStore from './model/SimulatorStore';

export const simulatorStore = new SimulatorStore();
export const aircraftStore = new AircraftStore({
  simulatorStore,
});
export const airspaceStore = new AirspaceStore();
export const configurationStore = new ConfigurationStore({
  airspaceStore,
});
export const fixStore = new FixStore();
export const cwpStore = new CWPStore({
  altitudeFilter: {
    lowestBound: 205,
    highestBound: 400,
  },
});
