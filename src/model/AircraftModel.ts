import type { ObservableMap } from "mobx";
import { action, computed, makeObservable, observable } from "mobx";
import type { Timestamp } from "../proto/google/protobuf/timestamp";
import type {
	FlightEnteringAirspaceMessage,
	FlightMilestonePositionMessage,
	NewFlightMessage,
	TargetReportMessage,
} from "../proto/ProtobufAirTrafficSimulator";
import { WakeTurbulenceCategory } from "../proto/ProtobufAirTrafficSimulator";
import type AircraftInfo from "./AircraftInfo";
import type AircraftType from "./AircraftType";
import convertTimestamp from "./convertTimestamp";
import FlightInSectorModel from "./FlightInSectorModel";
import type FlightRoute from "./FlightRoute";
import type SectorStore from "./SectorStore";
import type SimulatorStore from "./SimulatorStore";
import type Trajectory from "./Trajectory";

/** Represents the next sector the aircraft will enter, with the trajectory point where it happens */
export interface NextSectorInfo {
	/** The sector ID */
	sectorId: string;
	/** The trajectory point where the aircraft enters the next sector */
	trajectoryPoint: Trajectory;
}

function convertToFlightMeters(alt: number): number {
	const feet = alt * 3.280_84;
	return feet / 100;
}

function convertMSToKnots(speed: number): number {
	return speed * 1.943_844_492_440_6;
}

export default class AircraftModel {
	aircraftId: string;

	assignedFlightId: string;

	callSign: string;

	lastKnownLongitude = 0;

	lastKnownLatitude = 0;

	lastKnownAltitude = 0;

	lastKnownBearing = 0;

	lastKnownSpeed = 0;

	lastKnownVerticalSpeed = 0;

	arrivalAirport: string;

	departureAirport: string;

	lastTargetReportTime = 0;

	controlledBy = "OTHER";

	nextSectorController = "NS";

	milestoneTargetTimestamp = 0;

	milestoneTargetObjectId: string | undefined;

	assignedFlightLevel = "FL.S";

	assignedBearing: number | undefined;

	assignedSpeed: number | undefined;

	/** Explicitly set next sector flight level (raw value), or undefined if derived from trajectory */
	manualNextSectorFL: number | undefined = undefined;

	nextACCFL = "COO";

	/** Whether the nextACCFL value is currently flashing (recently changed) */
	isNextACCFLFlashing = false;

	/** Timeout handle for clearing the flash state (not observable) */
	private nextACCFLFlashTimeout: ReturnType<typeof setTimeout> | null = null;

	localAssignedFlightLevel = "";

	aircraftInfo: ObservableMap<string, AircraftInfo>;

	aircraftTypes: ObservableMap<string, AircraftType>;

	flightRoutes: ObservableMap<string, FlightRoute>;

	sectorStore: SectorStore;

	flightInSectorTimes: ObservableMap<string, FlightInSectorModel> =
		observable.map(undefined, { deep: false });

	simulatorStore: SimulatorStore;

	positionHistory: Array<{ lat: number; lon: number }> = [];

	transponderCode = "";

	currentTime = "";

	routeWaypoints: Array<{ sector: string; level: string }> = [];

	frequency = "";

	flightLevelPilotRequest: string | boolean = false;

	bearingPilotRequest: string | boolean = false;

	/** Whether the aircraft has been "degreased" (acknowledged). Once true, popup text is no longer bold. */
	degreased = false;

	constructor({
		aircraftId,
		assignedFlightId,
		callSign,
		arrivalAirport,
		departureAirport,
		aircraftInfo,
		aircraftTypes,
		flightRoutes,
		sectorStore,
		simulatorStore,
	}: {
		aircraftId: string;
		assignedFlightId: string;
		callSign: string;
		arrivalAirport: string;
		departureAirport: string;
		aircraftInfo: ObservableMap<string, AircraftInfo>;
		aircraftTypes: ObservableMap<string, AircraftType>;
		flightRoutes: ObservableMap<string, FlightRoute>;
		sectorStore: SectorStore;
		simulatorStore: SimulatorStore;
	}) {
		makeObservable(this, {
			aircraftId: false,
			assignedFlightId: false,
			callSign: false,
			milestoneTargetTimestamp: false,
			aircraftInfo: false,
			aircraftTypes: false,
			flightRoutes: false,
			sectorStore: false,
			simulatorStore: false,
			flightInSectorTimes: observable,
			lastKnownLongitude: observable,
			lastKnownLatitude: observable,
			lastKnownAltitude: observable,
			lastKnownBearing: observable,
			lastKnownSpeed: observable,
			lastKnownVerticalSpeed: observable,
			arrivalAirport: observable,
			departureAirport: observable,
			controlledBy: observable,
			nextSectorController: observable,
			milestoneTargetObjectId: observable,
			assignedFlightLevel: observable,
			assignedBearing: observable,
			assignedSpeed: observable,
			localAssignedFlightLevel: observable,
			manualNextSectorFL: observable,
			nextACCFL: observable,
			isNextACCFLFlashing: observable,
			positionHistory: observable,
			transponderCode: observable,
			currentTime: observable,
			routeWaypoints: observable,
			frequency: observable,
			degreased: observable,

			nextFix: computed,
			nextNav: computed,
			nextSectorInfo: computed,
			nextSector: computed,
			nextSectorExitPoint: computed,
			nextSectorFL: computed,
			aircraftType: computed,
			wakeTurbulenceCategory: computed,
			speedAndWakeTurbulenceLabel: computed,

			handleTargetReport: action.bound,
			handleTargetMilestone: action.bound,
			setController: action.bound,
			setAssignedFlightLevel: action.bound,
			setNextSectorController: action.bound,
			setAssignedBearing: action.bound,
			setAssignedSpeed: action.bound,
			setLocalAssignedFlightLevel: action.bound,
			setNextSectorFL: action.bound,
			setNextACCFL: action.bound,
			degrease: action.bound,
		});

		this.aircraftId = aircraftId;
		this.assignedFlightId = assignedFlightId;
		this.callSign = callSign;
		this.arrivalAirport = arrivalAirport;
		this.departureAirport = departureAirport;
		this.aircraftInfo = aircraftInfo;
		this.aircraftTypes = aircraftTypes;
		this.flightRoutes = flightRoutes;
		this.sectorStore = sectorStore;
		this.simulatorStore = simulatorStore;
	}

	handleTargetReport(targetReport: TargetReportMessage): void {
		// Ignore target reports that are older than the previous one
		// This is because MQTT doesn't guarantie the order of the received messages
		// We could use a MQTT broker that is a message queue with an order, like RabbitMQ
		const {
			time,
			altitude,
			latitude,
			longitude,
			bearing,
			speed,
			verticalSpeed,
		} = targetReport;
		if (!time) {
			throw new Error("Missing time in target report message");
		}
		const timestamp = convertTimestamp(time);
		if (timestamp < this.lastTargetReportTime) {
			return;
		}
		this.lastTargetReportTime = timestamp;
		const altitudeInFlightMeters = convertToFlightMeters(altitude);
		if (altitudeInFlightMeters !== this.lastKnownAltitude) {
			this.lastKnownAltitude = altitudeInFlightMeters;
		}
		if (latitude !== this.lastKnownLatitude) {
			this.lastKnownLatitude = latitude;
			this.positionHistory.unshift({ lat: latitude, lon: longitude });
			if (this.positionHistory.length > 8) {
				this.positionHistory.pop();
			}
		}
		if (longitude !== this.lastKnownLongitude) {
			this.lastKnownLongitude = longitude;
		}

		// Round because we had a lot of invisible updates
		const roundedBearing = Math.round(bearing * 10) / 10;
		if (roundedBearing !== this.lastKnownBearing) {
			this.lastKnownBearing = roundedBearing;
		}
		if (speed !== this.lastKnownSpeed) {
			this.lastKnownSpeed = speed;
		}
		// verticalSpeed may be NaN or missing, default to 0
		const safeVerticalSpeed = Number.isNaN(verticalSpeed) ? 0 : verticalSpeed;
		if (safeVerticalSpeed !== this.lastKnownVerticalSpeed) {
			this.lastKnownVerticalSpeed = safeVerticalSpeed;
		}
	}

	handleTargetMilestone(milestone: FlightMilestonePositionMessage): void {
		const { timeStampSent, position } = milestone;
		if (!timeStampSent) {
			throw new Error("Missing timeStampSent in flight milestone message");
		}
		const timestamp = convertTimestamp(timeStampSent);
		if (timestamp < this.milestoneTargetTimestamp) {
			// Ignore older milestones
			return;
		}
		this.milestoneTargetTimestamp = timestamp;
		if (position) {
			this.milestoneTargetObjectId = position.objectId;
		}
	}

	setController(controller: string): void {
		this.controlledBy = controller;
	}

	get nextFix(): string {
		const simulatorTimestamp = this.simulatorStore.timestamp;
		if (
			this.milestoneTargetObjectId &&
			this.milestoneTargetTimestamp >= simulatorTimestamp
		) {
			return this.milestoneTargetObjectId;
		}

		return this.arrivalAirport ?? "UNKNOWN";
	}

	/**
	 * Returns the next navigation point (waypoint) that the aircraft will pass.
	 * This is the first future trajectory point that has a name (objectId).
	 */
	get nextNav(): string {
		const flightRoute = this.flightRoutes.get(this.assignedFlightId);
		if (!flightRoute || flightRoute.trajectory.length === 0) {
			return this.arrivalAirport ?? "UNKNOWN";
		}

		const currentTime = this.simulatorStore.timestamp;
		const trajectories = flightRoute.trajectory;

		// Find the first future trajectory point with a name
		const nextNavPoint = trajectories.find(
			(t) => t.timestamp >= currentTime && t.objectId,
		);

		if (nextNavPoint?.objectId) {
			return nextNavPoint.objectId;
		}

		return this.arrivalAirport ?? "UNKNOWN";
	}

	/**
	 * Returns the next sector info the aircraft will enter based on its trajectory.
	 * Iterates through the flight route waypoints, finds the sector for each,
	 * and returns the first sector that differs from the current sector,
	 * along with the trajectory point where it enters that sector.
	 *
	 * The logic looks at the waypoint just before the current time to determine
	 * the "current" sector, then finds the first waypoint in a different sector.
	 */
	get nextSectorInfo(): NextSectorInfo | undefined {
		const flightRoute = this.flightRoutes.get(this.assignedFlightId);
		if (!flightRoute || flightRoute.trajectory.length === 0) {
			return undefined;
		}

		const currentTime = this.simulatorStore.timestamp;
		const trajectories = flightRoute.trajectory;

		// Find the current sector by looking at the position before or at current time
		// We need to determine what sector the aircraft is currently in
		const currentSector = this.sectorStore.findSector(
			this.lastKnownLongitude,
			this.lastKnownLatitude,
		);
		const currentSectorId = currentSector?.sectorId;

		// Find the first future waypoint index (after current time)
		const firstFutureIndex = trajectories.findIndex(
			(t) => t.timestamp >= currentTime,
		);

		// If all waypoints are in the past, no next sector
		if (firstFutureIndex === -1) {
			return undefined;
		}

		// Iterate through future waypoints and find the first one in a different sector
		for (let i = firstFutureIndex; i < trajectories.length; i++) {
			const waypoint = trajectories[i];
			const waypointSector = this.sectorStore.findSector(
				waypoint.trajectoryCoordinate.longitude,
				waypoint.trajectoryCoordinate.latitude,
			);

			if (waypointSector && waypointSector.sectorId !== currentSectorId) {
				return {
					sectorId: waypointSector.sectorId,
					trajectoryPoint: waypoint,
				};
			}
		}

		return undefined;
	}

	/**
	 * Returns the next sector ID the aircraft will enter.
	 * This is a convenience accessor that extracts just the sector ID from nextSectorInfo.
	 */
	get nextSector(): string | undefined {
		return this.nextSectorInfo?.sectorId;
	}

	/**
	 * Returns the exit point name for the current sector (i.e., where the aircraft will exit to the next sector).
	 * Priority:
	 * 1. exitWaypointId from MQTT (FlightEnteringAirspaceMessage) for the current sector
	 * 2. objectId from the nextSectorInfo trajectory point
	 * 3. First named trajectory point after the sector entry point
	 */
	get nextSectorExitPoint(): string | undefined {
		// First, try to get exitWaypointId from MQTT message for the current sector
		const currentSector = this.sectorStore.findSector(
			this.lastKnownLongitude,
			this.lastKnownLatitude,
		);
		if (currentSector) {
			const flightInSector = this.flightInSectorTimes.get(
				currentSector.sectorId,
			);
			if (flightInSector?.exitWaypointId) {
				return flightInSector.exitWaypointId;
			}
		}

		// Fallback: use nextSectorInfo trajectory point
		const info = this.nextSectorInfo;
		if (!info) {
			return undefined;
		}

		// If the entry point to the next sector has an ID, use it
		if (info.trajectoryPoint.objectId) {
			return info.trajectoryPoint.objectId;
		}

		// Otherwise, find the next trajectory point after the entry point that has an ID
		const flightRoute = this.flightRoutes.get(this.assignedFlightId);
		if (!flightRoute || flightRoute.trajectory.length === 0) {
			return undefined;
		}

		const entryTimestamp = info.trajectoryPoint.timestamp;
		const trajectories = flightRoute.trajectory;

		// Find the first trajectory point after the entry point that has an objectId
		const nextNamedPoint = trajectories.find(
			(t) => t.timestamp > entryTimestamp && t.objectId,
		);

		return nextNamedPoint?.objectId;
	}

	/**
	 * Returns the flight level for the next sector as a display string.
	 * If manually set, returns the manual value divided by 10 and rounded.
	 * Otherwise, derives it from the trajectory point's altitude at sector entry.
	 * The division by 10 is per app specifications for display.
	 */
	get nextSectorFL(): string {
		// If manually set, return the manual value divided by 10 and rounded
		if (this.manualNextSectorFL !== undefined) {
			return Math.round(this.manualNextSectorFL / 10).toString();
		}

		// Derive from trajectory point altitude
		const info = this.nextSectorInfo;
		if (info) {
			const altitude = info.trajectoryPoint.trajectoryCoordinate.altitude;
			if (altitude !== undefined && altitude > 0) {
				// Convert meters to flight level (altitude in meters -> feet / 100)
				// Then divide by 10 for display per app specifications
				const flightLevel = (altitude * 3.28084) / 100;
				return Math.round(flightLevel / 10).toString();
			}
		}

		return "NSFL";
	}

	get aircraftType(): string {
		const aircraftInfo = this.aircraftInfo.get(this.aircraftId);
		return aircraftInfo?.aircraftType ?? "";
	}

	handleNewFlightUpdate(newFlight: NewFlightMessage): void {
		const { flightUniqueId, callSign, arrivalAirport, departureAirport } =
			newFlight;

		this.assignedFlightId = flightUniqueId;
		this.callSign = callSign;
		this.arrivalAirport = arrivalAirport;
		this.departureAirport = departureAirport;
	}

	get wakeTurbulenceCategory(): WakeTurbulenceCategory {
		const aircraftInfo = this.aircraftInfo.get(this.aircraftId);
		if (!aircraftInfo) {
			return WakeTurbulenceCategory.WTC_UNKNOWN;
		}

		const { wakeTurbulenceCategory } = aircraftInfo;

		if (wakeTurbulenceCategory !== WakeTurbulenceCategory.WTC_UNKNOWN) {
			return wakeTurbulenceCategory;
		}

		const { aircraftType } = aircraftInfo;
		const aircraftTypeInfo = this.aircraftTypes.get(aircraftType);
		if (!aircraftTypeInfo) {
			return WakeTurbulenceCategory.WTC_UNKNOWN;
		}

		return aircraftTypeInfo.wakeTurbulenceCategory;
	}

	get speedAndWakeTurbulenceLabel(): string {
		const { wakeTurbulenceCategory, lastKnownSpeed } = this;
		const speed = Math.floor(convertMSToKnots(lastKnownSpeed));

		switch (wakeTurbulenceCategory) {
			case WakeTurbulenceCategory.WTC_LIGHT:
				return `L${speed}`;
			case WakeTurbulenceCategory.LOWER_MEDIUM:
			case WakeTurbulenceCategory.UPPER_MEDIUM:
				return `M${speed}`;
			case WakeTurbulenceCategory.LOWER_HEAVY:
			case WakeTurbulenceCategory.UPPER_HEAVY:
			case WakeTurbulenceCategory.JUMBO:
			case WakeTurbulenceCategory.WTC_ALL:
				return `H${speed}`;
			case WakeTurbulenceCategory.WTC_UNKNOWN:
				return `${speed}`;
			default:
				return `${speed}`;
		}
	}
	get last8positions(): Array<{ lat: number; lon: number }> {
		return this.positionHistory;
	}

	handleSectorInFlightMessage(message: FlightEnteringAirspaceMessage): void {
		const {
			sectorId,
			entryPosition,
			exitPosition,
			entryWaypointId,
			exitWaypointId,
		} = message;
		const flightInSector = new FlightInSectorModel({
			sectorId,
			entryPosition,
			exitPosition,
			entryWaypointId,
			exitWaypointId,
		});
		const listsSectorHasFlight = this.flightInSectorTimes;
		if (listsSectorHasFlight) {
			for (const element of listsSectorHasFlight) {
				if (element[1].sectorId === sectorId) {
					element[1] = flightInSector;
					return;
				}
				if (
					element[1]?.entryPosition?.time &&
					entryPosition?.time &&
					element[1]?.entryPosition?.time < entryPosition?.time
				) {
					listsSectorHasFlight.delete(element[0]);
				}
			}
			listsSectorHasFlight.set(sectorId, flightInSector);
		}
	}

	isEnteringFlight(controlledSector: string): boolean {
		const flightEntering = this.flightInSectorTimes.get(controlledSector);
		let flightEnteringTime: Timestamp | undefined;
		if (flightEntering) {
			flightEnteringTime = flightEntering.entryPosition?.time;
		}
		if (
			flightEntering &&
			flightEnteringTime &&
			convertTimestamp(flightEnteringTime) >= this.simulatorStore.timestamp
		) {
			return true;
		}
		return false;
	}

	setAssignedFlightLevel(assignedFlightLevel: string): void {
		this.assignedFlightLevel = assignedFlightLevel;
	}

	setAssignedBearing(assignedBearing: number): void {
		this.assignedBearing = assignedBearing === -1 ? undefined : assignedBearing;
	}

	setAssignedSpeed(assignedSpeed: number): void {
		this.assignedSpeed = assignedSpeed === -1 ? undefined : assignedSpeed;
	}

	setLocalAssignedFlightLevel(localAssignedFlightLevel: string): void {
		this.localAssignedFlightLevel = localAssignedFlightLevel;
	}

	setNextSectorController(nextSectorController: string): void {
		this.nextSectorController = nextSectorController;
	}

	setNextSectorFL(nextSectorFL: string): void {
		// "NSFL" is the default/unset value - clear manual setting to use derived value
		if (nextSectorFL === "NSFL") {
			this.manualNextSectorFL = undefined;
		} else {
			const parsed = Number.parseInt(nextSectorFL, 10);
			this.manualNextSectorFL = Number.isNaN(parsed) ? undefined : parsed;
		}
	}

	setNextACCFL(nextACCFL: string): void {
		const hasChanged = this.nextACCFL !== nextACCFL;
		this.nextACCFL = nextACCFL;

		if (hasChanged) {
			// Clear any existing flash timeout
			if (this.nextACCFLFlashTimeout) {
				clearTimeout(this.nextACCFLFlashTimeout);
			}
			// Start flashing
			this.isNextACCFLFlashing = true;
			// Stop flashing after 1 second
			this.nextACCFLFlashTimeout = setTimeout(() => {
				this.isNextACCFLFlashing = false;
			}, 1000);
		}
	}

	setPilotRequestFlightLevel(request: string): void {
		this.flightLevelPilotRequest = request;
	}

	setPilotRequestedBearing(bearing: string): void {
		this.bearingPilotRequest = bearing;
	}

	/** Mark this aircraft as degreased. Only goes from false to true, never back. */
	degrease(): void {
		this.degreased = true;
	}
}
