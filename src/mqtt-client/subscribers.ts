import * as Sentry from "@sentry/react";
import posthog from "posthog-js";
import {
	AirspaceAvailabilityMessage,
	AirTrafficControllerAssignmentMessage,
	AirwaysMessage,
	// AvailabilityIntervalsMessage,
	AvailabilitySchedule,
	ClearedFlightLevelMessage,
	CurrentAirspaceConfigurationMessage,
	ExitFlightLevelMessage,
	FlightConflictUpdateMessage,
	FlightEnteringAirspaceMessage,
	FlightMilestonePositionMessage,
	FlightRouteMessage,
	FrequenciesMessage,
	InitialisationCompleted,
	NewAirBlockMessage,
	NewAircraftMessage,
	NewAircraftTypeMessage,
	NewAirspaceConfigurationMessage,
	NewAirspaceMessage,
	NewFlightMessage,
	NewPointMessage,
	NewSectorMessage,
	PilotRequestMessage,
	PlanningStage,
	RoleConfigurationMessage,
	SimulatorTime,
	TargetReportMessage,
} from "../proto/ProtobufAirTrafficSimulator";
import {
	FrontendManualAPMessageSchema,
	FrontendPredictiveTrajectoryStateMessageSchema,
	ISAUpdateMessageSchema,
	PilotRequestFinishedMessageSchema,
	PilotRequestReplyMessageSchema,
	WorkloadUpdateMessageSchema,
} from "../schemas/mqttSubscriberSchemas";
import { PilotRequestJsonSchema } from "../schemas/pilotRequestSchema";
import {
	adminStore,
	airblockStore,
	aircraftStore,
	airspaceStore,
	airwaysStore,
	brainStore,
	configurationStore,
	fixStore,
	frequenciesStore,
	roleConfigurationStore,
	sectorStore,
	simulatorStore,
} from "../state";

let lastStartupScenario: string | null = null;
const latestPresenceBySession = new Map<string, string>();

export function notFound(
	_parameters: unknown,
	message: Buffer,
	url: string,
): void {
	// biome-ignore lint:  no-console
	console.warn(
		"MQTT message received but no matching route found",
		url,
		message,
	);
	Sentry.captureMessage(`MQTT route not found: ${url}`, "warning");
}

export function ignored(): void {}

export function targetReport(_parameters: unknown, message: Buffer): void {
	const protoMessage = TargetReportMessage.fromBinary(message);
	aircraftStore.handleTargetReport(protoMessage);
}

export function newFlight(_parameters: unknown, message: Buffer): void {
	const protoMessage = NewFlightMessage.fromBinary(message);
	aircraftStore.handleNewFlight(protoMessage);
}

export function newAirspaceConfiguration(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = NewAirspaceConfigurationMessage.fromBinary(message);
	configurationStore.handleNewAirspaceConfiguration(protoMessage);
}
export function airspaces(_parameters: unknown, message: Buffer): void {
	const protoMessage = NewAirspaceMessage.fromBinary(message);
	airspaceStore.handleNewAirspace(protoMessage);
}
export function newSector(_parameters: unknown, message: Buffer): void {
	const protoMessage = NewSectorMessage.fromBinary(message);
	sectorStore.handleNewSector(protoMessage);
}
export function airblocks(_parameters: unknown, message: Buffer): void {
	const protoMessage = NewAirBlockMessage.fromBinary(message);
	airblockStore.handleNewAirBlock(protoMessage);
}
export function newPointMessage(_parameters: unknown, message: Buffer): void {
	const protoMessage = NewPointMessage.fromBinary(message);
	fixStore.handleNewPointMessage(protoMessage);
}
export function newAircraftMessage(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = NewAircraftMessage.fromBinary(message);
	aircraftStore.handleNewAircraftMessage(protoMessage);
}
export function newAircraftTypeMessage(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = NewAircraftTypeMessage.fromBinary(message);
	aircraftStore.handleNewAircraftTypeMessage(protoMessage);
}
export function currentAirspaceConfiguration(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = CurrentAirspaceConfigurationMessage.fromBinary(message);
	configurationStore.setCurrentConfiguration(protoMessage);
}
export function flightRoutes(_parameters: unknown, message: Buffer): void {
	const protoMessage = FlightRouteMessage.fromBinary(message);
	aircraftStore.handleNewFlightRoute(protoMessage);
}
export function airspaceAvailability(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = AirspaceAvailabilityMessage.fromBinary(message);
	configurationStore.handleAvailabilityMessage(protoMessage);
}

export function newSimulatorTime(_parameters: unknown, message: Buffer): void {
	const protoMessage = SimulatorTime.fromBinary(message);
	simulatorStore.handleNewSimulatorTime(protoMessage);
}

export function newFlightMilestonePositions(
	parameters: unknown,
	message: Buffer,
): void {
	const routeParams = parameters as {
		flightUniqueId?: string;
		planningStage?: string;
		milestone?: string;
	};

	try {
		const protoMessage = FlightMilestonePositionMessage.fromBinary(message);

		const routePlanningStage = routeParams.planningStage?.toLowerCase();
		let effectivePlanningStage = protoMessage.planningStage;
		if (routePlanningStage === "actual") {
			effectivePlanningStage = PlanningStage.ACTUAL;
		} else if (routePlanningStage === "target") {
			effectivePlanningStage = PlanningStage.TARGET;
		} else if (protoMessage.planningStage === PlanningStage.PLAN) {
			effectivePlanningStage = PlanningStage.TARGET;
		}

		aircraftStore.handleFlightNewMilestonePositions({
			...protoMessage,
			planningStage: effectivePlanningStage,
		});
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: temporary debugging for decode failures
		console.error("Failed to decode FlightMilestonePositionMessage", {
			routeFlightUniqueId: routeParams.flightUniqueId,
			routePlanningStage: routeParams.planningStage,
			routeMilestone: routeParams.milestone,
			payloadBytes: message.length,
			error,
		});
		Sentry.captureException(error);
	}
}
export function newAvailabilitySchedule(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = AvailabilitySchedule.fromBinary(message);
	configurationStore.handleAvailabilityScheduleMessage(protoMessage);
}
export function roleConfiguration(_parameters: unknown, message: Buffer): void {
	const protoMessage = RoleConfigurationMessage.fromBinary(message);
	roleConfigurationStore.handleNewRoleConfigutationMessage(protoMessage);
}
export function airTrafficControllerMessage(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage =
		AirTrafficControllerAssignmentMessage.fromBinary(message);
	roleConfigurationStore.handleNewAirTrafficControllerMessage(protoMessage);
}
export function flightEnteringAirspaceMessage(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = FlightEnteringAirspaceMessage.fromBinary(message);
	aircraftStore.handleNewSectorInFlightMessage(protoMessage);
}

export function exitFlightLevelMessage(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = ExitFlightLevelMessage.fromBinary(message);
	aircraftStore.handleExitFlightLevelMessage(protoMessage);
}

export function clearedFlightLevelMessage(
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = ClearedFlightLevelMessage.fromBinary(message);
	aircraftStore.handleClearedFlightLevelMessage(protoMessage);
}

export function frontendFlightController(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	const controller = message.toString();
	aircraftStore.handleFrontendFlightController(flightId, controller);
}

export function frontendACCFlightLevel(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	const level = message.toString();
	aircraftStore.handleFrontendACCFlightLevel(flightId, level);
}

export function frontendNextSectorFlightLevel(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	const level = message.toString();
	aircraftStore.handleFrontendNextSectorFlightLevel(flightId, level);
}

export function frontendACCBearing(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	const bearing = Number.parseInt(message.toString(), 10) || 0;
	aircraftStore.handleFrontendACCBearing(flightId, bearing);
}

export function frontendAssignedFlightLevel(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	const level = message.toString();
	aircraftStore.handleFrontendAssignedFlightLevel(flightId, level);
}

export function frontendSpeed(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	const speed = Number.parseInt(message.toString(), 10) || 0;
	aircraftStore.handleFrontendSpeed(flightId, speed);
}

export function frontendPredictiveTrajectoryState(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	try {
		const raw = message.toString().trim();
		if (raw.length === 0) {
			aircraftStore.handleFrontendPredictiveTrajectoryState(flightId, null);
			return;
		}

		const parsed = FrontendPredictiveTrajectoryStateMessageSchema.parse(
			JSON.parse(raw),
		);
		aircraftStore.handleFrontendPredictiveTrajectoryState(flightId, parsed);
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: error logging
		console.error("Failed to parse predictive trajectory state message", {
			flightId,
			error,
		});
		Sentry.captureException(error);
	}
}

export function frontendLocalAssignedFlightLevel(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	const level = message.toString();
	aircraftStore.handleFrontendLocalAssignedFlightLevel(flightId, level);
}

export function frontendFlightHidden(
	{ flightId }: { [key: string]: string },
	message: Buffer,
): void {
	const hidden = message.toString() === "true";
	aircraftStore.handleFrontendFlightHidden(flightId, hidden);
}

export function flightConflictMessage(
	parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = FlightConflictUpdateMessage.fromBinary(message);
	aircraftStore.handleNewConflictMessage(protoMessage);
}

export function pilotRequest(
	{ flightUniqueId, requestId }: { [key: string]: string },
	message: Buffer,
): void {
	// Empty message means delete the request (MQTT retained message clearing)
	if (message.length === 0) {
		aircraftStore.removeTeamAssistantRequest(flightUniqueId, requestId);
		posthog.capture("ta_pilot_request_removed", {
			request_id: requestId,
			flight_id: flightUniqueId,
			reason: "retained_message_cleared",
			source_format: "protobuf",
		});
		return;
	}

	try {
		const protoRequest = PilotRequestMessage.fromBinary(message);
		// Convert proto format to snake_case JSON format
		const jsonRequest = {
			timestamp: protoRequest.timestamp
				? new Date(
						Number(protoRequest.timestamp.seconds) * 1000 +
							protoRequest.timestamp.nanos / 1_000_000,
					).toISOString()
				: new Date().toISOString(),
			iteration_count: protoRequest.iterationCount,
			context: {
				request_id: protoRequest.context?.requestId ?? requestId,
				flight_id: protoRequest.context?.flightId ?? flightUniqueId,
				request_type: protoRequest.context?.requestType ?? 0,
				request_parameter: protoRequest.context?.requestParameter ?? 0,
			},
			goals: (protoRequest.goals ?? []).map((goal) => ({
				RFL: goal.rFL,
				results: goal.results
					? {
							exit_level: goal.results.exitLevel,
							initial_climb: goal.results.initialClimb,
							exit_problems_are_manageable:
								goal.results.exitProblemsAreManageable,
							traffic_complexity_manageable:
								goal.results.trafficComplexityManageable,
							required_coordinations: [],
							higher_level_available: goal.results.higherLevelAvailable,
							is_conform_to_flight_plan: goal.results.isConformToFlightPlan,
							next_sector: goal.results.nextSector,
							next_sector_capacity_ok: goal.results.nextSectorCapacityOk,
							altitude_restriction: goal.results.altitudeRestriction,
						}
					: undefined,
			})),
		};
		// Validate with Zod and store
		const validated = PilotRequestJsonSchema.parse(jsonRequest);
		aircraftStore.setTeamAssistantRequest(flightUniqueId, requestId, validated);
		posthog.capture("ta_pilot_request_received", {
			request_id: validated.context.request_id,
			flight_id: validated.context.flight_id,
			request_type: validated.context.request_type,
			goals_count: validated.goals.length,
			iteration_count: validated.iteration_count,
			source_format: "protobuf",
		});
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: error logging
		console.error("Failed to decode PilotRequestMessage:", error);
		Sentry.captureException(error);
	}
}

export function simulatorLogs(_parameters: unknown, message: Buffer): void {
	const logMessage = message.toString();
	adminStore.handleLogMessage(logMessage);
}

export function simulatorStartupConfiguration(
	_parameters: unknown,
	message: Buffer,
): void {
	const scenario = message.toString().trim();
	const normalizedScenario = scenario || null;
	adminStore.setSimulatorStartupScenario(normalizedScenario);

	if (normalizedScenario !== lastStartupScenario) {
		lastStartupScenario = normalizedScenario;
		posthog.capture("mqtt_startup_configuration_received", {
			scenario: normalizedScenario,
		});
	}
}

export function simulatorPresenceStatus(
	{ sessionUuid }: { [key: string]: string },
	message: Buffer,
): void {
	const status = message.toString().trim();
	adminStore.handlePresenceMessage(sessionUuid, status);

	const previousStatus = latestPresenceBySession.get(sessionUuid);
	if (previousStatus !== status) {
		latestPresenceBySession.set(sessionUuid, status);
		posthog.capture("mqtt_presence_status_changed", {
			session_uuid: sessionUuid,
			status,
			previous_status: previousStatus ?? null,
		});
	}
}

export function initCompleted(_parameters: unknown, message: Buffer): void {
	if (message.length === 0) {
		adminStore.handleInitialisationNotCompleted();
		posthog.capture("mqtt_initialization_status_changed", {
			status: "not_completed",
		});
		return;
	}

	try {
		const event = InitialisationCompleted.fromBinary(message);
		const completionTime = event.completionTime;
		const completedAt = completionTime
			? new Date(
					Number(completionTime.seconds) * 1000 +
						completionTime.nanos / 1_000_000,
				)
			: new Date();
		adminStore.handleInitialisationCompleted(completedAt);
		posthog.capture("mqtt_initialization_status_changed", {
			status: "completed",
			completed_at: completedAt.toISOString(),
		});
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: error logging
		console.error("Failed to decode InitialisationCompleted message:", error);
		Sentry.captureException(error);
	}
}

export function airways(_parameters: unknown, message: Buffer): void {
	const protoMessage = AirwaysMessage.fromBinary(message);
	airwaysStore.handleAirwaysMessage(protoMessage);
}

export function frequencies(_parameters: unknown, message: Buffer): void {
	const protoMessage = FrequenciesMessage.fromBinary(message);
	frequenciesStore.handleFrequenciesMessage(protoMessage);
}

/**
 * Handle JSON-based pilot request messages validated with Zod.
 * Populates teamAssistantRequests in the store.
 *
 * Message formats:
 * 1. Full pilot request: { timestamp, iteration_count, context, goals }
 * 2. Request finished/cleared: { finished: true } - used to signal request was handled
 * 3. Empty message: "" - used to clear retained MQTT message
 */
export function pilotRequestJson(
	{ requestId }: { [key: string]: string },
	message: Buffer,
): void {
	let parsedPayload: unknown;
	let validated;
	try {
		const jsonString = message.toString().trim();

		// Handle empty message (retained message cleared)
		if (jsonString.length === 0) {
			if (requestId) {
				aircraftStore.removeTeamAssistantRequestByRequestId(requestId);
				posthog.capture("ta_pilot_request_removed", {
					request_id: requestId,
					reason: "retained_message_cleared",
					source_format: "json",
				});
			}
			return;
		}

		parsedPayload = JSON.parse(jsonString);

		// Handle reply messages sent back by the CWP itself and
		// "finished" acknowledgments.
		if (PilotRequestFinishedMessageSchema.safeParse(parsedPayload).success) {
			if (requestId) {
				aircraftStore.removeTeamAssistantRequestByRequestId(requestId);
				posthog.capture("ta_pilot_request_removed", {
					request_id: requestId,
					reason: "finished",
					source_format: "json",
					received_payload: parsedPayload,
				});
			}
			return;
		}

		const parsedReply = PilotRequestReplyMessageSchema.safeParse(parsedPayload);
		if (parsedReply.success) {
			if (parsedReply.data.reply === "CLOSE" && requestId) {
				aircraftStore.removeTeamAssistantRequestByRequestId(requestId);
				posthog.capture("ta_pilot_request_removed", {
					request_id: requestId,
					reason: "close_reply",
					source_format: "json",
					received_payload: parsedPayload,
				});
			}
			return;
		}

		// Parse and validate full pilot request
		validated = PilotRequestJsonSchema.parse(parsedPayload);
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: error logging
		console.error("Failed to decode PilotRequestJson:", error);
		Sentry.captureException(error, {
			extra: {
				message: message.toString(),
				requestId,
			},
		});
		return;
	}

	aircraftStore.setTeamAssistantRequest(
		validated.context.flight_id,
		validated.context.request_id,
		validated,
	);
	posthog.capture("ta_pilot_request_received", {
		request_id: validated.context.request_id,
		flight_id: validated.context.flight_id,
		request_type: validated.context.request_type,
		goals_count: validated.goals.length,
		iteration_count: validated.iteration_count,
		source_format: "json",
		received_payload: parsedPayload,
	});
}

/**
 * Handle WorkloadUpdate messages from MQTT topic TAS/{clientId}/WorkloadUpdate
 *
 * Expected message format:
 * {
 *   "jsonrpc": "2.0",
 *   "method": "workloadUpdate",
 *   "params": {
 *     "workload": 0,
 *     "accuracy": 0.94,
 *     "timestamp": "2020-01-05 15:02:20.444"
 *   },
 *   "id": 42
 * }
 */
export function workloadUpdate(_parameters: unknown, message: Buffer): void {
	let parsedPayload: unknown;
	let parsed;
	try {
		parsedPayload = JSON.parse(message.toString());
		parsed = WorkloadUpdateMessageSchema.parse(parsedPayload);
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: Error logging for debugging
		console.error("Error parsing WorkloadUpdate message:", error);
		Sentry.captureException(error);
		return;
	}

	const { workload, accuracy, timestamp } = parsed.params;
	brainStore.updateAgentWorkload(workload, accuracy, timestamp);
	posthog.capture("ta_workload_update_received", {
		workload,
		accuracy,
		timestamp,
		task_load: brainStore.taskLoad,
		autonomy_profile: brainStore.autonomyProfile,
		number_of_assumed_flights: brainStore.numberOfAssumedFlights,
		number_of_requests: brainStore.numberOfRequests,
		number_of_conflicts: brainStore.numberOfConflicts,
		received_payload: parsedPayload,
	});
}

/**
 * Handle ISAUpdate messages from MQTT topic TAS/{clientId}/ISAUpdate
 *
 * Expected message format:
 * {
 *   "jsonrpc": "2.0",
 *   "method": "ISAUpdate",
 *   "params": {
 *     "ISA": 1,
 *     "timestamp": "2020-01-05 15:02:20.444"
 *   },
 *   "id": 42
 * }
 */
export function isaUpdate(_parameters: unknown, message: Buffer): void {
	let parsed;
	try {
		parsed = ISAUpdateMessageSchema.parse(JSON.parse(message.toString()));
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: Error logging for debugging
		console.error("Error parsing ISAUpdate message:", error);
		Sentry.captureException(error);
		return;
	}

	const { ISA, timestamp } = parsed.params;
	brainStore.updateISAWorkload(ISA, timestamp);
	posthog.capture("ta_isa_update_received", {
		isa: ISA,
		timestamp,
		delta: brainStore.delta,
		normalized_isa: brainStore.normalizedISA,
		autonomy_profile: brainStore.autonomyProfile,
	});
}

/**
 * Handle manualAP sync messages from MQTT topic frontend/{clientId}/brain/manualAP
 * Synchronizes the manual AP override across all instances sharing the same clientId.
 */
export function frontendManualAP(_parameters: unknown, message: Buffer): void {
	try {
		const raw = message.toString().trim();
		if (raw.length === 0) {
			return;
		}
		const value = FrontendManualAPMessageSchema.parse(JSON.parse(raw));
		brainStore.setManualAP(value);
		posthog.capture("ta_manual_ap_sync_received", {
			manual_ap: value,
		});
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: error logging
		console.error("Error parsing manualAP message:", error);
	}
}

async function forceRefreshWithoutCache(): Promise<void> {
	try {
		if ("serviceWorker" in navigator) {
			const registrations = await navigator.serviceWorker.getRegistrations();
			await Promise.all(
				registrations.map((registration) => registration.unregister()),
			);
		}

		if ("caches" in window) {
			const cacheKeys = await caches.keys();
			await Promise.all(cacheKeys.map((cacheKey) => caches.delete(cacheKey)));
		}
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: best-effort cleanup before refresh
		console.error(
			"Failed to clear browser caches before force refresh:",
			error,
		);
	}

	const refreshedUrl = new URL(window.location.href);
	refreshedUrl.searchParams.set("_fr", Date.now().toString());
	window.location.replace(refreshedUrl.toString());
}

/**
 * Handle force-refresh command from MQTT topic frontend/{clientId}/commands/force-refresh.
 * Performs a cache-busting reload on all open pages for the same clientId.
 */
export function frontendForceRefresh(): void {
	posthog.capture("frontend_force_refresh_received", {
		source: "mqtt",
	});

	forceRefreshWithoutCache().catch((error) => {
		// biome-ignore lint/suspicious/noConsole: error logging
		console.error("Failed to execute force refresh:", error);
		posthog.capture("frontend_force_refresh_failed", {
			source: "mqtt",
			error_name: error instanceof Error ? error.name : "unknown",
			error_message: error instanceof Error ? error.message : "Unknown error",
		});
		Sentry.captureException(error);
	});
}
