import { makeObservable, observable } from 'mobx';

import SectorToConfiguration from './SectorToConfiguration';

export default class RoleConfigurationModel {
  cwpRoleName = '';

  sectorToConfiguration = observable.map();

  constructor({
    cwpRoleName,

  }) {
    makeObservable(this,
      {
        cwpRoleName: false,
        sectorToConfiguration: observable,
      });
    this.cwpRoleName = cwpRoleName;
  }

  setControlledSector(configurationId, sector) {
    this.sectorToConfiguration.set(new SectorToConfiguration({
      configurationId,
      controlledSector: sector,
    }));
  }

  getSectorFromConfiguration(config) {
    const sectorId = this.sectorToConfiguration.get(config);
    return sectorId;
  }
}
