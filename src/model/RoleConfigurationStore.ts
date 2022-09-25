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
import type FixStore from './FixStore';
import type { ISectorModel } from './ISectorModel';

export default class RoleConfigurationStore {
  roleConfigurations: ObservableMap<string, RoleConfigurationModel> = observable.map(
    undefined, { deep: false });

  configurationStore: ConfigurationStore;

  aircraftStore: AircraftStore;

  fixStore: FixStore;

  constructor({
    configurationStore,
    aircraftStore,
    fixStore,
  }: {
    configurationStore: ConfigurationStore,
    aircraftStore: AircraftStore,
    fixStore: FixStore,
  }) {
    makeAutoObservable(this, {
      configurationStore: false,
      getControlledSector: false,
      aircraftStore: false,
      fixStore: false,
    }, { autoBind: true });
    this.configurationStore = configurationStore;
    this.aircraftStore = aircraftStore;
    this.fixStore = fixStore;
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
    return this.findCurrentSectorByCWP(currentCWP, nextConfigurationId);
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

  getCWPBySectorId(sectorId:string): string {
    const cwpName = [...this.roleConfigurations]
      .map(([index, array]) => (array.inSectorToControl(sectorId)
        ? this.roleConfigurations
          .get(index)?.cwpRoleName : undefined)).find((element) => element !== undefined);
    return cwpName ?? '';
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

  getOriginalColorOfAircraft(aircraftId: string): string {
    let flightColor = '#ffffff';
    const aircraft = this.aircraftStore.aircrafts.get(aircraftId);
    if (!aircraft) {
      return flightColor;
    }
    const listOfTentatives = this.roleConfigurations
      .get(this.configurationStore.currentCWP)?.tentativeAircrafts;
    if (this.currentControlledSector
  && aircraft.flightInSectorTimes?.get(this.currentControlledSector) !== undefined) {
      flightColor = '#009900';
    }
    if (aircraft.controlledBy === this.configurationStore.currentCWP) {
      flightColor = '#78e251';
    }
    if (listOfTentatives?.includes(aircraftId)) {
      flightColor = '#ff00ff';
    } else if (aircraft.nextSectorController !== 'NS' && aircraft.nextSectorController !== aircraft.controlledBy) {
      flightColor = '#CEFCBA';
    }
    return flightColor;
  }

  get listOfFlightsInCurrentSector(): AircraftModel[] | [] {
    if (this.areaOfCurrentControlledSector !== undefined) {
      const coordinates = this.areaOfCurrentControlledSector?.map((point): Position => (
        [point.longitude, point.latitude]),
      );
      const boundsGeometry = polygon([coordinates]);
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

  get aircraftsEnteringCurrentSector(): AircraftModel[] {
    const currentSector = this.currentControlledSector;
    const listOfAircraftsInSector = this.listOfFlightsInCurrentSector;
    const listOfAircraftsEnteringSector = currentSector
      ? this.aircraftStore.aircraftsWithRecentTargetReport.map((aircraft) => {
        if (aircraft.flightInSectorTimes?.get(currentSector) !== undefined) {
          return aircraft;
        }
        return undefined;
      }) : [];
    const filteredUndefined : AircraftModel[] = [];
    for (const aircraft of listOfAircraftsEnteringSector) {
      if (aircraft !== undefined) {
        filteredUndefined.push(aircraft);
      }
    }
    const allAircrafts = [...new Set([...listOfAircraftsInSector, ...filteredUndefined])];
    return allAircrafts;
  }

  get listOfFixesInPolygon(): string[] {
    const { fixes } = this.fixStore;
    if (this.areaOfCurrentControlledSector !== undefined) {
      const coordinates = this.areaOfCurrentControlledSector.map((point): Position => (
        [point.longitude, point.latitude]),
      );
      const boundsGeometry = polygon([coordinates]);
      const temporaryFixes: string[] = [];
      for (const fix of fixes) {
        const position: Position = [fix[1].longitude, fix[1].latitude];
        const bool = booleanPointInPolygon(position, boundsGeometry);
        if (bool) {
          temporaryFixes.push(fix[0]);
        }
      }
      temporaryFixes.sort();
      return temporaryFixes;
    }
    return [];
  }
}
