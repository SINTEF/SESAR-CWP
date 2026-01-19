import { bbox } from "@turf/bbox";
import { bboxPolygon } from "@turf/bbox-polygon";
import { buffer } from "@turf/buffer";
import { polygon } from "@turf/helpers";
import type { Feature, Polygon } from "geojson";
import type { ObservableMap } from "mobx";
import { makeAutoObservable, observable, reaction } from "mobx";
import posthog from "posthog-js";
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
import ConfigurationModel from "./ConfigurationModel";
import ConfigurationTime from "./ConfigurationTime";
import type CWPStore from "./CwpStore";
import { ShowNextConfiguration } from "./CwpStore";
import convertTimestamp from "./convertTimestamp";
import type { IConfigurationTime } from "./IConfigurationTime";
import type { ISectorModel } from "./ISectorModel";
import type SimulatorStore from "./SimulatorStore";
import TimeConfigurations from "./TimeConfigurations";

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

	/** Tracks aircraft IDs currently within extended edges for lifecycle events */
	private trackedAircraftIds: Set<string> = new Set();

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

		// Setup aircraft lifecycle tracking
		this.setupAircraftLifecycleTracking();
	}

	/**
	 * Setup MobX reaction to track aircraft entering and leaving the visible area
	 * Fires PostHog events with GPS coordinates for analytics
	 */
	private setupAircraftLifecycleTracking(): void {
		reaction(
			() => this.aircraftsWithinExtendedEdges.map((a) => a.aircraftId),
			(currentIds) => {
				const currentIdSet = new Set(currentIds);

				// Detect aircraft that entered the view
				for (const id of currentIds) {
					if (!this.trackedAircraftIds.has(id)) {
						const aircraft = this.aircraftsWithinExtendedEdges.find(
							(a) => a.aircraftId === id,
						);
						if (aircraft) {
							this.captureAircraftEnteredEvent(aircraft);
						}
					}
				}

				// Detect aircraft that left the view
				for (const id of this.trackedAircraftIds) {
					if (!currentIdSet.has(id)) {
						// Aircraft has left - find it in the full aircraft store before it's gone
						const aircraft = this.aircraftStore.aircrafts.get(id);
						if (aircraft) {
							this.captureAircraftLeftEvent(aircraft);
						}
					}
				}

				// Update tracked set
				this.trackedAircraftIds = currentIdSet;
			},
		);
	}

	/**
	 * Capture PostHog event when aircraft enters the visible area with valid coordinates
	 */
	private captureAircraftEnteredEvent(aircraft: AircraftModel): void {
		posthog.capture("aircraft_entered_view", {
			aircraftId: aircraft.aircraftId,
			callSign: aircraft.callSign,
			latitude: aircraft.lastKnownLatitude,
			longitude: aircraft.lastKnownLongitude,
			altitude: aircraft.lastKnownAltitude,
			departureAirport: aircraft.departureAirport,
			arrivalAirport: aircraft.arrivalAirport,
		});
	}

	/**
	 * Capture PostHog event when aircraft leaves the visible area
	 */
	private captureAircraftLeftEvent(aircraft: AircraftModel): void {
		posthog.capture("aircraft_left_view", {
			aircraftId: aircraft.aircraftId,
			callSign: aircraft.callSign,
			lastLatitude: aircraft.lastKnownLatitude,
			lastLongitude: aircraft.lastKnownLongitude,
			lastAltitude: aircraft.lastKnownAltitude,
		});
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
				// const airspace = this.airspaceStore.getAreaFromId(volumeId);
				// console.log(airspace, "airspace");
				// if (!airspace) {
				// 	// Probably not received yet
				// 	return undefined;
				// }
				return {
					sectorId: volumeId,
					bottomFlightLevel,
					topFlightLevel,
					sectorArea: [], // MISSING
				};
			})
			.filter((area): area is ISectorModel => area !== undefined);

		return areas;
	}

	get areaOfIncludedAirspaces(): ISectorModel[] {
		return this.getAreaOfIncludedAirpaces(this.currentConfigurationId);
	}

	/** Returns the flight level bounds for the current configuration, or undefined if none */
	get currentConfigurationFlightLevelBounds():
		| { minFlightLevel: number; maxFlightLevel: number }
		| undefined {
		const configuration = this.configurations.get(this.currentConfigurationId);
		if (!configuration) {
			return undefined;
		}
		return {
			minFlightLevel: configuration.minFlightLevel,
			maxFlightLevel: configuration.maxFlightLevel,
		};
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
			bboxPolygon([bounds.minLon, bounds.minLat, bounds.maxLon, bounds.maxLat]),
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
