export default class Trajectory {
  trajectoryCoordinate = undefined;

  timestamp = undefined;

  // Optional id of the object (fixed point name)
  objectId = undefined;

  constructor({
    trajectoryCoordinate,
    timestamp,
    objectId = undefined,
  }) {
    this.trajectoryCoordinate = trajectoryCoordinate;
    this.timestamp = timestamp;
    this.objectId = objectId;
  }
}
