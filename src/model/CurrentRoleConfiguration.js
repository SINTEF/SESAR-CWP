import { observable } from 'mobx';

import RoleConfigurationModel from './RoleConfigurationModel';

export default class CurrentRoleConfiguration {
  roleConfigurations = observable.map();

  getControlledSector(cwpRoleName) {
    let controlledSector = '';
    if (this.roleConfigurations.has(cwpRoleName)) {
      controlledSector = this.roleConfigurations.get(cwpRoleName).controlledSector;
    }
    return controlledSector;
  }

  getRoleName(controlledSector) {
    let roleName = '';
    if (this.roleConfigurations.has(controlledSector)) {
      roleName = this.roleConfigurations.get(controlledSector).roleName;
    }
    return roleName;
  }

  setControlledSector(cwpRoleName, sector) {
    if (this.roleConfigurations.has(cwpRoleName)) {
      this.roleConfigurations.get(cwpRoleName).setControlledSector(sector);
    } else {
      this.roleConfigurations.set(cwpRoleName, new RoleConfigurationModel({
        cwpRoleName,
        controlledSector: sector,
      }));
    }
  }
}
