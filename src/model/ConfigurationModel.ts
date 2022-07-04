import { makeObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import type CoordinatePair from './CoordinatePair';
import type SectorModel from './SectorModel';

export default class ConfigurationModel {
  configurationId: string;

  edges: CoordinatePair[];

  includedAirspaces: ObservableMap<string, SectorModel> = observable.map();

  constructor({
    configurationId,
    edges,
  }: {
    configurationId: string;
    edges: CoordinatePair[];
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
