import { bbox, bboxPolygon, buffer, polygon } from "@turf/turf";
import type { Feature, Polygon } from "geojson";
import { makeAutoObservable, observable } from "mobx";
import type { ObservableMap } from "mobx";

import ConfigurationModel from "./ConfigurationModel";
import ConfigurationTime from "./ConfigurationTime";
import convertTimestamp from "./convertTimestamp";
import { ShowNextConfiguration } from "./CwpStore";
import TimeConfigurations from "./TimeConfigurations";
import type {
	AirspaceAvailabilityMessage,
	AvailabilityIntervalsMessage,
	AvailabilitySchedule,
	CurrentAirspaceConfigurationMessage,
	NewAirspaceConfigurationMessage,
} from "../proto/ProtobufAirTrafficSimulator";
import type AircraftModel from "./AircraftModel";
import type AircraftStore from "./AircraftStore";
import type AirspaceStore from "./AirspaceStore";
import type CWPStore from "./CwpStore";
import type { IConfigurationTime } from "./IConfigurationTime";
import type { ISectorModel } from "./ISectorModel";
import type SimulatorStore from "./SimulatorStore";

export default class ConfigurationStore {
	currentConfigurationId = "";

	configurations: ObservableMap<string, ConfigurationModel> = observable.map(
		undefined,
		{ deep: false },
	);

	configurationPlan: ObservableMap<string, ConfigurationTime> = observable.map(
		undefined,
		{ deep: false },
	);

	aircraftStore: AircraftStore;

	airspaceStore: AirspaceStore;

	simulatorStore: SimulatorStore;

	cwpStore: CWPStore;

	currentCWP = "";

	constructor({
		aircraftStore,
		airspaceStore,
		simulatorStore,
		cwpStore,
	}: {
		aircraftStore: AircraftStore;
		airspaceStore: AirspaceStore;
		simulatorStore: SimulatorStore;
		cwpStore: CWPStore;
	}) {
		makeAutoObservable(
			this,
			{
				aircraftStore: false,
				airspaceStore: false,
				simulatorStore: false,
				cwpStore: false,
			},
			{ autoBind: true },
		);
		this.aircraftStore = aircraftStore;
		this.airspaceStore = airspaceStore;
		this.simulatorStore = simulatorStore;
		this.cwpStore = cwpStore;
	}

	handleNewAirspaceConfiguration(
		newConfiguration: NewAirspaceConfigurationMessage,
	): void {
		const model = ConfigurationModel.fromProto(newConfiguration);
		this.configurations.set(model.configurationId, model);
	}

	setCurrentConfiguration(
		configMessage: CurrentAirspaceConfigurationMessage,
	): void {
		this.currentConfigurationId = configMessage.currentAirspaceConfiguration;
	}

	setCurrentConfigFromString(configuration: string): void {
		this.currentConfigurationId = configuration;
	}

	setCurrentCWP(controllerValue: string): void {
		this.currentCWP = controllerValue;
	}

	handleAvailabilityMessage(
		newAvailabilitymessage: AirspaceAvailabilityMessage,
	): void {
		const { airspaceId, startTime, endTime } = newAvailabilitymessage;
		if (!startTime) {
			throw new Error("Missing start time");
		}
		if (!endTime) {
			throw new Error("Missing end time");
		}

		if (this.configurationPlan.has(airspaceId)) {
			this.configurationPlan
				.get(airspaceId)
				?.handleAvailabilityMessage(newAvailabilitymessage);
		} else {
			const interval = [
				new TimeConfigurations({
					startTime: convertTimestamp(startTime),
					endTime: convertTimestamp(endTime),
				}),
			];
			this.configurationPlan.set(
				airspaceId,
				new ConfigurationTime({
					configurationId: airspaceId,
					timeIntervals: interval,
				}),
			);
		}
	}

	handleAvailabilityIntervalsMessage(
		newAvailabilityMessage: AvailabilityIntervalsMessage,
	): void {
		const { objectId, timeIntervals } = newAvailabilityMessage;
		const timeIntervalsArray: TimeConfigurations[] = [];
		for (const timeInterval of timeIntervals) {
			if (!timeInterval.starttime) {
				throw new Error("Missing start time");
			}
			if (!timeInterval.endttime) {
				throw new Error("Missing end time");
			}

			const existingConfigurationPlan = this.configurationPlan.get(objectId);

			if (existingConfigurationPlan) {
				existingConfigurationPlan.handleAvailabilityIntervalsMessage(
					newAvailabilityMessage,
				);
			} else {
				const interval = new TimeConfigurations({
					startTime: convertTimestamp(timeInterval.starttime),
					endTime: convertTimestamp(timeInterval.endttime),
				});
				timeIntervalsArray.push(interval);
				this.configurationPlan.set(
					objectId,
					new ConfigurationTime({
						configurationId: objectId,
						timeIntervals: timeIntervalsArray,
					}),
				);
			}
		}
	}

	handleAvailabilityScheduleMessage(
		newAvailabilitySchedule: AvailabilitySchedule,
	): void {
		this.configurationPlan.clear();
		for (const availabilityMessage of newAvailabilitySchedule.availabilityIntervals) {
			const { objectId, timeIntervals } = availabilityMessage;
			const timeIntervalsArray: TimeConfigurations[] = [];
			for (const timeInterval of timeIntervals) {
				if (!timeInterval.starttime) {
					throw new Error("Missing start time");
				}
				if (!timeInterval.endttime) {
					throw new Error("Missing end time");
				}

				const existingConfigurationPlan = this.configurationPlan.get(objectId);

				if (existingConfigurationPlan) {
					existingConfigurationPlan.handleAvailabilityIntervalsMessage(
						availabilityMessage,
					);
				} else {
					const interval = new TimeConfigurations({
						startTime: convertTimestamp(timeInterval.starttime),
						endTime: convertTimestamp(timeInterval.endttime),
					});
					timeIntervalsArray.push(interval);
					this.configurationPlan.set(
						objectId,
						new ConfigurationTime({
							configurationId: objectId,
							timeIntervals: timeIntervalsArray,
						}),
					);
				}
			}
		}
	}

	getAreaOfIncludedAirpaces(configurationId: string): ISectorModel[] {
		const configuration = this.configurations.get(configurationId);
		// Force the mobx update whenever the airspaces change size (new airspaces are received)
		this.airspaceStore.airspaces.size;
		if (!configuration) {
			return [];
		}
		const { includedAirspaces } = configuration;
		const references = [...includedAirspaces.values()];
		const areas = references
			.map((reference): ISectorModel | undefined => {
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
			})
			.filter((area): area is ISectorModel => area !== undefined);

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
		return this.getAreaOfIncludedAirpaces(nextConfigurationId);
	}

	get areaOfAirspacesToDisplay(): ISectorModel[] {
		if (this.shouldShowNextConfiguration) {
			return this.areaOfIncludedAirspacesForNextConfiguration;
		}
		return this.areaOfIncludedAirspaces;
	}

	get edgesPolygon(): [number, number][] {
		const edges = this.configurations.get(this.currentConfigurationId)?.edges;
		if (!edges) {
			return [];
		}
		return edges.map((edge) => [edge.longitude, edge.latitude]);
	}

	get edgesBounds():
		| {
				minLat: number;
				maxLat: number;
				minLon: number;
				maxLon: number;
		  }
		| undefined {
		const edges = this.edgesPolygon;
		if (edges.length === 0) {
			return undefined;
		}
		const turfFeature = this.edgesTurfFeature;
		if (!turfFeature) {
			return undefined;
		}
		// use turf to calculate the bounds
		const bounds = bbox(turfFeature);

		return {
			minLat: bounds[1],
			maxLat: bounds[3],
			minLon: bounds[0],
			maxLon: bounds[2],
		};
	}

	get extendedEdgesBounds():
		| {
				minLat: number;
				maxLat: number;
				minLon: number;
				maxLon: number;
		  }
		| undefined {
		const bounds = this.edgesBounds;
		if (!bounds) {
			return undefined;
		}

		const bufferedPolygon = buffer(
			bboxPolygon([
				bounds.minLon,
				bounds.minLat,
				bounds.maxLon,
				bounds.maxLat,
			]),
			60,
			{ units: "kilometers" },
		);
		
		// buffer can return undefined for invalid geometries
		if (!bufferedPolygon) {
			return bounds;
		}
		
		const extendedBounds = bbox(bufferedPolygon);

		return {
			minLat: extendedBounds[1],
			maxLat: extendedBounds[3],
			minLon: extendedBounds[0],
			maxLon: extendedBounds[2],
		};
	}

	get edgesTurfFeature(): Feature<Polygon> | undefined {
		const { edgesPolygon } = this;
		if (edgesPolygon?.length === 0) {
			return undefined;
		}
		return polygon([[...edgesPolygon, edgesPolygon[0]]]);
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
			},
		);

		sortedList.sort(
			(a, b) => a.timeIntervals[0].startTime - b.timeIntervals[0].startTime,
		);

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
				const listElement: [string, number, number] = [
					element.configurationId,
					startTimeInterval,
					endTimeInterval,
				];
				if (
					(startTimeInterval >= simulatorTime ||
						endTimeInterval >= simulatorTime) &&
					!JSON.stringify(listOfIntervals).includes(JSON.stringify(listElement))
				) {
					listOfIntervals.push(listElement);
				}
			}
		}
		listOfIntervals.sort((a, b) => a[1] - b[1]);
		return listOfIntervals;
	}

	get nextConfiguration(): [string, number, number] | undefined {
		const { listOfIntervals } = this;
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

	get shouldShowNextConfiguration(): boolean {
		const { showNextSectorsConfiguration } = this.cwpStore;
		if (showNextSectorsConfiguration === ShowNextConfiguration.On) {
			return true;
		}
		if (showNextSectorsConfiguration === ShowNextConfiguration.Off) {
			return false;
		}
		const { timeToNextConfiguration } = this;

		if (
			// Blink 3 times when less than 10 minutes
			(timeToNextConfiguration >= 590 && timeToNextConfiguration <= 600) ||
			// Blink 3 times when less than 5 minutes
			(timeToNextConfiguration >= 290 && timeToNextConfiguration <= 300) ||
			// Blink 5 times when less than 2 minutes
			(timeToNextConfiguration >= 102 && timeToNextConfiguration <= 120) ||
			// Blink 5 times when less than 20 seconds
			(timeToNextConfiguration >= 2 && timeToNextConfiguration <= 20)
		) {
			// switch between true and false every 2 seconds
			return Math.ceil(timeToNextConfiguration / 2) % 2 === 0;
		}

		return false;
	}

	get aircraftsWithinExtendedEdges(): AircraftModel[] {
		const bounds = this.extendedEdgesBounds;
		const aircrafts = this.aircraftStore.aircraftsWithPosition;

		if (!bounds) {
			return aircrafts;
		}

		return aircrafts.filter(
			(aircraft) =>
				aircraft.lastKnownLatitude >= bounds.minLat &&
				aircraft.lastKnownLatitude <= bounds.maxLat &&
				aircraft.lastKnownLongitude >= bounds.minLon &&
				aircraft.lastKnownLongitude <= bounds.maxLon,
		);
	}
}
