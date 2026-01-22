import * as Sentry from "@sentry/react";
import {
	AirspaceAvailabilityMessage,
	AirTrafficControllerAssignmentMessage,
	AirwaysMessage,
	// AvailabilityIntervalsMessage,
	AvailabilitySchedule,
	CurrentAirspaceConfigurationMessage,
	FlightConflictUpdateMessage,
	FlightEnteringAirspaceMessage,
	FlightMilestonePositionMessage,
	FlightRouteMessage,
	FrequenciesMessage,
	NewAircraftMessage,
	NewAircraftTypeMessage,
	NewAirspaceConfigurationMessage,
	NewAirspaceMessage,
	NewFlightMessage,
	NewPointMessage,
	NewSectorMessage,
	PilotRequestMessage,
	RoleConfigurationMessage,
	SimulatorTime,
	TargetReportMessage,
} from "../proto/ProtobufAirTrafficSimulator";
import { PilotRequestJsonSchema } from "../schemas/pilotRequestSchema";
import {
	adminStore,
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
	_parameters: unknown,
	message: Buffer,
): void {
	const protoMessage = FlightMilestonePositionMessage.fromBinary(message);
	aircraftStore.handleFlightNewMilestonePositions(protoMessage);
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
 */
export function pilotRequestJson(
	{ requestId }: { [key: string]: string },
	message: Buffer,
): void {
	try {
		const jsonString = message.toString();
		const parsed = JSON.parse(jsonString);
		const validated = PilotRequestJsonSchema.parse(parsed);
		if (message.length === 0) {
			aircraftStore.removeTeamAssistantRequest(
				validated.context.flight_id,
				requestId,
			);
			return;
		}
		aircraftStore.setTeamAssistantRequest(
			validated.context.flight_id,
			requestId,
			validated,
		);
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: error logging
		console.error("Failed to decode PilotRequestJson:", error);
		Sentry.captureException(error);
	}
}

/**
 * Handle WorkloadUpdate messages from MQTT topic TAS/{clientId}/WorkloadUpdate
 *
 * Expected message format:
 * {
 *   "jsonrpc": "2.0",
 *   "method": "workloadUpdate",
 *   "params": {
 *     "workload": 1,
 *     "reliability": 0.94,
 *     "source": "Agent" | "ISA",
 *     "timestamp": "2025-11-04 13:14:20.444"
 *   },
 *   "id": 42
 * }
 */
export function workloadUpdate(_parameters: unknown, message: Buffer): void {
	try {
		const parsed = JSON.parse(message.toString());
		const { workload, reliability, source, timestamp } = parsed.params;

		if (source === "Agent") {
			brainStore.updateAgentWorkload(workload, reliability, timestamp);
		} else if (source === "ISA") {
			brainStore.updateISAWorkload(workload, reliability, timestamp);
		} else {
			// biome-ignore lint/suspicious/noConsole: Warning for unknown workload source
			console.warn(`Unknown workload source: ${source}`);
		}
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: Error logging for debugging
		console.error("Error parsing WorkloadUpdate message:", error);
		Sentry.captureException(error);
	}
}
