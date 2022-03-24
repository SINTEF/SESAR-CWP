import { makeAutoObservable, observable } from 'mobx';

import AltitudeFilter from './AltitudeFilter';

export default class CWPStore {
  altitudeFilter = undefined;

  showFlightLabels = true;

  showSectorLabels = true;

  showSFL = true;

  showFL = true;

  showFILT = false;

  showFixes = true;

  showControllerSelection = true;

  aircraftsWithSpeedVectors = observable.set();

  aircraftsWithFlightRoutes = observable.set();

  aircraftsWithManuallyOpenedPopup = observable.set();

  aircraftsWithManuallyClosedPopup = observable.set();

  aircraftsWithLevelPopup = observable.set();

  constructor({
    altitudeFilter,
  }) {
    makeAutoObservable(this, {
      altitudeFilter: false,
    }, { autoBind: true });
    this.altitudeFilter = new AltitudeFilter(altitudeFilter);
  }

  toggleFixes() {
    this.showFixes = !this.showFixes;
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

  toggleFILT() {
    this.showFILT = !this.showFILT;
  }

  toggleControllerSelection() {
    this.showControllerSelection = !this.showControllerSelection;
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

  toggleFlightLabels() {
    this.showFlightLabels = !this.showFlightLabels;
  }

  openPopupForAircraft(aircraftId) {
    this.aircraftsWithManuallyOpenedPopup.add(aircraftId);
    this.aircraftsWithManuallyClosedPopup.delete(aircraftId);
  }

  closePopupForAircraft(aircraftId) {
    this.aircraftsWithManuallyOpenedPopup.delete(aircraftId);
    this.aircraftsWithManuallyClosedPopup.add(aircraftId);
  }

  openLevelPopupForAircraft(aircraftId) {
    this.aircraftsWithLevelPopup.add(aircraftId);
  }

  closeLevelPopupForAircraft(aircraftId) {
    this.aircraftsWithLevelPopup.delete(aircraftId);
  }
}
