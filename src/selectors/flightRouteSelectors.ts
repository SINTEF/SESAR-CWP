import { ObservableSet } from "mobx";
import AircraftModel from "../model/AircraftModel";
import AircraftStore from "../model/AircraftStore";
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
	selectedAircraftIds,
}: {
	aircraftStore: AircraftStore;
	selectedAircraftIds: ObservableSet<string>;
}): FlightRouteWithAircraft[] {
	// Load list of aircrafts that must have flightroutes
	const aircrafts = [...selectedAircraftIds]
		.map((aircraftId) => aircraftStore.aircrafts.get(aircraftId))
		// Remove unfound aircrafts
		.filter((aircraft): aircraft is AircraftModel => aircraft !== undefined);

	return aircrafts
		.map((aircraft) => ({
			aircraft,
			route: aircraftStore.flightRoutes.get(aircraft.assignedFlightId),
		}))
		.filter(
			(
				flightRoute,
			): flightRoute is { aircraft: AircraftModel; route: FlightRoute } =>
				flightRoute.route !== undefined,
		);
}
