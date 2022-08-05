import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import ConfigurationModel from './ConfigurationModel';
import ConfigurationTime from './ConfigurationTime';
import convertTimestamp from './convertTimestamp';
import CoordinatePair from './CoordinatePair';
import SectorModel from './SectorModel';
import TimeConfigurations from './TimeConfigurations';
import type {
  AirspaceAvailabilityMessage, AvailabilityIntervalsMessage, CurrentAirspaceConfigurationMessage, NewAirspaceConfigurationMessage,
} from '../proto/ProtobufAirTrafficSimulator';
import type AirspaceStore from './AirspaceStore';

export default class ConfigurationStore {
  currentConfigurationId = '';

  configurations: ObservableMap<string, ConfigurationModel> = observable.map();

  configurationPlan: ObservableMap<string, ConfigurationTime> = observable.map();

  airspaceStore: AirspaceStore;

  currentCWP = '';

  constructor({
    airspaceStore,
  }: {
    airspaceStore: AirspaceStore,
  }) {
    makeAutoObservable(this, {
      airspaceStore: false,
    }, { autoBind: true });
    this.airspaceStore = airspaceStore;
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
      if (this.configurations.get(configId)
        ?.includedAirspaces.has(includedAirspace.volumeId)) {
        // eslint-disable-next-line no-console
        console.trace('TODO updating');
      } else {
        const sectorArea = this.airspaceStore
          .getAreaFromId(includedAirspace.volumeId)
          ?.airspaceArea?.map((area) => new CoordinatePair({
            latitude: area.latitude,
            longitude: area.longitude,
          })) ?? [];
        const sectorId = includedAirspace.volumeId;
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
    console.log(configMessage.currentAirspaceConfiguration);
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
    for (const timeInterval of timeIntervals) {
      if (!timeInterval.starttime) {
        throw new Error('Missing start time');
      }
      if (!timeInterval.endttime) {
        throw new Error('Missing end time');
      }

      if (this.configurationPlan.has(objectId)) {
        this.configurationPlan.get(objectId)?.handleAvailabilityIntervalsMessage(newAvailabilitymessage);
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

  get edgesPolygon(): [number, number][] {
    const edges = this.configurations.get(this.currentConfigurationId)?.edges;
    if (!edges) {
      return [];
    }
    return edges.map((edge) => ([edge.longitude, edge.latitude]));
  }

  get sortedConfigurationPlan(): ConfigurationTime[] {
    const sortedList = [...this.configurationPlan.values()]; // .sort();
    // TODO #93: implement the sorting algorithm
    // .sort() uses the string representation of the objects to sort by default,
    // in this case, [object Object] for every object in the map.
    // It wasn't sorting anything.
    // One must add a function to .sort() to sort correctly.
    return sortedList;
  }
}
