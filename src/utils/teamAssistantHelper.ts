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
		if (!isGoalPositive(goal, requestType)) {
			continue;
		}
		switch (requestType) {
			case PilotRequestType.FlightLevel:
			case PilotRequestType.Direct: {
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
				// Heading found is sufficient for acceptance
				isAccepted = true;
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
