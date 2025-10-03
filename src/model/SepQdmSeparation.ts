import { distance } from "@turf/distance";
import { point } from "@turf/helpers";
import { computed, makeObservable, observable } from "mobx";
import type AircraftStore from "./AircraftStore";
import type TrajectoryPredictionStore from "./TrajectoryPredictionStore";

export type SeparationType = "qdm" | "sep";

export default class SepQdmSeparation {
	fromId: string;
	toId: string;
	type: SeparationType;

	aircraftStore: AircraftStore;
	trajectoryPredictionStore: TrajectoryPredictionStore;

	constructor({
		fromId,
		toId,
		type,
		aircraftStore,
		trajectoryPredictionStore,
	}: {
		fromId: string;
		toId: string;
		type: SeparationType;
		aircraftStore: AircraftStore;
		trajectoryPredictionStore: TrajectoryPredictionStore;
	}) {
		this.fromId = fromId;
		this.toId = toId;
		this.type = type;
		this.aircraftStore = aircraftStore;
		this.trajectoryPredictionStore = trajectoryPredictionStore;

		makeObservable(this, {
			fromId: observable,
			toId: observable,
			type: observable,
			aircraftStore: false,
			trajectoryPredictionStore: false,
			fromAircraft: computed,
			toAircraft: computed,
			isValid: computed,
			startPosition: computed,
			endPosition: computed,
			midpoint: computed,
			distanceNM: computed,
			lineGeoJSON: computed,
			color: computed,
		});
	}

	get fromAircraft() {
		return this.aircraftStore.aircrafts.get(this.fromId);
	}

	get toAircraft() {
		return this.aircraftStore.aircrafts.get(this.toId);
	}

	get isValid(): boolean {
		return this.fromAircraft !== undefined && this.toAircraft !== undefined;
	}

	get startPosition(): [number, number] | null {
		if (!this.fromAircraft) {
			return null;
		}

		// For SEP type, use trajectory distance calculation
		if (this.type === "sep") {
			const trajectorySegment = this.getTrajectorySegment();
			if (trajectorySegment) {
				return [trajectorySegment.start.x, trajectorySegment.start.y];
			}
		}

		// For QDM type, use aircraft position
		return [
			this.fromAircraft.lastKnownLongitude,
			this.fromAircraft.lastKnownLatitude,
		];
	}

	get endPosition(): [number, number] | null {
		if (!this.toAircraft) {
			return null;
		}

		// For SEP type, use trajectory distance calculation
		if (this.type === "sep") {
			const trajectorySegment = this.getTrajectorySegment();
			if (trajectorySegment) {
				return [trajectorySegment.end.x, trajectorySegment.end.y];
			}
		}

		// For QDM type, use aircraft position
		return [
			this.toAircraft.lastKnownLongitude,
			this.toAircraft.lastKnownLatitude,
		];
	}

	/**
	 * Get trajectory segment for SEP type separation
	 * Returns the shortest segment between two aircraft trajectories
	 */
	private getTrajectorySegment(): {
		start: { x: number; y: number };
		end: { x: number; y: number };
	} | null {
		// Get trajectories for both aircraft
		// Use the computed future time from trajectory prediction if available,
		// otherwise use a reasonable future time window (e.g., 10 minutes = 600 seconds)
		const currentTime = this.aircraftStore.simulatorStore.timestamp;
		const futureTime = currentTime + 600;

		const trajectory1 =
			this.trajectoryPredictionStore.getPredictedTrajectory(
				this.fromId,
				futureTime,
			);
		const trajectory2 = this.trajectoryPredictionStore.getPredictedTrajectory(
			this.toId,
			futureTime,
		);

		if (!trajectory1 || !trajectory2) {
			return null;
		}

		const result = this.trajectoryPredictionStore.getTrajectoryDistance(
			trajectory1,
			trajectory2,
		);
		if (!result) {
			return null;
		}

		const [, segment] = result;
		return { start: segment.a, end: segment.b };
	}

	get midpoint(): [number, number] | null {
		const start = this.startPosition;
		const end = this.endPosition;
		if (!start || !end) {
			return null;
		}
		return [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
	}

	get distanceNM(): number | null {
		const start = this.startPosition;
		const end = this.endPosition;
		if (!start || !end) {
			return null;
		}

		// Calculate distance between start and end points using Turf
		const point1 = point(start);
		const point2 = point(end);
		return distance(point1, point2, { units: "nauticalmiles" });
	}

	get lineGeoJSON(): GeoJSON.Feature<GeoJSON.LineString> | null {
		const start = this.startPosition;
		const end = this.endPosition;
		if (!start || !end) {
			return null;
		}

		return {
			type: "Feature",
			geometry: {
				type: "LineString",
				coordinates: [start, end],
			},
			properties: {
				fromId: this.fromId,
				toId: this.toId,
				type: this.type,
			},
		};
	}

	get color(): string {
		return this.type === "qdm" ? "#FF8C00" : "#0000FF";
	}
}
