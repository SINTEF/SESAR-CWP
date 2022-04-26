import { observable } from 'mobx';

import RoleConfigurationModel from './RoleConfigurationModel';

export default class RoleConfigurationStore {
  roleConfigurations = observable.map();

  getControlledSector(cwpRoleName, config) {
    let controlledSector = '';
    if (this.roleConfigurations.has(cwpRoleName)) {
      const { sectorToConfiguration } = this.roleConfigurations.get(cwpRoleName);
      const sectorAndConfig = [...sectorToConfiguration]
        .filter(([sectorToconfig]) => sectorToconfig.configurationId === config);
      if (sectorAndConfig.length === 0) {
        return controlledSector;
      }
      controlledSector = sectorAndConfig[0][0].controlledSector;
    }
    return controlledSector;
  }

  getConfigurationId(cwpRoleName) {
    let configId = '';
    if (this.roleConfigurations.has(cwpRoleName)) {
      configId = this.roleConfigurations.get(cwpRoleName).configurationId;
    }
    return configId;
  }

  getRoleName(controlledSector) {
    let roleName = '';
    if (this.roleConfigurations.has(controlledSector)) {
      roleName = this.roleConfigurations.get(controlledSector).roleName;
    }
    return roleName;
  }

  setControlledSector(cwpRoleName, config, sector) {
    if (this.roleConfigurations.has(cwpRoleName)) {
      this.roleConfigurations.get(cwpRoleName).setControlledSector(config, sector);
    } else {
      this.roleConfigurations.set(cwpRoleName, new RoleConfigurationModel({
        cwpRoleName,
      }));
      this.roleConfigurations.get(cwpRoleName).setControlledSector(config, sector);
    }
  }
}
