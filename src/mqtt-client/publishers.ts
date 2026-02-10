import * as Sentry from "@sentry/react";
import clientId from "./clientId";
import { publish } from "./mqtt";

function serializeForSimulator(...parameters: (string | number)[]): string {
	const stringParameters = parameters.map((parameter) => `${parameter}`);

	for (const parameter of stringParameters) {
		// contains could be deprecated
		if (parameter.includes("&")) {
			throw new Error("Invalid parameter, & is not allowed");
		}
	}

	return stringParameters.join("&");
}

export function handlePublishPromise(promise: Promise<void>): void {
	promise.catch((error) => {
		// biome-ignore lint/suspicious/noConsole: needed for now
		console.error("Error while publishing MQTT message", error);
		Sentry.captureException(error);
	});
}

export async function startSimulator(): Promise<void> {
	await publish(`ats/${clientId}/commands/sim`, "start");
}

export async function pauseSimulator(): Promise<void> {
	await publish(`ats/${clientId}/commands/sim`, "pause");
}

export async function resetSimulator(): Promise<void> {
	await publish(`ats/${clientId}/commands/sim`, "reset", { qos: 2 });
}

export async function fastForwardSimulator(minutes: number): Promise<void> {
	await publish(`ats/${clientId}/commands/sim`, `ffw ${minutes}`);
}

export async function restartSimulator(): Promise<void> {
	await publish(`ats/${clientId}/commands/sim`, "quit", { qos: 2 });
}

export async function setSpeedFactor(speedFactor: number): Promise<void> {
	await publish(
		`ats/${clientId}/commands/speed-factor`,
		serializeForSimulator(speedFactor),
	);
}

export async function changeSpeedOfAircraft(
	pilotId: string,
	flightId: string,
	newSpeed: number,
): Promise<void> {
	await publish(
		`ats/${clientId}/commands/change-speed/`,
		serializeForSimulator(pilotId, flightId, newSpeed),
	);
}

export async function changeFlightLevelOfAircraft(
	pilotId: string,
	flightId: string,
	newFlightLevel: string,
): Promise<void> {
	await publish(
		`ats/${clientId}/commands/change-flight-level/`,
		serializeForSimulator(pilotId, flightId, newFlightLevel),
	);
}

export async function changeBearingOfAircraft(
	pilotId: string,
	flightId: string,
	newBearing: number,
): Promise<void> {
	await publish(
		`ats/${clientId}/commands/change-bearing/`,
		serializeForSimulator(pilotId, flightId, newBearing),
	);
}

export async function changeNextWaypointOfAircraft({
	pilotId,
	waypointId,
	flightId,
	latitude,
	longitude,
	viaLat,
	viaLong,
	viaWaypointId,
}: {
	pilotId: string;
	waypointId: string;
	flightId: string;
	latitude: number;
	longitude: number;
	viaLat: number | string;
	viaLong: number | string;
	viaWaypointId: string;
}): Promise<void> {
	await publish(
		`ats/${clientId}/commands/change-waypoint/`,
		serializeForSimulator(
			pilotId,
			waypointId,
			flightId,
			latitude,
			longitude,
			viaLat,
			viaLong,
			viaWaypointId,
		),
	);
}

export async function changeExitFlightLevelOfAircraft(
	pilotId: string,
	flightUniqueId: string,
	flightLevel: string,
): Promise<void> {
	await publish(
		`ats/${clientId}/commands/change-xfl/`,
		serializeForSimulator(pilotId, flightUniqueId, flightLevel),
	);
}

export async function acceptFlight(
	fromControllableSector: string,
	toControllableSector: string,
	flightUniqueId: string,
): Promise<void> {
	await publish(
		`ats/${clientId}/commands/accept-flight/`,
		serializeForSimulator(
			fromControllableSector,
			toControllableSector,
			flightUniqueId,
		),
	);
}

export async function persistFrontendFlightController(
	flightUniqueId: string,
	controller: string,
): Promise<void> {
	await publish(
		`frontend/${clientId}/flight/${flightUniqueId}/controller`,
		controller,
		{ retain: true },
	);
}

export async function persistACCFlightLevel(
	flightUniqueId: string,
	flightLevel: string,
): Promise<void> {
	await publish(
		`frontend/${clientId}/flight/${flightUniqueId}/ACCFL`,
		flightLevel,
		{ retain: true },
	);
}

export async function persistNextSectorFlightLevel(
	flightUniqueId: string,
	flightLevel: string,
): Promise<void> {
	await publish(
		`frontend/${clientId}/flight/${flightUniqueId}/NSFL`,
		flightLevel,
		{ retain: true },
	);
}

export async function persistACCBearing(
	flightUniqueId: string,
	bearing: number,
): Promise<void> {
	await publish(
		`frontend/${clientId}/flight/${flightUniqueId}/ACCBearing`,
		bearing.toFixed(0),
		{ retain: true },
	);
}

export async function persistAssignedFlightLevel(
	flightUniqueId: string,
	flightLevel: string,
): Promise<void> {
	await publish(
		`frontend/${clientId}/flight/${flightUniqueId}/assignedFL`,
		flightLevel,
		{ retain: true },
	);
}

export async function tentativeFlight(
	fromControllableSector: string,
	toControllableSector: string,
	flightUniqueId: string,
): Promise<void> {
	await publish(
		`ats/${clientId}/commands/tentative-flight/`,
		serializeForSimulator(
			fromControllableSector,
			toControllableSector,
			flightUniqueId,
		),
	);
}

export async function persistSpeedAircraft(
	flightUniqueId: string,
	speed: number,
): Promise<void> {
	await publish(
		`frontend/${clientId}/flight/${flightUniqueId}/speed`,
		speed.toFixed(0),
		{ retain: true },
	);
}

export async function persistLocalAssignedFlightLevel(
	flightUniqueId: string,
	flightLevel: string,
): Promise<void> {
	await publish(
		`frontend/${clientId}/flight/${flightUniqueId}/localAssignedFL`,
		flightLevel,
		{ retain: true },
	);
}

export async function persistHiddenAircraft(
	flightUniqueId: string,
	hidden = true,
): Promise<void> {
	await publish(
		`frontend/${clientId}/flight/${flightUniqueId}/hidden`,
		hidden ? "true" : "",
		{ retain: true },
	);
}

/**
 * Publish manual AP override to MQTT as a retained message.
 * All instances sharing the same clientId will receive this and sync their AP mode.
 *
 * @param value - null (auto), 1 (AP1), or 2 (AP2)
 */
export async function persistManualAP(value: number | null): Promise<void> {
	await publish(`frontend/${clientId}/brain/manualAP`, JSON.stringify(value), {
		retain: true,
	});
}

/**
 * Clear a pilot request retained message.
 * Publishing an empty retained message clears the retained message on the broker.
 */
export async function publishPilotRequestClear(
	flightId: string,
	requestId: string,
): Promise<void> {
	await publish(`IIS/${clientId}/PilotRequest/${requestId}`, "CLOSE", {
		retain: true,
	});
}

/**
 * Send a REFRESH call for a pilot request.
 * This is sent 30 seconds after the request arrives to request updated data.
 */
export async function publishPilotRequestRefresh(
	requestId: string,
): Promise<void> {
	await publish(`IIS/${clientId}/PilotRequest/${requestId}`, "REFRESH", {
		retain: true,
	});
}

/**
 * Publish a pilot request message as JSON to the IIS topic.
 * The message will be received back via the MQTT subscriber and added to the store.
 *
 * @param requestParameter - For FLIGHT_LEVEL (0): a number like 390. For DIRECTTO (1): a waypoint name string like "LEKFA".
 */
export async function publishPilotRequest(
	flightId: string,
	requestId: string,
	requestType: number,
	requestParameter: number | string,
): Promise<void> {
	// For FLIGHT_LEVEL requests, use the parameter as RFL and exit_level
	// For other request types, use default values
	const rfl = typeof requestParameter === "number" ? requestParameter : 0;

	const jsonRequest = {
		timestamp: new Date().toISOString(),
		iteration_count: 0,
		context: {
			request_id: requestId,
			flight_id: flightId,
			request_type: requestType,
			request_parameter: requestParameter,
		},
		goals: [
			{
				RFL: rfl,
				results: {
					exit_level: rfl,
					initial_climb: Math.max(rfl - 40, 0), // Reasonable default: 40 FL below RFL
					exit_problems_are_manageable: true,
					traffic_complexity_manageable: true,
					required_coordinations: [],
					higher_level_available: true,
					is_conform_to_flight_plan: false,
					next_sector: "E3",
					next_sector_capacity_ok: true,
					altitude_restriction: false,
				},
			},
		],
	};

	await publish(`IIS/${clientId}/PilotRequest/${requestId}`, jsonRequest, {
		retain: true,
	});
}
