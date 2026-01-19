import { makeAutoObservable } from "mobx";
import type { AirwaysMessage } from "../proto/ProtobufAirTrafficSimulator";

/** Represents an airway segment connecting two positions */
export interface AirwaySegment {
	fromLat: number;
	fromLon: number;
	toLat: number;
	toLon: number;
}

/**
 * Store for airway segments received from the simulator.
 * Airways are displayed as thin gray lines on the map.
 */
export default class AirwaysStore {
	/** All airway segments */
	segments: AirwaySegment[] = [];

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	/** Handle incoming airways message from MQTT */
	handleAirwaysMessage(message: AirwaysMessage): void {
		this.segments = message.segments.map((segment) => ({
			fromLat: segment.fromLat,
			fromLon: segment.fromLon,
			toLat: segment.toLat,
			toLon: segment.toLon,
		}));
	}

	/** Check if there are any airways to display */
	get hasAirways(): boolean {
		return this.segments.length > 0;
	}
}
