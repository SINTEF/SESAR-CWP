import { observer } from "mobx-react-lite";
import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
// import { aircraftStore } from "../../state";
import TaLabel from "./TaLabel";

interface RequestPanelContainerProps {
	aircraft: AircraftModel;
	height: number;
}

/**
 * Container component that renders multiple RequestPanel components horizontally.
 * Gets all requests for the aircraft (max 5, newest first) and renders them side by side.
 * Positioned to the right of the aircraft popup.
 * In pseudo-pilot mode, shows an AddRequestButton for creating test requests.
 */
export default observer(function RequestPanelContainer({
	aircraft,
	height,
}: RequestPanelContainerProps) {
	// const requests = aircraftStore.getRequestsForAircraft(
	// 	aircraft.assignedFlightId,
	// );
	const requests: TeamAssistantRequest[] = [
		{
			requestId: "a23c4b7b-4881-4c14-beb2-b6e05b01a117",
			timestamp: {
				seconds: BigInt(Math.floor(Date.now() / 1000)),
				nanos: 0,
			},
			iterationCount: 0,
			context: {
				requestId: "a23c4b7b-4881-4c14-beb2-b6e05b01a117",
				flightId: "FPO215H",
				requestType: 0,
				requestParameter: 390,
			},
			goals: [
				{
					rFL: 390,
					results: {
						exitLevel: 390,
						initialClimb: 350,
						exitProblemsAreManageable: true,
						trafficComplexityManageable: true,
						requiredCoordinations: [],
						higherLevelAvailable: true,
						isConformToFlightPlan: false,
						nextSector: "E3",
						nextSectorCapacityOk: true,
						altitudeRestriction: false,
					},
				},
			],
		},
	];

	// Show container if there are requests OR if we need to show the add button
	if (requests.length === 0) {
		return null;
	}

	return (
		<div className="absolute top-0 w-max flex flex-row ml-0.75 gap-0.75 items-start">
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
