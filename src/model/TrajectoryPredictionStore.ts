import { distance } from "@turf/distance";
import { lineString, point } from "@turf/helpers";
import { length as turfLength } from "@turf/length";
import { makeAutoObservable } from "mobx";
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

	/**
	 * When set, this overrides the distance-based futureTime calculation.
	 * Used for timeline drag where we know the exact future time directly.
	 */
	overrideTime: number | null = null;

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

	/**
	 * Set a direct future time, bypassing distance-based calculation.
	 * Used for timeline drag where time is known directly from vertical position.
	 */
	setOverrideTime(time: number | null): void {
		this.overrideTime = time;
	}

	reset(): void {
		this.mainAircraftId = null;
		this.draggedHandleLat = 0;
		this.draggedHandleLon = 0;
		this.mouseLat = 0;
		this.mouseLon = 0;
		this.overrideTime = null;
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

		// If overrideTime is set (e.g., from timeline drag), use it directly
		if (this.overrideTime !== null) {
			return this.overrideTime;
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
	 * Find the Closest Point of Approach (CPA) between two aircraft trajectories.
	 * Uses two-phase search: coarse 1-minute chunks, then fine 1-second resolution.
	 *
	 * @param aircraft1Id First aircraft ID
	 * @param aircraft2Id Second aircraft ID
	 * @returns CPA details or null if no valid trajectories or time overlap
	 */
	findClosestPointOfApproach(
		aircraft1Id: string,
		aircraft2Id: string,
	): {
		time: number;
		distanceNM: number;
		point1: { lat: number; lon: number };
		point2: { lat: number; lon: number };
	} | null {
		const aircraft1 = this.aircraftStore.aircrafts.get(aircraft1Id);
		const aircraft2 = this.aircraftStore.aircrafts.get(aircraft2Id);

		if (!aircraft1 || !aircraft2) {
			return null;
		}

		const flightRoute1 = this.aircraftStore.flightRoutes.get(
			aircraft1.assignedFlightId,
		);
		const flightRoute2 = this.aircraftStore.flightRoutes.get(
			aircraft2.assignedFlightId,
		);

		if (!flightRoute1 || !flightRoute2) {
			return null;
		}

		const currentTime = this.simulatorStore.timestamp;

		// Find end times of both trajectories
		const trajectory1 = flightRoute1.trajectory;
		const trajectory2 = flightRoute2.trajectory;

		if (trajectory1.length === 0 || trajectory2.length === 0) {
			return null;
		}

		const endTime1 = trajectory1[trajectory1.length - 1].timestamp;
		const endTime2 = trajectory2[trajectory2.length - 1].timestamp;

		// Use the shortest trajectory end time
		const endTime = Math.min(endTime1, endTime2);

		// Check if there's time overlap
		if (endTime <= currentTime) {
			return null;
		}

		// Helper function to calculate distance at a given time
		const getDistanceAtTime = (time: number): number | null => {
			const pos1 = this.getAircraftPositionAtTime(aircraft1Id, time);
			const pos2 = this.getAircraftPositionAtTime(aircraft2Id, time);

			if (!pos1 || !pos2) {
				return null;
			}

			const pt1 = point([pos1.lon, pos1.lat]);
			const pt2 = point([pos2.lon, pos2.lat]);

			return distance(pt1, pt2, { units: "nauticalmiles" });
		};

		// Phase 1: Coarse search with 1-minute (60s) chunks
		const COARSE_STEP = 60; // 1 minute in seconds
		let minTime = currentTime;
		let minDistance = Number.POSITIVE_INFINITY;

		for (let t = currentTime; t <= endTime; t += COARSE_STEP) {
			const d = getDistanceAtTime(t);
			if (d !== null && d < minDistance) {
				minDistance = d;
				minTime = t;
			}
		}

		// Also check the end time if it wasn't covered
		const finalDist = getDistanceAtTime(endTime);
		if (finalDist !== null && finalDist < minDistance) {
			minDistance = finalDist;
			minTime = endTime;
		}

		// Phase 2: Fine search within ±1 minute (60s) window
		const FINE_WINDOW = 60; // 1 minute in seconds
		const fineStart = Math.max(currentTime, minTime - FINE_WINDOW);
		const fineEnd = Math.min(endTime, minTime + FINE_WINDOW);

		const FINE_RESOLUTION = 1; // 1 second

		// Sample every second in the fine window
		let finalTime = minTime;
		let finalDistance = minDistance;

		for (let t = fineStart; t <= fineEnd; t += FINE_RESOLUTION) {
			const d = getDistanceAtTime(t);
			if (d !== null && d < finalDistance) {
				finalDistance = d;
				finalTime = t;
			}
		}

		// Get final positions
		const finalPos1 = this.getAircraftPositionAtTime(aircraft1Id, finalTime);
		const finalPos2 = this.getAircraftPositionAtTime(aircraft2Id, finalTime);

		if (!finalPos1 || !finalPos2) {
			return null;
		}

		return {
			time: finalTime,
			distanceNM: finalDistance,
			point1: finalPos1,
			point2: finalPos2,
		};
	}
}
