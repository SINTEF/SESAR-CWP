import { makeObservable, observable } from 'mobx';

export default class AircraftInfo {
  aircraftId = undefined;

  wakeTurbulence = undefined;

  constructor({
    aircraftId,
    wakeTurbulence,
  }) {
    makeObservable(this, {
      aircraftId: observable,
      wakeTurbulence: observable,
    });
    this.aircraftId = aircraftId;
    this.wakeTurbulence = wakeTurbulence;
  }
}
