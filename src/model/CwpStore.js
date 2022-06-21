import { makeAutoObservable, observable } from 'mobx';

import AltitudeFilter from './AltitudeFilter';

export default class CWPStore {
  altitudeFilter = undefined;

  speedVectorMinutes = 3;

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

  aircraftsWithSectorPopup = observable.set();

  aircraftsWithBearingPopup = observable.set();

  activeMeasurements = observable.set();

  currentActive = '';

  showLines = false;

  currentColoringString = '';

  showClickedSector = false;

  clickedSectorId = '';

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

  openNextSectorPopupForAircraft(aircraftId) {
    this.aircraftsWithSectorPopup.add(aircraftId);
  }

  closeNextSectorPopupForAircraft(aircraftId) {
    this.aircraftsWithSectorPopup.delete(aircraftId);
  }

  openChangeBearingForAircraft(aircraftId) {
    this.aircraftsWithBearingPopup.add(aircraftId);
  }

  closeChangeBearingForAircraft(aircraftId) {
    this.aircraftsWithBearingPopup.delete(aircraftId);
  }

  setSpeedVectorMinutes(value) {
    this.speedVectorMinutes = value;
  }

  toggleDistanceMeasurement(distanceId) {
    if (this.activeMeasurements.has(distanceId)) {
      this.activeMeasurements.delete(distanceId);
    } else {
      this.activeMeasurements.add(distanceId);
    }
  }

  addDistanceMeasurement(distanceId) {
    this.activeMeasurements.add(distanceId);
  }

  setCurrentActiveMeasuring(distanceId) {
    this.currentActive = distanceId;
  }

  getCurrentActiveMeasuring() {
    return this.currentActive;
  }

  setShowLine(boolean) {
    this.showLines = boolean;
  }

  getShowLine() {
    return this.showLines;
  }

  setCurrentColoringString(color) {
    this.currentColoringString = color;
  }

  toggleClickedSector() {
    this.showClickedSector = !this.showClickedSector;
  }

  setClickedSectorId(sectorId) {
    this.clickedSectorId = sectorId;
  }
}
