import { booleanPointInPolygon, polygon } from '@turf/turf';
import { makeAutoObservable, observable } from 'mobx';
import type { Position } from '@turf/turf';
import type { ObservableMap } from 'mobx';

import RoleConfigurationModel from './RoleConfigurationModel';
import type { RoleConfigurationMessage } from '../proto/ProtobufAirTrafficSimulator';
import type AircraftModel from './AircraftModel';
import type AircraftStore from './AircraftStore';
import type ConfigurationStore from './ConfigurationStore';
import type CoordinatePair from './CoordinatePair';
import type { ISectorModel } from './ISectorModel';

export default class RoleConfigurationStore {
  roleConfigurations: ObservableMap<string, RoleConfigurationModel> = observable.map();

  configurationStore: ConfigurationStore;

  aircraftStore: AircraftStore;

  constructor({
    configurationStore,
    aircraftStore,
  }: {
    configurationStore: ConfigurationStore,
    aircraftStore: AircraftStore
  }) {
    makeAutoObservable(this, {
      configurationStore: false,
      getControlledSector: false,
      aircraftStore: false,
    }, { autoBind: true });
    this.configurationStore = configurationStore;
    this.aircraftStore = aircraftStore;
    this.getControlledSector = this.getControlledSector.bind(this);

    // Dummy data - we will get it directly from the new simulator
    // For debug choose dataset 2
    this.setControlledSector('CWP_NW', 'CONF12E', 'LIMM_RUN16_COBOS_12S8_SECTOR_17');
    this.setControlledSector('CWP_NE', 'CONF12E', 'LIMM_RUN16_COBOS_11S9_SECTOR_17');
    this.setControlledSector('CWP_S', 'CONF12E', 'LIMM_RUN16_COBOS_11S10_SECTOR_16');

    this.setControlledSector('CWP_NW', 'CONF12D', 'LIMM_RUN16_COBOS_11S6_SECTOR_15');
    this.setControlledSector('CWP_NE', 'CONF12D', 'LIMM_RUN16_COBOS_11S5_SECTOR_15');
    this.setControlledSector('CWP_S', 'CONF12D', 'LIMM_RUN16_COBOS_10S9_SECTOR_15');

    this.setControlledSector('CWP_NW', 'CONF11N', 'LIMM_RUN16_COBOS_11S10_SECTOR_20');
    this.setControlledSector('CWP_NE', 'CONF11N', 'LIMM_RUN16_COBOS_12S9_SECTOR_17');
    this.setControlledSector('CWP_S', 'CONF11N', 'LIMM_RUN16_COBOS_12S11_SECTOR_15');
  }

  get currentControlledSector(): string {
    const { currentCWP, currentConfigurationId } = this.configurationStore;
    return this.getControlledSector(currentCWP, currentConfigurationId);
  }

  get nextControlledSector(): string | undefined {
    const { currentCWP, nextConfigurationId } = this.configurationStore;
    if (!nextConfigurationId) {
      return undefined;
    }
    return this.getControlledSector(currentCWP, nextConfigurationId);
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

  private static getAreaForSector(areas: ISectorModel[], sector: string)
    : CoordinatePair[] | undefined {
    const area = areas.find(({ sectorId }) => sectorId === sector);
    if (!area) {
      return undefined;
    }
    const { sectorArea } = area;
    if (sectorArea.length === 0) {
      return undefined;
    }
    return [...sectorArea, sectorArea[0]];
  }

  get areaOfCurrentControlledSector(): CoordinatePair[] | undefined {
    return RoleConfigurationStore.getAreaForSector(
      this.configurationStore.areaOfIncludedAirspaces,
      this.currentControlledSector,
    );
  }

  get areaOfNextControlledSector(): CoordinatePair[] | undefined {
    const { nextControlledSector, configurationStore } = this;
    if (!nextControlledSector) {
      return undefined;
    }
    return RoleConfigurationStore.getAreaForSector(
      configurationStore.areaOfIncludedAirspacesForNextConfiguration,
      nextControlledSector,
    );
  }

  get listOfFlightsInCurrentSector(): AircraftModel[] | [] {
    if (this.areaOfCurrentControlledSector !== undefined) {
      const coordinates = this.areaOfCurrentControlledSector?.map((point) => (
        [point.longitude, point.latitude]),
      );
      const boundsGeometry = polygon(
        [coordinates] as unknown as Position[][]);
      const temporaryAircrafts: AircraftModel[] = [];
      for (const aircraft of this.aircraftStore.aircrafts) {
        const position: Position = [aircraft[1].lastKnownLongitude, aircraft[1].lastKnownLatitude];
        const bool = booleanPointInPolygon(position, boundsGeometry);
        if (bool) {
          temporaryAircrafts.push(...this.aircraftStore.aircraftsWithPosition
            .filter((flight) => flight.assignedFlightId === aircraft[0]));
        }
      }
      return temporaryAircrafts;
    }
    return [];
  }
}
