import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Form, Table } from "react-bootstrap";
import Draggable from "react-draggable";
import "./css-files/DypTable.css";

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
export default observer(function DypTable(/* properties */) {
	const { selectedAircraftIds } = cwpStore;
	const currentSector = roleConfigurationStore.currentControlledSector;
	const [filter, setFilter] = useState("");
	const [valueSelected, setSelectedValue] = useState("");
	const listOfFixes = roleConfigurationStore.listOfFixesInPolygon;
	const [listOfAircraft, setListOfAircraft] = React.useState<AircraftModel[]>(
		[],
	);
	const fixSelect = React.createRef<HTMLSelectElement>();

	// if (!cwpStore.showSFL || selectedAircraftIds.size === 0) {
	// 	return null;
	// }

	const latestSelectedAircraft = Array.from(selectedAircraftIds).slice(-1)[0]; // last selected aircraft
	const latestSelectedAircraftData = aircraftStore.aircraftsWithPosition.find(
		(aircraft) => aircraft.assignedFlightId === latestSelectedAircraft,
	);
	// if (!latestSelectedAircraftData || !latestSelectedAircraft) {
	// 	return null;
	// }

	return (
		<Draggable
			bounds="parent"
			cancel="input"
			onStart={startDragging}
			onStop={stopDragging}
		>
			<div className="sector-flight-list">
				<Table className="sector-flight-list-table" bordered variant="dark">
					<tbody>
						{/* Header Row */}
						<tr>
							<td rowSpan={7} className="dyp-info-cell">
								DYP INFO
							</td>
							<td colSpan={2} className="flight-info-cell">
								<strong>
									{latestSelectedAircraftData?.callsign || "AFL2638"}
								</strong>
							</td>
							<td>{latestSelectedAircraftData?.airline || "AEROFLOT"}</td>
							<td>{latestSelectedAircraftData?.transponderCode || "7347"}</td>
							<td>{latestSelectedAircraftData?.aircraftType || "A321"}</td>
							<td colSpan={2} className="time-cell">
								{latestSelectedAircraftData?.currentTime || "08:57"}
							</td>
						</tr>

						{/* Altitude and Route Info */}
						<tr>
							<td colSpan={2} className="level-cell">
								{latestSelectedAircraftData?.lastKnownAltitude ?? "350"} - ---
							</td>
							<td rowSpan={5} className="adep-ades-cell">
								{latestSelectedAircraftData?.departureAirport || "UUEE"} →{" "}
								{latestSelectedAircraftData?.arrivalAirport || "LEBL"}
							</td>
							<td colSpan={2} className="assigned-fl-cell">
								{latestSelectedAircraftData?.assignedFlightLevel || "35"}
							</td>
						</tr>

						<tr>
							<td colSpan={2} className="level-cell">
								--- --- k.--
							</td>
							<td colSpan={5}></td>
						</tr>

						<tr>
							<td colSpan={2} className="level-cell">
								&gt;---- x
								{latestSelectedAircraftData?.lastKnownAltitude &&
									Math.ceil(latestSelectedAircraftData?.lastKnownAltitude)}
							</td>
							<td colSpan={5}></td>
						</tr>

						{/* Waypoints */}
						<tr>
							{latestSelectedAircraftData?.routeWaypoints?.map((wp, index) => (
								<td key={`wp-${index}`} className="waypoint-cell">
									<div>{wp.name}</div>
									<div>{`${wp.time}-${wp.level}`}</div>
								</td>
							)) || (
								<>
									<td>
										KOLON
										<br />
										09:25-350
									</td>
									<td>
										SOKDI
										<br />
										09:27-350
									</td>
									<td>
										GANGU
										<br />
										09:30-350
									</td>
									<td>
										PADKO
										<br />
										09:35-350
									</td>
									<td>
										DIVKO
										<br />
										09:38-350
									</td>
									<td>
										NILDU
										<br />
										09:47-270
									</td>
									<td>
										BISBA
										<br />
										09:49-270
									</td>
								</>
							)}
						</tr>

						{/* Sectors */}
						<tr>
							{latestSelectedAircraftData?.routeWaypoints?.map((wp, index) => (
								<td key={`sec-${index}`} className="sector-cell">
									<div>{wp.sector}</div>
									<div>{wp.level}</div>
								</td>
							)) || (
								<>
									<td>
										B2
										<br />
										35
									</td>
									<td>
										M2
										<br />
										33
									</td>
									<td>
										M1
										<br />
										27
									</td>
									<td>
										XAL
										<br />
										27
									</td>
									<td></td>
									<td></td>
									<td></td>
								</>
							)}
						</tr>

						{/* Footer */}
						<tr className="footer-row">
							<td colSpan={2}>
								{latestSelectedAircraftData?.nextSectorController || "none"}
							</td>
							<td colSpan={2}>
								{latestSelectedAircraftData?.frequency || "132.490"}
							</td>
							<td colSpan={4}>Texte :</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</Draggable>
	);
});
