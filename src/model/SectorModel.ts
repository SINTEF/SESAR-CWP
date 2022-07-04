import { makeObservable, observable } from 'mobx';

import type CoordinatePair from './CoordinatePair';

export default class SectorModel {
  sectorId: string;

  bottomFlightLevel = 0;

  topFlightLevel = 0;

  sectorArea: CoordinatePair[] = [];

  constructor({
    sectorId,
    bottomFlightLevel,
    topFlightLevel,
    sectorArea,
  }: {
    sectorId: string;
    bottomFlightLevel: number;
    topFlightLevel: number;
    sectorArea: CoordinatePair[];
  }) {
    makeObservable(this, {
      sectorId: false, // ID is not observable
      bottomFlightLevel: observable,
      topFlightLevel: observable,
      sectorArea: observable,
    });
    this.sectorId = sectorId;
    this.bottomFlightLevel = bottomFlightLevel;
    this.topFlightLevel = topFlightLevel;
    this.sectorArea = sectorArea;
  }
}
