import { makeObservable, observable } from 'mobx';

import type CoordinatePair from './CoordinatePair';

export default class AirspaceModel {
  airspaceId: string;

  airspaceArea: CoordinatePair[];

  constructor({
    airspaceId,
    airspaceArea,
  }: {
    airspaceId: string;
    airspaceArea: CoordinatePair[];
  }) {
    makeObservable(this, {
      airspaceId: false, // ID is not observable
      airspaceArea: observable,
    });
    this.airspaceId = airspaceId;
    this.airspaceArea = airspaceArea;
  }
}
