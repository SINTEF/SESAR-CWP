import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Draggable from "react-draggable";

import { startDragging, stopDragging } from "../draggableState";
import convertTimestamp from "../model/convertTimestamp";
import { cwpStore, roleConfigurationStore } from "../state";

const handleFlightClicked = (event: string): void => {
	cwpStore.setHighlightedAircraftId(event);
};
function ChangeToLocaleTime(time: number): string {
	const date = new Date(time * 1000);
	const localeTime = date.toLocaleTimeString("en-GB", {
		timeZone: "UTC",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
	});
	return localeTime;
}
// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function AircraftListElement(/* properties */) {
	const currentSector = roleConfigurationStore.currentControlledSector;
	const [filter, setFilter] = useState("");
	const listOfAircraftsInSector =
		roleConfigurationStore.aircraftsEnteringCurrentSector;

	if (!cwpStore.showFL) {
		return null;
	}

	listOfAircraftsInSector.sort((a, b) => a.callSign.localeCompare(b.callSign));
	return (
		<Draggable
			bounds="parent"
			cancel="input"
			onStart={startDragging}
			onStop={stopDragging}
		>
			<div className="font-mono absolute top-0 left-1 w-64 m-2 text-xs leading-8 uppercase max-h-64 overflow-y-scroll">
				<table className="table table-xs table-pin-rows bg-base-300 border-2 border-base-100">
					<thead>
						<tr>
							<th colSpan={2} className="bg-base-200">
								<input
									className="input input-xs input-bordered w-32 text-xs"
									name="filter"
									value={filter}
									placeholder="Search by callsign..."
									onChange={(event): void =>
										setFilter(event.target.value.toUpperCase())
									}
								/>
							</th>
							<th colSpan={2} className="bg-base-200">FL Sector : {currentSector ?? ""}</th>
						</tr>
						<tr>
							<th className="bg-base-200">C/S</th>
							<th className="bg-base-200">PLV</th>
							<th className="bg-base-200">OUT</th>
							<th className="bg-base-200">Time</th>
						</tr>
					</thead>
					<tbody>
						{listOfAircraftsInSector
							.filter(
								(aircraftData) =>
									aircraftData.callSign.includes(filter) || filter === "",
							)
							.map((aircraftData) => {
								const entryTime = currentSector
									? aircraftData.flightInSectorTimes?.get(currentSector)
											?.entryPosition?.time
									: "";
								const exitWaypointId = currentSector
									? aircraftData.flightInSectorTimes?.get(currentSector)
											?.exitWaypointId
									: "";
								const toTime = entryTime
									? ChangeToLocaleTime(convertTimestamp(entryTime))
									: "";
								return (
									<tr
										style={{
											color: roleConfigurationStore.getOriginalColorOfAircraft(
												aircraftData.aircraftId,
											),
										}}
										key={aircraftData.assignedFlightId}
										onClick={(): void =>
											handleFlightClicked(aircraftData.assignedFlightId)
										}
										className="hover:bg-base-100 cursor-pointer"
									>
										<td>
											<b>{aircraftData.callSign}</b>
										</td>
										<td>{Math.ceil(aircraftData.lastKnownAltitude)}</td>
										<td>{exitWaypointId}</td>
										<td>{toTime}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</Draggable>
	);
});