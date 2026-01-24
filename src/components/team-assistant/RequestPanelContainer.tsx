import { observer } from "mobx-react-lite";
import { useDragging } from "../../contexts/DraggingContext";
import type AircraftModel from "../../model/AircraftModel";
import { aircraftStore, cwpStore } from "../../state";
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
	const { isDragging, isStillDragging } = useDragging();
	const { aircraftId } = aircraft;

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

	const onMouseEnter = (): void => {
		if (isStillDragging()) {
			return;
		}
		cwpStore.setHoveredTaLabelAircraftId(aircraftId);
	};

	const onMouseLeave = (): void => {
		if (!isDragging) {
			cwpStore.removeHoveredTaLabelAircraftId();
			cwpStore.removeTaArrowClickedAircraftId();
		}
	};

	return (
		<div
			className="absolute top-0 w-max flex flex-row pl-0.75 gap-0.75 items-start"
			onPointerEnter={onMouseEnter}
			onPointerLeave={onMouseLeave}
		>
			{requests.map((request) => (
				<TaLabel
					key={request.requestId}
					aircraft={aircraft}
					request={request}
					height={height}
				/>
			))}
		</div>
	);
});
