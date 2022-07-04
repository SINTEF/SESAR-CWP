import { makeAutoObservable } from 'mobx';

import AltitudeFilter from './AltitudeFilter';

export default class CWPStore {
  altitudeFilter: AltitudeFilter;

  speedVectorMinutes = 3;

  showFlightLabels = true;

  showSectorLabels = true;

  showSFL = true;

  showFL = true;

  showFILT = false;

  showFixes = true;

  showControllerSelection = true;

  aircraftsWithSpeedVectors: Set<string> = new Set();

  aircraftsWithFlightRoutes: Set<string> = new Set();

  aircraftsWithManuallyOpenedPopup: Set<string> = new Set();

  aircraftsWithManuallyClosedPopup: Set<string> = new Set();

  aircraftsWithLevelPopup: Set<string> = new Set();

  aircraftsWithSectorPopup: Set<string> = new Set();

  aircraftsWithBearingPopup: Set<string> = new Set();

  aircraftsWithNextFixPopup: Set<string> = new Set();

  aircraftWithSpeedChangePopup: Set<string> = new Set();

  activeMeasurements: Set<string> = new Set();

  currentActive = '';

  showLines = false;

  currentColoringString = '';

  showClickedSector = false;

  clickedSectorId = '';

  constructor({
    altitudeFilter,
  }: {
    altitudeFilter: {
      lowestBound: number;
      highestBound: number;
    }
  }) {
    makeAutoObservable(this, {
      altitudeFilter: false,
    }, { autoBind: true });
    this.altitudeFilter = new AltitudeFilter(altitudeFilter);
  }

  toggleFixes(): void {
    this.showFixes = !this.showFixes;
  }

  toggleSectorLabels(): void {
    this.showSectorLabels = !this.showSectorLabels;
  }

  toggleSFL(): void {
    this.showSFL = !this.showSFL;
  }

  toggleFL(): void {
    this.showFL = !this.showFL;
  }

  toggleFILT(): void {
    this.showFILT = !this.showFILT;
  }

  toggleControllerSelection(): void {
    this.showControllerSelection = !this.showControllerSelection;
  }

  toggleSpeedVectorForAircraft(aircraftId: string): void {
    if (this.aircraftsWithSpeedVectors.has(aircraftId)) {
      this.aircraftsWithSpeedVectors.delete(aircraftId);
    } else {
      this.aircraftsWithSpeedVectors.add(aircraftId);
    }
  }

  toggleFlightRouteForAircraft(aircraftId: string): void {
    if (this.aircraftsWithFlightRoutes.has(aircraftId)) {
      this.aircraftsWithFlightRoutes.delete(aircraftId);
    } else {
      this.aircraftsWithFlightRoutes.add(aircraftId);
    }
  }

  toggleFlightLabels(): void {
    this.showFlightLabels = !this.showFlightLabels;
  }

  openPopupForAircraft(aircraftId: string): void {
    this.aircraftsWithManuallyOpenedPopup.add(aircraftId);
    this.aircraftsWithManuallyClosedPopup.delete(aircraftId);
  }

  closePopupForAircraft(aircraftId: string): void {
    this.aircraftsWithManuallyOpenedPopup.delete(aircraftId);
    this.aircraftsWithManuallyClosedPopup.add(aircraftId);
  }

  openLevelPopupForAircraft(aircraftId: string): void {
    this.aircraftsWithLevelPopup.add(aircraftId);
  }

  closeLevelPopupForAircraft(aircraftId: string): void {
    this.aircraftsWithLevelPopup.delete(aircraftId);
  }

  openNextSectorPopupForAircraft(aircraftId: string): void {
    this.aircraftsWithSectorPopup.add(aircraftId);
  }

  closeNextSectorPopupForAircraft(aircraftId: string): void {
    this.aircraftsWithSectorPopup.delete(aircraftId);
  }

  openChangeBearingForAircraft(aircraftId: string): void {
    this.aircraftsWithBearingPopup.add(aircraftId);
  }

  closeChangeBearingForAircraft(aircraftId: string): void {
    this.aircraftsWithBearingPopup.delete(aircraftId);
  }

  openChangeNextFixForAircraft(aircraftId: string): void {
    this.aircraftsWithNextFixPopup.add(aircraftId);
  }

  closeChangeNextFixForAircraft(aircraftId: string): void {
    this.aircraftsWithNextFixPopup.delete(aircraftId);
  }

  openChangeSpeedForAircraft(aircraftId: string): void {
    this.aircraftWithSpeedChangePopup.add(aircraftId);
  }

  closeChangeSpeedForAircraft(aircraftId: string): void {
    this.aircraftWithSpeedChangePopup.delete(aircraftId);
  }

  setSpeedVectorMinutes(value: number): void {
    this.speedVectorMinutes = value;
  }

  toggleDistanceMeasurement(distanceId: string): void {
    if (this.activeMeasurements.has(distanceId)) {
      this.activeMeasurements.delete(distanceId);
    } else {
      this.activeMeasurements.add(distanceId);
    }
  }

  addDistanceMeasurement(distanceId: string): void {
    this.activeMeasurements.add(distanceId);
  }

  setCurrentActiveMeasuring(distanceId: string): void {
    this.currentActive = distanceId;
  }

  getCurrentActiveMeasuring(): string {
    return this.currentActive;
  }

  setShowLine(boolean: boolean): void {
    this.showLines = boolean;
  }

  getShowLine(): boolean {
    return this.showLines;
  }

  setCurrentColoringString(color: string): void {
    this.currentColoringString = color;
  }

  toggleClickedSector(): void {
    this.showClickedSector = !this.showClickedSector;
  }

  setClickedSectorId(sectorId: string): void {
    this.clickedSectorId = sectorId;
  }
}
