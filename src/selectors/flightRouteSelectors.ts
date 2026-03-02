import { ObservableSet } from "mobx";
import AircraftModel from "../model/AircraftModel";
import AircraftStore from "../model/AircraftStore";
import type FlightRoute from "../model/FlightRoute";
import { getPredictiveRouteAheadTrajectory } from "../model/predictiveTrajectory";
import { getRouteAheadTrajectory } from "../model/routeProgress";
import type Trajectory from "../model/Trajectory";

interface FlightRouteWithAircraft {
	aircraft: AircraftModel;
	trajectory: Trajectory[];
}

/**
 * Gets aircraft with flight routes that have trajectory points.
 */
export function getAircraftsWithFlightRoutes({
	aircraftStore,
	selectedAircraftIds,
	usePredictiveTrajectories = false,
}: {
	aircraftStore: AircraftStore;
	selectedAircraftIds: ObservableSet<string>;
	usePredictiveTrajectories?: boolean;
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
		)
		.map(({ aircraft, route }) => ({
			aircraft,
			trajectory: usePredictiveTrajectories
				? getPredictiveRouteAheadTrajectory({
						aircraft,
						route,
						currentTime: aircraftStore.simulatorStore.timestamp,
					})
				: getRouteAheadTrajectory({
						aircraft,
						route,
						currentTime: aircraftStore.simulatorStore.timestamp,
					}),
		}));
}
