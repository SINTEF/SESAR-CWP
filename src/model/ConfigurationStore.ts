import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import ConfigurationModel from './ConfigurationModel';
import ConfigurationTime from './ConfigurationTime';
import convertTimestamp from './convertTimestamp';
import CoordinatePair from './CoordinatePair';
import SectorModel from './SectorModel';
import TimeConfigurations from './TimeConfigurations';
import type {
  AirspaceAvailabilityMessage, AvailabilityIntervalsMessage,
  CurrentAirspaceConfigurationMessage, NewAirspaceConfigurationMessage,
} from '../proto/ProtobufAirTrafficSimulator';
import type AirspaceStore from './AirspaceStore';
import type SimulatorStore from './SimulatorStore';

export default class ConfigurationStore {
  currentConfigurationId = '';

  configurations: ObservableMap<string, ConfigurationModel> = observable.map();

  configurationPlan: ObservableMap<string, ConfigurationTime> = observable.map();

  airspaceStore: AirspaceStore;

  simulatorStore: SimulatorStore;

  currentCWP = '';

  nextConfigurationId = '';

  constructor({
    airspaceStore,
    simulatorStore,
  }: {
    airspaceStore: AirspaceStore,
    simulatorStore: SimulatorStore,
  }) {
    makeAutoObservable(this, {
      airspaceStore: false,
      simulatorStore: false,
      getAreaOfIncludedAirpaces: false,
    }, { autoBind: true });
    this.airspaceStore = airspaceStore;
    this.simulatorStore = simulatorStore;
    this.getAreaOfIncludedAirpaces = this.getAreaOfIncludedAirpaces.bind(this);
  }

  handleNewAirspaceConfiguration(newConfig: NewAirspaceConfigurationMessage): void {
    const configId = newConfig.configurationId;
    const newEdges = newConfig.area.map((area) => {
      if (area.position.oneofKind !== 'position4D') {
        throw new Error('Insupported position type');
      }
      return new CoordinatePair({
        latitude: area.position.position4D.latitude,
        longitude: area.position.position4D.longitude,
      });
    });
    const configuration = new ConfigurationModel({
      configurationId: configId,
      edges: newEdges,
      // includedAirspaces: setIncludedAirspaces,
    });
    this.configurations.set(configId, configuration);

    for (const includedAirspace of newConfig.includedAirspaceVolumes) {
      const sectorId = includedAirspace.volumeId;
      const sectorArea = this.airspaceStore
        .getAreaFromId(sectorId)
        ?.sectorArea?.map((area) => new CoordinatePair({
          latitude: area.latitude,
          longitude: area.longitude,
        })) ?? [];
      const existingIncludedAirspace = configuration.includedAirspaces.get(sectorId);
      if (existingIncludedAirspace) {
        existingIncludedAirspace.updateSectorArea(sectorArea);
        existingIncludedAirspace.updateFlightLevels(
          includedAirspace.bottomFlightLevel,
          includedAirspace.topFlightLevel,
        );
      } else {
        configuration.includedAirspaces.set(
          sectorId,
          new SectorModel({
            sectorId,
            bottomFlightLevel: includedAirspace.bottomFlightLevel,
            topFlightLevel: includedAirspace.topFlightLevel,
            sectorArea,
          }));
      }
    }
  }

  setCurrentConfiguration(configMessage: CurrentAirspaceConfigurationMessage): void {
    this.currentConfigurationId = configMessage.currentAirspaceConfiguration;
  }

  setCurrentConfigFromString(configuration: string): void {
    this.currentConfigurationId = configuration;
  }

  toggleConfiguration(nextConfig: string): string {
    const previousConfig = this.currentConfigurationId;
    this.setCurrentConfigFromString(nextConfig);
    return previousConfig;
  }

  setCurrentCWP(controllerValue: string): void {
    this.currentCWP = controllerValue;
  }

  setNextConfigurationId = (nextConfig: string): void => {
    this.nextConfigurationId = nextConfig;
  };

  handleAvailabilityMessage(newAvailabilitymessage: AirspaceAvailabilityMessage): void {
    const { airspaceId, startTime, endTime } = newAvailabilitymessage;
    if (!startTime) {
      throw new Error('Missing start time');
    }
    if (!endTime) {
      throw new Error('Missing end time');
    }

    if (this.configurationPlan.has(airspaceId)) {
      this.configurationPlan.get(airspaceId)?.handleAvailabilityMessage(newAvailabilitymessage);
    } else {
      const interval = [new TimeConfigurations({
        startTime: convertTimestamp(startTime),
        endTime: convertTimestamp(endTime),
      })];
      this.configurationPlan.set(airspaceId, new ConfigurationTime({
        configurationId: airspaceId,
        timeIntervals: interval,
      }));
    }
  }

  handleAvailabilityIntervalsMessage(newAvailabilitymessage: AvailabilityIntervalsMessage): void {
    const { objectId, timeIntervals } = newAvailabilitymessage;

    const timeIntervalsArray: TimeConfigurations[] = [];
    if (this.configurationPlan.has(objectId)) {
      this.configurationPlan.get(objectId)
        ?.handleAvailabilityIntervalsMessage(newAvailabilitymessage);
    } else {
      for (const timeInterval of timeIntervals) {
        if (!timeInterval.starttime) {
          throw new Error('Missing start time');
        }
        if (!timeInterval.endttime) {
          throw new Error('Missing end time');
        }

        {
          const interval = new TimeConfigurations({
            startTime: convertTimestamp(timeInterval.starttime),
            endTime: convertTimestamp(timeInterval.endttime),
          });
          timeIntervalsArray.push(interval);
        }
      }
      this.configurationPlan.set(objectId, new ConfigurationTime({
        configurationId: objectId,
        timeIntervals: timeIntervalsArray,
      }));
    }
  }

  getAreaOfIncludedAirpaces(configuration: string): [string, SectorModel][] {
    const config = this.configurations.get(configuration)?.includedAirspaces;
    if (!config) {
      return [];
    }

    return [...config].filter(([sectorId]) => this.airspaceStore.existIn(sectorId));
  }

  get areaOfIncludedAirspaces(): [string, SectorModel][] {
    return this.getAreaOfIncludedAirpaces(this.currentConfigurationId);
  }

  get areaOfIncludedAirspacesNext(): [string, SectorModel][] {
    return this.getAreaOfIncludedAirpaces(this.nextConfigurationId);
  }

  get edgesPolygon(): [number, number][] {
    const edges = this.configurations.get(this.currentConfigurationId)?.edges;
    if (!edges) {
      return [];
    }
    return edges.map((edge) => ([edge.longitude, edge.latitude]));
  }

  get sortedConfigurationPlan(): ConfigurationTime[] {
    const listOfConfigurations = [...this.configurationPlan.values()];
    const sortedList = listOfConfigurations.map((element) => {
      const innerIntervalSort = [...element.timeIntervals]
        .sort((a, b) => a.startTime - b.startTime);

      this.setIntervals(element.configurationId, innerIntervalSort);
      return element;
    });
    return sortedList;
  }

  get listOfIntervals(): [string, number, number][] {
    const sortedList = this.sortedConfigurationPlan;
    const simulatorTime = this.simulatorStore.timestamp;
    const listOfIntervals: [string, number, number][] = [];
    for (const element of sortedList) {
      for (const intervals of element.timeIntervals) {
        const startTimeInterval = intervals.startTime;
        const endTimeInterval = intervals.endTime;
        if (startTimeInterval >= simulatorTime || endTimeInterval >= simulatorTime) {
          listOfIntervals.push([element.configurationId, startTimeInterval, endTimeInterval]);
        }
      }
    }
    listOfIntervals
      .sort((a, b) => a[1] - b[1]);
    return listOfIntervals;
  }

  setIntervals(configuration: string, timeIntervals: TimeConfigurations[]): void {
    this.configurationPlan.set(configuration, new ConfigurationTime({
      configurationId: configuration,
      timeIntervals,
    }));
  }
}
