import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";

import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { publishPilotRequestClear } from "../../mqtt-client/publishers";
import { aircraftStore, cwpStore } from "../../state";
import {
	findSuggestionForRequest,
	getRequestStatusColorClass,
	getStatusColorClass,
	isRejected,
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
		aircraftStore.removeTeamAssistantRequest(
			request.flightId,
			request.requestId,
		);
		// Wait 1 second before climbing?
		setTimeout(async () => {
			await publishPilotRequestClear(request.flightId, request.requestId);
		}, 1000);
	};

	return (
		<div className="flex flex-col gap-1" style={{ width: `${width - 10}px` }}>
			{/* Row 1: Icon | Status dot + Parameter | Dismiss X */}
			<div className="flex items-start justify-between gap-0">
				<div className="flex items-start flex-row">
					<img src={requestTypeIcon} alt="Request type" className="w-4 h-4" />
					<span className="">
						<span className={getRequestStatusColorClass(request)}>●</span>
						<span className="text-[#40c4ff]">{requestParameter}</span>
					</span>
				</div>
				{/* <div> */}
				<div className="items-start p-0.5 cursor-pointer border border-transparent hover:border-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-3 h-3"
						onClick={handleDismiss}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</div>
				{/* </div> */}
			</div>

			{/* Row 2: Status dot | Suggestion */}
			<div className="flex flex-row justify-between">
				<div className="flex items-center justify-start gap-1">
					<span className={getStatusColorClass(isRejected(request) ? 0 : 1)}>
						●
					</span>
					<span className="text-xs text-[#40c4ff]">
						{findSuggestionForRequest(request)}?
					</span>
				</div>
				{!aircraft.hasCPDLC && (
					<span className="cursor-pointer border border-transparent hover:border-white">
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

			{/* Row 3: Action buttons centered (if CPDLC), Expand arrow always on right */}
			<div className="relative flex items-center justify-center">
				{aircraft.hasCPDLC && (
					<div className="flex items-center gap-0.5">
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
				<span
					className={`${aircraft.hasCPDLC ? "" : "absolute top-0"} cursor-pointer border border-transparent hover:border-white text-xs absolute right-0`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-3 h-3"
						onClick={() => showMoreArrowClicked()}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
						/>
					</svg>
				</span>
			</div>
		</div>
	);
});
