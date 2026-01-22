import { observer } from "mobx-react-lite";
import type AircraftModel from "../../model/AircraftModel";
import { aircraftStore, brainStore } from "../../state";
import TaLabel from "./TaLabel";

interface RequestPanelContainerProps {
	aircraft: AircraftModel;
	height: number;
}

/**
 * Container component that renders multiple TaLabel components horizontally.
 * Gets all requests for the aircraft and renders them side by side.
 * Positioned to the right of the aircraft popup.
 */
export default observer(function RequestPanelContainer({
	aircraft,
	height,
}: RequestPanelContainerProps) {
	// Get requests from the store (snake_case JSON format from IIS)
	const requests = aircraftStore.getRequestsForAircraft(aircraft.callSign);

	// // Debug: log when we have requests for an aircraft
	// if (requests.length > 0) {
	// 	// biome-ignore lint/suspicious/noConsole: debugging request display
	// 	console.log(
	// 		`RequestPanelContainer: Found ${requests.length} requests for ${aircraft.assignedFlightId}`,
	// 		requests,
	// 	);
	// }

	// Show container only if there are requests
	if (requests.length === 0) {
		return null;
	}

	// Get the current autonomy profile from the Brain (AP1 or AP2)
	const autonomyProfile = brainStore.autonomyProfile;

	return (
		<div className="absolute top-0 w-max flex flex-row ml-0.75 gap-0.75 items-start">
			{requests.map((request) => (
				<TaLabel
					key={request.requestId}
					aircraft={aircraft}
					request={request}
					height={height}
					autonomyProfile={autonomyProfile ?? 2}
				/>
			))}
		</div>
	);
});
