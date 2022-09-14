import { booleanPointInPolygon, polygon } from '@turf/turf';
import { makeAutoObservable, observable } from 'mobx';
import type { Position } from '@turf/turf';
import type { ObservableMap } from 'mobx';

import RoleConfigurationModel from './RoleConfigurationModel';
import type { AirTrafficControllerAssignmentMessage, RoleConfigurationMessage } from '../proto/ProtobufAirTrafficSimulator';
import type AircraftModel from './AircraftModel';
import type AircraftStore from './AircraftStore';
import type ConfigurationStore from './ConfigurationStore';
import type CoordinatePair from './CoordinatePair';
import type { ISectorModel } from './ISectorModel';

export default class RoleConfigurationStore {
  roleConfigurations: ObservableMap<string, RoleConfigurationModel> = observable.map(
    undefined, { deep: false });

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
  }

  get currentControlledSector(): string | undefined {
    const { currentCWP, currentConfigurationId } = this.configurationStore;
    return this.findCurrentSectorByCWP(currentCWP, currentConfigurationId);
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

  findCurrentSectorByCWP(cwp:string, config: string):string | undefined {
    const listOfSectorIds = this.roleConfigurations
      .get(cwp)?.sectorsToControl;
    const includedAirspaces = this.configurationStore.getAreaOfIncludedAirpaces(config);
    if (listOfSectorIds) {
      for (const sector of listOfSectorIds) {
        const area = RoleConfigurationStore
          .getAreaForSector(includedAirspaces, sector);
        if (area) {
          return sector;
        }
      }
    }
    return undefined;
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
    const listOfSectorIds = this.roleConfigurations
      .get(this.configurationStore.currentCWP)?.sectorsToControl;
    if (listOfSectorIds) {
      for (const sector of listOfSectorIds) {
        const area = RoleConfigurationStore
          .getAreaForSector(this.configurationStore.areaOfIncludedAirspaces, sector);
        if (area) {
          return area;
        }
      }
    }
    return undefined;
  }

  getcolorBySectorId(sectorId: string): string {
    const color = [...this.roleConfigurations]
      .map(([index, array]) => (array.inSectorToControl(sectorId)
        ? this.roleConfigurations
          .get(index)?.assignedColorById : undefined)).find((element) => element !== undefined);
    return color ?? '#555';
  }

  handleNewAirTrafficControllerMessage(newAirTrafficControllerMessage:
  AirTrafficControllerAssignmentMessage): void {
    const roleName = `CWP${newAirTrafficControllerMessage.airTrafficControllerId}`;
    const controllingSectors = newAirTrafficControllerMessage.sectorIds;
    this.roleConfigurations.set(roleName, new RoleConfigurationModel({
      cwpRoleName: roleName,
    }));
    this.roleConfigurations.get(roleName)?.replaceSectorsToControl(controllingSectors);
    this.roleConfigurations.get(roleName)?.setAssignedColor();
  }

  get areaOfNextControlledSector(): CoordinatePair[] | undefined {
    if (!this.nextControlledSector) {
      return undefined;
    }
    const listOfSectorIds = this.roleConfigurations
      .get(this.configurationStore.currentCWP)?.sectorsToControl;
    if (listOfSectorIds) {
      for (const sector of listOfSectorIds) {
        const area = RoleConfigurationStore
          .getAreaForSector(this.configurationStore
            .areaOfIncludedAirspacesForNextConfiguration, sector);
        if (area) {
          return area;
        }
      }
    }
    return undefined;
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

  get listOfAllControllers(): string[] {
    const controllers: string[] = [];
    for (const value of this.roleConfigurations) {
      controllers.push(value[0]);
    }
    return controllers;
  }

  get listOfAllPseudoControllers():string[] {
    const pseudoControllers: string[] = [];
    for (const value of this.roleConfigurations) {
      pseudoControllers.push(`${value[0]} PseudoPilot`);
    }
    return pseudoControllers;
  }
}
