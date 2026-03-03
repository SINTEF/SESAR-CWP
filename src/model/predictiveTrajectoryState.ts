import type FlightRoute from "./FlightRoute";

export type PredictiveTrajectoryMode =
	| "unset"
	| "rerouted"
	| "rerouted-via-waypoint";

export interface PredictiveTrajectoryState {
	mode: PredictiveTrajectoryMode;
	waypointId?: string;
	waypointLatitude?: number;
	waypointLongitude?: number;
	nextWaypointId?: string;
	nextWaypointLatitude?: number;
	nextWaypointLongitude?: number;
}

export function isWaypointInFlightPlan(
	route: FlightRoute | undefined,
	waypointId: string,
): boolean {
	if (!route) {
		return false;
	}

	const normalizedWaypointId = waypointId.trim().toUpperCase();
	return route.trajectory.some(
		(trajectory) =>
			trajectory.objectId?.trim().toUpperCase() === normalizedWaypointId,
	);
}
