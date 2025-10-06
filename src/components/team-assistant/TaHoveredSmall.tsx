import { observer } from "mobx-react-lite";
// import { usePostHog } from "posthog-js/react";
// import React from "react";

import type AircraftModel from "../../model/AircraftModel";
import { aircraftStore, cwpStore } from "../../state";
import FlightLevelRequestIcon from "./FlightLevelRequestIcon";

// const NextFix = observer(({ aircraft }: SubContentProperties) => {
// 	const posthog = usePostHog();
// 	const middleClickNextWaypoint = (
// 		_event: React.MouseEvent<HTMLElement>,
// 	): void => {
// 		// if (event.button === 1) {
// 		cwpStore.toggleFlightRouteForAircraft(aircraft.aircraftId);
// 		posthog?.capture("next_fix_clicked", {
// 			aircraft_id: aircraft.aircraftId,
// 			callsign: aircraft.callSign,
// 			next_fix: aircraft.nextFix,
// 			flight_route_visible: cwpStore.aircraftsWithFlightRoutes.has(
// 				aircraft.aircraftId,
// 			),
// 		});
// 		// }
// 	};

// 	const { nextFix, assignedBearing } = aircraft;
// 	const showNextFix = assignedBearing === -1 || assignedBearing === undefined;

// 	return (
// 		<td onMouseDown={middleClickNextWaypoint}>
// 			{showNextFix ? nextFix : "--"}
// 		</td>
// 	);
// });

export default observer(function TaHoveredSmall(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	width?: number;
}) {
	const { aircraft, flightColor } = properties;
	const { setTaArrowClickedAircraftId, setHoveredFlightLabelId } = cwpStore;

	const pilotRequest = aircraftStore.teamAssistantRequest.get(
		aircraft.aircraftId,
	);

	const showMoreArrowClicked = () => {
		setTaArrowClickedAircraftId(aircraft.aircraftId);
		setHoveredFlightLabelId(aircraft.aircraftId);
	};
	return (
		<table className="border-spacing-w w-full h-full pl-1 pb-1 pr-1">
			<tbody
			// style={{ color: flightColor }}
			>
				<tr className="w-1/2 border-spacing-2">
					<td className="">
						<FlightLevelRequestIcon
							flightId={aircraft.aircraftId}
							primaryColor="#FFF703"
						/>
					</td>
					<td>{pilotRequest?.requestParameter}</td>
				</tr>
				<tr>
					<td>
						{pilotRequest?.suggestion?.suggestionName ? (
							<strong>{pilotRequest?.suggestion?.suggestionName}</strong>
						) : (
							" "
						)}
					</td>
					<td>{pilotRequest?.suggestion?.suggestionParameter}</td>
				</tr>
				<tr className="w-1/2">
					<td>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="size-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</td>
					<td>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="size-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 12.75 6 6 9-13.5"
							/>
						</svg>
					</td>
				</tr>
				<tr>
					<td></td>
					<td onClick={() => showMoreArrowClicked()}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="size-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
							/>
						</svg>
					</td>
				</tr>
			</tbody>
		</table>
	);
});
