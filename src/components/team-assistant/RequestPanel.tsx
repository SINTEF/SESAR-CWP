import { observer } from "mobx-react-lite";
import type { TeamAssistantRequest } from "../../model/AircraftStore";
import { publishPilotRequestClear } from "../../mqtt-client/publishers";
import { aircraftStore } from "../../state";

interface RequestPanelProps {
	flightId: string;
	request: TeamAssistantRequest;
}

/**
 * Get the icon path based on request type.
 * HEADING type can be used for weather avoidance requests.
 * requestType: 0=FLIGHT_LEVEL, 1=DIRECTTO, 2=HEADING, 3=SPEED
 */
function getIconForRequestType(requestType: number): string {
	switch (requestType) {
		case 0: // FLIGHT_LEVEL
			return "/flight_level_request.svg";
		case 1: // DIRECTTO
			return "/icon_direct_request.svg";
		case 2: // HEADING - Weather avoidance uses HEADING type
			return "/icon_thunderstorm.svg";
		case 3: // SPEED - Use flight level icon as fallback for speed
			return "/flight_level_request.svg";
		default:
			return "/flight_level_request.svg";
	}
}

/**
 * Format the request parameter for display.
 * Adds "FL" prefix for flight level requests if not already present.
 * requestType: 0=FLIGHT_LEVEL, 1=DIRECTTO, 2=HEADING, 3=SPEED
 */
function formatRequestParameter(
	requestType: number,
	parameter: number | string,
): string {
	const paramStr = String(parameter);
	if (requestType === 0) {
		// FLIGHT_LEVEL
		return paramStr;
	}
	if (requestType === 1) {
		// DIRECTTO - parameter is waypoint name
		return paramStr;
	}
	if (requestType === 2) {
		// HEADING
		return `HDG${paramStr}`;
	}
	if (requestType === 3) {
		// SPEED
		return `${paramStr}kt`;
	}
	return paramStr;
}

/**
 * A small panel component that displays a single pilot request.
 * Shows an icon, the request parameter, accept/dismiss buttons, and a status indicator.
 */
export default observer(function RequestPanel({
	flightId,
	request,
}: RequestPanelProps) {
	const { requestId } = request;
	const requestType = request.context?.request_type ?? 0;
	const requestParameter = request.context?.request_parameter ?? "";

	const iconSrc = getIconForRequestType(requestType);
	const displayParameter = formatRequestParameter(
		requestType,
		requestParameter,
	);

	const handleAccept = async (): Promise<void> => {
		// Clear the retained MQTT message
		await publishPilotRequestClear(flightId, requestId);
		// Remove from store
		aircraftStore.removeTeamAssistantRequest(flightId, requestId);
	};

	const handleDismiss = async (): Promise<void> => {
		// Clear the retained MQTT message
		await publishPilotRequestClear(flightId, requestId);
		// Remove from store
		aircraftStore.removeTeamAssistantRequest(flightId, requestId);
	};

	return (
		<div className="flex flex-col gap-1 bg-neutral-800/40 rounded p-1.5 min-w-15 backdrop-blur-[1.5px] text-[#40c4ff]">
			<div className="flex items-center gap-1.5">
				<img src={iconSrc} alt="Request type" className="w-4 h-4" />
				<span className="text-xs">{displayParameter}</span>
			</div>

			{/* Action buttons */}
			<div className="flex gap-1 text-white">
				<button
					type="button"
					className="btn btn-xs btn-ghost"
					onClick={handleDismiss}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<button
					type="button"
					className="btn btn-xs btn-ghost"
					onClick={handleAccept}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="20 6 9 17 4 12"></polyline>
					</svg>
				</button>
			</div>
		</div>
	);
});
