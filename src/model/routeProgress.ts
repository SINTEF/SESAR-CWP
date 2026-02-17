import type AircraftModel from "./AircraftModel";
import type FlightRoute from "./FlightRoute";
import type Trajectory from "./Trajectory";

interface RouteAheadParams {
	aircraft: AircraftModel;
	route: FlightRoute;
	currentTime: number;
}

/**
 * Returns the trajectory points that are still ahead of the aircraft.
 *
 * Strategy:
 * 1. If available, anchor after the last passed milestone objectId.
 * 2. Within that suffix, prefer points at or after current simulator time.
 * 3. If no time-based future points exist but milestone anchoring exists, keep
 *    the milestone-based suffix as fallback.
 */
export function getRouteAheadTrajectory({
	aircraft,
	route,
	currentTime,
}: RouteAheadParams): Trajectory[] {
	const trajectories = route.trajectory;
	if (trajectories.length === 0) {
		return [];
	}

	let startIndex = 0;
	const passedObjectId = aircraft.lastPassedMilestoneObjectId;

	if (passedObjectId) {
		for (let index = 0; index < trajectories.length; index++) {
			if (trajectories[index].objectId === passedObjectId) {
				startIndex = index + 1;
			}
		}
	}

	const candidateTrajectory = trajectories.slice(startIndex);
	if (candidateTrajectory.length === 0) {
		return [];
	}

	const firstFutureIndex = candidateTrajectory.findIndex(
		(trajectory) => trajectory.timestamp >= currentTime,
	);

	if (firstFutureIndex >= 0) {
		return candidateTrajectory.slice(firstFutureIndex);
	}

	if (passedObjectId && startIndex > 0) {
		return candidateTrajectory;
	}

	return [];
}

export function getUpcomingRouteFixes({
	aircraft,
	route,
	currentTime,
}: RouteAheadParams): string[] {
	return getRouteAheadTrajectory({ aircraft, route, currentTime })
		.filter((trajectory) => trajectory.objectId)
		.map((trajectory) => trajectory.objectId as string);
}
