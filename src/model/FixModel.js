// import { makeObservable, observable } from 'mobx';

import { makeObservable, observable } from 'mobx';

export default class FixModel {
  pointId = undefined;

  latitude = 0;

  longitude = 0;

  sectorFlightList = observable.map();

  constructor({
    pointId,
    latitude,
    longitude,
  }) {
    makeObservable(this, {
      pointId: false,
      latitude: false,
      longitude: false,
      sectorFlightList: observable,
    });
    this.pointId = pointId;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
