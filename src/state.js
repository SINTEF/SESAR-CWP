import AircraftStore from './model/AircraftStore';
import AirspaceStore from './model/AirspaceModel';
import SectorStore from './model/SectorStore';

export const aircraftStore = AircraftStore.create({
  aircrafts: {},
});

export const airspaceStore = AirspaceStore.create({
  airspaces: {},
});

export const sectorStore = SectorStore.create({
  configurationId: '',
  edges: [],
  sectors: {},
  airspaceStore,
});
