import { observer } from "mobx-react-lite";
import React from "react";

import { configurationStore, cwpStore } from "../state";
import AircraftMarker from "./AircraftMarker";
import AircraftPopup from "./AircraftPopup";

export default observer(function Aircrafts() {
	const aircrafts = configurationStore.aircraftsWithinExtendedEdges;
	const pseudo =
		configurationStore.currentCWP === "All" || cwpStore.pseudoPilot;

	return (
		<>
			{aircrafts.map((aircraft) => {
				const { aircraftId } = aircraft;

				return (
					<React.Fragment key={aircraftId}>
						<AircraftPopup aircraft={aircraft} pseudo={pseudo} />
						<AircraftMarker aircraft={aircraft} />
					</React.Fragment>
				);
			})}
		</>
	);
});
