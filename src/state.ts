import AdminStore from "./model/AdminStore";
import AircraftStore from "./model/AircraftStore";
import AirspaceStore from "./model/AirspaceStore";
import AirwaysStore from "./model/AirwaysStore";
import ConfigurationStore from "./model/ConfigurationStore";
import CWPStore from "./model/CwpStore";
import DatablockStore from "./model/DatablockStore";
import DistanceLine from "./model/DistanceLine";
import FixStore from "./model/FixStore";
import PopupLinesStore from "./model/PopupLinesStore";
import RoleConfigurationStore from "./model/RoleConfigurationStore";
import SectorStore from "./model/SectorStore";
import SepQdmStore from "./model/SepQdmStore";
import SimulatorStore from "./model/SimulatorStore";
import TrajectoryPredictionStore from "./model/TrajectoryPredictionStore";
import MapViewportStore from "./stores/MapViewportStore";

declare global {
	interface Window {
		mobxDebugStores: Record<string, unknown>;
	}
}

export const simulatorStore = new SimulatorStore();
export const adminStore = new AdminStore();
export const airspaceStore = new AirspaceStore();
export const sectorStore = new SectorStore();
export const aircraftStore = new AircraftStore({
	simulatorStore,
	sectorStore,
});
export const fixStore = new FixStore();
export const airwaysStore = new AirwaysStore();
export const datablockStore = new DatablockStore();
export const distanceLineStore = new DistanceLine();

// Wire up datablockStore to aircraftStore for MTCD override logic
aircraftStore.setDatablockStore(datablockStore);

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
export const mapViewportStore = new MapViewportStore();
export const popupLinesStore = new PopupLinesStore();
export const sepQdmStore = new SepQdmStore({
	mapViewportStore,
	aircraftStore,
	configurationStore,
	trajectoryPredictionStore,
});

window.mobxDebugStores = {
	simulatorStore,
	adminStore,
	aircraftStore,
	airspaceStore,
	sectorStore,
	fixStore,
	airwaysStore,
	datablockStore,
	distanceLineStore,
	cwpStore,
	configurationStore,
	roleConfigurationStore,
	trajectoryPredictionStore,
	mapViewportStore,
	popupLinesStore,
	sepQdmStore,
};
