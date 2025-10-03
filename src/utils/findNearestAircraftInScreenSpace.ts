import type AircraftModel from "../model/AircraftModel";

/**
 * Find the nearest aircraft to a screen position within a maximum distance threshold
 *
 * @param aircrafts - List of aircraft to search through (typically visible aircraft only)
 * @param mouseScreenX - X coordinate of mouse position in screen pixels
 * @param mouseScreenY - Y coordinate of mouse position in screen pixels
 * @param maxDistancePixels - Maximum distance in pixels to consider for snapping
 * @param mapViewportStore - Store with projectPosition method for coordinate conversion
 * @param excludeAircraftId - Optional aircraft ID to exclude from search (e.g., source aircraft)
 * @returns Object with aircraftId and geographic position [lng, lat], or null if no aircraft within threshold
 */
export function findNearestAircraftInScreenSpace(
	aircrafts: AircraftModel[],
	mouseScreenX: number,
	mouseScreenY: number,
	maxDistancePixels: number,
	mapViewportStore: {
		projectPosition: (
			lat: number,
			lng: number,
		) => { x: number; y: number } | null;
	},
	excludeAircraftId?: string | null,
): { aircraftId: string; position: [number, number] } | null {
	let nearestAircraft: {
		aircraftId: string;
		position: [number, number];
	} | null = null;
	let minDistance = maxDistancePixels;

	for (const aircraft of aircrafts) {
		// Skip the excluded aircraft (typically the source aircraft)
		if (excludeAircraftId && aircraft.aircraftId === excludeAircraftId) {
			continue;
		}

		// Project aircraft position to screen coordinates
		const screenPos = mapViewportStore.projectPosition(
			aircraft.lastKnownLatitude,
			aircraft.lastKnownLongitude,
		);

		// Skip if projection failed (aircraft off-screen)
		if (!screenPos) {
			continue;
		}

		// Calculate pixel distance using Euclidean distance
		const dx = screenPos.x - mouseScreenX;
		const dy = screenPos.y - mouseScreenY;
		const distance = Math.sqrt(dx * dx + dy * dy);

		// Track closest aircraft within threshold
		if (distance < minDistance) {
			minDistance = distance;
			nearestAircraft = {
				aircraftId: aircraft.aircraftId,
				position: [aircraft.lastKnownLongitude, aircraft.lastKnownLatitude],
			};
		}
	}

	return nearestAircraft;
}
