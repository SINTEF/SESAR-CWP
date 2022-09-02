import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import RoleConfigurationModel from './RoleConfigurationModel';
import type { RoleConfigurationMessage } from '../proto/ProtobufAirTrafficSimulator';
import type ConfigurationStore from './ConfigurationStore';

export default class RoleConfigurationStore {
  roleConfigurations: ObservableMap<string, RoleConfigurationModel> = observable.map();

  configurationStore: ConfigurationStore;

  constructor({
    configurationStore,
  }: {
    configurationStore: ConfigurationStore,
  }) {
    makeAutoObservable(this, {
      configurationStore: false,
      getControlledSector: false,
    }, { autoBind: true });
    this.configurationStore = configurationStore;
    this.getControlledSector = this.getControlledSector.bind(this);

    // Dummy data - we will get it directly from the new simulator
    // For debug choose dataset 2
    this.setControlledSector('CWP_NW', 'CONF12E', 'LIMM_RUN16_COBOS_12S8_SECTOR_17');
    this.setControlledSector('CWP_NE', 'CONF12E', 'LIMM_RUN16_COBOS_11S9_SECTOR_17');
    this.setControlledSector('CWP_S', 'CONF12E', 'LIMM_RUN16_COBOS_11S10_SECTOR_16');

    this.setControlledSector('CWP_NW', 'CONF12D', 'LIMM_RUN16_COBOS_11S5_SECTOR_15');
    this.setControlledSector('CWP_NE', 'CONF12D', 'LIMM_RUN16_COBOS_11S6_SECTOR_15');
    this.setControlledSector('CWP_S', 'CONF12D', 'LIMM_RUN16_COBOS_10S9_SECTOR_15');

    this.setControlledSector('CWP_NW', 'CONF11N', 'LIMM_RUN16_COBOS_11S10_SECTOR_20');
    this.setControlledSector('CWP_NE', 'CONF11N', 'LIMM_RUN16_COBOS_12S9_SECTOR_17');
    this.setControlledSector('CWP_S', 'CONF11N', 'LIMM_RUN16_COBOS_12S11_SECTOR_15');
  }

  get currentControlledSector(): string {
    const cwpRoleName = this.configurationStore.currentCWP;
    const config = this.configurationStore.currentConfigurationId;
    return this.getControlledSector(cwpRoleName, config);
  }

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

  handleNewRoleConfigutationMessage(newConfig: RoleConfigurationMessage): void {
    const { roleName } = newConfig;
    const cwpRole = this.roleConfigurations.get(roleName);
    if (!cwpRole) {
      this.roleConfigurations.set(roleName, new RoleConfigurationModel({
        cwpRoleName: roleName,
      }));
    }
    const { tentativeFlights } = newConfig;
    cwpRole?.addTentativeAircraft(tentativeFlights);
  }
}
