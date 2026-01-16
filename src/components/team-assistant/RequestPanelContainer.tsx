import { observer } from "mobx-react-lite";
import type AircraftModel from "../../model/AircraftModel";
import {
	adminStore,
	aircraftStore,
	configurationStore,
	cwpStore,
} from "../../state";
import AddRequestButton from "./AddRequestButton";
import RequestPanel from "./RequestPanel";

interface RequestPanelContainerProps {
	aircraft: AircraftModel;
}

/**
 * Container component that renders multiple RequestPanel components horizontally.
 * Gets all requests for the aircraft (max 5, newest first) and renders them side by side.
 * Positioned to the right of the aircraft popup.
 * In pseudo-pilot mode, shows an AddRequestButton for creating test requests.
 */
export default observer(function RequestPanelContainer({
	aircraft,
}: RequestPanelContainerProps) {
	const requests = aircraftStore.getRequestsForAircraft(
		aircraft.assignedFlightId,
	);
	// Show when pseudo-pilot mode, admin mode, or master mode is enabled
	const showAddButton =
		cwpStore.pseudoPilot ||
		adminStore.adminModeEnabled ||
		configurationStore.currentCWP === "All";

	// Show container if there are requests OR if we need to show the add button
	if (requests.length === 0 && !showAddButton) {
		return null;
	}

	return (
		<div className="flex flex-row gap-1 items-start">
			{requests.map((request) => (
				<RequestPanel
					key={request.requestId}
					flightId={aircraft.assignedFlightId}
					request={request}
				/>
			))}
			{showAddButton && <AddRequestButton aircraft={aircraft} />}
		</div>
	);
});
