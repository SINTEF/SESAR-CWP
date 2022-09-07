import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import ConfigurationModel from './ConfigurationModel';
import ConfigurationTime from './ConfigurationTime';
import convertTimestamp from './convertTimestamp';
import TimeConfigurations from './TimeConfigurations';
import type {
  AirspaceAvailabilityMessage, AvailabilityIntervalsMessage,
  CurrentAirspaceConfigurationMessage, NewAirspaceConfigurationMessage,
} from '../proto/ProtobufAirTrafficSimulator';
import type AirspaceStore from './AirspaceStore';
import type { IConfigurationTime } from './IConfigurationTime';
import type { ISectorModel } from './ISectorModel';
import type SimulatorStore from './SimulatorStore';

export default class ConfigurationStore {
  currentConfigurationId = '';

  configurations: ObservableMap<string, ConfigurationModel> = observable.map();

  configurationPlan: ObservableMap<string, ConfigurationTime> = observable.map();

  airspaceStore: AirspaceStore;

  simulatorStore: SimulatorStore;

  currentCWP = '';

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
    }, { autoBind: true });
    this.airspaceStore = airspaceStore;
    this.simulatorStore = simulatorStore;
  }

  handleNewAirspaceConfiguration(newConfiguration: NewAirspaceConfigurationMessage): void {
    const model = ConfigurationModel.fromProto(newConfiguration);
    // console.log(model.configurationId);
    this.configurations.set(model.configurationId, model);
  }

  setCurrentConfiguration(configMessage: CurrentAirspaceConfigurationMessage): void {
    this.currentConfigurationId = configMessage.currentAirspaceConfiguration;
  }

  setCurrentConfigFromString(configuration: string): void {
    this.currentConfigurationId = configuration;
  }

  toggleConfiguration(): void {
    const { currentConfigurationId, listOfIntervals } = this;
    const [firstConfiguration, secondConfiguration] = listOfIntervals;

    // Do not toggle if the configuration is invalid
    if (!firstConfiguration || !secondConfiguration) {
      return;
    }

    if (firstConfiguration[0] === currentConfigurationId) {
      this.setCurrentConfigFromString(secondConfiguration[0]);
    } else {
      this.setCurrentConfigFromString(firstConfiguration[0]);
    }
  }

  setCurrentCWP(controllerValue: string): void {
    this.currentCWP = controllerValue;
  }

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

  handleAvailabilityIntervalsMessage(newAvailabilityMessage: AvailabilityIntervalsMessage): void {
    const { objectId, timeIntervals } = newAvailabilityMessage;
    const timeIntervalsArray: TimeConfigurations[] = [];
    for (const timeInterval of timeIntervals) {
      if (!timeInterval.starttime) {
        throw new Error('Missing start time');
      }
      if (!timeInterval.endttime) {
        throw new Error('Missing end time');
      }

      const existingConfigurationPlan = this.configurationPlan.get(objectId);

      if (existingConfigurationPlan) {
        existingConfigurationPlan.handleAvailabilityIntervalsMessage(newAvailabilityMessage);
      } else {
        const interval = new TimeConfigurations({
          startTime: convertTimestamp(timeInterval.starttime),
          endTime: convertTimestamp(timeInterval.endttime),
        });
        timeIntervalsArray.push(interval);
        this.configurationPlan.set(objectId, new ConfigurationTime({
          configurationId: objectId,
          timeIntervals: timeIntervalsArray,
        }));
      }
    }
  }

  private getAreaOfIncludedAirpaces(configurationId: string): ISectorModel[] {
    const configuration = this.configurations.get(configurationId);
    // Force the mobx update whenever the airspaces change size (new airspaces are received)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.airspaceStore.airspaces.size;
    if (!configuration) {
      return [];
    }
    const { includedAirspaces } = configuration;
    const references = [...includedAirspaces.values()];
    const areas = references.map((reference): ISectorModel | undefined => {
      const { volumeId, bottomFlightLevel, topFlightLevel } = reference;
      const airspace = this.airspaceStore.getAreaFromId(volumeId);
      if (!airspace) {
        // Probably not received yet
        return undefined;
      }
      return {
        sectorId: volumeId,
        bottomFlightLevel,
        topFlightLevel,
        sectorArea: [...airspace.sectorArea],
      };
    }).filter((area): area is ISectorModel => area !== undefined);

    return areas;
  }

  get areaOfIncludedAirspaces(): ISectorModel[] {
    return this.getAreaOfIncludedAirpaces(this.currentConfigurationId);
  }

  get areaOfIncludedAirspacesForNextConfiguration(): ISectorModel[] {
    const { nextConfigurationId } = this;
    if (!nextConfigurationId) {
      return [];
    }
    // console.log(this.currentConfigurationId, nextConfigurationId);
    return this.getAreaOfIncludedAirpaces(nextConfigurationId);
  }

  get edgesPolygon(): [number, number][] {
    const edges = this.configurations.get(this.currentConfigurationId)?.edges;
    if (!edges) {
      return [];
    }
    return edges.map((edge) => ([edge.longitude, edge.latitude]));
  }

  get sortedConfigurationPlan(): IConfigurationTime[] {
    const listOfConfigurations = [...this.configurationPlan.values()];
    const sortedList = listOfConfigurations.map(
      ({ configurationId, timeIntervals }) => {
        const sortedTimeIntervals = [...timeIntervals];
        sortedTimeIntervals.sort((a, b) => a.startTime - b.startTime);
        return {
          configurationId,
          timeIntervals: sortedTimeIntervals,
        };
      });

    sortedList
      .sort((a, b) => a.timeIntervals[0].startTime - b.timeIntervals[0].startTime);

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
    return listOfIntervals;
  }

  get nextConfiguration(): [string, number, number] | undefined {
    const { listOfIntervals } = this;
    // console.log([...listOfIntervals]);
    return listOfIntervals[1];
  }

  get nextConfigurationId(): string | undefined {
    const { nextConfiguration } = this;
    return nextConfiguration?.[0];
  }

  get timeToNextConfiguration(): number {
    const { nextConfiguration, simulatorStore } = this;
    if (!nextConfiguration) {
      return Number.MAX_SAFE_INTEGER;
    }
    const nextConfigStartTime = nextConfiguration[1];
    const { timestamp } = simulatorStore;
    return Math.floor(nextConfigStartTime - timestamp);
  }
}
