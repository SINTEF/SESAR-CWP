import { TeamAssistantRequest } from "../model/AircraftStore";

// Could this logic somewhat work?
export function getRequestStatusColorClass(
	results: TeamAssistantRequest | undefined,
): string {
	if (!results) {
		return "text-gray-500";
	}
	let isAccepted = false;
	const resultGoals = results.goals;
	for (let i = 0; i < resultGoals.length; i++) {
		const goal = resultGoals[i];
		if (!goal.results?.higher_level_available) {
			continue;
		}
		// This will probably only work for FLIGHT_LEVEL, need to figure out for the other scenarios
		const initDifferent =
			results.goals[i].results?.initial_climb !==
			results.context.request_parameter; // how to check whether accepted or another solution?
		const exitDifferent =
			results.goals[i].results?.exit_level !==
			results.context.request_parameter;
		if (!initDifferent && !exitDifferent) {
			isAccepted = true;
		} else if (initDifferent || exitDifferent) {
			isAccepted = false;
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
	if (!request.goals) {
		return null;
	}
	for (const goal of request.goals) {
		if (goal.results?.higher_level_available) {
			return formatRequestSuggestion(
				request.context?.request_type ?? 0,
				goal.results.initial_climb.toString(),
			);
		}
	}
	return null;
}

export function isAccepted(request: TeamAssistantRequest): boolean {
	if (!request.goals) {
		return false;
	}
	for (const goal of request.goals) {
		if (goal.results?.higher_level_available) {
			const initDifferent =
				goal.results?.initial_climb !== request.context.request_parameter; // how to check whether accepted or another solution?
			const exitDifferent =
				goal.results?.exit_level !== request.context.request_parameter;
			if (!initDifferent && !exitDifferent) {
				return true;
			}
		}
	}
	return false;
}

export function isAcceptOrSuggest(request: TeamAssistantRequest): boolean {
	if (!request.goals) {
		return false;
	}
	for (const goal of request.goals) {
		if (goal.results?.higher_level_available) {
			return true;
		}
	}
	return false;
}

export function isRejected(request: TeamAssistantRequest): boolean {
	if (!request.goals) {
		return false;
	}
	let rejected = true;
	for (const goal of request.goals) {
		if (goal.results?.higher_level_available) {
			rejected = false;
		}
	}
	return rejected;
}
