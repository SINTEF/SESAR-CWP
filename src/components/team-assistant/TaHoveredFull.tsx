import { observer } from "mobx-react-lite";
// import { usePostHog } from "posthog-js/react";
// import React from "react";
import AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { getRequestStatusColorClass } from "../../utils/teamAssistantHelper";

// import { aircraftStore, cwpStore, roleConfigurationStore } from "../../state";
// import { convertMetersToFlightLevel } from "../../utils";
// import { Altitude, CallSign, NextSectorFL } from "../AircraftContentSmall";
// import Stca from "../conflict-detection-tools/Stca";
// import Tct from "../conflict-detection-tools/Tct";

export default observer(function TaHoveredFull(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	requestParameter: string;
	requestTypeIcon: string;
	request: TeamAssistantRequest;
	width: number;
	autonomyProfile: number;
}) {
	const { width, requestParameter, requestTypeIcon, request, autonomyProfile } =
		properties;
	const isAP2 = autonomyProfile === 2;

	const results = request.goals?.[0]?.results;

	const getStatusColor = (status: boolean | null | undefined) => {
		if (status === undefined || status === null) {
			return <span className="text-gray-500">●</span>;
		}
		return status ? (
			<span className="text-green-400">●</span>
		) : (
			<span className="text-red-500">●</span>
		);
	};

	// const pilotRequest = aircraftStore.getFirstRequestForAircraft(
	// 	aircraft.aircraftId,
	// );

	// const onClickAccept = () => {
	// 	const request = aircraftStore.getFirstRequestForAircraft(
	// 		aircraft.aircraftId,
	// 	);
	// 	// if (request) { Need to fix this part
	// 	// 	request.status = 1;
	// 	// }
	// };
	// function getStatusColorClass(status: boolean | null | undefined): string {
	// 	if (status === undefined || status === null) {
	// 		return "text-gray-500";
	// 	}
	// 	return status ? "text-green-400" : "text-red-500";
	// }

	return (
		<table className="h-full border-collapse" style={{ width: `${width}px` }}>
			<tbody>
				{/* First row */}
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
					<td className="p-0 cursor-pointer text-right">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-3 h-3 inline-block"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</td>
				</tr>

				{/* Goal results rows */}
				{results && (
					<>
						<tr>
							<td className="pr-1" colSpan={2}>
								{getStatusColor(results.isConformToFlightPlan)} FMP{" "}
								{request.context?.requestParameter}
							</td>
						</tr>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(results.exitProblemsAreManageable)} MTCD{" "}
								{request.context?.requestParameter}
							</td>
						</tr>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(results.trafficComplexityManageable)} TCT{" "}
								{request.context?.requestParameter}
							</td>
						</tr>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(results.nextSectorCapacityOk)} Next Sector{" "}
								{results.nextSector}
							</td>
						</tr>
					</>
				)}

				{/* Bottom row with actions */}
				{isAP2 && (
					<tr>
						<td className="flex flex-row justify-end gap-0 pl-2 pb-0">
							<span
								className={getRequestStatusColorClass(
									request.goals?.[0]?.results,
								)}
							>
								●
							</span>
							<span className="text-xs text-[#40c4ff]">{requestParameter}</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-3 h-3 inline-block cursor-pointer"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m4.5 12.75 6 6 9-13.5"
								/>
							</svg>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
});
