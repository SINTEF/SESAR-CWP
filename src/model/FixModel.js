// import { makeObservable, observable } from 'mobx';

export default class FixModel {
  pointId = undefined;

  latitude = 0;

  longitude = 0;

  constructor({
    pointId,
    latitude,
    longitude,
  }) {
    /* makeObservable(this, {
      pointId: false, // ID is not observable
      latitude: observable,
      longitude: observable,
    }); */
    this.pointId = pointId;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
