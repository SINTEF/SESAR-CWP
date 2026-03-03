import type AircraftModel from "./AircraftModel";
import CoordinatePair from "./CoordinatePair";
import type FlightRoute from "./FlightRoute";
import { isWaypointInFlightPlan } from "./predictiveTrajectoryState";
import { getRouteAheadTrajectory } from "./routeProgress";
import Trajectory from "./Trajectory";

const EARTH_RADIUS_METERS = 6_371_008;
const MIN_VALID_SPEED_MPS = 1;

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

function projectLatLonToLocalMeters(
	lat: number,
	lon: number,
	originLat: number,
	originLon: number,
): { east: number; north: number } {
	const dLat = toRadians(lat - originLat);
	const dLon = toRadians(lon - originLon);
	const meanLat = toRadians((lat + originLat) / 2);

	return {
		east: dLon * Math.cos(meanLat) * EARTH_RADIUS_METERS,
		north: dLat * EARTH_RADIUS_METERS,
	};
}

function isMovingAwayFromWaypoint(
	aircraft: AircraftModel,
	waypointLatitude: number,
	waypointLongitude: number,
): boolean {
	const heading = aircraft.lastKnownBearing;
	if (!Number.isFinite(heading)) {
		return false;
	}

	const vectorToWaypoint = projectLatLonToLocalMeters(
		waypointLatitude,
		waypointLongitude,
		aircraft.lastKnownLatitude,
		aircraft.lastKnownLongitude,
	);

	const headingRadians = toRadians(normalizeBearingDegrees(heading));
	const velocityEast = Math.sin(headingRadians);
	const velocityNorth = Math.cos(headingRadians);

	const dotProduct =
		vectorToWaypoint.east * velocityEast +
		vectorToWaypoint.north * velocityNorth;
	return dotProduct <= 0;
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

	if (isMovingAwayFromWaypoint(aircraft, waypointLatitude, waypointLongitude)) {
		return buildProjectedTrajectory(
			aircraft.lastKnownLatitude,
			aircraft.lastKnownLongitude,
			currentTime,
			headingDegrees,
			speedMps,
		);
	}

	const bearingToWaypoint = initialBearingDegrees(
		aircraft.lastKnownLatitude,
		aircraft.lastKnownLongitude,
		waypointLatitude,
		waypointLongitude,
	);
	const distanceToWaypointMeters = haversineMeters(
		aircraft.lastKnownLatitude,
		aircraft.lastKnownLongitude,
		waypointLatitude,
		waypointLongitude,
	);
	const timeToWaypointSeconds = distanceToWaypointMeters / speedMps;

	return PREDICTION_OFFSETS_SECONDS.map((offsetSeconds) => {
		if (offsetSeconds <= timeToWaypointSeconds) {
			const projected = projectPositionFromBearing(
				aircraft.lastKnownLatitude,
				aircraft.lastKnownLongitude,
				bearingToWaypoint,
				speedMps * offsetSeconds,
			);

			return new Trajectory({
				trajectoryCoordinate: new CoordinatePair({
					latitude: projected.lat,
					longitude: projected.lon,
				}),
				timestamp: currentTime + offsetSeconds,
			});
		}

		const postWaypointElapsedSeconds = offsetSeconds - timeToWaypointSeconds;
		const projectedAfterWaypoint = projectPositionFromBearing(
			waypointLatitude,
			waypointLongitude,
			bearingToWaypoint,
			speedMps * postWaypointElapsedSeconds,
		);

		return new Trajectory({
			trajectoryCoordinate: new CoordinatePair({
				latitude: projectedAfterWaypoint.lat,
				longitude: projectedAfterWaypoint.lon,
			}),
			timestamp: currentTime + offsetSeconds,
		});
	});
}
