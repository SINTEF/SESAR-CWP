import { makeAutoObservable } from "mobx";
import type MapViewportStore from "../stores/MapViewportStore";
import { findNearestAircraftInScreenSpace } from "../utils/findNearestAircraftInScreenSpace";
import type AircraftStore from "./AircraftStore";
import type ConfigurationStore from "./ConfigurationStore";
import SepQdmSeparation from "./SepQdmSeparation";
import type TrajectoryPredictionStore from "./TrajectoryPredictionStore";

// Snapping threshold in pixels
const SNAP_THRESHOLD_PIXELS = 120;

export type MeasurementMode = "SEP" | "QDM" | null;

export default class SepQdmStore {
	// Current measurement mode (SEP or QDM)
	mode: MeasurementMode = null;

	// Aircraft ID to track for start position
	fromAircraftId: string | null = null;

	// Current mouse position [longitude, latitude]
	mousePosition: [number, number] | null = null;

	// Current mouse position in screen coordinates [x, y] pixels
	mouseScreenPosition: { x: number; y: number } | null = null;

	// Whether currently drawing/measuring a line
	isDrawing = false;

	// Saved SEP pairs between aircraft
	savedSepLines: SepQdmSeparation[] = [];

	// Saved QDM pairs between aircraft
	savedQdmLines: SepQdmSeparation[] = [];

	// Reference to MapViewportStore for coordinate conversion
	private mapViewportStore: MapViewportStore;

	// Reference to AircraftStore for aircraft position lookup
	private aircraftStore: AircraftStore;

	// Reference to ConfigurationStore for visible aircraft filtering
	private configurationStore: ConfigurationStore;

	// Reference to TrajectoryPredictionStore for trajectory calculations
	private trajectoryPredictionStore: TrajectoryPredictionStore;

	constructor({
		mapViewportStore,
		aircraftStore,
		configurationStore,
		trajectoryPredictionStore,
	}: {
		mapViewportStore: MapViewportStore;
		aircraftStore: AircraftStore;
		configurationStore: ConfigurationStore;
		trajectoryPredictionStore: TrajectoryPredictionStore;
	}) {
		this.mapViewportStore = mapViewportStore;
		this.aircraftStore = aircraftStore;
		this.configurationStore = configurationStore;
		this.trajectoryPredictionStore = trajectoryPredictionStore;
		makeAutoObservable(this, {}, { autoBind: true });
	}

	// Computed property for start position based on fromAircraftId
	get startPosition(): [number, number] | null {
		if (!this.fromAircraftId) {
			return null;
		}
		const aircraft = this.aircraftStore.aircrafts.get(this.fromAircraftId);
		if (!aircraft) {
			return null;
		}
		return [aircraft.lastKnownLongitude, aircraft.lastKnownLatitude];
	}

	// Computed property for end position with screen-space snapping
	get endPosition(): [number, number] | null {
		if (!this.mouseScreenPosition || !this.mousePosition) {
			return null;
		}

		// Try to find nearest aircraft within snapping threshold
		// Only search through visible aircraft within map bounds
		const nearestAircraft = findNearestAircraftInScreenSpace(
			this.configurationStore.aircraftsWithinExtendedEdges,
			this.mouseScreenPosition.x,
			this.mouseScreenPosition.y,
			SNAP_THRESHOLD_PIXELS,
			this.mapViewportStore,
			this.fromAircraftId, // Exclude source aircraft from snapping
		);

		// Return snapped position if aircraft found, otherwise return mouse position
		return nearestAircraft ? nearestAircraft.position : this.mousePosition;
	}

	setMousePositionFromScreen(screenX: number, screenY: number): void {
		// Store screen position for snapping calculations
		this.mouseScreenPosition = { x: screenX, y: screenY };

		// Convert to geographic coordinates
		const geoCoords = this.mapViewportStore.unprojectPosition(screenX, screenY);
		if (geoCoords) {
			this.mousePosition = [geoCoords.lng, geoCoords.lat];
		}
	}

	setMousePosition(lng: number, lat: number): void {
		this.mousePosition = [lng, lat];
	}

	/**
	 * Enable SEP measurement mode
	 */
	enableSep(aircraftId: string): void {
		this.mode = "SEP";
		this.isDrawing = true;
		this.fromAircraftId = aircraftId;
	}

	/**
	 * Enable QDM measurement mode
	 */
	enableQdm(aircraftId: string): void {
		this.mode = "QDM";
		this.isDrawing = true;
		this.fromAircraftId = aircraftId;
	}

	/**
	 * Disable measurement mode and reset state
	 */
	disable(): void {
		this.mode = null;
		this.isDrawing = false;
		this.fromAircraftId = null;
		this.mousePosition = null;
		this.mouseScreenPosition = null;
	}

	/**
	 * Handle left click during drawing mode:
	 * - If snapped to an aircraft, save the measurement pair based on current mode
	 * - If no snap within threshold, cancel drawing
	 */
	handleLeftClick(): void {
		if (!this.fromAircraftId || !this.mouseScreenPosition || !this.mode) {
			this.disable();
			return;
		}

		// Find nearest aircraft at current mouse position
		const nearestAircraft = findNearestAircraftInScreenSpace(
			this.configurationStore.aircraftsWithinExtendedEdges,
			this.mouseScreenPosition.x,
			this.mouseScreenPosition.y,
			SNAP_THRESHOLD_PIXELS,
			this.mapViewportStore,
			this.fromAircraftId,
		);

		// If snapped to aircraft, save to the appropriate collection based on mode
		if (nearestAircraft) {
			if (this.mode === "SEP") {
				this.savedSepLines.push(
					new SepQdmSeparation({
						fromId: this.fromAircraftId,
						toId: nearestAircraft.aircraftId,
						type: "sep",
						aircraftStore: this.aircraftStore,
						trajectoryPredictionStore: this.trajectoryPredictionStore,
					}),
				);
			} else if (this.mode === "QDM") {
				this.savedQdmLines.push(
					new SepQdmSeparation({
						fromId: this.fromAircraftId,
						toId: nearestAircraft.aircraftId,
						type: "qdm",
						aircraftStore: this.aircraftStore,
						trajectoryPredictionStore: this.trajectoryPredictionStore,
					}),
				);
			}
		}

		// Always exit drawing mode after click (whether saved or cancelled)
		this.disable();
	}

	/**
	 * Create multiple separation lines from one aircraft to multiple target aircraft
	 */
	private createMultipleLines(
		fromAircraftId: string,
		toAircraftIds: string[],
		type: "sep" | "qdm",
	): void {
		const savedLines = type === "sep" ? this.savedSepLines : this.savedQdmLines;

		for (const toId of toAircraftIds) {
			// Skip if trying to create a line to itself
			if (toId === fromAircraftId) {
				continue;
			}

			// Check if this pair already exists
			const exists = savedLines.some(
				(line) =>
					(line.fromId === fromAircraftId && line.toId === toId) ||
					(line.fromId === toId && line.toId === fromAircraftId),
			);

			if (!exists) {
				savedLines.push(
					new SepQdmSeparation({
						fromId: fromAircraftId,
						toId: toId,
						type: type,
						aircraftStore: this.aircraftStore,
						trajectoryPredictionStore: this.trajectoryPredictionStore,
					}),
				);
			}
		}
	}

	/**
	 * Create multiple SEP lines from one aircraft to multiple target aircraft
	 */
	createMultipleSepLines(
		fromAircraftId: string,
		toAircraftIds: string[],
	): void {
		this.createMultipleLines(fromAircraftId, toAircraftIds, "sep");
	}

	/**
	 * Create multiple QDM lines from one aircraft to multiple target aircraft
	 */
	createMultipleQdmLines(
		fromAircraftId: string,
		toAircraftIds: string[],
	): void {
		this.createMultipleLines(fromAircraftId, toAircraftIds, "qdm");
	}

	/**
	 * Remove a QDM line by aircraft IDs
	 */
	removeQdmLine(fromId: string, toId: string): void {
		const index = this.savedQdmLines.findIndex(
			(separation) => separation.fromId === fromId && separation.toId === toId,
		);
		if (index !== -1) {
			this.savedQdmLines.splice(index, 1);
		}
	}

	/**
	 * Remove a SEP line by aircraft IDs
	 */
	removeSepLine(fromId: string, toId: string): void {
		const index = this.savedSepLines.findIndex(
			(separation) => separation.fromId === fromId && separation.toId === toId,
		);
		if (index !== -1) {
			this.savedSepLines.splice(index, 1);
		}
	}
}
