import AircraftStore from "./model/AircraftStore";
import AirspaceStore from "./model/AirspaceStore";
import ConfigurationStore from "./model/ConfigurationStore";
import CWPStore from "./model/CwpStore";
import DistanceLine from "./model/DistanceLine";
import FixStore from "./model/FixStore";
import RoleConfigurationStore from "./model/RoleConfigurationStore";
import SimulatorStore from "./model/SimulatorStore";
import TrajectoryPredictionStore from "./model/TrajectoryPredictionStore";

export const simulatorStore = new SimulatorStore();
export const aircraftStore = new AircraftStore({
	simulatorStore,
});
export const airspaceStore = new AirspaceStore();
export const fixStore = new FixStore();
export const distanceLineStore = new DistanceLine();
export const cwpStore = new CWPStore({
	altitudeFilter: {
		lowestBound: 285,
		highestBound: 999,
	},
});
export const configurationStore = new ConfigurationStore({
	cwpStore,
	aircraftStore,
	airspaceStore,
	simulatorStore,
});
export const roleConfigurationStore = new RoleConfigurationStore({
	configurationStore,
	aircraftStore,
	cwpStore,
	fixStore,
});
export const trajectoryPredictionStore = new TrajectoryPredictionStore({
	aircraftStore,
	simulatorStore,
});
