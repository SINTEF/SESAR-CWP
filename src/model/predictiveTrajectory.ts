import type AircraftModel from "./AircraftModel";
import CoordinatePair from "./CoordinatePair";
import type FlightRoute from "./FlightRoute";
import { isWaypointInFlightPlan } from "./predictiveTrajectoryState";
import { getRouteAheadTrajectory } from "./routeProgress";
import Trajectory from "./Trajectory";

const EARTH_RADIUS_METERS = 6_371_008;
const MIN_VALID_SPEED_MPS = 1;
const MOVING_AWAY_HEADING_DIFF_DEGREES = 100;

interface PredictiveRouteAheadParams {
	aircraft: AircraftModel;
	route: FlightRoute;
	currentTime: number;
}

const PREDICTION_OFFSETS_SECONDS = [180, 360, 540, 720, 900] as const;

function toRadians(degrees: number): number {
	return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
	return (radians * 180) / Math.PI;
}

function normalizeBearingDegrees(bearing: number): number {
	const normalized = bearing % 360;
	return normalized >= 0 ? normalized : normalized + 360;
}

function initialBearingDegrees(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number {
	const phi1 = toRadians(lat1);
	const phi2 = toRadians(lat2);
	const lambda1 = toRadians(lon1);
	const lambda2 = toRadians(lon2);
	const y = Math.sin(lambda2 - lambda1) * Math.cos(phi2);
	const x =
		Math.cos(phi1) * Math.sin(phi2) -
		Math.sin(phi1) * Math.cos(phi2) * Math.cos(lambda2 - lambda1);
	return normalizeBearingDegrees(toDegrees(Math.atan2(y, x)));
}

function smallestAngularDifferenceDegrees(a: number, b: number): number {
	const normalizedA = normalizeBearingDegrees(a);
	const normalizedB = normalizeBearingDegrees(b);
	const absoluteDifference = Math.abs(normalizedA - normalizedB);
	return Math.min(absoluteDifference, 360 - absoluteDifference);
}

function isMovingAwayFromWaypoint(
	aircraft: AircraftModel,
	waypointLatitude: number,
	waypointLongitude: number,
): {
	isMovingAway: boolean;
	bearingToWaypoint: number;
	headingDifference: number;
} {
	const bearingToWaypoint = initialBearingDegrees(
		aircraft.lastKnownLatitude,
		aircraft.lastKnownLongitude,
		waypointLatitude,
		waypointLongitude,
	);
	const headingDifference = smallestAngularDifferenceDegrees(
		aircraft.lastKnownBearing,
		bearingToWaypoint,
	);

	return {
		isMovingAway: headingDifference > MOVING_AWAY_HEADING_DIFF_DEGREES,
		bearingToWaypoint,
		headingDifference,
	};
}

function secondsForDistanceAtSpeed(
	distanceMeters: number,
	speedMps: number,
): number {
	return Math.max(Math.round(distanceMeters / speedMps), 1);
}

function getRetimedRouteTrajectoryFromWaypoint(
	route: FlightRoute,
	waypointId: string,
	originLatitude: number,
	originLongitude: number,
	originTimestamp: number,
	speedMps: number,
): Trajectory[] {
	const normalizedWaypointId = waypointId.trim().toUpperCase();
	const startIndex = route.trajectory.findIndex(
		(trajectory) =>
			trajectory.objectId?.trim().toUpperCase() === normalizedWaypointId,
	);

	if (startIndex === -1) {
		return [];
	}

	const retimedTrajectory: Trajectory[] = [];
	let previousLatitude = originLatitude;
	let previousLongitude = originLongitude;
	let previousTimestamp = originTimestamp;

	for (const trajectoryPoint of route.trajectory.slice(startIndex)) {
		const latitude = trajectoryPoint.trajectoryCoordinate.latitude;
		const longitude = trajectoryPoint.trajectoryCoordinate.longitude;
		const segmentDistanceMeters = haversineMeters(
			previousLatitude,
			previousLongitude,
			latitude,
			longitude,
		);
		const segmentSeconds = secondsForDistanceAtSpeed(
			segmentDistanceMeters,
			speedMps,
		);
		const timestamp = previousTimestamp + segmentSeconds;

		retimedTrajectory.push(
			new Trajectory({
				objectId: trajectoryPoint.objectId,
				trajectoryCoordinate: new CoordinatePair({
					latitude,
					longitude,
				}),
				timestamp,
			}),
		);

		previousLatitude = latitude;
		previousLongitude = longitude;
		previousTimestamp = timestamp;
	}

	return retimedTrajectory;
}

function haversineMeters(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number {
	const phi1 = toRadians(lat1);
	const phi2 = toRadians(lat2);
	const deltaPhi = toRadians(lat2 - lat1);
	const deltaLambda = toRadians(lon2 - lon1);

	const a =
		Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
		Math.cos(phi1) *
			Math.cos(phi2) *
			Math.sin(deltaLambda / 2) *
			Math.sin(deltaLambda / 2);

	return 2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function projectPositionFromBearing(
	lat: number,
	lon: number,
	bearingDegrees: number,
	distanceMeters: number,
): { lat: number; lon: number } {
	const angularDistance = distanceMeters / EARTH_RADIUS_METERS;
	const bearing = toRadians(normalizeBearingDegrees(bearingDegrees));
	const latitude = toRadians(lat);
	const longitude = toRadians(lon);

	const projectedLat = Math.asin(
		Math.sin(latitude) * Math.cos(angularDistance) +
			Math.cos(latitude) * Math.sin(angularDistance) * Math.cos(bearing),
	);

	const projectedLon =
		longitude +
		Math.atan2(
			Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latitude),
			Math.cos(angularDistance) - Math.sin(latitude) * Math.sin(projectedLat),
		);

	return {
		lat: toDegrees(projectedLat),
		lon: toDegrees(projectedLon),
	};
}

function buildProjectedTrajectory(
	startLatitude: number,
	startLongitude: number,
	startTimestamp: number,
	bearingDegrees: number,
	speedMps: number,
): Trajectory[] {
	return PREDICTION_OFFSETS_SECONDS.map((offsetSeconds) => {
		const projected = projectPositionFromBearing(
			startLatitude,
			startLongitude,
			bearingDegrees,
			speedMps * offsetSeconds,
		);

		return new Trajectory({
			trajectoryCoordinate: new CoordinatePair({
				latitude: projected.lat,
				longitude: projected.lon,
			}),
			timestamp: startTimestamp + offsetSeconds,
		});
	});
}

export function getPredictiveRouteAheadTrajectory({
	aircraft,
	route,
	currentTime,
}: PredictiveRouteAheadParams): Trajectory[] {
	const speedMps = aircraft.lastKnownSpeed;
	const headingDegrees = aircraft.lastKnownBearing;

	if (
		!Number.isFinite(speedMps) ||
		speedMps < MIN_VALID_SPEED_MPS ||
		!Number.isFinite(headingDegrees)
	) {
		return getRouteAheadTrajectory({
			aircraft,
			route,
			currentTime,
		});
	}

	if (aircraft.predictiveTrajectoryMode === "unset") {
		return getRouteAheadTrajectory({
			aircraft,
			route,
			currentTime,
		});
	}

	if (aircraft.predictiveTrajectoryMode === "rerouted") {
		return buildProjectedTrajectory(
			aircraft.lastKnownLatitude,
			aircraft.lastKnownLongitude,
			currentTime,
			headingDegrees,
			speedMps,
		);
	}

	const waypointLatitude = aircraft.predictiveTrajectoryWaypointLatitude;
	const waypointLongitude = aircraft.predictiveTrajectoryWaypointLongitude;
	const waypointId = aircraft.predictiveTrajectoryWaypointId;

	if (
		waypointLatitude === undefined ||
		waypointLongitude === undefined ||
		waypointId === undefined
	) {
		return getRouteAheadTrajectory({
			aircraft,
			route,
			currentTime,
		});
	}

	if (isWaypointInFlightPlan(route, waypointId)) {
		return getRouteAheadTrajectory({
			aircraft,
			route,
			currentTime,
		});
	}

	const liveNextWaypoint = getRouteAheadTrajectory({
		aircraft,
		route,
		currentTime,
	}).find((trajectory) => trajectory.objectId !== undefined);
	const nextWaypointId = liveNextWaypoint?.objectId;
	const rejoinLatitude = liveNextWaypoint?.trajectoryCoordinate.latitude;
	const rejoinLongitude = liveNextWaypoint?.trajectoryCoordinate.longitude;

	if (
		nextWaypointId === undefined ||
		rejoinLatitude === undefined ||
		rejoinLongitude === undefined ||
		!isWaypointInFlightPlan(route, nextWaypointId)
	) {
		return getRouteAheadTrajectory({
			aircraft,
			route,
			currentTime,
		});
	}

	const movingAwayInfo = isMovingAwayFromWaypoint(
		aircraft,
		waypointLatitude,
		waypointLongitude,
	);

	if (movingAwayInfo.isMovingAway) {
		const routeFromNextWaypoint = getRetimedRouteTrajectoryFromWaypoint(
			route,
			nextWaypointId,
			aircraft.lastKnownLatitude,
			aircraft.lastKnownLongitude,
			currentTime,
			speedMps,
		);

		if (routeFromNextWaypoint.length > 0) {
			return routeFromNextWaypoint;
		}

		return getRouteAheadTrajectory({
			aircraft,
			route,
			currentTime,
		});
	}

	const distanceToWaypointMeters = haversineMeters(
		aircraft.lastKnownLatitude,
		aircraft.lastKnownLongitude,
		waypointLatitude,
		waypointLongitude,
	);
	const secondsToWaypoint = secondsForDistanceAtSpeed(
		distanceToWaypointMeters,
		speedMps,
	);
	const waypointTimestamp = currentTime + secondsToWaypoint;
	const routeTailFromNextWaypoint = getRetimedRouteTrajectoryFromWaypoint(
		route,
		nextWaypointId,
		waypointLatitude,
		waypointLongitude,
		waypointTimestamp,
		speedMps,
	);

	const trajectory = [
		new Trajectory({
			objectId: waypointId,
			trajectoryCoordinate: new CoordinatePair({
				latitude: waypointLatitude,
				longitude: waypointLongitude,
			}),
			timestamp: waypointTimestamp,
		}),
		...routeTailFromNextWaypoint,
	];

	return trajectory;
}
