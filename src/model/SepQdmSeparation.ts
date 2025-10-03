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
			cpaResult: computed,
			cpaTime: computed,
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

	/**
	 * Cached CPA result for both SEP and QDM type separations.
	 * MobX computed property ensures this is only recalculated when dependencies change.
	 */
	get cpaResult(): {
		time: number;
		distanceNM: number;
		point1: { lat: number; lon: number };
		point2: { lat: number; lon: number };
	} | null {
		return this.trajectoryPredictionStore.findClosestPointOfApproach(
			this.fromId,
			this.toId,
		);
	}

	/**
	 * Get CPA time relative to current time (in seconds from now).
	 * Returns null if no CPA available.
	 */
	get cpaTime(): number | null {
		const cpa = this.cpaResult;
		if (!cpa) {
			return null;
		}

		const currentTime = this.aircraftStore.simulatorStore.timestamp;
		return cpa.time - currentTime;
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
	 * Returns the closest point of approach between two aircraft trajectories
	 * Uses cached cpaResult to avoid duplicate calculations
	 */
	private getTrajectorySegment(): {
		start: { x: number; y: number };
		end: { x: number; y: number };
	} | null {
		const cpa = this.cpaResult;

		if (!cpa) {
			return null;
		}

		return {
			start: { x: cpa.point1.lon, y: cpa.point1.lat },
			end: { x: cpa.point2.lon, y: cpa.point2.lat },
		};
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
		// Both SEP and QDM lines use color based on CPA distance
		const cpa = this.cpaResult;
		if (!cpa) {
			// Fallback colors when no CPA available
			return this.type === "qdm" ? "#9370DB" : "#FF69B4";
		}

		const cpaDistance = cpa.distanceNM;

		// Red below 6 NM, yellow below 9 NM
		if (cpaDistance < 6) {
			return "#FF0000"; // Red
		}
		if (cpaDistance < 9) {
			return "#FFFF00"; // Yellow
		}

		// Purple for QDM when safe, pink for SEP when safe
		return this.type === "qdm" ? "#9370DB" : "#FF69B4";
	}
}
