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
