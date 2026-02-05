import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";

import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { publishPilotRequestClear } from "../../mqtt-client/publishers";
import { aircraftStore, cwpStore } from "../../state";
import {
	formatRequestSuggestion,
	getRequestStatusColorClass,
} from "../../utils/teamAssistantHelper";

export default observer(function TaHoveredSmall(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	requestParameter: string;
	requestTypeIcon: string;
	request: TeamAssistantRequest;
	width: number;
}) {
	const posthog = usePostHog();
	const { aircraft, request, requestParameter, requestTypeIcon, width } =
		properties;
	const { setTaArrowClickedAircraftId, setHoveredFlightLabelId } = cwpStore;

	const showMoreArrowClicked = () => {
		posthog?.capture("TA_expand_details_clicked", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			request_id: request.requestId,
			request_type: request.context?.request_type,
			request_parameter: request.context?.request_parameter,
		});
		setTaArrowClickedAircraftId(aircraft.aircraftId);
		setHoveredFlightLabelId(aircraft.aircraftId);
	};

	const handleAccept = async (): Promise<void> => {
		posthog?.capture("TA_request_accepted", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			request_id: request.requestId,
			request_type: request.context?.request_type,
			request_parameter: request.context?.request_parameter,
			component: "TaHoveredSmall",
		});
		// Clear the retained MQTT message
		await publishPilotRequestClear(request.flightId, request.requestId);
		// Remove from store
		aircraftStore.removeTeamAssistantRequest(
			request.flightId,
			request.requestId,
		);
	};

	const handleDismiss = async (): Promise<void> => {
		posthog?.capture("TA_request_dismissed", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			request_id: request.requestId,
			request_type: request.context?.request_type,
			request_parameter: request.context?.request_parameter,
			component: "TaHoveredSmall",
		});
		// Clear the retained MQTT message
		await publishPilotRequestClear(request.flightId, request.requestId);
		// Remove from store
		aircraftStore.removeTeamAssistantRequest(
			request.flightId,
			request.requestId,
		);
	};

	const handleAcceptWithDelay = (): void => {
		posthog?.capture("TA_request_accepted_DL", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			request_id: request.requestId,
			request_type: request.context?.request_type,
			request_parameter: request.context?.request_parameter,
			component: "TaHoveredSmall",
			delay_ms: 1000,
		});
		// Wait 1 second before accepting
		setTimeout(() => {
			handleAccept();
		}, 1000);
	};

	return (
		<div className="flex flex-col" style={{ width: `${width - 10}px` }}>
			{/* Row 1: Icon | Status dot + Parameter | Dismiss X */}
			<div className="flex items-center justify-between">
				<img src={requestTypeIcon} alt="Request type" className="w-4 h-4" />
				<div className="flex items-center gap-0.5 text-xs">
					<span className={getRequestStatusColorClass(request)}>●</span>
					<span className="text-[#40c4ff]">{requestParameter}</span>
				</div>
				<span className="p-0.5 cursor-pointer border border-transparent hover:border-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-3 h-3"
						onClick={() => handleDismiss()}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</span>
			</div>

			{/* Row 2: Status dot | Suggestion with action buttons */}
			<div className="flex items-center justify-start gap-1">
				<span className={`text-xs ${getRequestStatusColorClass(request)}`}>
					●
				</span>
				<span className="text-xs text-[#40c4ff]">
					{formatRequestSuggestion(
						request.context?.request_type ?? 0,
						requestParameter,
					)}
				</span>
				{!aircraft.hasCPDLC && (
					<span className="p-0.5 cursor-pointer border border-transparent hover:border-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-3 h-3"
							onClick={() => handleAccept()}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 12.75 6 6 9-13.5"
							/>
						</svg>
					</span>
				)}
			</div>

			{/* Row 3: CPDLC action buttons (only if hasCPDLC) */}
			{aircraft.hasCPDLC && (
				<div className="flex items-center justify-start gap-0.5">
					<span
						className="p-0.5 cursor-pointer text-xs border border-transparent hover:border-white"
						onClick={() => handleAccept()}
					>
						R/T
					</span>
					<span
						className="p-0.5 cursor-pointer text-xs border border-transparent hover:border-white"
						onClick={() => handleAcceptWithDelay()}
					>
						DL
					</span>
				</div>
			)}

			{/* Row 4: Expand arrow (right aligned) */}
			<div className="flex items-end justify-end mb-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-3 h-3 cursor-pointer"
					onClick={() => showMoreArrowClicked()}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
					/>
				</svg>
			</div>
		</div>
	);
});
