import { makeObservable, observable } from 'mobx';

export default class FlightRoute {
  flightId = undefined;

  trajectory = observable.array();

  trajectoryId = undefined;

  constructor(flightRoute) {
    makeObservable(this, {
      flightId: false,
      trajectory: observable,
      trajectoryId: observable,
    });
    this.flightId = flightRoute.flightId;
    this.trajectory = flightRoute.trajectory;
    this.trajectoryId = flightRoute.trajectoryId;
  }
}
