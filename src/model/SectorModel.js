import { makeObservable, observable } from 'mobx';

export default class SectorModel {
  sectorId = undefined;

  bottomFlightLevel = 0;

  topFlightLevel = 0;

  sectorArea = observable.array();

  constructor({
    sectorId,
    bottomFlightLevel,
    topFlightLevel,
    sectorArea,
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
