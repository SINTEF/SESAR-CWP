import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { publishPilotRequestClear } from "../../mqtt-client/publishers";
import { aircraftStore } from "../../state";
import {
	formatRequestSuggestion,
	getRequestStatusColorClass,
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
					<td className="flex flex-row items-start">
						<div className="flex justify-start gap-0.5">
							<img
								src={requestTypeIcon}
								alt="Request type"
								className="w-4 h-4"
							/>
							<div className="flex items-center gap-0.5 text-xs">
								<span
									className={getRequestStatusColorClass(
										request.goals?.[0]?.results,
									)}
								>
									●
								</span>
								<span className="text-[#40c4ff]">{requestParameter}</span>
							</div>
							<div className="w-3" /> {/* Spacer to align with row 2 icons */}
						</div>
					</td>
				</tr>

				{/* Goal results rows */}
				{results && (
					<>
						<tr>
							<td className="pr-1" colSpan={2}>
								{getStatusColor(results.is_conform_to_flight_plan)} FMP{" "}
								{request.context?.request_parameter}
							</td>
						</tr>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(results.exit_problems_are_manageable)} MTCD{" "}
								{request.context?.request_parameter}
							</td>
						</tr>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(results.traffic_complexity_manageable)} TCT{" "}
								{request.context?.request_parameter}
							</td>
						</tr>
						<tr>
							<td className="text-xs" colSpan={2}>
								{getStatusColor(results.next_sector_capacity_ok)} Next Sector{" "}
								{results.next_sector}
							</td>
						</tr>
					</>
				)}

				{/* Suggestion row */}
				{isAP2 && (
					<tr>
						<td className="text-center pt-1">
							<span
								className={getRequestStatusColorClass(
									request.goals?.[0]?.results,
								)}
							>
								●
							</span>{" "}
							<span className="text-xs text-[#40c4ff] inline-block">
								{formatRequestSuggestion(
									request.context?.request_type ?? 0,
									requestParameter,
								)}
								?
							</span>
						</td>
					</tr>
				)}

				{/* Action buttons row */}
				{isAP2 && (
					<tr>
						<td className="text-center">
							<div className="flex flex-row items-center justify-center gap-1">
								{aircraft.hasCPDLC ? (
									<>
										<span
											className="p-0.5 cursor-pointer border border-transparent hover:border-white"
											onClick={() => handleAccept()}
										>
											R/T
										</span>
										<span
											className="p-0.5 cursor-pointer border border-transparent hover:border-white"
											onClick={() => handleAcceptWithDelay()}
										>
											DL
										</span>
										<span className="p-0.5 cursor-pointer border border-transparent hover:border-white">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-3 h-3 inline-block cursor-pointer"
												onClick={handleDismiss}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 18 18 6M6 6l12 12"
												/>
											</svg>
										</span>
									</>
								) : (
									<>
										<span className="p-0.5 cursor-pointer border border-transparent hover:border-white">
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
										<span className="p-0.5 cursor-pointer border border-transparent hover:border-white">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="w-3 h-3 inline-block cursor-pointer"
												onClick={handleDismiss}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 18 18 6M6 6l12 12"
												/>
											</svg>
										</span>
									</>
								)}
							</div>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
});
