import { makeAutoObservable, observable } from 'mobx';

import AltitudeFilter from './AltitudeFilter';

export default class CWPStore {
  altitudeFilter = undefined;

  showFlightLabels = true;

  showSectorLabels = true;

  showSFL = true;

  showFL = true;

  aircraftsWithSpeedVectors = observable.set();

  aircraftsWithFlightRoutes = observable.set();

  aircraftsWithPopups = observable.set();

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

  toggleSectorLabels() {
    this.showSectorLabels = !this.showSectorLabels;
  }

  toggleSFL() {
    this.showSFL = !this.showSFL;
  }

  toggleFL() {
    this.showFL = !this.showFL;
  }

  toggleSpeedVectorForAircraft(aircraftId) {
    if (this.aircraftsWithSpeedVectors.has(aircraftId)) {
      this.aircraftsWithSpeedVectors.delete(aircraftId);
    } else {
      this.aircraftsWithSpeedVectors.add(aircraftId);
    }
  }

  toggleFlightRouteForAircraft(aircraftId) {
    if (this.aircraftsWithFlightRoutes.has(aircraftId)) {
      this.aircraftsWithFlightRoutes.delete(aircraftId);
    } else {
      this.aircraftsWithFlightRoutes.add(aircraftId);
    }
  }

  openPopupForAircraft(aircraftId) {
    // If all labels are hidden and we open a new label,
    // we consider that we don't want to see the old labels.
    if (!this.showFlightLabels) {
      this.showFlightLabels = true;
      this.aircraftsWithPopups.clear();
    }
    this.aircraftsWithPopups.add(aircraftId);
  }

  closePopupForAircraft(aircraftId) {
    this.aircraftsWithPopups.delete(aircraftId);
  }
}
