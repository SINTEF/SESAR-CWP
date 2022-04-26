import { makeAutoObservable, observable } from 'mobx';

import ConfigurationModel from './ConfigurationModel';
import ConfigurationTime from './ConfigurationTime';
import CoordinatePair from './CoordinatePair';
import SectorModel from './SectorModel';

export default class ConfigurationStore {
  currentConfigurationId = '';

  configurations = observable.map();

  configurationPlan = observable.map();

  airspaceStore = undefined;

  currentCWP = '';

  constructor({
    airspaceStore,
  }) {
    makeAutoObservable(this, {
      airspaceStore: false,
    }, { autoBind: true });
    this.airspaceStore = airspaceStore;
  }

  handleNewAirspaceConfiguration(newConfig) {
    const configId = newConfig.getConfigurationid();
    const newEdges = newConfig.getAreaList().map((area) => new CoordinatePair({
      latitude: area.getPosition4d().getLatitude(),
      longitude: area.getPosition4d().getLongitude(),
    }));
    this.configurations.set(configId, new ConfigurationModel({
      configurationId: configId,
      edges: newEdges,
      // includedAirspaces: setIncludedAirspaces,
    }));
    for (const includedAirspace of newConfig.getIncludedairspacevolumesList()) {
      if (this.configurations.get(configId)
        .includedAirspaces.has(includedAirspace.getVolumeid())) {
        // eslint-disable-next-line no-console
        console.trace('TODO updating');
      } else {
        const sectorArea = this.airspaceStore
          .getAreaFromId(includedAirspace.getVolumeid())
          ?.airspaceArea?.map((area) => new CoordinatePair({
            latitude: area.latitude,
            longitude: area.longitude,
          })) ?? [];
        const sectorId = includedAirspace.getVolumeid();
        this.configurations.get(configId).includedAirspaces.set(
          sectorId,
          new SectorModel({
            sectorId,
            bottomFlightLevel: includedAirspace.getBottomflightlevel(),
            topFlightLevel: includedAirspace.getTopflightlevel(),
            sectorArea,

          }));
      }
    }
  }

  setCurrentConfiguration(configMessage) {
    this.currentConfigurationId = configMessage.getCurrentairspaceconfiguration();
  }

  setCurrentCWP(controllerValue) {
    this.currentCWP = controllerValue;
  }

  handleAvailabilityMessage(newAvailabilitymessage) {
    const configId = newAvailabilitymessage.getAirspaceid();
    const timeStart = newAvailabilitymessage.getStarttime();
    const timeEnd = newAvailabilitymessage.getEndtime();

    if (this.configurationPlan.has(configId)) {
      this.configurationPlan.get(configId).handleAvailabilityMessage(newAvailabilitymessage);
    } else {
      this.configurationPlan.set(configId, new ConfigurationTime({
        configurationId: configId,
        startTime: timeStart.getSeconds() + timeStart.getNanos() * 1e-9,
        endTime: timeEnd.getSeconds() + timeEnd.getNanos() * 1e-9,
      }));
    }
  }

  get areaOfIncludedAirspaces() {
    const config = this.configurations.get(this.currentConfigurationId)?.includedAirspaces;
    if (!config) {
      return [];
    }

    return [...config].filter((area) => this.airspaceStore.existIn(area[0]) !== false);
  }

  get edgesPolygon() {
    const edges = this.configurations.get(this.currentConfigurationId)?.edges;
    if (!edges) {
      return [];
    }
    return edges.map((edge) => ([edge.longitude, edge.latitude]));
  }

  get sortedConfigurationPlan() {
    const sortedList = [...this.configurationPlan.values()].sort();
    return sortedList;
  }

  getAreaOfIncludedAirpaces(configuration) {
    const config = this.configurations.get(configuration)?.includedAirspaces;
    if (!config) {
      return [];
    }

    return [...config].filter((area) => this.airspaceStore.existIn(area[0]) !== false);
  }
}
