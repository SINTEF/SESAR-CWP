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
	width?: number;
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

	return (
		<div
			className="flex flex-col gap-0.5 h-full"
			style={{ width: `${width}px` }}
		>
			{/* Row 1: Icon | Status dot + Parameter */}
			<div className="flex items-center justify-between">
				<img src={requestTypeIcon} alt="Request type" className="w-4 h-4" />
				<div className="flex items-center gap-0.5 text-xs">
					<span
						className={getRequestStatusColorClass(request.goals?.[0]?.results)}
					>
						●
					</span>
					<span className="text-[#40c4ff]">{requestParameter}</span>
				</div>
				<div className="w-3" /> {/* Spacer to align with row 2 icons */}
			</div>

			{/* Row 2: Green dot | Suggestion | Checkmark + Cross */}
			<div className="flex items-center justify-between">
				<span className="text-green-400 text-xs">●</span>
				<span className="text-xs flex-1 text-center">
					{formatRequestSuggestion(
						request.context?.request_type ?? 0,
						requestParameter,
					)}
				</span>
				<div className="flex items-center gap-0.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-3 h-3 cursor-pointer"
						onClick={() => handleAccept()}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m4.5 12.75 6 6 9-13.5"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-3 h-3 cursor-pointer"
						onClick={() => handleDismiss()}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</div>
			</div>

			{/* Row 3: Empty | Empty | Expand arrow */}
			<div className="flex items-center justify-end">
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
