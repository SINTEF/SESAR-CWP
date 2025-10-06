import { observer } from "mobx-react-lite";
// import { usePostHog } from "posthog-js/react";
// import React from "react";

import type AircraftModel from "../../model/AircraftModel";
import { cwpStore } from "../../state";
import TaHoveredFull from "./TaHoveredFull";
import TaHoveredSmall from "./TaHoveredSmall";

export default observer(function TaPopupFull(properties: {
	aircraft: AircraftModel;
	flightColor: string;
}) {
	const { aircraft, flightColor } = properties;

	const IsTaArrowClicked =
		cwpStore.taArrowClickedAircraftId === aircraft.aircraftId;

	const TaHoverContent = IsTaArrowClicked ? TaHoveredFull : TaHoveredSmall;
	const width = IsTaArrowClicked ? 300 : 100;

	return (
		<div style={{ width: `${width}px` }}>
			<TaHoverContent
				aircraft={aircraft}
				flightColor={flightColor}
				width={width}
			/>
		</div>
	);
});
