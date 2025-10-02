import type { MapRef } from "react-map-gl/maplibre";
import { mapViewportStore } from "../state";

/**
 * Get screen position from mouse/touch event
 * Returns actual screen coordinates (clientX/clientY)
 */
export function getScreenPosition(
	event: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent,
): { x: number; y: number } | undefined {
	if ("clientX" in event && "clientY" in event) {
		return { x: event.clientX, y: event.clientY };
	}
	if ("touches" in event && event.touches.length > 0) {
		return { x: event.touches[0].clientX, y: event.touches[0].clientY };
	}
	return undefined;
}

/**
 * Get GPS position from mouse/touch event on map
 * Converts screen coordinates to geographic coordinates
 * Uses mapViewportStore internally to access map reference
 */
export function getGpsFromEvent(
	event: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent,
	map?: MapRef | null,
): { lat: number; lng: number } | undefined {
	// Use provided map or fall back to mapViewportStore
	const mapRef = map ?? mapViewportStore.map;
	if (!mapRef) {
		return undefined;
	}

	const screenPos = getScreenPosition(event);
	if (!screenPos) {
		return undefined;
	}

	const canvas = mapRef.getCanvas();
	const rect = canvas.getBoundingClientRect();

	const mapPixel = {
		x: screenPos.x - rect.left,
		y: screenPos.y - rect.top,
	};

	const lngLat = mapRef.unproject([mapPixel.x, mapPixel.y]);
	return { lat: lngLat.lat, lng: lngLat.lng };
}