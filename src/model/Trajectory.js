export default class Trajectory {
  trajectoryCoordinate = undefined;

  timestamp = undefined;

  constructor({
    trajectoryCoordinate,
    timestamp,
  }) {
    this.trajectoryCoordinate = trajectoryCoordinate;
    this.timestamp = timestamp;
  }
}
