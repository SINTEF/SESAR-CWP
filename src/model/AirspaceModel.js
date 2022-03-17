import { makeObservable, observable } from 'mobx';

export default class AirspaceModel {
  airspaceId = undefined;

  airspaceArea = undefined;

  constructor({
    airspaceId,
    airspaceArea,
  }) {
    makeObservable(this, {
      airspaceId: false, // ID is not observable
      airspaceArea: observable,
    });
    this.airspaceId = airspaceId;
    this.airspaceArea = airspaceArea;
  }
}
