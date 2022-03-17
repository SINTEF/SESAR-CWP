import { makeObservable, observable } from 'mobx';

export default class ConfigurationModel {
  configurationId = undefined;

  edges = observable.array();

  includedAirspaces = observable.map();

  constructor({
    configurationId,
    edges,
  }) {
    makeObservable(this, {
      configurationId: false, // ID is not observable
      edges: observable,
      includedAirspaces: observable,
    });
    this.configurationId = configurationId;
    this.edges = edges;
  }
}
