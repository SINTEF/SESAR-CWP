import type AircraftModel from "./AircraftModel";
import CoordinatePair from "./CoordinatePair";
import type FlightRoute from "./FlightRoute";
import { getRouteAheadTrajectory } from "./routeProgress";
import Trajectory from "./Trajectory";

const EARTH_RADIUS_METERS = 6_371_008;
const DEFAULT_PREDICTION_WINDOW_SECONDS = 180;
const DEFAULT_WAYPOINT_RADIUS_METERS = 3000;
const MIN_VALID_SPEED_MPS = 1;

interface PredictiveRouteAheadParams {
	aircraft: AircraftModel;
	route: FlightRoute;
	currentTime: number;
	predictionWindowSeconds?: number;
	waypointRadiusMeters?: number;
}

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

export function getPredictiveRouteAheadTrajectory({
	aircraft,
	route,
	currentTime,
	predictionWindowSeconds = DEFAULT_PREDICTION_WINDOW_SECONDS,
	waypointRadiusMeters = DEFAULT_WAYPOINT_RADIUS_METERS,
}: PredictiveRouteAheadParams): Trajectory[] {
	const flightPlanAhead = getRouteAheadTrajectory({
		aircraft,
		route,
		currentTime,
	});

	if (flightPlanAhead.length === 0) {
		return [];
	}

	const speedMps = aircraft.lastKnownSpeed;
	const headingDegrees = aircraft.lastKnownBearing;

	if (
		!Number.isFinite(speedMps) ||
		speedMps < MIN_VALID_SPEED_MPS ||
		!Number.isFinite(headingDegrees)
	) {
		return flightPlanAhead;
	}

	const predictionEndTime = currentTime + predictionWindowSeconds;

	const firstWaypoint = flightPlanAhead[0];
	const firstWaypointDeltaSeconds = Math.max(
		0,
		firstWaypoint.timestamp - currentTime,
	);
	const projectedAtFirstWaypointTime = projectPositionFromBearing(
		aircraft.lastKnownLatitude,
		aircraft.lastKnownLongitude,
		headingDegrees,
		speedMps * firstWaypointDeltaSeconds,
	);
	const distanceToFirstWaypoint = haversineMeters(
		projectedAtFirstWaypointTime.lat,
		projectedAtFirstWaypointTime.lon,
		firstWaypoint.trajectoryCoordinate.latitude,
		firstWaypoint.trajectoryCoordinate.longitude,
	);

	// If the next waypoint is still realistically reachable, keep the original flight plan.
	if (distanceToFirstWaypoint <= waypointRadiusMeters) {
		return flightPlanAhead;
	}

	const predictedEndPosition = projectPositionFromBearing(
		aircraft.lastKnownLatitude,
		aircraft.lastKnownLongitude,
		headingDegrees,
		speedMps * predictionWindowSeconds,
	);

	let firstValidWaypointIndex = 0;
	for (const [index, trajectory] of flightPlanAhead.entries()) {
		if (trajectory.timestamp > predictionEndTime) {
			break;
		}

		const dtSeconds = Math.max(0, trajectory.timestamp - currentTime);
		const projectedAtWaypointTime = projectPositionFromBearing(
			aircraft.lastKnownLatitude,
			aircraft.lastKnownLongitude,
			headingDegrees,
			speedMps * dtSeconds,
		);

		const distanceToWaypoint = haversineMeters(
			projectedAtWaypointTime.lat,
			projectedAtWaypointTime.lon,
			trajectory.trajectoryCoordinate.latitude,
			trajectory.trajectoryCoordinate.longitude,
		);

		if (distanceToWaypoint <= waypointRadiusMeters) {
			firstValidWaypointIndex = index;
			break;
		}

		firstValidWaypointIndex = index + 1;
	}

	const remainingWaypoints = flightPlanAhead.slice(firstValidWaypointIndex);
	const virtualWaypointAltitude =
		remainingWaypoints.at(0)?.trajectoryCoordinate.altitude;

	const virtualWaypoint = new Trajectory({
		trajectoryCoordinate: new CoordinatePair({
			longitude: predictedEndPosition.lon,
			latitude: predictedEndPosition.lat,
			altitude: virtualWaypointAltitude,
		}),
		timestamp: predictionEndTime,
	});

	if (remainingWaypoints.length === 0) {
		return [virtualWaypoint];
	}

	const predictiveTrajectory: Trajectory[] = [virtualWaypoint];
	let previousLatitude = predictedEndPosition.lat;
	let previousLongitude = predictedEndPosition.lon;
	let previousTimestamp = predictionEndTime;

	for (const waypoint of remainingWaypoints) {
		const distanceMeters = haversineMeters(
			previousLatitude,
			previousLongitude,
			waypoint.trajectoryCoordinate.latitude,
			waypoint.trajectoryCoordinate.longitude,
		);
		const travelSeconds = distanceMeters / speedMps;
		const updatedTimestamp = previousTimestamp + travelSeconds;

		predictiveTrajectory.push(
			new Trajectory({
				trajectoryCoordinate: waypoint.trajectoryCoordinate,
				timestamp: updatedTimestamp,
				objectId: waypoint.objectId,
			}),
		);

		previousLatitude = waypoint.trajectoryCoordinate.latitude;
		previousLongitude = waypoint.trajectoryCoordinate.longitude;
		previousTimestamp = updatedTimestamp;
	}

	return predictiveTrajectory;
}
