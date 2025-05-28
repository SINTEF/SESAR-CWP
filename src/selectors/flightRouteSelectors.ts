import AircraftModel from "../model/AircraftModel";
import AircraftStore from "../model/AircraftStore";
import CwpStore from "../model/CwpStore";
import FlightRoute from "../model/FlightRoute";

interface FlightRouteWithAircraft {
	aircraft: AircraftModel;
	route: FlightRoute;
}

/**
 * Gets aircraft with flight routes that have trajectory points.
 */
export function getAircraftsWithFlightRoutes({
	aircraftStore,
	cwpStore,
}: {
	aircraftStore: AircraftStore;
	cwpStore: CwpStore;
}): FlightRouteWithAircraft[] {
	const aircrafts = [...cwpStore.aircraftsWithFlightRoutes]
		.map((aircraftId) => aircraftStore.aircrafts.get(aircraftId))
		.filter((a): a is AircraftModel => a !== undefined);

	return aircrafts
		.map((aircraft) => ({
			aircraft,
			route: aircraftStore.flightRoutes.get(aircraft.assignedFlightId),
		}))
		.filter(
			(entry): entry is FlightRouteWithAircraft => entry.route !== undefined,
		);
}
