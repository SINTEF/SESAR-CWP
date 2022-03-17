import { makeAutoObservable } from 'mobx';

import AltitudeFilter from './AltitudeFilter';

export default class CWPStore {
  altitudeFilter = undefined;

  showFlightLabels = true;

  showSFL = true;

  showFL = true;

  constructor({
    altitudeFilter,
  }) {
    makeAutoObservable(this, {
      altitudeFilter: false,
    }, { autoBind: true });
    this.altitudeFilter = new AltitudeFilter(altitudeFilter);
  }

  toggleFlightLabels() {
    this.showFlightLabels = !this.showFlightLabels;
  }

  toggleSFL() {
    this.showSFL = !this.showSFL;
  }

  toggleFL() {
    this.showFL = !this.showFL;
  }
}
