import posthog from "posthog-js";
import AircraftModel from "../model/AircraftModel";
import { TeamAssistantRequest } from "../model/AircraftStore";
import { isWaypointInFlightPlan } from "../model/predictiveTrajectoryState";
import { getRouteAheadTrajectory } from "../model/routeProgress";
import {
	changeBearingOfAircraft,
	changeFlightLevelOfAircraft,
	changeNextWaypointOfAircraft,
	clearPredictiveTrajectoryState,
	handlePublishPromise,
	persistACCBearing,
	persistACCFlightLevel,
	persistPredictiveTrajectoryRerouted,
	persistPredictiveTrajectoryReroutedViaWaypoint,
	publishPilotRequestClear,
} from "../mqtt-client/publishers";
import {
	getPilotRequestType,
	type NormalizedGoal,
	PilotRequestType,
} from "../schemas/pilotRequestSchema";
import { aircraftStore, fixStore } from "../state";
import { normalizeBearing } from "./bearingUtils";

/**
 * Check if a normalized goal has a positive recommendation, based on request type.
 * - FlightLevel / Direct: higher_level_available must be true.
 * - AbsoluteHeading / RelativeHeading: isHeadingFound must be true.
 */
export function isGoalPositive(
	goal: NormalizedGoal,
	requestType: PilotRequestType,
): boolean {
	switch (requestType) {
		case PilotRequestType.FlightLevel:
		case PilotRequestType.Direct:
			return goal.results?.higher_level_available ?? false;
		case PilotRequestType.AbsoluteHeading:
		case PilotRequestType.RelativeHeading:
			return goal.isHeadingFound ?? false;
		default:
			return false;
	}
}

// Could this logic somewhat work?
export function getRequestStatusColorClass(
	results: TeamAssistantRequest | undefined,
): string {
	if (!results) {
		return "text-gray-500";
	}
	const requestType = getPilotRequestType(results.context?.request_type ?? 0);
	let isAccepted = false;
	for (const goal of results.normalizedGoals) {
		switch (requestType) {
			case PilotRequestType.FlightLevel:
			case PilotRequestType.Direct: {
				if (!isGoalPositive(goal, requestType)) {
					break;
				}
				// Check if initial_climb and exit_level match request_parameter
				const initDifferent =
					goal.results?.initial_climb !== results.context.request_parameter;
				const exitDifferent =
					goal.results?.exit_level !== results.context.request_parameter;
				isAccepted = !initDifferent && !exitDifferent;
				break;
			}
			case PilotRequestType.AbsoluteHeading:
			case PilotRequestType.RelativeHeading:
				// Find the goal matching request_parameter (Req_hdg_value) and
				// read Is_heading_found directly from it — green if true, red if false.
				if (goal.requestedValue === Number(results.context.request_parameter)) {
					isAccepted = goal.isHeadingFound ?? false;
				}
				break;
			default:
				break;
		}
	}
	return isAccepted ? "text-green-400" : "text-red-500";
}

/**
 * Format the request suggestion for display.
 * Adds correct prefix based on the request type.
 */
export function formatRequestSuggestion(
	requestType: PilotRequestType,
	parameter: string,
): string {
	switch (requestType) {
		case PilotRequestType.FlightLevel:
			return parameter.startsWith("FL") ? parameter : `FL ${parameter} `;
		case PilotRequestType.Direct:
			return `DIRECT TO ${parameter}`;
		case PilotRequestType.AbsoluteHeading:
			return `HDG ${parameter}`;
		case PilotRequestType.RelativeHeading: {
			const num = Number(parameter);
			return `${num > 0 ? "+" : ""}${parameter}°`;
		}
		default:
			return parameter;
	}
}

export function getStatusColorClass(status: number | null | undefined): string {
	switch (status) {
		case 1:
			return "text-green-400";
		case 0:
			return "text-yellow-400";
		case 2:
			return "text-red-500";
		default:
			return "text-gray-500";
	}
}

export function findSuggestionForRequest(
	request: TeamAssistantRequest,
): string | null {
	if (!request.normalizedGoals) {
		return null;
	}
	const requestType = getPilotRequestType(request.context?.request_type ?? 0);
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal, requestType)) {
			let suggestionValue: string;
			switch (requestType) {
				case PilotRequestType.FlightLevel:
				case PilotRequestType.Direct:
					// Use initial_climb as the suggested value for level-change goals
					suggestionValue =
						goal.results?.initial_climb.toString() ??
						goal.requestedValue.toString();
					break;
				default:
					suggestionValue = goal.requestedValue.toString();
					break;
			}
			return formatRequestSuggestion(requestType, suggestionValue);
		}
	}
	return null;
}

export function getSuggestionForRequest(
	request: TeamAssistantRequest,
): string | null {
	if (!request.normalizedGoals) {
		return null;
	}
	const requestType = getPilotRequestType(request.context?.request_type ?? 0);
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal, requestType)) {
			switch (requestType) {
				case PilotRequestType.FlightLevel:
				case PilotRequestType.Direct:
					return (
						goal.results?.initial_climb.toString() ??
						goal.requestedValue.toString()
					);
				default:
					return goal.requestedValue.toString();
			}
		}
	}
	return null;
}

export function isAccepted(request: TeamAssistantRequest): boolean {
	if (!request.normalizedGoals) {
		return false;
	}
	const requestType = getPilotRequestType(request.context?.request_type ?? 0);
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal, requestType)) {
			switch (requestType) {
				case PilotRequestType.FlightLevel:
				case PilotRequestType.Direct: {
					const initDifferent =
						goal.results?.initial_climb !== request.context.request_parameter;
					const exitDifferent =
						goal.results?.exit_level !== request.context.request_parameter;
					if (!initDifferent && !exitDifferent) {
						return true;
					}
					break;
				}
				case PilotRequestType.AbsoluteHeading:
				case PilotRequestType.RelativeHeading:
					// Positive heading goal means accepted
					return true;
				default:
					break;
			}
		}
	}
	return false;
}

export function isAcceptOrSuggest(request: TeamAssistantRequest): boolean {
	if (!request.normalizedGoals) {
		return false;
	}
	const requestType = getPilotRequestType(request.context?.request_type ?? 0);
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal, requestType)) {
			return true;
		}
	}
	return false;
}

export function isRejected(request: TeamAssistantRequest): boolean {
	if (!request.normalizedGoals) {
		return false;
	}
	const requestType = getPilotRequestType(request.context?.request_type ?? 0);
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal, requestType)) {
			return false;
		}
	}
	return true;
}

export const handleChangeCFL = (
	request: TeamAssistantRequest,
	aircraft: AircraftModel,
): void => {
	let cflRequestParameter = "";
	if (!isAccepted(request) && getSuggestionForRequest(request)) {
		cflRequestParameter = getSuggestionForRequest(request) ?? "";
		aircraft.setNextACCFL(cflRequestParameter, true); // Mark as manually set
	} else {
		cflRequestParameter = request.context?.request_parameter.toString() ?? "";
		aircraft.setNextACCFL(cflRequestParameter, true); // Mark as manually set
	}
	handlePublishPromise(
		persistACCFlightLevel(aircraft.assignedFlightId, cflRequestParameter),
	);
	setTimeout(() => {
		handlePublishPromise(
			changeFlightLevelOfAircraft(
				aircraft.controlledBy,
				aircraft.assignedFlightId,
				cflRequestParameter,
			),
		);
	}, 1000);
};

/**
 * Dispatch the correct aircraft control action when a TA request is accepted,
 * based on the request type.
 */
export const handleAcceptAction = (
	request: TeamAssistantRequest,
	aircraft: AircraftModel,
): void => {
	const requestType = getPilotRequestType(request.context?.request_type ?? 0);
	switch (requestType) {
		case PilotRequestType.FlightLevel:
			handleChangeCFL(request, aircraft);
			break;
		case PilotRequestType.Direct: {
			const waypointName = request.context.request_parameter
				.toString()
				.toUpperCase();
			const fix = fixStore.fixes.get(waypointName);
			if (!fix) {
				return;
			}
			handlePublishPromise(
				changeNextWaypointOfAircraft({
					pilotId: aircraft.controlledBy,
					waypointId: waypointName,
					flightId: aircraft.assignedFlightId,
					latitude: fix.latitude,
					longitude: fix.longitude,
					viaLat: "",
					viaLong: "",
					viaWaypointId: "",
				}),
			);

			const flightRoute = aircraftStore.flightRoutes.get(
				aircraft.assignedFlightId,
			);
			const isFixInFlightPlan = isWaypointInFlightPlan(
				flightRoute,
				waypointName,
			);

			if (isFixInFlightPlan) {
				aircraft.clearPredictiveTrajectoryState();
				handlePublishPromise(
					clearPredictiveTrajectoryState(aircraft.assignedFlightId),
				);
				posthog.capture("predictive_trajectory_state_changed", {
					flight_id: aircraft.assignedFlightId,
					aircraft_id: aircraft.aircraftId,
					mode: "unset",
					source: "ta_request_accept",
					request_type: "direct",
					waypoint_id: waypointName,
				});
			} else {
				const nextFlightPlanWaypoint =
					flightRoute === undefined
						? undefined
						: getRouteAheadTrajectory({
								aircraft,
								route: flightRoute,
								currentTime: aircraftStore.simulatorStore.timestamp,
							}).find((trajectory) => trajectory.objectId !== undefined);

				if (!nextFlightPlanWaypoint?.objectId) {
					aircraft.clearPredictiveTrajectoryState();
					handlePublishPromise(
						clearPredictiveTrajectoryState(aircraft.assignedFlightId),
					);
					break;
				}

				aircraft.setPredictiveTrajectoryReroutedViaWaypoint(
					waypointName,
					fix.latitude,
					fix.longitude,
					nextFlightPlanWaypoint.objectId,
					nextFlightPlanWaypoint.trajectoryCoordinate.latitude,
					nextFlightPlanWaypoint.trajectoryCoordinate.longitude,
				);
				handlePublishPromise(
					persistPredictiveTrajectoryReroutedViaWaypoint({
						flightUniqueId: aircraft.assignedFlightId,
						waypointId: waypointName,
						latitude: fix.latitude,
						longitude: fix.longitude,
						nextWaypointId: nextFlightPlanWaypoint.objectId,
						nextWaypointLatitude:
							nextFlightPlanWaypoint.trajectoryCoordinate.latitude,
						nextWaypointLongitude:
							nextFlightPlanWaypoint.trajectoryCoordinate.longitude,
					}),
				);
				posthog.capture("predictive_trajectory_state_changed", {
					flight_id: aircraft.assignedFlightId,
					aircraft_id: aircraft.aircraftId,
					mode: "rerouted-via-waypoint",
					source: "ta_request_accept",
					request_type: "direct",
					waypoint_id: waypointName,
					waypoint_latitude: fix.latitude,
					waypoint_longitude: fix.longitude,
				});
			}
			break;
		}
		case PilotRequestType.AbsoluteHeading: {
			const suggestionStr = getSuggestionForRequest(request);
			if (!suggestionStr) {
				return;
			}
			const bearing = Number(suggestionStr);
			if (Number.isNaN(bearing)) {
				return;
			}
			aircraft.setAssignedBearing(bearing);
			handlePublishPromise(
				changeBearingOfAircraft(
					aircraft.controlledBy,
					aircraft.assignedFlightId,
					bearing,
				),
			);
			handlePublishPromise(persistACCBearing(aircraft.aircraftId, bearing));
			aircraft.setPredictiveTrajectoryRerouted();
			handlePublishPromise(
				persistPredictiveTrajectoryRerouted(aircraft.assignedFlightId),
			);
			posthog.capture("predictive_trajectory_state_changed", {
				flight_id: aircraft.assignedFlightId,
				aircraft_id: aircraft.aircraftId,
				mode: "rerouted",
				source: "ta_request_accept",
				request_type: "absolute_heading",
			});
			break;
		}
		case PilotRequestType.RelativeHeading: {
			// Req_hdg_value is a relative offset (degrees to turn), not an absolute heading.
			// Compute the absolute bearing by adding the offset to the aircraft's current bearing.
			const suggestionStr = getSuggestionForRequest(request);
			if (!suggestionStr) {
				return;
			}
			const relativeOffset = Number(suggestionStr);
			if (Number.isNaN(relativeOffset)) {
				return;
			}
			const absoluteBearing = normalizeBearing(
				aircraft.lastKnownBearing + relativeOffset,
			);
			aircraft.setAssignedBearing(absoluteBearing);
			handlePublishPromise(
				changeBearingOfAircraft(
					aircraft.controlledBy,
					aircraft.assignedFlightId,
					absoluteBearing,
				),
			);
			handlePublishPromise(
				persistACCBearing(aircraft.aircraftId, absoluteBearing),
			);
			aircraft.setPredictiveTrajectoryRerouted();
			handlePublishPromise(
				persistPredictiveTrajectoryRerouted(aircraft.assignedFlightId),
			);
			posthog.capture("predictive_trajectory_state_changed", {
				flight_id: aircraft.assignedFlightId,
				aircraft_id: aircraft.aircraftId,
				mode: "rerouted",
				source: "ta_request_accept",
				request_type: "relative_heading",
			});
			break;
		}
		default:
			break;
	}
};

/**
 * Clear all TA requests for an aircraft that match the given request types.
 * Call this after a manual parameter change in a popup so the corresponding
 * TA request disappears without requiring a separate dismiss action.
 */
export const clearMatchingTaRequests = (
	aircraft: AircraftModel,
	requestTypes: PilotRequestType[],
): void => {
	const requests = aircraftStore.getRequestsForAircraft(aircraft.callSign);
	for (const request of requests) {
		const type = getPilotRequestType(request.context?.request_type ?? 0);
		if (requestTypes.includes(type)) {
			handlePublishPromise(
				publishPilotRequestClear(request.flightId, request.requestId),
			);
			aircraftStore.removeTeamAssistantRequest(
				request.flightId,
				request.requestId,
			);
		}
	}
};
