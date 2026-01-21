import { GoalResultsMessage } from "../proto/ProtobufAirTrafficSimulator";

// To be fixed with actual status logic for
export function getRequestStatusColorClass(
	results: GoalResultsMessage | undefined,
): string {
	if (!results) {
		return "text-gray-500";
	}
	const isOk =
		results.exitProblemsAreManageable && results.trafficComplexityManageable;
	return isOk ? "text-green-400" : "text-red-500";
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
		return parameter;
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
