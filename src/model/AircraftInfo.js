import { action, makeObservable, observable } from 'mobx';

export default class AircraftInfo {
  aircraftId = undefined;

  aircraftType = undefined;

  wakeTurbulenceCategory = undefined;

  constructor({
    aircraftId,
    aircraftType,
    wakeTurbulenceCategory,
  }) {
    makeObservable(this, {
      aircraftId: false,
      aircraftType: false,
      wakeTurbulenceCategory: observable,
      setWakeTurbulenceCategory: action,
    });

    this.aircraftId = aircraftId;
    this.aircraftType = aircraftType;
    this.wakeTurbulenceCategory = wakeTurbulenceCategory;
  }

  setWakeTurbulenceCategory(wakeTurbulenceCategory) {
    this.wakeTurbulenceCategory = wakeTurbulenceCategory;
  }
}
