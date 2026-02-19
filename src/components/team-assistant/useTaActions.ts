import { usePostHog } from "posthog-js/react";
import type AircraftModel from "../../model/AircraftModel";
import type { TeamAssistantRequest } from "../../model/AircraftStore";
import { publishPilotRequestClear } from "../../mqtt-client/publishers";
import { aircraftStore } from "../../state";
import { DATALINK_DELAY_MS } from "../shared/CommunicationButtons";

/**
 * Shared action handlers for Team Assistant request components.
 * Handles accept, dismiss, and accept-with-delay actions with PostHog tracking.
 *
 * @param onAccept - Optional callback invoked on accept (e.g. to update CFL in TaHoveredSmall)
 */
export function useTaActions(
	aircraft: AircraftModel,
	request: TeamAssistantRequest,
	component: string,
	onAccept?: () => void,
) {
	const posthog = usePostHog();

	const basePayload = {
		aircraft_id: aircraft.aircraftId,
		callsign: aircraft.callSign,
		request_id: request.requestId,
		request_type: request.context?.request_type,
		request_parameter: request.context?.request_parameter,
	};

	const handleAccept = async (): Promise<void> => {
		posthog?.capture("TA_request_accepted", { ...basePayload, component });
		onAccept?.();
		await publishPilotRequestClear(request.flightId, request.requestId);
		aircraftStore.removeTeamAssistantRequest(
			request.flightId,
			request.requestId,
		);
	};

	const handleDismiss = async (): Promise<void> => {
		posthog?.capture("TA_request_dismissed", { ...basePayload, component });
		await publishPilotRequestClear(request.flightId, request.requestId);
		aircraftStore.removeTeamAssistantRequest(
			request.flightId,
			request.requestId,
		);
	};

	const handleAcceptWithDelay = (): void => {
		posthog?.capture("TA_request_accepted_DL", {
			...basePayload,
			component,
			delay_ms: DATALINK_DELAY_MS,
		});
		aircraftStore.removeTeamAssistantRequest(
			request.flightId,
			request.requestId,
		);
		setTimeout(async () => {
			onAccept?.();
			await publishPilotRequestClear(request.flightId, request.requestId);
		}, DATALINK_DELAY_MS);
	};

	return { handleAccept, handleDismiss, handleAcceptWithDelay };
}
