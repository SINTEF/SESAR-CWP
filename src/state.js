
import AircraftStore from "./model/AircraftStore";
import SectorStore from "./model/SectorStore";
import AirspaceStore from "./model/AirspaceModel"

export const aircraftStore = AircraftStore.create({
  aircrafts: {},
});

export const sectorStore = SectorStore.create({
  configurationId: "",
  edges: [],
  sectors: {}
});

export const airspaceStore = AirspaceStore.create({
  airspaces: {}
});
