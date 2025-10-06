import { observer } from "mobx-react-lite";
// import { usePostHog } from "posthog-js/react";
// import React from "react";
import AircraftModel from "../../model/AircraftModel";
import { aircraftStore } from "../../state";
import FlightLevelRequestIcon from "./FlightLevelRequestIcon";

// import { aircraftStore, cwpStore, roleConfigurationStore } from "../../state";
// import { convertMetersToFlightLevel } from "../../utils";
// import { Altitude, CallSign, NextSectorFL } from "../AircraftContentSmall";
// import Stca from "../conflict-detection-tools/Stca";
// import Tct from "../conflict-detection-tools/Tct";

export default observer(function TaHoveredFull(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	width?: number;
}) {
	const { aircraft } = properties;
	// const currentSector = roleConfigurationStore.currentControlledSector;

	const pilotRequest = aircraftStore.teamAssistantRequest.get(
		aircraft.aircraftId,
	);

	const onClickAccept = () => {
		const request = aircraftStore.teamAssistantRequest.get(aircraft.aircraftId);
		if (request) {
			request.status = 1;
		}
	};

	return (
		<table className="border-spacing-0 w-45 text-gray-200 rounded-md p-2">
			<tbody>
				{/* First row */}
				<tr className="border-spacing-0">
					<td>
						<FlightLevelRequestIcon
							flightId={aircraft.aircraftId}
							primaryColor="#FFF703"
						/>
					</td>
					<td>{pilotRequest?.requestParameter}</td>

					{/* <span style={{ fontSize: "1.5em" }}>
						{String.fromCodePoint(0x2195, 10)}
					</span>{" "} */}
				</tr>

				{/* Status rows */}
				{pilotRequest?.tasks.map((task) => (
					<tr key={task.taskId}>
						<td className="w-1/5">{task.requirementName}</td>
						<td className="w-1/5">{task.requirementParameter}</td>
						<td className="w-1/2 pr-2">
							{task.status === 1 && <span className="text-green-400">●</span>}
							{task.status === 0 && <span className="text-yellow-400">●</span>}
							{task.status === 2 && <span className="text-red-500">●</span>}
							{task.status === null && <span className="text-gray-500">●</span>}
						</td>
					</tr>
				))}

				{/* Bottom row with actions */}
				<tr>
					<td className="pr-1">{pilotRequest?.suggestion?.suggestionName} </td>
					<td className="pr-1">
						{pilotRequest?.suggestion?.suggestionParameter}
					</td>
					<td className="w-1/2 flex flex-row justify-end gap-0 pl-2 pb-0">
						<span
							onClick={() => onClickAccept()}
							className="px-1 text-lg pb-0 cursor-pointer"
						>
							✕
						</span>
						<span className="px-1 text-lg pb-0 cursor-pointer">✔</span>
						<span className="px-1 text-lg pb-0 cursor-pointer">ℹ</span>
					</td>
				</tr>
			</tbody>
		</table>
	);
});
