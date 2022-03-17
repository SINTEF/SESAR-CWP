import { makeAutoObservable, observable } from 'mobx';

import ConfigurationModel from './ConfigurationModel';
import CoordinatePair from './CoordinatePair';
import SectorModel from './SectorModel';

export default class ConfigurationStore {
  currentConfigurationId = '';

  configurations = observable.map();

  configurationPlan = observable.map();

  airspaceStore = undefined;

  constructor({
    airspaceStore,
  }) {
    makeAutoObservable(this);
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

  get areaOfIncludedAirspaces() {
    const config = this.configurations.get(this.currentConfigurationId)?.includedAirspaces;
    if (!config) {
      return [];
    }

    return [...config].filter((area) => this.airspaceStore.existIn(area[0]) !== false);
  }

  get edgesOfCurrentConfiguration() {
    const edges = this.configurations.get(this.currentConfigurationId)?.edges;
    return edges ?? [];
  }
}
