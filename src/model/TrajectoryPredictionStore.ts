import { lineString } from "@turf/helpers";
import { length as turfLength } from "@turf/length";
import { makeAutoObservable } from "mobx";
import {
	closestBetweenPolylines,
	type Point,
	type Polyline,
} from "../utils/geomClosest";
import type AircraftStore from "./AircraftStore";
import type SimulatorStore from "./SimulatorStore";
import type Trajectory from "./Trajectory";

export interface TrajectoryPredictionData {
	readonly mainAircraftId: string | null;
	readonly draggedHandleLat: number;
	readonly draggedHandleLon: number;
	readonly mouseLat: number;
	readonly mouseLon: number;
	readonly futureTime: number | null;
}

export default class TrajectoryPredictionStore {
	enabled = false;

	mainAircraftId: string | null = null;

	draggedHandleLat = 0;

	draggedHandleLon = 0;

	mouseLat = 0;

	mouseLon = 0;

	private aircraftStore: AircraftStore;
	private simulatorStore: SimulatorStore;

	constructor({
		aircraftStore,
		simulatorStore,
	}: {
		aircraftStore: AircraftStore;
		simulatorStore: SimulatorStore;
	}) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.aircraftStore = aircraftStore;
		this.simulatorStore = simulatorStore;
	}

	setEnabled(value: boolean): void {
		this.enabled = value;
		if (!value) {
			this.reset();
		}
	}

	setMainAircraft(aircraftId: string): void {
		this.mainAircraftId = aircraftId;
	}

	setDraggedHandlePosition(lat: number, lon: number): void {
		this.draggedHandleLat = lat;
		this.draggedHandleLon = lon;
	}

	setMousePosition(lat: number, lon: number): void {
		this.mouseLat = lat;
		this.mouseLon = lon;
	}

	reset(): void {
		this.mainAircraftId = null;
		this.draggedHandleLat = 0;
		this.draggedHandleLon = 0;
		this.mouseLat = 0;
		this.mouseLon = 0;
	}

	get predictionData(): TrajectoryPredictionData {
		return {
			mainAircraftId: this.mainAircraftId,
			draggedHandleLat: this.draggedHandleLat,
			draggedHandleLon: this.draggedHandleLon,
			mouseLat: this.mouseLat,
			mouseLon: this.mouseLon,
			futureTime: this.computedFutureTime,
		};
	}

	get computedFutureTime(): number | null {
		if (!this.enabled || !this.mainAircraftId) {
			return null;
		}

		const aircraft = this.aircraftStore.aircrafts.get(this.mainAircraftId);
		if (!aircraft) {
			return null;
		}

		const flightRoute = this.aircraftStore.flightRoutes.get(
			aircraft.assignedFlightId,
		);
		if (!flightRoute) {
			return null;
		}

		/*// Get future trajectories
		const futureTrajectories = flightRoute.trajectory.filter(
			(t) => t.timestamp >= this.simulatorStore.timestamp,
		);

		if (futureTrajectories.length === 0) {
			return null;
		}
		*/

		// Calculate distance from dragged handle to aircraft
		const targetDistance = this.getDistanceInMeters(
			aircraft.lastKnownLatitude,
			aircraft.lastKnownLongitude,
			this.draggedHandleLat,
			this.draggedHandleLon,
		);

		// Find when aircraft reaches approximately this distance along route
		let cumulativeDistance = 0;
		let prevLat = aircraft.lastKnownLatitude;
		let prevLon = aircraft.lastKnownLongitude;
		const now = this.simulatorStore.timestamp;
		let prevTime = now;

		// Find the first trajectory index that is in the future
		const firstFutureIndex = flightRoute.trajectory.findIndex(
			(t) => t.timestamp >= now,
		);
		if (firstFutureIndex === -1) {
			// All trajectories are in the past, return null
			return null;
		}
		/*if (
			firstFutureIndex > 0 &&
			flightRoute.trajectory[firstFutureIndex].timestamp > now
		) {
			// Start from the last past trajectory to account for distance already traveled
			firstFutureIndex -= 1;
		}*/

		for (let i = firstFutureIndex; i < flightRoute.trajectory.length; i++) {
			const trajectory = flightRoute.trajectory[i];
			const segmentDistance = this.getDistanceInMeters(
				prevLat,
				prevLon,
				trajectory.trajectoryCoordinate.latitude,
				trajectory.trajectoryCoordinate.longitude,
			);

			if (cumulativeDistance + segmentDistance >= targetDistance) {
				// Linear interpolation within this segment
				const remainingDistance = targetDistance - cumulativeDistance;
				const ratio = remainingDistance / segmentDistance;
				const timeDiff = trajectory.timestamp - prevTime;
				return prevTime + timeDiff * ratio;
			}

			cumulativeDistance += segmentDistance;
			prevLat = trajectory.trajectoryCoordinate.latitude;
			prevLon = trajectory.trajectoryCoordinate.longitude;
			prevTime = trajectory.timestamp;
		}

		// If target distance is beyond route, return last trajectory time
		return flightRoute.trajectory[flightRoute.trajectory.length - 1].timestamp;
	}

	private getDistanceInMeters(
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number,
	): number {
		const line = lineString([
			[lon1, lat1],
			[lon2, lat2],
		]);
		const length = turfLength(line, { units: "meters" });
		return length;
	}

	getPredictedTrajectory(
		aircraftId: string,
		futureTime: number,
	): number[][] | null {
		const aircraft = this.aircraftStore.aircrafts.get(aircraftId);
		if (!aircraft) {
			return null;
		}

		const currentPosition: [number, number] = [
			aircraft.lastKnownLongitude,
			aircraft.lastKnownLatitude,
		];

		const currentTime = this.simulatorStore.timestamp;

		// Always compute the interpolated position using the corrected anchoring logic
		const futurePosition = this.getAircraftPositionAtTime(
			aircraftId,
			futureTime,
		);
		if (!futurePosition) {
			return null;
		}

		const futureLonLat: [number, number] = [
			futurePosition.lon,
			futurePosition.lat,
		];

		const coords: number[][] = [currentPosition];

		// If we have a flight route, include any intermediate route points between now and futureTime
		const flightRoute = this.aircraftStore.flightRoutes.get(
			aircraft.assignedFlightId,
		);
		if (flightRoute) {
			for (const t of flightRoute.trajectory) {
				if (t.timestamp > currentTime && t.timestamp < futureTime) {
					coords.push([
						t.trajectoryCoordinate.longitude,
						t.trajectoryCoordinate.latitude,
					]);
				}
			}
		}

		// Append future point if it's not (approximately) identical to the last one
		const last = coords[coords.length - 1];
		const EPS = 1e-7; // ~1cm at equator in degrees; good enough for equality check
		if (
			Math.abs(last[0] - futureLonLat[0]) > EPS ||
			Math.abs(last[1] - futureLonLat[1]) > EPS
		) {
			coords.push(futureLonLat);
		}

		return coords.length > 1 ? coords : null;
	}

	private getAircraftPositionAtTime(
		aircraftId: string,
		targetTime: number,
	): { lat: number; lon: number } | null {
		const aircraft = this.aircraftStore.aircrafts.get(aircraftId);
		if (!aircraft) {
			return null;
		}

		const currentPos = {
			lat: aircraft.lastKnownLatitude,
			lon: aircraft.lastKnownLongitude,
		};

		const flightRoute = this.aircraftStore.flightRoutes.get(
			aircraft.assignedFlightId,
		);
		const now = this.simulatorStore.timestamp;

		// If no route or target time is now/past, stick to current position
		if (!flightRoute || targetTime <= now) {
			return { ...currentPos };
		}

		const trajectories = flightRoute.trajectory;
		if (trajectories.length === 0) {
			return { ...currentPos };
		}

		// Find first future trajectory after 'now'
		let firstFutureIndex = -1;
		for (let i = 0; i < trajectories.length; i++) {
			if (trajectories[i].timestamp > now) {
				firstFutureIndex = i;
				break;
			}
		}

		if (firstFutureIndex === -1) {
			// All route points are in the past; use the last known route position
			const last = trajectories[trajectories.length - 1];
			return {
				lat: last.trajectoryCoordinate.latitude,
				lon: last.trajectoryCoordinate.longitude,
			};
		}

		const firstFuture = trajectories[firstFutureIndex];

		// If targetTime is before or at the first future route point, interpolate from current position to that point
		if (targetTime <= firstFuture.timestamp) {
			const total = firstFuture.timestamp - now;
			if (total <= 0) {
				return { ...currentPos };
			}
			const ratio = (targetTime - now) / total;
			return {
				lat:
					currentPos.lat +
					(firstFuture.trajectoryCoordinate.latitude - currentPos.lat) * ratio,
				lon:
					currentPos.lon +
					(firstFuture.trajectoryCoordinate.longitude - currentPos.lon) * ratio,
			};
		}

		// Otherwise, find the bracket [prev, next] that contains targetTime among future route points
		let prev: Trajectory = firstFuture;
		let next: Trajectory | null = null;
		for (let i = firstFutureIndex + 1; i < trajectories.length; i++) {
			const t = trajectories[i];
			if (t.timestamp >= targetTime) {
				next = t;
				break;
			}
			prev = t;
		}

		if (!next) {
			// Beyond the end of route
			return {
				lat: prev.trajectoryCoordinate.latitude,
				lon: prev.trajectoryCoordinate.longitude,
			};
		}

		const dt = next.timestamp - prev.timestamp;
		if (dt <= 0) {
			return {
				lat: prev.trajectoryCoordinate.latitude,
				lon: prev.trajectoryCoordinate.longitude,
			};
		}
		const r = (targetTime - prev.timestamp) / dt;
		return {
			lat:
				prev.trajectoryCoordinate.latitude +
				(next.trajectoryCoordinate.latitude -
					prev.trajectoryCoordinate.latitude) *
					r,
			lon:
				prev.trajectoryCoordinate.longitude +
				(next.trajectoryCoordinate.longitude -
					prev.trajectoryCoordinate.longitude) *
					r,
		};
	}

	/**
	 * Convert trajectory coordinates to geomClosest Polyline
	 * @param coords Array of [lon, lat] coordinates
	 * @returns Polyline (array of Point objects)
	 */
	private trajectoryToPolyline(coords: number[][]): Polyline {
		return coords.map(([lon, lat]) => ({ x: lon, y: lat }));
	}

	/**
	 * Calculate shortest distance between two trajectories
	 * @param trajectory1 First trajectory as [lon, lat][] coordinates
	 * @param trajectory2 Second trajectory as [lon, lat][] coordinates
	 * @returns Distance and shortest segment [distance, {a, b}]
	 */
	getTrajectoryDistance(
		trajectory1: number[][],
		trajectory2: number[][],
	): [number, { a: Point; b: Point }] | null {
		if (trajectory1.length < 2 || trajectory2.length < 2) {
			return null;
		}

		const polyline1 = this.trajectoryToPolyline(trajectory1);
		const polyline2 = this.trajectoryToPolyline(trajectory2);

		const result = closestBetweenPolylines(polyline1, polyline2);
		return [result.distance, { a: result.a, b: result.b }];
	}
}
