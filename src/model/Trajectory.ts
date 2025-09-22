import type CoordinatePair from "./CoordinatePair";

export default class Trajectory {
	trajectoryCoordinate: CoordinatePair;

	timestamp: number;

	// Optional id of the object (fixed point name)
	objectId?: string;

	constructor({
		trajectoryCoordinate,
		timestamp,
		objectId = undefined,
	}: {
		trajectoryCoordinate: CoordinatePair;
		timestamp: number;
		objectId?: string;
	}) {
		this.trajectoryCoordinate = trajectoryCoordinate;
		this.timestamp = timestamp;
		this.objectId = objectId;
	}
}
