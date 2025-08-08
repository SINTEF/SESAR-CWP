import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Draggable from "react-draggable";

import { startDragging, stopDragging } from "../draggableState";
import convertTimestamp from "../model/convertTimestamp";
import {
	aircraftStore,
	cwpStore,
	fixStore,
	roleConfigurationStore,
} from "../state";
import type AircraftModel from "../model/AircraftModel";

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
function convertMetersToFlightLevel(altitude: number): number {
	const feet = altitude * 3.280_84;
	return Math.round(feet / 100);
}

const handleFlightClicked = (event: string): void => {
	cwpStore.setHighlightedAircraftId(event);
};
// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function SectorFlightList(/* properties */) {
	const currentSector = roleConfigurationStore.currentControlledSector;
	const [filter, setFilter] = useState("");
	const [valueSelected, setSelectedValue] = useState("");
	const listOfFixes = roleConfigurationStore.listOfFixesInPolygon;
	const [listOfAircraft, setListOfAircraft] = React.useState<AircraftModel[]>(
		[],
	);
	const fixSelect = React.createRef<HTMLSelectElement>();

	if (!cwpStore.showSFL) {
		return null;
	}

	const setFix = (value: string): void => {
		setSelectedValue(value);
		if (value === "ALL") {
			setListOfAircraft(roleConfigurationStore.aircraftsEnteringCurrentSector);
		} else {
			const fixValues = fixStore.fixes.get(value);
			const aircrafts = [];
			for (const flightRoutes of aircraftStore.flightRoutes) {
				const flightId = flightRoutes[0];
				const { trajectory } = flightRoutes[1];
				for (const coordinates of trajectory) {
					const { trajectoryCoordinate } = coordinates;
					if (
						trajectoryCoordinate.longitude === fixValues?.longitude &&
						trajectoryCoordinate.latitude === fixValues?.latitude
					) {
						aircrafts.push(
							...aircraftStore.aircraftsWithPosition.filter(
								(aircraft) => aircraft.assignedFlightId === flightId,
							),
						);
					}
				}
			}
			setListOfAircraft(aircrafts);
		}
	};

	const arrowClicked = (direction: string): void => {
		let selectedValue = "";
		if (direction === "down") {
			if (valueSelected === "" || valueSelected === "ALL") {
				selectedValue = listOfFixes[0];
			} else {
				const index = listOfFixes.indexOf(valueSelected);
				selectedValue =
					index === listOfFixes.length - 1
						? listOfFixes[0]
						: listOfFixes[index + 1];
			}
		} else if (direction === "up") {
			if (valueSelected === "" || valueSelected === "ALL") {
				selectedValue = listOfFixes[listOfFixes.length - 1];
			} else {
				const index = listOfFixes.indexOf(valueSelected);
				selectedValue =
					index === 0
						? listOfFixes[listOfFixes.length - 1]
						: listOfFixes[index - 1];
			}
		}
		setSelectedValue(selectedValue);
		if (fixSelect.current) {
			fixSelect.current.value = selectedValue;
			setFix(selectedValue);
		}
	};
	listOfAircraft.sort((a, b) => a.callSign.localeCompare(b.callSign));

	return (
		<Draggable
			bounds="parent"
			cancel="input"
			onStart={startDragging}
			onStop={stopDragging}
		>
			<div className="absolute bottom-[3.45em] left-[50px] text-[8px] outline-none uppercase max-h-[150px] overflow-y-scroll font-mono z-[500]">
				<table className="table table-xs border border-gray-600">
					<thead>
						<tr>
							<th colSpan={3} className="border border-gray-600 p-2">
								<input
									className="input input-sm bg-base-200 w-40"
									name="filter"
									value={filter}
									placeholder="Search by callsign..."
									onChange={(event): void => setFilter(event.target.value)}
								/>
							</th>
							<th colSpan={6} className="border border-gray-600 p-2 text-xs">
								<div className="flex justify-between items-center w-full h-12">
									<div className="flex items-center gap-2">
										<div className="font-bold">SFL &nbsp;</div>
										{/* <input placeholder='Type here'></input> */}

										<select
											ref={fixSelect}
											className="select select-sm bg-base-200"
											onChange={(event: { target: { value: string } }): void =>
												setFix(event.target.value)
											}
										>
											<option value="ALL" hidden>
												Select COP
											</option>
											<option value="ALL">ALL</option>
											{listOfFixes.map((fix) => (
												<option key={fix} value={fix}>
													{fix}
												</option>
											))}
										</select>
										<div className="flex items-center">
											<span>&nbsp;:</span>
											<span>{listOfAircraft.length} &#35;</span>
										</div>
									</div>
									<div className="flex flex-col cursor-pointer">
										<div onClick={(): void => arrowClicked("up")}>
											&#x25B2;&nbsp;
										</div>
										<div onClick={(): void => arrowClicked("down")}>
											&#x25BC;
										</div>
									</div>
								</div>
							</th>
						</tr>
						<tr>
							<th className="border border-gray-600 p-2">FIX</th>
							<th className="border border-gray-600 p-2">ETO</th>
							<th className="border border-gray-600 p-2">C/S</th>
							<th className="border border-gray-600 p-2">PEL</th>
							<th className="border border-gray-600 p-2">COO</th>
							<th className="border border-gray-600 p-2">PLV</th>
							<th className="border border-gray-600 p-2">OUT</th>
						</tr>
					</thead>
					<tbody>
						{listOfAircraft
							.filter(
								(aircraftData) =>
									aircraftData.callSign.includes(filter) || filter === "",
							)
							.map((aircraftData) => {
								const enteringTime = currentSector
									? aircraftData.flightInSectorTimes?.get(currentSector)
											?.entryPosition?.time
									: "";
								const enteringFix = currentSector
									? aircraftData.flightInSectorTimes?.get(currentSector)
											?.entryWaypointId
									: "";
								const exitingFix = currentSector
									? aircraftData.flightInSectorTimes?.get(currentSector)
											?.exitWaypointId
									: "";
								const enteringToTime = enteringTime
									? ChangeToLocaleTime(convertTimestamp(enteringTime))
									: "";
								const enteringFL = currentSector
									? aircraftData.flightInSectorTimes?.get(currentSector)
											?.entryPosition?.altitude
									: "";
								return (
									<tr
										className="hover:bg-gray-700 cursor-pointer"
										style={{
											color: roleConfigurationStore.getOriginalColorOfAircraft(
												aircraftData.aircraftId,
											),
										}}
										key={aircraftData.assignedFlightId}
										id={aircraftData.assignedFlightId}
										onClick={(event): void =>
											handleFlightClicked(event.currentTarget.id)
										}
									>
										<td className="border border-gray-600 p-2">
											{enteringFix}
										</td>
										<td className="border border-gray-600 p-2">
											{enteringToTime}
										</td>
										<td className="border border-gray-600 p-2">
											{aircraftData.callSign}
										</td>
										<td
											className="border border-gray-600 p-2"
											style={{
												color:
													roleConfigurationStore.getOriginalColorOfAircraft(
														aircraftData.aircraftId,
													),
											}}
										>
											{enteringFL ? convertMetersToFlightLevel(enteringFL) : ""}
										</td>
										<td className="border border-gray-600 p-2">
											{aircraftData.nextACCFL === "COO"
												? ""
												: aircraftData.nextACCFL}
										</td>
										<td
											className="border border-gray-600 p-2"
											style={{
												color:
													roleConfigurationStore.getOriginalColorOfAircraft(
														aircraftData.aircraftId,
													),
											}}
										>
											{Math.ceil(aircraftData.lastKnownAltitude)}
										</td>
										<td className="border border-gray-600 p-2">{exitingFix}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</Draggable>
	);
});
