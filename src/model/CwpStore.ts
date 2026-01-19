import type { ObservableMap, ObservableSet } from "mobx";
import { makeAutoObservable, observable } from "mobx";

import AltitudeFilter from "./AltitudeFilter";

export enum ShowNextConfiguration {
	Automatic = "Automatic",
	On = "On",
	Off = "Off",
}

/** Warning levels for aircraft, affects VV line and icon color */
export type WarningLevel = "none" | "blue" | "orange" | "yellow";

/** Order of warning levels for cycling */
const WARNING_LEVEL_ORDER: WarningLevel[] = [
	"none",
	"blue",
	"orange",
	"yellow",
];

/** Color mapping for warning levels */
export const WARNING_LEVEL_COLORS: Record<WarningLevel, string | null> = {
	none: null, // null means use default color
	blue: "#00BFFF", // Deep sky blue
	orange: "#FFA500", // Orange
	yellow: "#FFFF00", // Yellow
};

/**
 * Flight label color categories based on aircraft control state.
 * Priority (highest to lowest): WHITE > LIGHT_GREEN > GREEN > GREY
 *
 * - WHITE: Currently controlled by the ATCO's sector (accepted)
 * - LIGHT_GREEN: About to enter the sector within the configured time window (anticipated, imminent)
 * - GREEN: Has information about entering the sector (anticipated)
 * - GREY: Not of interest (no sector entry info or already exited)
 */
export type FlightLabelColorCategory =
	| "white"
	| "lightGreen"
	| "green"
	| "grey";

/** Color mapping for flight label categories */
export const FLIGHT_LABEL_COLORS: Record<FlightLabelColorCategory, string> = {
	white: "#FFFFFF", // Currently controlled
	lightGreen: "#CCFF00", // Light green - imminent entry (configurable time window)
	green: "#78e251", // Green - anticipated entry
	grey: "#888888", // Grey - not of interest (semi-transparent grey)
};

export default class CWPStore {
	altitudeFilter: AltitudeFilter;

	speedVectorMinutes = 3;

	/**
	 * Time window in minutes before sector entry for LIGHT_GREEN color.
	 * Aircraft that will enter the sector within this time window
	 * are shown in light green (imminent entry).
	 */
	lightGreenTimeWindowMinutes = 3;

	showFlightLabels = true;

	showSectorLabels = false;

	showFlightLabelsForCurrentSector = true;

	showFlightLabelsForOtherSectors = true;

	showSFL = true;

	showFL = true;

	showFILT = false;

	showFixes = false;

	showAirways = false;

	showVerticalWindow = false; /* should be true by default, if you see this, Antoine made a mistake by pushing this change */

	showControllerSelection = true;

	showSpeedVectors = false;

	aircraftsWithSpeedVectors: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	/** Warning levels for aircraft (local only, not synced over MQTT) */
	aircraftWarningLevels: ObservableMap<string, WarningLevel> = observable.map(
		undefined,
		{ deep: false },
	);

	aircraftsWithFlightRoutes: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	aircraftsWithManuallyOpenedPopup: ObservableSet<string> = observable.set(
		undefined,
		{ deep: false },
	);

	aircraftsWithManuallyClosedPopup: ObservableSet<string> = observable.set(
		undefined,
		{ deep: false },
	);

	aircraftsWithLevelPopup: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	aircraftsWithSectorPopup: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	aircraftsWithBearingPopup: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	aircraftsWithNextFixPopup: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	aircraftWithSpeedChangePopup: ObservableSet<string> = observable.set(
		undefined,
		{ deep: false },
	);

	/** Tracks aircraft that have the AddRequestDialog open */
	aircraftsWithAddRequestDialog: ObservableSet<string> = observable.set(
		undefined,
		{ deep: false },
	);

	/** Time offsets for agenda events in minutes (positive = moved into future) */
	agendaEventTimeOffsets: ObservableMap<string, number> = observable.map(
		undefined,
		{ deep: false },
	);

	/**
	 * Requested minimum agenda scale in minutes.
	 * When set, the Agenda component should adjust its scale to at least this value.
	 * Reset to null after being consumed.
	 */
	requestedAgendaScaleMinutes: number | null = null;

	activeMeasurements: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	currentDistanceColor = "";

	showLines = false;

	showClickedSector = false;

	clickedSectorId = "";

	highlightedAircraftId = "";

	pseudoPilot = false;

	nextSectorFlActivated = false;

	flightLevelNextAccActivated = false;

	showLimboFlight = false;

	ATCMenuAircraftId = "";

	showNextSectorsConfiguration: ShowNextConfiguration =
		ShowNextConfiguration.Automatic;

	switchBackToAutomaticNextSectorsConfigurationTimeoutId = 0;

	highligtedAircraftIdTimeoutId = 0;

	disabledCWPIn3DView: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	// DIALOG

	selectedAircraftIds: ObservableSet<string> = observable.set(undefined, {
		deep: false,
	});

	hoveredMarkerAircraftId: string | null = null;
	hoveredFlightLabelId: string | null = null;

	hoveredTaLabelAircraftId: string | null = null;

	taArrowClickedAircraftId: string | null = null;

	/** Preview state for next fix selection: shows a line from aircraft to hovered/matched fix */
	nextFixPreview: { aircraftId: string; fixName: string } | null = null;

	/**
	 * Team Assistant request callback mode.
	 * When set, popup components (AircraftLevelPopup, ChangeNextFixPopup, ChangeBearingPopup)
	 * will call this callback with the selected value instead of their normal behavior.
	 */
	taRequestCallback: ((value: string) => void) | null = null;

	/** The aircraft ID for which a TA request flow is in progress */
	taRequestAircraftId: string | null = null;

	constructor({
		altitudeFilter,
	}: {
		altitudeFilter: {
			lowestBound: number;
			highestBound: number;
		};
	}) {
		makeAutoObservable(
			this,
			{
				altitudeFilter: false,
				highligtedAircraftIdTimeoutId: false,
				switchBackToAutomaticNextSectorsConfigurationTimeoutId: false,
				isCWPDisabledIn3DView: false,
			},
			{ autoBind: true },
		);
		this.altitudeFilter = new AltitudeFilter(altitudeFilter);
		this.isCWPDisabledIn3DView = this.isCWPDisabledIn3DView.bind(this);
	}

	toggleFixes(): void {
		this.showFixes = !this.showFixes;
	}

	toggleAirways(): void {
		this.showAirways = !this.showAirways;
	}

	toggleVerticalWindow(): void {
		this.showVerticalWindow = !this.showVerticalWindow;
	}

	setFixes(boolean: boolean): void {
		this.showFixes = boolean;
	}

	toggleSectorLabels(): void {
		this.showSectorLabels = !this.showSectorLabels;
	}

	setSectorLabels(boolean: boolean): void {
		this.showSectorLabels = boolean;
	}

	toggleSFL(): void {
		this.showSFL = !this.showSFL;
	}

	setSFL(boolean: boolean): void {
		this.showSFL = boolean;
	}

	toggleFL(): void {
		this.showFL = !this.showFL;
	}

	setFL(boolean: boolean): void {
		this.showFL = boolean;
	}

	toggleFlightLabelsForCurrentSector(): void {
		this.showFlightLabelsForCurrentSector =
			!this.showFlightLabelsForCurrentSector;
	}

	setFlightLabelsForCurrentSector(boolean: boolean): void {
		this.showFlightLabelsForCurrentSector = boolean;
	}

	toggleFlightLabelsForOtherSectors(): void {
		this.showFlightLabelsForOtherSectors =
			!this.showFlightLabelsForOtherSectors;
	}

	setFlightLabelsForOtherSectors(boolean: boolean): void {
		this.showFlightLabelsForOtherSectors = boolean;
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

	setSpeedVectorForAircraft(aircraftId: string, value: boolean): void {
		if (value) {
			this.aircraftsWithSpeedVectors.add(aircraftId);
		} else {
			this.aircraftsWithSpeedVectors.delete(aircraftId);
		}
	}

	toggleFlightRouteForAircraft(aircraftId: string): void {
		if (this.aircraftsWithFlightRoutes.has(aircraftId)) {
			this.aircraftsWithFlightRoutes.delete(aircraftId);
		} else {
			this.aircraftsWithFlightRoutes.add(aircraftId);
		}
	}

	setFlightRouteForAircraft(aircraftId: string, value: boolean): void {
		if (value) {
			this.aircraftsWithFlightRoutes.add(aircraftId);
		} else {
			this.aircraftsWithFlightRoutes.delete(aircraftId);
		}
	}

	toggleFlightLabels(): void {
		this.showFlightLabels = !this.showFlightLabels;
	}

	toggleLimboFlights(): void {
		this.showLimboFlight = !this.showLimboFlight;
	}

	setLimboFlight(boolean: boolean): void {
		this.showLimboFlight = boolean;
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

	togglePopupForAircraft(aircraftId: string): void {
		if (this.aircraftsWithManuallyOpenedPopup.has(aircraftId)) {
			this.closePopupForAircraft(aircraftId);
		} else {
			this.openPopupForAircraft(aircraftId);
		}
	}

	closeAllSubPopupsForAircraft(aircraftId: string): void {
		this.closeLevelPopupForAircraft(aircraftId);
		this.closeNextSectorPopupForAircraft(aircraftId);
		this.closeChangeBearingForAircraft(aircraftId);
		this.closeChangeNextFixForAircraft(aircraftId);
		this.closeChangeSpeedForAircraft(aircraftId);
		this.closeAddRequestDialogForAircraft(aircraftId);
		this.clearTaRequestCallback();
	}

	/**
	 * Set a callback for TA request mode. When set, popup components will call this
	 * callback with the selected value instead of their normal behavior.
	 */
	setTaRequestCallback(
		callback: (value: string) => void,
		aircraftId: string,
	): void {
		this.taRequestCallback = callback;
		this.taRequestAircraftId = aircraftId;
	}

	/**
	 * Clear the TA request callback.
	 */
	clearTaRequestCallback(): void {
		this.taRequestCallback = null;
		this.taRequestAircraftId = null;
	}

	openLevelPopupForAircraft(
		aircraftId: string,
		preserveCallback = false,
	): void {
		const savedCallback = preserveCallback ? this.taRequestCallback : null;
		const savedAircraftId = preserveCallback ? this.taRequestAircraftId : null;
		this.closeAllSubPopupsForAircraft(aircraftId);
		if (savedCallback) {
			this.taRequestCallback = savedCallback;
			this.taRequestAircraftId = savedAircraftId;
		}
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

	openChangeBearingForAircraft(
		aircraftId: string,
		preserveCallback = false,
	): void {
		const savedCallback = preserveCallback ? this.taRequestCallback : null;
		const savedAircraftId = preserveCallback ? this.taRequestAircraftId : null;
		this.closeAllSubPopupsForAircraft(aircraftId);
		if (savedCallback) {
			this.taRequestCallback = savedCallback;
			this.taRequestAircraftId = savedAircraftId;
		}
		this.aircraftsWithBearingPopup.add(aircraftId);
	}

	closeChangeBearingForAircraft(aircraftId: string): void {
		this.aircraftsWithBearingPopup.delete(aircraftId);
	}

	openChangeNextFixForAircraft(
		aircraftId: string,
		preserveCallback = false,
	): void {
		const savedCallback = preserveCallback ? this.taRequestCallback : null;
		const savedAircraftId = preserveCallback ? this.taRequestAircraftId : null;
		this.closeAllSubPopupsForAircraft(aircraftId);
		if (savedCallback) {
			this.taRequestCallback = savedCallback;
			this.taRequestAircraftId = savedAircraftId;
		}
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

	openAddRequestDialogForAircraft(aircraftId: string): void {
		this.aircraftsWithAddRequestDialog.add(aircraftId);
	}

	closeAddRequestDialogForAircraft(aircraftId: string): void {
		this.aircraftsWithAddRequestDialog.delete(aircraftId);
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
		this.currentDistanceColor = "";
	}

	setShowLine(boolean: boolean): void {
		this.showLines = boolean;
	}

	getShowLine(): boolean {
		return this.showLines;
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
		if (aircraftId !== "") {
			this.highligtedAircraftIdTimeoutId = window.setTimeout(() => {
				this.setHighlightedAircraftId("");
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

	toggleShowNextSectorsConfiguration(): void {
		if (this.switchBackToAutomaticNextSectorsConfigurationTimeoutId) {
			window.clearTimeout(
				this.switchBackToAutomaticNextSectorsConfigurationTimeoutId,
			);
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
				throw new Error("Invalid showNextSectorsConfiguration");
		}
	}

	setShowNextSectorsConfiguration(value: boolean): void {
		if (this.switchBackToAutomaticNextSectorsConfigurationTimeoutId) {
			window.clearTimeout(
				this.switchBackToAutomaticNextSectorsConfigurationTimeoutId,
			);
			this.switchBackToAutomaticNextSectorsConfigurationTimeoutId = 0;
		}
		this.showNextSectorsConfiguration = value
			? ShowNextConfiguration.On
			: ShowNextConfiguration.Off;
		this.switchBackToAutomaticNextSectorsConfiguration();
	}

	setAutomaticNextSectorsConfiguration(): void {
		this.showNextSectorsConfiguration = ShowNextConfiguration.Automatic;
	}

	protected switchBackToAutomaticNextSectorsConfiguration(): void {
		// Automatically revert back to automatic mode after 30s
		this.switchBackToAutomaticNextSectorsConfigurationTimeoutId =
			window.setTimeout(() => {
				this.switchBackToAutomaticNextSectorsConfigurationTimeoutId = 0;
				this.setAutomaticNextSectorsConfiguration();
			}, 30_000);
	}

	toggleCWPIn3DView(cwp: string): void {
		if (this.disabledCWPIn3DView.has(cwp)) {
			this.disabledCWPIn3DView.delete(cwp);
		} else {
			this.disabledCWPIn3DView.add(cwp);
		}
	}

	isCWPDisabledIn3DView(airspaceId: string): boolean {
		return this.disabledCWPIn3DView.has(airspaceId);
	}

	toggleSelectedAircraftId(aircraftId: string): void {
		if (this.selectedAircraftIds.has(aircraftId)) {
			this.selectedAircraftIds.delete(aircraftId);
		} else {
			this.selectedAircraftIds.add(aircraftId);
		}
	}
	toggleShowSpeedVectors(): void {
		this.showSpeedVectors = !this.showSpeedVectors;
	}
	setShowSpeedVectors(value: boolean): void {
		this.showSpeedVectors = value;
	}
	setATCMenuAircraftId(aircraftId: string): void {
		this.ATCMenuAircraftId = aircraftId;
	}
	clearATCMenuAircraftId(): void {
		this.ATCMenuAircraftId = "";
	}

	setHoveredMarkerAircraftId(aircraftId: string): void {
		this.hoveredMarkerAircraftId = aircraftId;
	}
	setHoveredFlightLabelId(aircraftId: string): void {
		this.hoveredFlightLabelId = aircraftId;
	}
	removeHoveredFlightLabelId(): void {
		this.hoveredFlightLabelId = null;
	}
	removeHoveredMarkerAircraftId(): void {
		this.hoveredMarkerAircraftId = null;
	}
	setHoveredTaLabelAircraftId(aircraftId: string): void {
		this.hoveredTaLabelAircraftId = aircraftId;
	}
	removeHoveredTaLabelAircraftId(): void {
		this.hoveredTaLabelAircraftId = null;
	}
	setTaArrowClickedAircraftId(aircraftId: string): void {
		this.taArrowClickedAircraftId = aircraftId;
	}
	removeTaArrowClickedAircraftId(): void {
		this.taArrowClickedAircraftId = null;
	}

	/** Get the warning level for an aircraft */
	getWarningLevel(aircraftId: string): WarningLevel {
		return this.aircraftWarningLevels.get(aircraftId) ?? "none";
	}

	/** Cycle to the next warning level: none → blue → orange → yellow → none */
	cycleWarningLevel(aircraftId: string): void {
		const currentLevel = this.getWarningLevel(aircraftId);
		const currentIndex = WARNING_LEVEL_ORDER.indexOf(currentLevel);
		const nextIndex = (currentIndex + 1) % WARNING_LEVEL_ORDER.length;
		const nextLevel = WARNING_LEVEL_ORDER[nextIndex];

		if (nextLevel === "none") {
			this.aircraftWarningLevels.delete(aircraftId);
		} else {
			this.aircraftWarningLevels.set(aircraftId, nextLevel);
		}
	}

	/** Reset warning level to none */
	resetWarningLevel(aircraftId: string): void {
		this.aircraftWarningLevels.delete(aircraftId);
	}

	/** Get the warning color for an aircraft (null if none) */
	getWarningColor(aircraftId: string): string | null {
		const level = this.getWarningLevel(aircraftId);
		return WARNING_LEVEL_COLORS[level];
	}

	/** Check if any popup is open for an aircraft */
	aircraftHasOpenPopup(aircraftId: string): boolean {
		return (
			this.aircraftsWithLevelPopup.has(aircraftId) ||
			this.aircraftsWithSectorPopup.has(aircraftId) ||
			this.aircraftsWithBearingPopup.has(aircraftId) ||
			this.aircraftsWithNextFixPopup.has(aircraftId) ||
			this.aircraftWithSpeedChangePopup.has(aircraftId) ||
			this.aircraftsWithAddRequestDialog.has(aircraftId) ||
			this.ATCMenuAircraftId === aircraftId
		);
	}

	/** Set the preview for next fix selection (shows line from aircraft to fix) */
	setNextFixPreview(aircraftId: string, fixName: string): void {
		this.nextFixPreview = { aircraftId, fixName };
	}

	/** Clear the next fix preview */
	clearNextFixPreview(): void {
		this.nextFixPreview = null;
	}

	/** Set the time offset for an agenda event (in minutes, positive = future) */
	setAgendaEventTimeOffset(eventId: string, offsetMinutes: number): void {
		if (Math.abs(offsetMinutes) < 0.1) {
			// Clear offset if effectively zero
			this.agendaEventTimeOffsets.delete(eventId);
		} else {
			this.agendaEventTimeOffsets.set(eventId, offsetMinutes);
		}
	}

	/** Get the time offset for an agenda event (in minutes) */
	getAgendaEventTimeOffset(eventId: string): number {
		return this.agendaEventTimeOffsets.get(eventId) ?? 0;
	}

	/** Clear all agenda event time offsets */
	clearAgendaEventTimeOffsets(): void {
		this.agendaEventTimeOffsets.clear();
	}

	/**
	 * Request the Agenda to adjust its scale to show events at the given time.
	 * The Agenda will pick the smallest scale preset that includes this time.
	 */
	requestAgendaScaleToFit(timeMinutes: number): void {
		this.requestedAgendaScaleMinutes = timeMinutes;
	}

	/** Clear the requested agenda scale (called after Agenda consumes it) */
	clearRequestedAgendaScale(): void {
		this.requestedAgendaScaleMinutes = null;
	}

	/**
	 * Reset all per-aircraft UI state (selections, warnings, popups).
	 * Called by the RESET button in ImageConfiguration.
	 * Does NOT reset display toggles (speed vectors, fixes, etc.) or SEP/QDM/MTCD state.
	 */
	resetUIState(): void {
		// Clear per-aircraft state
		this.selectedAircraftIds.clear();
		this.aircraftWarningLevels.clear();
		this.aircraftsWithSpeedVectors.clear();
		this.aircraftsWithFlightRoutes.clear();
		this.aircraftsWithManuallyOpenedPopup.clear();
		this.aircraftsWithManuallyClosedPopup.clear();
		this.aircraftsWithLevelPopup.clear();
		this.aircraftsWithSectorPopup.clear();
		this.aircraftsWithBearingPopup.clear();
		this.aircraftsWithNextFixPopup.clear();
		this.aircraftWithSpeedChangePopup.clear();
		this.aircraftsWithAddRequestDialog.clear();

		// Clear hover and highlight state
		this.highlightedAircraftId = "";
		this.ATCMenuAircraftId = "";
		this.hoveredMarkerAircraftId = null;
		this.hoveredFlightLabelId = null;
		this.hoveredTaLabelAircraftId = null;
		this.taArrowClickedAircraftId = null;

		// Clear next fix preview
		this.nextFixPreview = null;

		// Clear highlighted aircraft timeout if active
		if (this.highligtedAircraftIdTimeoutId !== 0) {
			window.clearTimeout(this.highligtedAircraftIdTimeoutId);
			this.highligtedAircraftIdTimeoutId = 0;
		}
	}
}
