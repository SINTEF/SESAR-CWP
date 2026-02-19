import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { cwpStore } from "../../state";
import { isAcceptOrSuggest } from "../../utils/teamAssistantHelper";
import {
	CollapseArrow,
	CommunicationButtons,
	DismissButton,
	HeadingGoalRow,
	LevelChangeGoalRows,
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
				{/* Suggestion row (AP2 only) */}
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
							<td className="text-center">
								<CommunicationButtons
									hasCPDLC={aircraft.hasCPDLC}
									onAccept={handleAccept}
									onAcceptWithDelay={handleAcceptWithDelay}
								/>
							</td>
						</tr>
					</>
				)}
			</tbody>
		</table>
	);
});
