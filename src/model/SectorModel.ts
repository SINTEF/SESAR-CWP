import { action, makeObservable, observable } from 'mobx';

import type CoordinatePair from './CoordinatePair';
import type { ISectorModel } from './ISectorModel';

export default class SectorModel implements ISectorModel {
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
      updateSectorArea: action,
      updateFlightLevels: action,
    });
    this.sectorId = sectorId;
    this.bottomFlightLevel = bottomFlightLevel;
    this.topFlightLevel = topFlightLevel;
    this.sectorArea = sectorArea;
  }

  updateSectorArea(newSectorArea: CoordinatePair[]): void {
    this.sectorArea = observable.array(newSectorArea, { deep: false });
  }

  updateFlightLevels(newBottomFlightLevel: number, newTopFlightLevel: number): void {
    this.bottomFlightLevel = newBottomFlightLevel;
    this.topFlightLevel = newTopFlightLevel;
  }
}
