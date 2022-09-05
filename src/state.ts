import AircraftStore from './model/AircraftStore';
import AirspaceStore from './model/AirspaceStore';
import ConfigurationStore from './model/ConfigurationStore';
import CWPStore from './model/CwpStore';
import DistanceLine from './model/DistanceLine';
import FixStore from './model/FixStore';
import RoleConfigurationStore from './model/RoleConfigurationStore';
import SimulatorStore from './model/SimulatorStore';
import VoiceStore from './model/VoiceStore';

export const simulatorStore = new SimulatorStore();
export const aircraftStore = new AircraftStore({
  simulatorStore,
});
export const airspaceStore = new AirspaceStore();
export const configurationStore = new ConfigurationStore({
  airspaceStore,
});
export const fixStore = new FixStore();
export const distanceLineStore = new DistanceLine();
export const roleConfigurationStore = new RoleConfigurationStore({
  configurationStore,
  aircraftStore,
});
export const cwpStore = new CWPStore({
  altitudeFilter: {
    lowestBound: 325,
    highestBound: 555,
  },
});
export const voiceStore = new VoiceStore();
