import AircraftModel from "../model/AircraftModel";
import { TeamAssistantRequest } from "../model/AircraftStore";
import {
	changeFlightLevelOfAircraft,
	handlePublishPromise,
	persistACCFlightLevel,
} from "../mqtt-client/publishers";
import {
	getPilotRequestType,
	type NormalizedGoal,
	PilotRequestType,
} from "../schemas/pilotRequestSchema";

/**
 * Check if a normalized goal has a positive recommendation.
 * For level-change goals: higher_level_available is true.
 * For heading goals: isHeadingFound is true.
 */
function isGoalPositive(goal: NormalizedGoal): boolean {
	if (goal.results) {
		return goal.results.higher_level_available;
	}
	if (goal.isHeadingFound !== undefined) {
		return goal.isHeadingFound;
	}
	return false;
}

// Could this logic somewhat work?
export function getRequestStatusColorClass(
	results: TeamAssistantRequest | undefined,
): string {
	if (!results) {
		return "text-gray-500";
	}
	let isAccepted = false;
	const normalizedGoals = results.normalizedGoals;
	for (const goal of normalizedGoals) {
		if (!isGoalPositive(goal)) {
			continue;
		}
		// For level-change: check if initial_climb and exit_level match request_parameter
		if (goal.results) {
			const initDifferent =
				goal.results.initial_climb !== results.context.request_parameter;
			const exitDifferent =
				goal.results.exit_level !== results.context.request_parameter;
			if (!initDifferent && !exitDifferent) {
				isAccepted = true;
			} else if (initDifferent || exitDifferent) {
				isAccepted = false;
			}
		} else {
			// For heading: if heading was found, consider it accepted
			isAccepted = true;
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
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal)) {
			// For level-change: use initial_climb; for heading: use requestedValue
			const suggestionValue = goal.results
				? goal.results.initial_climb.toString()
				: goal.requestedValue.toString();
			return formatRequestSuggestion(
				getPilotRequestType(request.context?.request_type ?? 0),
				suggestionValue,
			);
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
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal)) {
			return goal.results
				? goal.results.initial_climb.toString()
				: goal.requestedValue.toString();
		}
	}
	return null;
}

export function isAccepted(request: TeamAssistantRequest): boolean {
	if (!request.normalizedGoals) {
		return false;
	}
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal)) {
			if (goal.results) {
				const initDifferent =
					goal.results.initial_climb !== request.context.request_parameter;
				const exitDifferent =
					goal.results.exit_level !== request.context.request_parameter;
				if (!initDifferent && !exitDifferent) {
					return true;
				}
			} else {
				// For heading: positive goal means accepted
				return true;
			}
		}
	}
	return false;
}

export function isAcceptOrSuggest(request: TeamAssistantRequest): boolean {
	if (!request.normalizedGoals) {
		return false;
	}
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal)) {
			return true;
		}
	}
	return false;
}

export function isRejected(request: TeamAssistantRequest): boolean {
	if (!request.normalizedGoals) {
		return false;
	}
	let rejected = true;
	for (const goal of request.normalizedGoals) {
		if (isGoalPositive(goal)) {
			rejected = false;
		}
	}
	return rejected;
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
