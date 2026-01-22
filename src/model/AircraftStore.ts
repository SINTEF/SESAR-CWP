import * as Sentry from "@sentry/react";
import type { ObservableMap } from "mobx";
import { makeAutoObservable, observable } from "mobx";
import type {
	FlightConflictUpdateMessage,
	FlightEnteringAirspaceMessage,
	FlightMilestonePositionMessage,
	FlightRouteMessage,
	NewAircraftMessage,
	NewAircraftTypeMessage,
	NewFlightMessage,
	PositionAtObject,
	TargetReportMessage,
} from "../proto/ProtobufAirTrafficSimulator";
import { PlanningStage } from "../proto/ProtobufAirTrafficSimulator";
import type { PilotRequestJson } from "../schemas/pilotRequestSchema";
import AircraftInfo from "./AircraftInfo";
import AircraftModel from "./AircraftModel";
import AircraftType from "./AircraftType";
import CoordinatePair from "./CoordinatePair";
import convertTimestamp from "./convertTimestamp";
import type DatablockStore from "./DatablockStore";
import { createPairKey } from "./DatablockStore";
import FlightRoute from "./FlightRoute";
import type SectorStore from "./SectorStore";
import type SimulatorStore from "./SimulatorStore";
import Trajectory from "./Trajectory";

export default class AircraftStore {
	aircrafts: ObservableMap<string, AircraftModel> = observable.map(undefined, {
		deep: false,
	});

	aircraftInfo: ObservableMap<string, AircraftInfo> = observable.map(
		undefined,
		{ deep: false },
	);

	aircraftTypes: ObservableMap<string, AircraftType> = observable.map(
		undefined,
		{ deep: false },
	);

	flightRoutes: ObservableMap<string, FlightRoute> = observable.map(undefined, {
		deep: false,
	});

	hiddenFlights: Set<string> = observable.set(undefined, { deep: false });

	simulatorStore: SimulatorStore;

	sectorStore: SectorStore;

	stcaConflictIds: ObservableMap<string, FlightConflictUpdateMessage> =
		observable.map(undefined, {
			deep: false,
		});

	mtcdConflictIds: ObservableMap<string, FlightConflictUpdateMessage> =
		observable.map(undefined, {
			deep: false,
		});

	tctConflictIds: ObservableMap<string, FlightConflictUpdateMessage> =
		observable.map(undefined, {
			deep: false,
		});

	/**
	 * Team assistant requests stored with flightId as key.
	 * Uses snake_case JSON format from IIS.
	 * Each aircraft can have multiple requests (stored as an array).
	 */
	teamAssistantRequests: ObservableMap<string, TeamAssistantRequest[]> =
		observable.map(undefined, {
			deep: false,
		});

	/** Optional reference to DatablockStore for MTCD override logic */
	private datablockStore: DatablockStore | null = null;

	constructor({
		simulatorStore,
		sectorStore,
	}: {
		simulatorStore: SimulatorStore;
		sectorStore: SectorStore;
	}) {
		makeAutoObservable(
			this,
			{
				simulatorStore: false,
				sectorStore: false,
			},
			{ autoBind: true },
		);
		this.simulatorStore = simulatorStore;
		this.sectorStore = sectorStore;
	}

	/**
	 * Set the DatablockStore reference for MTCD override logic.
	 * Called after both stores are initialized to avoid circular dependency.
	 */
	setDatablockStore(datablockStore: DatablockStore): void {
		this.datablockStore = datablockStore;
	}

	get notHiddenAircrafts(): AircraftModel[] {
		return [...this.aircrafts.values()].filter(
			({ aircraftId }) => !this.hiddenFlights.has(aircraftId),
		);
	}

	get aircraftsWithRecentTargetReport(): AircraftModel[] {
		const timestamp = this.simulatorStore.minuteRoundedTimestamp;
		return this.notHiddenAircrafts.filter(
			({ lastTargetReportTime }) =>
				// Remove aircrafts with target reports older than 10 minutes
				// But keep the ones with no target report time because reasons
				timestamp - lastTargetReportTime < 600 || lastTargetReportTime === 0,
		);
	}

	get aircraftsWithPosition(): AircraftModel[] {
		return this.aircraftsWithRecentTargetReport.filter(
			({ lastKnownLongitude }) => lastKnownLongitude !== 0,
		);
	}

	handleNewFlight(newFlight: NewFlightMessage): void {
		const id = newFlight.aircraftId;
		const aircraft = this.aircrafts.get(id);
		if (aircraft) {
			aircraft.handleNewFlightUpdate(newFlight);
		} else {
			this.aircrafts.set(
				id,
				new AircraftModel({
					aircraftId: id,
					assignedFlightId: newFlight.flightUniqueId,
					callSign: newFlight.callSign,
					arrivalAirport: newFlight.arrivalAirport,
					departureAirport: newFlight.departureAirport,
					aircraftInfo: this.aircraftInfo,
					aircraftTypes: this.aircraftTypes,
					flightRoutes: this.flightRoutes,
					sectorStore: this.sectorStore,
					simulatorStore: this.simulatorStore,
				}),
			);
		}
	}

	handleTargetReport(targetReport: TargetReportMessage): void {
		const { vehicleId } = targetReport;
		const aircraft = this.aircrafts.get(vehicleId);
		if (!aircraft) {
			// eslint-disable-next-line no-console
			// console.warn('Received target report for unknown aircraft', vehicleId);
			return;
		}
		aircraft.handleTargetReport(targetReport);
	}

	handleNewAircraftMessage(newAircraftMessage: NewAircraftMessage): void {
		const { aircraftId, wakeTurbulenceCategory, aircraftType } =
			newAircraftMessage;
		const aircraftInfo = this.aircraftInfo.get(aircraftId);
		if (aircraftInfo) {
			aircraftInfo.setWakeTurbulenceCategory(wakeTurbulenceCategory);
		} else {
			this.aircraftInfo.set(
				aircraftId,
				new AircraftInfo({
					aircraftId,
					aircraftType,
					wakeTurbulenceCategory,
				}),
			);
		}
	}

	handleNewFlightRoute(route: FlightRouteMessage): void {
		const id = route.flightUniqueId;

		// It seems that the trajectory list is ordered, and each time a positionAtObject is sent,
		// It is immediately followed by a position4D. We merge them together for simplicity
		let previousPositionObject: PositionAtObject | undefined;

		const trajectories =
			route.route?.trajectory
				?.map((area) => {
					let position4d;
					if (area.position.oneofKind === "position4D") {
						position4d = area.position.position4D;
					} else if (area.position.oneofKind === "positionAtObject") {
						previousPositionObject = area.position.positionAtObject;
						return undefined;
					} else {
						throw new Error("No position4d or positionatobject");
					}

					const { time, latitude, longitude, altitude } = position4d;
					if (!time) {
						throw new Error("Missing time in flight route message position4d");
					}
					const timestamp = convertTimestamp(time);

					let objectId: string | undefined;
					if (previousPositionObject && previousPositionObject.time) {
						const previousTimestamp = convertTimestamp(
							previousPositionObject.time,
						);
						if (timestamp === previousTimestamp) {
							({ objectId } = previousPositionObject);
						}
					}

					const trajectory = new Trajectory({
						trajectoryCoordinate: new CoordinatePair({
							latitude,
							longitude,
							altitude,
						}),
						timestamp,
						objectId,
					});
					previousPositionObject = undefined;
					return trajectory;
				})
				?.filter(
					(trajectory): trajectory is Trajectory => trajectory !== undefined,
				) ?? [];

		this.flightRoutes.set(
			id,
			new FlightRoute({
				flightId: id,
				trajectory: trajectories,
			}),
		);
	}

	handleFlightNewMilestonePositions(
		milestone: FlightMilestonePositionMessage,
	): void {
		const { planningStage } = milestone;

		if (planningStage === PlanningStage.TARGET) {
			const { flightUniqueId } = milestone;

			// find the aircraft in the this.aircrafts map with
			// an assignedFlightId matching the flightUniqueId
			let aircraft;
			for (const potentialAircraft of this.aircrafts.values()) {
				if (potentialAircraft.assignedFlightId === flightUniqueId) {
					aircraft = potentialAircraft;
					break;
				}
			}

			if (!aircraft) {
				// biome-ignore lint/suspicious/noConsole: needed for now
				console.warn(
					"Received milestone position for unknown aircraft",
					flightUniqueId,
				);
				Sentry.captureMessage(
					`Received milestone position for unknown aircraft: ${flightUniqueId}`,
					"warning",
				);
				return;
			}

			aircraft.handleTargetMilestone(milestone);
		}
	}

	handleNewSectorInFlightMessage(
		flightEnteringAirspaceMessage: FlightEnteringAirspaceMessage,
	): void {
		const { flightUniqueId } = flightEnteringAirspaceMessage;
		const aircraft = this.aircrafts.get(flightUniqueId);
		if (!aircraft) {
			// biome-ignore lint/suspicious/noConsole: needed for now
			console.warn(
				"Received sector in flight message for unknown aircraft",
				flightUniqueId,
			);
			Sentry.captureMessage(
				`Received sector in flight message for unknown aircraft: ${flightUniqueId}`,
				"warning",
			);
			return;
		}
		aircraft.handleSectorInFlightMessage(flightEnteringAirspaceMessage);
	}

	handleNewAircraftTypeMessage(
		newAircraftTypeMessage: NewAircraftTypeMessage,
	): void {
		const aircraftType = AircraftType.fromProto(newAircraftTypeMessage);
		this.aircraftTypes.set(aircraftType.vehicleTypeId, aircraftType);
	}

	handleFrontendFlightController(flightId: string, controller: string): void {
		this.aircrafts.get(flightId)?.setController(controller);
	}

	handleFrontendACCFlightLevel(flightId: string, flightLevel: string): void {
		this.aircrafts.get(flightId)?.setNextACCFL(flightLevel);
	}

	handleFrontendNextSectorFlightLevel(
		flightId: string,
		flightLevel: string,
	): void {
		this.aircrafts.get(flightId)?.setNextSectorFL(flightLevel);
	}

	handleFrontendACCBearing(flightId: string, bearing: number): void {
		this.aircrafts.get(flightId)?.setAssignedBearing(bearing);
	}

	handleFrontendAssignedFlightLevel(
		flightId: string,
		flightLevel: string,
	): void {
		this.aircrafts.get(flightId)?.setAssignedFlightLevel(flightLevel);
	}

	handleFrontendSpeed(flightId: string, speed: number): void {
		this.aircrafts.get(flightId)?.setAssignedSpeed(speed);
	}

	handleFrontendLocalAssignedFlightLevel(
		flightId: string,
		flightLevel: string,
	): void {
		this.aircrafts.get(flightId)?.setLocalAssignedFlightLevel(flightLevel);
	}

	handleFrontendFlightHidden(aircraftId: string, hidden: boolean): void {
		if (hidden) {
			this.hiddenFlights.add(aircraftId);
		} else {
			this.hiddenFlights.delete(aircraftId);
		}
	}

	handleNewConflictMessage(
		flightConflictUpdate: FlightConflictUpdateMessage,
	): void {
		const flight1 = flightConflictUpdate.flightId;
		const flight2 = flightConflictUpdate.conflictingFlightId;
		if (!flight1 || !flight2) {
			return;
		}
		switch (flightConflictUpdate.conflictUpdate) {
			case 0: // New Conflict
			case 1: // Update conflict
				switch (flightConflictUpdate.conflictType) {
					case 0: // STCA Conflict
						this.stcaConflictIds.set(
							flightConflictUpdate.id.toString(),
							flightConflictUpdate,
						);
						break;
					case 1: // TCT Conflict
						this.tctConflictIds.set(
							flightConflictUpdate.id.toString(),
							flightConflictUpdate,
						);
						break;
					case 3: // MTCD Conflict (Severe)
					case 4: // MTCD Conflict (Potential)
						this.mtcdConflictIds.set(
							flightConflictUpdate.id.toString(),
							flightConflictUpdate,
						);
						// Remove any custom datablock for this pair (MTCD takes priority)
						if (this.datablockStore) {
							const pairKey = createPairKey(
								flightConflictUpdate.flightId,
								flightConflictUpdate.conflictingFlightId,
							);
							this.datablockStore.removeByPairKey(pairKey);
						}
						break;
					default:
						// Handle unexpected conflictType values
						break;
				}
				break;

			case 2: // Conflict cleared
				switch (flightConflictUpdate.conflictType) {
					case 0: // STCA Conflict cleared
						this.stcaConflictIds.delete(flightConflictUpdate.id.toString());
						break;
					case 1: // TCT Conflict
						this.tctConflictIds.delete(flightConflictUpdate.id.toString());
						break;
					case 3: // MTCD Conflict (MTCDInputSevere)
					case 4: // MTCD Conflict (MTCDInputPotential)
						this.mtcdConflictIds.delete(flightConflictUpdate.id.toString());
						break;
					default:
						// Handle unexpected conflictType values
						break;
				}
				break;
			default:
				// Handle unexpected conflictUpdate values
				break;
		}
	}

	// Helper extractors for conflict maps that currently store FlightConflictUpdateMessage objects
	private conflictSetHasFlight(
		map: ObservableMap<string, FlightConflictUpdateMessage>,
		flightId: string,
	): boolean {
		for (const msg of map.values()) {
			if (msg.flightId === flightId || msg.conflictingFlightId === flightId) {
				return true;
			}
		}
		return false;
	}

	hasStcaConflict(flightId: string): boolean {
		return this.conflictSetHasFlight(this.stcaConflictIds, flightId);
	}
	hasTctConflict(flightId: string): boolean {
		return this.conflictSetHasFlight(this.tctConflictIds, flightId);
	}
	hasMtcdConflict(flightId: string): boolean {
		return this.conflictSetHasFlight(this.mtcdConflictIds, flightId);
	}

	getMtcdConflictFlightIds(): string[] {
		const ids = new Set<string>();
		for (const msg of this.mtcdConflictIds.values()) {
			if (msg.flightId) {
				ids.add(msg.flightId);
			}
			if (msg.conflictingFlightId) {
				ids.add(msg.conflictingFlightId);
			}
		}
		return [...ids];
	}

	/**
	 * Check if a pair of aircraft has an MTCD conflict.
	 */
	hasMtcdConflictForPair(id1: string, id2: string): boolean {
		for (const msg of this.mtcdConflictIds.values()) {
			if (
				(msg.flightId === id1 && msg.conflictingFlightId === id2) ||
				(msg.flightId === id2 && msg.conflictingFlightId === id1)
			) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Find the nearest aircraft to a screen position within a pixel threshold
	 * @param mouseScreenX Screen X coordinate in pixels
	 * @param mouseScreenY Screen Y coordinate in pixels
	 * @param maxDistancePixels Maximum distance in pixels to consider
	 * @param mapViewportStore MapViewportStore for coordinate projection
	 * @param excludeAircraftId Optional aircraft ID to exclude from search
	 * @returns Nearest aircraft info or null if none found within threshold
	 */
	findNearestAircraftInScreenSpace(
		mouseScreenX: number,
		mouseScreenY: number,
		maxDistancePixels: number,
		mapViewportStore: {
			projectPosition: (
				lat: number,
				lng: number,
			) => { x: number; y: number } | null;
		},
		excludeAircraftId?: string | null,
	): { aircraftId: string; position: [number, number] } | null {
		let nearestAircraft: {
			aircraftId: string;
			position: [number, number];
		} | null = null;
		let minDistance = maxDistancePixels;

		for (const aircraft of this.aircraftsWithPosition) {
			// Skip the excluded aircraft (typically the source aircraft)
			if (excludeAircraftId && aircraft.aircraftId === excludeAircraftId) {
				continue;
			}

			// Project aircraft position to screen coordinates
			const screenPos = mapViewportStore.projectPosition(
				aircraft.lastKnownLatitude,
				aircraft.lastKnownLongitude,
			);

			// Skip if projection failed (aircraft off-screen)
			if (!screenPos) {
				continue;
			}

			// Calculate pixel distance using Euclidean distance
			const dx = screenPos.x - mouseScreenX;
			const dy = screenPos.y - mouseScreenY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Track closest aircraft within threshold
			if (distance < minDistance) {
				minDistance = distance;
				nearestAircraft = {
					aircraftId: aircraft.aircraftId,
					position: [aircraft.lastKnownLongitude, aircraft.lastKnownLatitude],
				};
			}
		}

		return nearestAircraft;
	}

	// =========================================================================
	// Team Assistant Request Methods
	// =========================================================================

	/**
	 * Get all requests for an aircraft.
	 * Returns an array of requests, sorted by timestamp (newest first).
	 */
	getRequestsForAircraft(flightId: string): TeamAssistantRequest[] {
		const requests = this.teamAssistantRequests.get(flightId) ?? [];
		// Sort by timestamp (newest first)
		return [...requests].sort((a, b) => {
			const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
			const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
			return timeB - timeA;
		});
	}

	/**
	 * Get the first (most recent) request for an aircraft.
	 */
	getFirstRequestForAircraft(
		flightId: string,
	): TeamAssistantRequest | undefined {
		return this.getRequestsForAircraft(flightId)[0];
	}

	/**
	 * Add a team assistant request from JSON (snake_case format).
	 * Key is the flightId - each aircraft can have multiple requests.
	 * If a request with the same requestId exists, it will be updated.
	 */
	setTeamAssistantRequest(
		flightId: string,
		requestId: string,
		request: PilotRequestJson,
	): void {
		const teamAssistantRequest: TeamAssistantRequest = {
			...request,
			flightId,
			requestId,
		};

		const existingRequests = this.teamAssistantRequests.get(flightId) ?? [];
		// Check if request with same ID exists and update it, otherwise add
		const existingIndex = existingRequests.findIndex(
			(r) => r.requestId === requestId,
		);

		if (existingIndex >= 0) {
			existingRequests[existingIndex] = teamAssistantRequest;
			this.teamAssistantRequests.set(flightId, [...existingRequests]);
		} else {
			this.teamAssistantRequests.set(flightId, [
				...existingRequests,
				teamAssistantRequest,
			]);
		}
	}

	/**
	 * Remove a specific team assistant request by requestId.
	 * If no requestId provided, removes all requests for the aircraft.
	 */
	removeTeamAssistantRequest(flightId: string, requestId?: string): void {
		if (!requestId) {
			this.teamAssistantRequests.delete(flightId);
			return;
		}

		const existingRequests = this.teamAssistantRequests.get(flightId) ?? [];
		const filtered = existingRequests.filter((r) => r.requestId !== requestId);

		if (filtered.length === 0) {
			this.teamAssistantRequests.delete(flightId);
		} else {
			this.teamAssistantRequests.set(flightId, filtered);
		}
	}

	/**
	 * Check if an aircraft has any team assistant requests.
	 */
	hasTeamAssistantRequests(flightId: string): boolean {
		const requests = this.teamAssistantRequests.get(flightId);
		return requests !== undefined && requests.length > 0;
	}
}

/**
 * Team Assistant Request type using snake_case JSON format (from IIS).
 * Extends PilotRequestJson with flightId and requestId for storage.
 */
export interface TeamAssistantRequest extends PilotRequestJson {
	flightId: string;
	requestId: string;
}
