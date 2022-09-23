import { makeAutoObservable, observable } from 'mobx';

import AltitudeFilter from './AltitudeFilter';

export enum ShowNextConfiguration {
  Automatic = 'Automatic',
  On = 'On',
  Off = 'Off',
}

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

  aircraftsWithSpeedVectors: Set<string> = observable.set(undefined, { deep: false });

  aircraftsWithFlightRoutes: Set<string> = observable.set(undefined, { deep: false });

  aircraftsWithManuallyOpenedPopup: Set<string> = observable.set(undefined, { deep: false });

  aircraftsWithManuallyClosedPopup: Set<string> = observable.set(undefined, { deep: false });

  aircraftsWithLevelPopup: Set<string> = observable.set(undefined, { deep: false });

  aircraftsWithSectorPopup: Set<string> = observable.set(undefined, { deep: false });

  aircraftsWithBearingPopup: Set<string> = observable.set(undefined, { deep: false });

  aircraftsWithNextFixPopup: Set<string> = observable.set(undefined, { deep: false });

  aircraftWithSpeedChangePopup: Set<string> = observable.set(undefined, { deep: false });

  activeMeasurements: Set<string> = observable.set(undefined, { deep: false });

  coordinatesCurrentPolygon: number[][] | undefined = undefined;

  currentDistanceColor = '';

  showLines = false;

  showClickedSector = false;

  clickedSectorId = '';

  highlightedAircraftId = '';

  pseudoPilot = false;

  nextSectorFlActivated = false;

  flightLevelNextAccActivated = false;

  showLimboFlight = false;

  showNextSectorsConfiguration: ShowNextConfiguration = ShowNextConfiguration.Automatic;

  switchBackToAutomaticNextSectorsConfigurationTimeoutId = 0;

  highligtedAircraftIdTimeoutId = 0;

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
      highligtedAircraftIdTimeoutId: false,
      switchBackToAutomaticNextSectorsConfigurationTimeoutId: false,
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

  toggleLimboFlights(): void {
    this.showLimboFlight = !this.showLimboFlight;
  }

  setFlightLabels(boolean: boolean): void {
    this.showFlightLabels = boolean;
  }

  openPopupForAircraft(aircraftId: string): void {
    this.aircraftsWithManuallyOpenedPopup.add(aircraftId);
    this.aircraftsWithManuallyClosedPopup.delete(aircraftId);
  }

  closePopupForAircraft(aircraftId: string): void {
    this.aircraftsWithManuallyOpenedPopup.delete(aircraftId);
    this.aircraftsWithManuallyClosedPopup.add(aircraftId);
    this.closeAllSubPopupsForAircraft(aircraftId);
  }

  closeAllSubPopupsForAircraft(aircraftId: string): void {
    this.closeLevelPopupForAircraft(aircraftId);
    this.closeNextSectorPopupForAircraft(aircraftId);
    this.closeChangeBearingForAircraft(aircraftId);
    this.closeChangeNextFixForAircraft(aircraftId);
    this.closeChangeSpeedForAircraft(aircraftId);
  }

  openLevelPopupForAircraft(aircraftId: string): void {
    this.closeAllSubPopupsForAircraft(aircraftId);
    this.aircraftsWithLevelPopup.add(aircraftId);
  }

  closeLevelPopupForAircraft(aircraftId: string): void {
    this.aircraftsWithLevelPopup.delete(aircraftId);
  }

  openNextSectorPopupForAircraft(aircraftId: string): void {
    this.closeAllSubPopupsForAircraft(aircraftId);
    this.aircraftsWithSectorPopup.add(aircraftId);
  }

  closeNextSectorPopupForAircraft(aircraftId: string): void {
    this.aircraftsWithSectorPopup.delete(aircraftId);
  }

  openChangeBearingForAircraft(aircraftId: string): void {
    this.closeAllSubPopupsForAircraft(aircraftId);
    this.aircraftsWithBearingPopup.add(aircraftId);
  }

  closeChangeBearingForAircraft(aircraftId: string): void {
    this.aircraftsWithBearingPopup.delete(aircraftId);
  }

  openChangeNextFixForAircraft(aircraftId: string): void {
    this.closeAllSubPopupsForAircraft(aircraftId);
    this.aircraftsWithNextFixPopup.add(aircraftId);
  }

  closeChangeNextFixForAircraft(aircraftId: string): void {
    this.aircraftsWithNextFixPopup.delete(aircraftId);
  }

  openChangeSpeedForAircraft(aircraftId: string): void {
    this.closeAllSubPopupsForAircraft(aircraftId);
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

  setCurrentDistanceColor(color: string): void {
    this.currentDistanceColor = color;
  }

  unsetCurrentDistanceColor(): void {
    this.currentDistanceColor = '';
  }

  setShowLine(boolean: boolean): void {
    this.showLines = boolean;
  }

  getShowLine(): boolean {
    return this.showLines;
  }

  toggleClickedSector(): void {
    this.showClickedSector = !this.showClickedSector;
  }

  setShowClickedSector(boolean: boolean): void {
    this.showClickedSector = boolean;
  }

  setClickedSectorId(sectorId: string): void {
    this.clickedSectorId = sectorId;
  }

  setHighlightedAircraftId(aircraftId: string): void {
    this.highlightedAircraftId = aircraftId;
    if (this.highligtedAircraftIdTimeoutId !== 0) {
      window.clearTimeout(this.highligtedAircraftIdTimeoutId);
      this.highligtedAircraftIdTimeoutId = 0;
    }
    if (aircraftId !== '') {
      this.highligtedAircraftIdTimeoutId = window.setTimeout(() => {
        this.setHighlightedAircraftId('');
        this.highligtedAircraftIdTimeoutId = 0;
      }, 10_000); // How long to highlight aircraft?
    }
  }

  setPseudoPilot(value: boolean): void {
    this.pseudoPilot = value;
  }

  showNSFL(value: boolean): void {
    this.nextSectorFlActivated = value;
  }

  showFlACC(value: boolean): void {
    this.flightLevelNextAccActivated = value;
  }

  setCurrentPolygonCoordinates(coordinates: number[][]): void {
    this.coordinatesCurrentPolygon = coordinates;
  }

  toggleShowNextSectorsConfiguration(): void {
    if (this.switchBackToAutomaticNextSectorsConfigurationTimeoutId) {
      window.clearTimeout(this.switchBackToAutomaticNextSectorsConfigurationTimeoutId);
      this.switchBackToAutomaticNextSectorsConfigurationTimeoutId = 0;
    }
    switch (this.showNextSectorsConfiguration) {
      case ShowNextConfiguration.Off:
      case ShowNextConfiguration.Automatic:
        this.showNextSectorsConfiguration = ShowNextConfiguration.On;
        this.switchBackToAutomaticNextSectorsConfiguration();
        break;
      case ShowNextConfiguration.On:
        this.showNextSectorsConfiguration = ShowNextConfiguration.Off;
        this.switchBackToAutomaticNextSectorsConfiguration();
        break;
      default:
        throw new Error('Invalid showNextSectorsConfiguration');
    }
  }

  setAutomaticNextSectorsConfiguration(): void {
    this.showNextSectorsConfiguration = ShowNextConfiguration.Automatic;
  }

  protected switchBackToAutomaticNextSectorsConfiguration(): void {
    // Automatically revert back to automatic mode after 30s
    this.switchBackToAutomaticNextSectorsConfigurationTimeoutId = window.setTimeout(() => {
      this.switchBackToAutomaticNextSectorsConfigurationTimeoutId = 0;
      this.setAutomaticNextSectorsConfiguration();
    }, 30_000);
  }
}
