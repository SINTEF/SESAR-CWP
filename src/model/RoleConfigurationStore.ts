import { observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import RoleConfigurationModel from './RoleConfigurationModel';

export default class RoleConfigurationStore {
  roleConfigurations: ObservableMap<string, RoleConfigurationModel> = observable.map();

  getControlledSector(cwpRoleName: string, config: string): string {
    const configuration = this.roleConfigurations.get(cwpRoleName);
    if (!configuration) {
      return '';
    }

    const { sectorToConfiguration } = configuration;
    const sectorAndConfig = [...sectorToConfiguration.values()]
      .find((sectorToconfig) => sectorToconfig.configurationId === config);
    return sectorAndConfig?.controlledSector ?? '';
  }

  setControlledSector(cwpRoleName: string, config: string, sector: string): void {
    let configuration = this.roleConfigurations.get(cwpRoleName);
    if (!configuration) {
      configuration = new RoleConfigurationModel({
        cwpRoleName,
      });
      this.roleConfigurations.set(cwpRoleName, configuration);
    }
    configuration.setControlledSector(config, sector);
  }
}
