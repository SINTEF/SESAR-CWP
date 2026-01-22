import { observer } from "mobx-react-lite";
// import { usePostHog } from "posthog-js/react";
// import React from "react";

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
	const { aircraft, request, requestParameter, requestTypeIcon, width } =
		properties;
	const { setTaArrowClickedAircraftId, setHoveredFlightLabelId } = cwpStore;

	const showMoreArrowClicked = () => {
		setTaArrowClickedAircraftId(aircraft.aircraftId);
		setHoveredFlightLabelId(aircraft.aircraftId);
	};

	const handleAccept = async (): Promise<void> => {
		// Clear the retained MQTT message
		await publishPilotRequestClear(aircraft.aircraftId, request.requestId);
		// Remove from store
		aircraftStore.removeTeamAssistantRequest(
			aircraft.aircraftId,
			request.requestId,
		);
	};

	const handleDismiss = async (): Promise<void> => {
		// Clear the retained MQTT message
		await publishPilotRequestClear(aircraft.aircraftId, request.requestId);
		// Remove from store
		aircraftStore.removeTeamAssistantRequest(
			aircraft.aircraftId,
			request.requestId,
		);
	};

	return (
		<table className="h-full border-collapse" style={{ width: `${width}px` }}>
			{/* <colgroup>
				<col style={{ width: "auto" }} />
				<col />
				<col style={{ width: "12px" }} />
				<col></col>
			</colgroup> */}
			<tbody>
				{/* Row 1: Icon | Parameter | Cross */}
				<tr>
					<td className="flex flex-row">
						<div className="flex items-center gap-1.5">
							<img
								src={requestTypeIcon}
								alt="Request type"
								className="w-4 h-4"
							/>
						</div>
					</td>
					<td className="p-0 text-xs">
						<span
							className={getRequestStatusColorClass(
								request.goals?.[0]?.results,
							)}
						>
							●
						</span>
						<span className="text-xs text-[#40c4ff]">{requestParameter}</span>
					</td>
					<td></td>
					<td></td>
				</tr>
				{/* Row 2: Dot | Suggestion | Checkmark */}
				<tr>
					<td className="p-0 flex flex-row gap-0">
						{/* </td>
					<td className="p-0 text-xs"> */}
						<span className="text-green-400 text-xs">●</span>
						<span>
							{formatRequestSuggestion(
								request.context?.request_type ?? 0,
								requestParameter,
							)}
						</span>
						{/* <td className="p-0 cursor-pointer"> */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-3 h-3 inline-block"
							onClick={() => handleAccept()}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 12.75 6 6 9-13.5"
							/>
						</svg>
						{/* </td> */}
						{/* <td className="p-0 cursor-pointer"> */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-3 h-3 inline-block"
							onClick={() => handleDismiss()}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</td>
				</tr>
				{/* Row 3: Empty | Empty | Arrow */}
				<tr>
					<td className="p-0"></td>
					<td className="p-0"></td>
					<td
						className="p-0 cursor-pointer text-right"
						onClick={() => showMoreArrowClicked()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-3 h-3"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
							/>
						</svg>
					</td>
				</tr>
			</tbody>
		</table>
	);
});
