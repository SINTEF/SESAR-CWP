import { observer } from "mobx-react-lite";
import type { TeamAssistantRequest } from "../../model/AircraftStore";
import { publishPilotRequestClear } from "../../mqtt-client/publishers";
import {
	PilotRequestStatus,
	PilotRequestTypes,
} from "../../proto/ProtobufAirTrafficSimulator";
import { aircraftStore } from "../../state";

interface RequestPanelProps {
	flightId: string;
	request: TeamAssistantRequest;
}

/**
 * Get the icon path based on request type.
 * HEADING type can be used for weather avoidance requests.
 */
function getIconForRequestType(
	requestType: PilotRequestTypes,
	_requestParameter: string,
): string {
	switch (requestType) {
		case PilotRequestTypes.FLIGHT_LEVEL:
			return "/icon_flight_level_change.svg";
		case PilotRequestTypes.DIRECTTO:
			return "/icon_direct_request.svg";
		case PilotRequestTypes.HEADING:
			// Weather avoidance uses HEADING type
			return "/icon_thunderstorm.svg";
		case PilotRequestTypes.SPEED:
			// Use flight level icon as fallback for speed
			return "/icon_flight_level_change.svg";
		default:
			return "/icon_flight_level_change.svg";
	}
}

/**
 * Get the status color based on request status.
 */
function getStatusColor(status: PilotRequestStatus): string {
	switch (status) {
		case PilotRequestStatus.PR_PENDING:
			return "bg-yellow-500";
		case PilotRequestStatus.PR_ACCEPTED:
			return "bg-green-500";
		case PilotRequestStatus.PR_REJECTED:
			return "bg-red-500";
		default:
			return "bg-yellow-500";
	}
}

/**
 * Format the request parameter for display.
 * Adds "FL" prefix for flight level requests if not already present.
 */
function formatRequestParameter(
	requestType: PilotRequestTypes,
	parameter: string,
): string {
	if (
		requestType === PilotRequestTypes.FLIGHT_LEVEL &&
		!parameter.startsWith("FL")
	) {
		return `FL${parameter}`;
	}
	if (requestType === PilotRequestTypes.SPEED) {
		return `${parameter}kt`;
	}
	if (requestType === PilotRequestTypes.HEADING) {
		return `HDG${parameter}`;
	}
	return parameter;
}

/**
 * A small panel component that displays a single pilot request.
 * Shows an icon, the request parameter, accept/dismiss buttons, and a status indicator.
 */
export default observer(function RequestPanel({
	flightId,
	request,
}: RequestPanelProps) {
	const { requestId, requestType, requestParameter, status } = request;

	const iconSrc = getIconForRequestType(requestType, requestParameter);
	const statusColor = getStatusColor(status);
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
		<div className="flex flex-col gap-1 bg-base-300 border border-base-content/20 rounded p-1.5 min-w-[70px]">
			{/* Status indicator */}
			<div className="flex items-center gap-1.5">
				<div className={`w-2 h-2 rounded-full ${statusColor}`} />
				<img src={iconSrc} alt="Request type" className="w-4 h-4" />
				<span className="text-xs font-medium text-white truncate">
					{displayParameter}
				</span>
			</div>

			{/* Action buttons */}
			<div className="flex gap-1">
				<button
					type="button"
					className="btn btn-xs btn-success flex-1 text-[10px] px-1"
					onClick={handleAccept}
				>
					Accept
				</button>
				<button
					type="button"
					className="btn btn-xs btn-ghost border-base-content/30 flex-1 text-[10px] px-1"
					onClick={handleDismiss}
				>
					Dismiss
				</button>
			</div>
		</div>
	);
});
