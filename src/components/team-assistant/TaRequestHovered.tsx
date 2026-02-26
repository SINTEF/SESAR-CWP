import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { cwpStore } from "../../state";
import {
	handleAcceptAction,
	isAcceptOrSuggest,
} from "../../utils/teamAssistantHelper";
import { CommunicationButtons } from "../shared/CommunicationButtons";
import {
	DismissButton,
	ExpandArrow,
	HeadingGoalRow,
	LevelChangeGoalRows,
	SuggestionContent,
	TaHeaderContent,
} from "./TaSharedComponents";
import { useTaActions } from "./useTaActions";

/**
 * Hovered state for a Team Assistant request label.
 *
 * isExpanded=false (compact): AP2 hover before the expand arrow is clicked.
 *   - No goal rows when a solution exists (expand arrow lets the user go full)
 *   - All goal rows when no solution exists (no comm buttons or expand arrow)
 *
 * isExpanded=true (full): AP1 hover (always), or AP2 after expand arrow clicked.
 *   - All goal rows
 */
export default observer(function TaRequestHovered(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	requestParameter: string;
	requestTypeIcon: string;
	request: TeamAssistantRequest;
	width: number;
	autonomyProfile: number;
	isExpanded: boolean;
}) {
	const posthog = usePostHog();
	const {
		aircraft,
		width,
		requestParameter,
		requestTypeIcon,
		request,
		autonomyProfile,
		isExpanded,
	} = properties;

	const isAP2 = autonomyProfile === 2;

	const { handleAccept, handleDismiss, handleAcceptWithDelay } = useTaActions(
		aircraft,
		request,
		"TaRequestHovered",
		() => handleAcceptAction(request, aircraft),
	);

	const onExpandClicked = () => {
		posthog?.capture("TA_expand_details_clicked", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			request_id: request.requestId,
			request_type: request.context?.request_type,
			request_parameter: request.context?.request_parameter,
		});
		cwpStore.setTaArrowClickedAircraftId(aircraft.aircraftId);
		cwpStore.setHoveredFlightLabelId(aircraft.aircraftId);
	};

	// Goal rows: always in full/AP1; hidden in compact/AP2 (shown after expand);
	// also always shown for AP2 when there is no accept/suggest solution.
	const showGoalRows = !isAP2 || isExpanded || !isAcceptOrSuggest(request);

	const normalizedGoals = showGoalRows
		? request.normalizedGoals.toSorted(
				(a, b) =>
					(b.results?.initial_climb ?? 0) - (a.results?.initial_climb ?? 0),
			)
		: [];

	return (
		<table
			className="h-full border-collapse"
			style={{ width: `${isExpanded ? width : width - 10}px` }}
		>
			<tbody>
				{/* Header: icon + status dot + parameter | Dismiss */}
				<tr>
					<td className="flex items-start justify-between gap-1">
						<TaHeaderContent
							requestTypeIcon={requestTypeIcon}
							requestParameter={requestParameter}
							request={request}
						/>
						<span className="flex flex-row pr-2">
							<DismissButton onClick={handleDismiss} />
						</span>
					</td>
				</tr>

				{/* Goal detail rows */}
				{showGoalRows &&
					normalizedGoals.map((goal, index) => {
						const sharedProps = {
							goal,
							index,
							totalGoals: normalizedGoals.length,
							isAP2,
							requestParameter: request.context.request_parameter,
						};
						if (goal.results) {
							return <LevelChangeGoalRows key={index} {...sharedProps} />;
						}
						return <HeadingGoalRow key={index} {...sharedProps} />;
					})}

				{/* Suggestion + communication buttons (AP2 only) */}
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
									showAcceptCheckmark={false}
									onAccept={handleAccept}
								/>
							</td>
						</tr>
						<tr>
							<td className="relative text-center">
								<CommunicationButtons
									hasCPDLC={aircraft.hasCPDLC}
									onAccept={handleAccept}
									onAcceptWithDelay={handleAcceptWithDelay}
								/>
								{!isExpanded && (
									<span className="absolute right-0 top-0">
										<ExpandArrow onClick={onExpandClicked} />
									</span>
								)}
							</td>
						</tr>
					</>
				)}
			</tbody>
		</table>
	);
});
