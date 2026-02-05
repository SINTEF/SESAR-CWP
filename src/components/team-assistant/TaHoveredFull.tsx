import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";
import AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { publishPilotRequestClear } from "../../mqtt-client/publishers";
import { Goal } from "../../schemas/pilotRequestSchema";
import { aircraftStore } from "../../state";
import {
	findSuggestionForRequest,
	getRequestStatusColorClass,
	getStatusColorClass,
	isRejected,
} from "../../utils/teamAssistantHelper";

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
	const posthog = usePostHog();
	const {
		aircraft,
		width,
		requestParameter,
		requestTypeIcon,
		request,
		autonomyProfile,
	} = properties;
	const isAP2 = autonomyProfile === 1;

	const results = request.goals.sort(
		(a, b) => (b.results?.initial_climb ?? 0) - (a.results?.initial_climb ?? 0),
	);

	const getStatusColor = (status: boolean | null | undefined) => {
		if (status === undefined || status === null) {
			return <span className="text-yellow-500">●</span>;
		}
		return status ? (
			<span className="text-green-400">●</span>
		) : (
			<span className="text-red-500">●</span>
		);
	};

	const getFMPStatus = (goal: Goal) => {
		if (results === undefined || results === null) {
			return null;
		}
		const isOk =
			goal.results?.next_sector_capacity_ok &&
			!goal.results?.altitude_restriction;
		return (
			<>
				<tr>
					<td className="pr-1" colSpan={2}>
						{getStatusColor(isOk)} FMP {goal.RFL}
					</td>
				</tr>
				{!isOk && (
					<span className="ml-5">
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(goal.results?.next_sector_capacity_ok)}{" "}
								{goal.results?.next_sector}
							</td>
						</tr>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(!goal.results?.altitude_restriction)} LOA
							</td>
						</tr>
					</span>
				)}
			</>
		);
	};

	// const getCoordinationWithNextSectorStatus = (goal: GoalResults) => {
	// 	if (goal === undefined || goal === null) {
	// 		return null;
	// 	}
	// 	const requiredCoordination = goal.is_conform_to_flight_plan;
	// 	// If false? Then show that it is checked with next sector?
	// 	if (requiredCoordination) {
	// 		return null;
	// 	} else {
	// 		return (
	// 			// Faking that the TA has communicated with next sector ATCO
	// 			<tr>
	// 				<td className="text-xs" colSpan={2}>
	// 					{getStatusColor(true)} Next Sector Coordination {goal.next_sector}
	// 				</td>
	// 			</tr>
	// 		);
	// 	}
	// };

	const getExitStatus = (goal: Goal) => {
		// Check if any coordination item is an object (conflict) rather than a string
		const hasConflictObject = goal.results?.required_coordinations.some(
			(item) => typeof item === "object",
		);

		return (
			<>
				<tr>
					<td className="text-xs" colSpan={2}>
						{getStatusColor(
							!goal.results?.exit_problems_are_manageable
								? undefined
								: goal.results?.exit_problems_are_manageable,
						)}{" "}
						EXIT {goal.RFL}
					</td>
				</tr>
				{!goal.results?.exit_problems_are_manageable && (
					<span className="ml-5">
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(goal.results?.is_conform_to_flight_plan)} FLP{" "}
								{goal.RFL}
							</td>
						</tr>
						{hasConflictObject && (
							<tr>
								<td className="text-xs" colSpan={2}>
									{getStatusColor(false)} {goal.results?.next_sector} MTCD{" "}
									{goal.RFL}
								</td>
							</tr>
						)}
					</span>
				)}
			</>
		);
	};

	// const pilotRequest = aircraftStore.getFirstRequestForAircraft(
	// 	aircraft.aircraftId,
	// );

	// function getStatusColorClass(status: boolean | null | undefined): string {
	// 	if (status === undefined || status === null) {
	// 		return "text-gray-500";
	// 	}
	// 	return status ? "text-green-400" : "text-red-500";
	// }

	const handleAccept = async (): Promise<void> => {
		posthog?.capture("TA_request_accepted", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			request_id: request.requestId,
			request_type: request.context?.request_type,
			request_parameter: request.context?.request_parameter,
			autonomy_profile: autonomyProfile,
			component: "TaHoveredFull",
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

	const handleDismiss = async (): Promise<void> => {
		posthog?.capture("TA_request_dismissed", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			request_id: request.requestId,
			request_type: request.context?.request_type,
			request_parameter: request.context?.request_parameter,
			autonomy_profile: autonomyProfile,
			component: "TaHoveredFull",
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
		<table className="h-full border-collapse" style={{ width: `${width}px` }}>
			<tbody>
				{/* First row */}
				<tr>
					<td className="flex flex-row items-start justify-between">
						<div className="flex justify-start gap-0.5">
							<img
								src={requestTypeIcon}
								alt="Request type"
								className="w-4 h-4"
							/>
							<div className="flex items-center gap-0.5 text-xs">
								<span className={getRequestStatusColorClass(request)}>●</span>
								<span className="text-[#40c4ff]">{requestParameter}</span>
							</div>
						</div>
						<span className="p-0.5 cursor-pointer border border-transparent hover:border-white">
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
						</span>
					</td>
				</tr>

				{/* Goal results rows */}
				{results.map((goal, index) => {
					if (goal.results) {
						return (
							<React.Fragment key={index}>
								{/* {results.initial_climb !== results.exit_level && ( */}
								<tr>
									<td className="text-xs" colSpan={2}>
										{getStatusColor(goal.results.traffic_complexity_manageable)}{" "}
										TCT {goal.RFL}
									</td>
								</tr>
								{/* )} */}
								{getFMPStatus(goal)}
								{getExitStatus(goal)}
								{/* {getCoordinationWithNextSectorStatus(goal.results)} */}
								<tr>
									<td colSpan={2}>
										<hr className="border-t border-white/30 my-1" />
									</td>
								</tr>
							</React.Fragment>
						);
					}
					return null;
				})}

				{/* Suggestion row with action buttons */}
				{isAP2 && (
					<tr>
						<td className="text-center pt-1">
							<div className="flex items-center justify-center gap-1">
								<span
									className={getStatusColorClass(isRejected(request) ? 0 : 1)}
								>
									●
								</span>
								<span className="text-xs text-[#40c4ff]">
									{findSuggestionForRequest(request)}?
								</span>
								{!aircraft.hasCPDLC && (
									<span className="p-0.5 cursor-pointer border border-white border-opacity-70">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-3 h-3 inline-block cursor-pointer"
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
						</td>
					</tr>
				)}

				{/* CPDLC action buttons row (only if hasCPDLC and isAP2) */}
				{isAP2 && aircraft.hasCPDLC && (
					<tr>
						<td className="text-center">
							<div className="flex flex-row items-center justify-center gap-1">
								<span
									className="p-0.5 cursor-pointer border border-white border-opacity-70"
									onClick={() => handleAccept()}
								>
									R/T
								</span>
								<span
									className="p-0.5 cursor-pointer border border-white border-opacity-70"
									onClick={() => handleAcceptWithDelay()}
								>
									DL
								</span>
							</div>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
});
