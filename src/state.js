
import AircraftStore from "./model/AircraftStore";
import SectorStore from "./model/SectorStore";

export const aircraftStore = AircraftStore.create({
  aircrafts: {},
});

export const sectorStore = SectorStore.create({
  configurationId: "",
  edges: [],
  sectors: {}
});
