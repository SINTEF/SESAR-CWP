import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";
import AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import type { NormalizedGoal } from "../../schemas/pilotRequestSchema";
import { cwpStore } from "../../state";
import { isAcceptOrSuggest } from "../../utils/teamAssistantHelper";
import {
	CollapseArrow,
	CpdlcButtons,
	DismissButton,
	getStatusColor,
	SuggestionContent,
	TaHeaderContent,
} from "./TaSharedComponents";
import { useTaActions } from "./useTaActions";

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

	const { handleAccept, handleDismiss, handleAcceptWithDelay } = useTaActions(
		aircraft,
		request,
		"TaHoveredFull",
	);

	const showLessArrowClicked = () => {
		posthog?.capture("TA_less_details_clicked", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			request_id: request.requestId,
			request_type: request.context?.request_type,
			request_parameter: request.context?.request_parameter,
		});
		cwpStore.setTaArrowClickedAircraftId("");
	};

	const normalizedGoals = [...request.normalizedGoals].sort(
		(a, b) => (b.results?.initial_climb ?? 0) - (a.results?.initial_climb ?? 0),
	);

	return (
		<table className="h-full border-collapse" style={{ width: `${width}px` }}>
			<tbody>
				{/* Header row: icon + parameter + collapse/dismiss */}
				<tr>
					<td className="flex flex-row items-start justify-between">
						<TaHeaderContent
							requestTypeIcon={requestTypeIcon}
							requestParameter={requestParameter}
							request={request}
						/>
						<span className="flex flex-row pr-2">
							<CollapseArrow onClick={showLessArrowClicked} />
							<DismissButton onClick={handleDismiss} />
						</span>
					</td>
				</tr>
				{/* Goal detail rows */}
				{normalizedGoals.map((goal, index) => {
					if (goal.results) {
						return (
							<LevelChangeGoalRows
								key={index}
								goal={goal}
								index={index}
								totalGoals={normalizedGoals.length}
								isAP2={isAP2}
								requestParameter={request.context.request_parameter}
							/>
						);
					}
					// Heading goal rendering
					const noConflicts = goal.inSectorConflicts?.length === 0;
					return (
						<React.Fragment key={index}>
							<tr>
								<td className="text-xs" colSpan={2}>
									{getStatusColor(noConflicts)} TCT
								</td>
							</tr>
							{isAP2 && index < normalizedGoals.length - 1 && (
								<tr>
									<td colSpan={2}>
										<hr className="border-t border-white/30 mr-2 ml-0" />
									</td>
								</tr>
							)}
						</React.Fragment>
					);
				})}
				{/* Suggestion row (AP2 only) */}
				{isAP2 && isAcceptOrSuggest(request) && (
					<>
						<tr>
							<td colSpan={2}>
								<hr className="border-t border-white/30 mr-2 ml-0" />
							</td>
						</tr>
						<tr>
							<td className="text-center pt-1">
								<SuggestionContent
									request={request}
									showAcceptCheckmark={!aircraft.hasCPDLC}
									onAccept={handleAccept}
								/>
							</td>
						</tr>
					</>
				)}
				{/* CPDLC buttons (AP2 + CPDLC only) */}
				{isAP2 && aircraft.hasCPDLC && isAcceptOrSuggest(request) && (
					<tr>
						<td className="text-center">
							<CpdlcButtons
								onAccept={handleAccept}
								onAcceptWithDelay={handleAcceptWithDelay}
							/>
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
});

/** Level-change goal detail rows: TCT + FMP + Exit status. */
function LevelChangeGoalRows({
	goal,
	index,
	totalGoals,
	isAP2,
	requestParameter,
}: {
	goal: NormalizedGoal;
	index: number;
	totalGoals: number;
	isAP2: boolean;
	requestParameter: number | string;
}) {
	if (!goal.results) {
		return null;
	}
	if (!isAP2 && goal.requestedValue !== requestParameter) {
		return null;
	}

	// FMP status
	const fmpIsOk =
		goal.results.next_sector_capacity_ok && !goal.results.altitude_restriction;

	// Exit status color logic:
	// - yellow (undefined): exit_problems_are_manageable && hasConflictObject
	// - green (true): exit_problems_are_manageable && !hasConflictObject
	// - red (false): !exit_problems_are_manageable
	const hasConflictObject = goal.results.required_coordinations.some(
		(item) => typeof item === "object",
	);
	const exitStatusColor =
		goal.results.exit_problems_are_manageable && hasConflictObject
			? undefined // yellow
			: goal.results.exit_problems_are_manageable; // green or red

	return (
		<React.Fragment key={index}>
			{/* TCT row */}
			<tr>
				<td className="text-xs" colSpan={2}>
					{getStatusColor(goal.results.traffic_complexity_manageable)} {"< 2 "}
					TCT {goal.requestedValue}
				</td>
			</tr>

			{/* FMP row */}
			<tr>
				<td className="pr-1" colSpan={2}>
					{getStatusColor(fmpIsOk)} FMP {goal.requestedValue}
				</td>
			</tr>
			{!fmpIsOk && (
				<>
					<tr>
						<td className="text-xs" colSpan={2}>
							{getStatusColor(goal.results.next_sector_capacity_ok)}{" "}
							{goal.nextSector}
						</td>
					</tr>
					<tr>
						<td className="text-xs" colSpan={2}>
							{getStatusColor(!goal.results.altitude_restriction)} LOA
						</td>
					</tr>
				</>
			)}

			{/* Exit status rows */}
			<tr>
				<td className="text-xs" colSpan={2}>
					{getStatusColor(exitStatusColor)} {goal.nextSector} MTCD{" "}
					{goal.requestedValue}
				</td>
			</tr>
			<tr>
				<td className="text-xs" colSpan={2}>
					{getStatusColor(goal.results.is_conform_to_flight_plan)} FLP{" "}
					{goal.requestedValue}
				</td>
			</tr>

			{/* Separator between goals in AP2 mode */}
			{isAP2 && index < totalGoals - 1 && (
				<tr>
					<td colSpan={2}>
						<hr className="border-t border-white/30 mr-2 ml-0" />
					</td>
				</tr>
			)}
		</React.Fragment>
	);
}
