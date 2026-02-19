import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";

import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { cwpStore } from "../../state";
import { handleChangeCFL } from "../../utils/teamAssistantHelper";
import {
	CpdlcButtons,
	DismissButton,
	ExpandArrow,
	SuggestionContent,
	TaHeaderContent,
} from "./TaSharedComponents";
import { useTaActions } from "./useTaActions";

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

	const { handleAccept, handleDismiss, handleAcceptWithDelay } = useTaActions(
		aircraft,
		request,
		"TaHoveredSmall",
		() => handleChangeCFL(request, aircraft),
	);

	const showMoreArrowClicked = () => {
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

	return (
		<div className="flex flex-col gap-1" style={{ width: `${width - 10}px` }}>
			{/* Row 1: Icon + Status dot + Parameter | Dismiss X */}
			<div className="flex items-start justify-between gap-1">
				<TaHeaderContent
					requestTypeIcon={requestTypeIcon}
					requestParameter={requestParameter}
					request={request}
				/>
				<DismissButton onClick={handleDismiss} />
			</div>

			{/* Row 2: Suggestion status + text + accept checkmark */}
			<div className="flex flex-row justify-between">
				<SuggestionContent
					request={request}
					showAcceptCheckmark={!aircraft.hasCPDLC}
					onAccept={handleAccept}
				/>
			</div>

			{/* Row 3: CPDLC buttons centered + expand arrow on right */}
			<div className="relative flex items-center justify-center">
				{aircraft.hasCPDLC && (
					<CpdlcButtons
						onAccept={handleAccept}
						onAcceptWithDelay={handleAcceptWithDelay}
					/>
				)}
				<span
					className={`${aircraft.hasCPDLC ? "" : "absolute top-0"} absolute right-0`}
				>
					<ExpandArrow onClick={showMoreArrowClicked} />
				</span>
			</div>
		</div>
	);
});
