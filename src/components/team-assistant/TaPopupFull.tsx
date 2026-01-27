import { observer } from "mobx-react-lite";
// import { usePostHog } from "posthog-js/react";
// import React from "react";

import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { cwpStore } from "../../state";
import TaHoveredFull from "./TaHoveredFull";
import TaHoveredSmall from "./TaHoveredSmall";

export default observer(function TaPopupFull(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	requestParameter: string;
	requestTypeIcon: string;
	width: number;
	request: TeamAssistantRequest;
	autonomyProfile: number;
}) {
	const {
		aircraft,
		flightColor,
		requestParameter,
		requestTypeIcon,
		request,
		autonomyProfile,
		width,
	} = properties;

	const IsTaArrowClicked =
		cwpStore.taArrowClickedAircraftId === aircraft.aircraftId;

	const TaHoverContent = IsTaArrowClicked ? TaHoveredFull : TaHoveredSmall;

	return (
		<div style={{ width: `${width}px` }}>
			<TaHoverContent
				aircraft={aircraft}
				flightColor={flightColor}
				width={width}
				requestParameter={requestParameter}
				requestTypeIcon={requestTypeIcon}
				request={request}
				autonomyProfile={autonomyProfile}
			/>
		</div>
	);
});
