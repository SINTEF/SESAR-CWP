import AircraftModel from "../model/AircraftModel";
import { TeamAssistantRequest } from "../model/AircraftStore";
import type { NormalizedGoal } from "../schemas/pilotRequestSchema";

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
 * Adds correct prefix.
 * requestType: 0=flight_level_request, 1=direct_request, 2=absolute_heading_request, 3=relative_heading_request
 */
export function formatRequestSuggestion(
	requestType: number,
	parameter: string,
): string {
	if (requestType === 0 && !parameter.startsWith("FL")) {
		// FLIGHT_LEVEL
		return `FL ${parameter} `;
	}
	if (requestType === 1) {
		// DIRECT_REQUEST
		return `DIRECT TO ${parameter}`;
	}
	if (requestType === 2) {
		// ABSOLUTE_HEADING
		return `HDG ${parameter}`;
	}
	if (requestType === 3) {
		// RELATIVE_HEADING
		const num = Number(parameter);
		return `${num > 0 ? "+" : ""}${parameter}°`;
	}
	return parameter;
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
				request.context?.request_type ?? 0,
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
	if (!isAccepted(request) && getSuggestionForRequest(request)) {
		aircraft.setNextACCFL(getSuggestionForRequest(request) ?? "COO");
	} else {
		aircraft.setNextACCFL(
			request.context?.request_parameter.toString() ?? "COO",
		);
	}
};
