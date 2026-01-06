import * as Sentry from "@sentry/react";
import type { LngLatBounds } from "maplibre-gl";
import { makeAutoObservable } from "mobx";
import type { MapRef } from "react-map-gl/maplibre";

export interface ViewportBounds {
	north: number;
	south: number;
	east: number;
	west: number;
}

export interface ViewportState {
	bounds: ViewportBounds | null;
	zoom: number;
	center: { lat: number; lng: number } | null;
	isMoving: boolean;
}

/**
 * Store for tracking map viewport state and bounds
 * Used for determining aircraft visibility within the current viewport
 */
export default class MapViewportStore {
	viewportState: ViewportState = {
		bounds: null,
		zoom: 6.3,
		center: null,
		isMoving: false,
	};

	private mapRef: MapRef | null = null;
	private updateDebounceTimer: NodeJS.Timeout | null = null;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	/**
	 * Set the map reference for viewport calculations
	 */
	setMapRef(mapRef: MapRef | null): void {
		this.mapRef = mapRef;
		// Initialize viewport state when map is ready
		if (mapRef) {
			this.updateViewportState();
		}
	}

	/**
	 * Update viewport state from current map state
	 * Called when map moves, zooms, or initializes
	 */
	updateViewportState(): void {
		if (!this.mapRef) {
			return;
		}

		try {
			const mapBounds = this.mapRef.getBounds();
			const center = this.mapRef.getCenter();
			const zoom = this.mapRef.getZoom();

			this.viewportState = {
				bounds: mapBounds ? this.convertBounds(mapBounds) : null,
				zoom: zoom || 6.3,
				center: center ? { lat: center.lat, lng: center.lng } : null,
				isMoving: this.viewportState.isMoving,
			};
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: error logging for map state updates
			console.warn("Failed to update viewport state:", error);
			Sentry.captureException(error);
		}
	}

	/**
	 * Debounced version of updateViewportState
	 * Prevents excessive updates during rapid map movement
	 */
	debouncedUpdateViewportState(delayMs = 1000): void {
		if (this.updateDebounceTimer) {
			clearTimeout(this.updateDebounceTimer);
		}

		this.updateDebounceTimer = setTimeout(() => {
			this.updateViewportState();
			this.updateDebounceTimer = null;
		}, delayMs);
	}

	/**
	 * Set moving state for the map
	 */
	setIsMoving(isMoving: boolean): void {
		this.viewportState.isMoving = isMoving;
	}

	/**
	 * Check if a geographic position is within the current viewport bounds
	 */
	isPositionInViewport(lat: number, lng: number): boolean {
		const { bounds } = this.viewportState;
		if (!bounds) {
			return false;
		}

		return (
			lat >= bounds.south &&
			lat <= bounds.north &&
			lng >= bounds.west &&
			lng <= bounds.east
		);
	}

	/**
	 * Get the map reference (for use by analytics utilities)
	 */
	get map(): MapRef | null {
		return this.mapRef;
	}

	/**
	 * Get screen coordinates for a geographic position
	 * Returns null if map is not available or position is invalid
	 */
	projectPosition(lat: number, lng: number): { x: number; y: number } | null {
		if (!this.mapRef) {
			return null;
		}

		try {
			const point = this.mapRef.project([lng, lat]);
			return { x: point.x, y: point.y };
		} catch (_error) {
			return null;
		}
	}

	/**
	 * Get geographic coordinates for a screen position
	 * Returns null if map is not available or position is invalid
	 */
	unprojectPosition(x: number, y: number): { lng: number; lat: number } | null {
		if (!this.mapRef) {
			return null;
		}

		try {
			const lngLat = this.mapRef.unproject([x, y]);
			return { lng: lngLat.lng, lat: lngLat.lat };
		} catch (_error) {
			return null;
		}
	}

	/**
	 * Convert MapLibre bounds to our ViewportBounds format
	 */
	private convertBounds(mapBounds: LngLatBounds): ViewportBounds {
		return {
			north: mapBounds.getNorth(),
			south: mapBounds.getSouth(),
			east: mapBounds.getEast(),
			west: mapBounds.getWest(),
		};
	}

	/**
	 * Get current viewport bounds (computed property for MobX reactivity)
	 */
	get bounds(): ViewportBounds | null {
		return this.viewportState.bounds;
	}

	/**
	 * Get current zoom level (computed property for MobX reactivity)
	 */
	get zoom(): number {
		return this.viewportState.zoom;
	}

	/**
	 * Get current center (computed property for MobX reactivity)
	 */
	get center(): { lat: number; lng: number } | null {
		return this.viewportState.center;
	}

	/**
	 * Get current moving state (computed property for MobX reactivity)
	 */
	get isMoving(): boolean {
		return this.viewportState.isMoving;
	}
}
