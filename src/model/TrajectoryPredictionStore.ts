import { lineString } from "@turf/helpers";
import { length as turfLength } from "@turf/length";
import { makeAutoObservable } from "mobx";
import type AircraftStore from "./AircraftStore";
import type SimulatorStore from "./SimulatorStore";
import type Trajectory from "./Trajectory";

export interface TrajectoryPredictionData {
	readonly mainAircraftId: string | null;
	readonly draggedHandleLat: number;
	readonly draggedHandleLon: number;
	readonly futureTime: number | null;
}

export default class TrajectoryPredictionStore {
	enabled = false;

	mainAircraftId: string | null = null;

	draggedHandleLat = 0;

	draggedHandleLon = 0;

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

	reset(): void {
		this.mainAircraftId = null;
		this.draggedHandleLat = 0;
		this.draggedHandleLon = 0;
	}

	get predictionData(): TrajectoryPredictionData {
		return {
			mainAircraftId: this.mainAircraftId,
			draggedHandleLat: this.draggedHandleLat,
			draggedHandleLon: this.draggedHandleLon,
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

		// Get future trajectories
		const futureTrajectories = flightRoute.trajectory.filter(
			(t) => t.timestamp >= this.simulatorStore.timestamp,
		);

		if (futureTrajectories.length === 0) {
			return null;
		}

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
		let prevTime = this.simulatorStore.timestamp;

		for (const trajectory of futureTrajectories) {
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
		return futureTrajectories[futureTrajectories.length - 1].timestamp;
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

	getAircraftPositionAtTime(
		aircraftId: string,
		targetTime: number,
	): { lat: number; lon: number } | null {
		const aircraft = this.aircraftStore.aircrafts.get(aircraftId);
		if (!aircraft) {
			return null;
		}

		const flightRoute = this.aircraftStore.flightRoutes.get(
			aircraft.assignedFlightId,
		);
		if (!flightRoute) {
			// If no flight route, return current position
			return {
				lat: aircraft.lastKnownLatitude,
				lon: aircraft.lastKnownLongitude,
			};
		}

		const currentTime = this.simulatorStore.timestamp;

		// If target time is in the past or present, return current position
		if (targetTime <= currentTime) {
			return {
				lat: aircraft.lastKnownLatitude,
				lon: aircraft.lastKnownLongitude,
			};
		}

		// Find the trajectory points that bracket the target time
		const trajectories = flightRoute.trajectory;
		let prevTrajectory: Trajectory | null = null;
		let nextTrajectory: Trajectory | null = null;

		for (const trajectory of trajectories) {
			if (trajectory.timestamp <= targetTime) {
				prevTrajectory = trajectory;
			} else {
				nextTrajectory = trajectory;
				break;
			}
		}

		// If we're before all trajectories, use current position
		if (!prevTrajectory) {
			return {
				lat: aircraft.lastKnownLatitude,
				lon: aircraft.lastKnownLongitude,
			};
		}

		// If we're after all trajectories, use last trajectory position
		if (!nextTrajectory) {
			return {
				lat: prevTrajectory.trajectoryCoordinate.latitude,
				lon: prevTrajectory.trajectoryCoordinate.longitude,
			};
		}

		// Linear interpolation between prev and next
		const timeDiff = nextTrajectory.timestamp - prevTrajectory.timestamp;
		const timeRatio = (targetTime - prevTrajectory.timestamp) / timeDiff;

		const lat =
			prevTrajectory.trajectoryCoordinate.latitude +
			(nextTrajectory.trajectoryCoordinate.latitude -
				prevTrajectory.trajectoryCoordinate.latitude) *
				timeRatio;
		const lon =
			prevTrajectory.trajectoryCoordinate.longitude +
			(nextTrajectory.trajectoryCoordinate.longitude -
				prevTrajectory.trajectoryCoordinate.longitude) *
				timeRatio;

		return { lat, lon };
	}
}
