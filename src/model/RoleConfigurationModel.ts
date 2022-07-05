import { makeObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import SectorToConfiguration from './SectorToConfiguration';

export default class RoleConfigurationModel {
  cwpRoleName = '';

  sectorToConfiguration: ObservableMap<string, SectorToConfiguration> = observable.map();

  constructor({
    cwpRoleName,
  }: {
    cwpRoleName: string;
  }) {
    makeObservable(this, {
      cwpRoleName: false,
      sectorToConfiguration: observable,
    });
    this.cwpRoleName = cwpRoleName;
  }

  setControlledSector(configurationId: string, sector: string): void {
    this.sectorToConfiguration.set(configurationId, new SectorToConfiguration({
      configurationId,
      controlledSector: sector,
    }));
  }
}
