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
	simulatorStore,
} from "../state";
import type AircraftModel from "../model/AircraftModel";
import { getAircraftsWithFlightRoutes } from "../selectors/flightRouteSelectors";
import { ObservableSet } from "mobx";
import { formatSimulatorTimeHM } from "../utils";

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
	const simulatorTime = simulatorStore.timestamp;
	const fixSelect = React.createRef<HTMLSelectElement>();
	const xDomain = [simulatorTime, simulatorTime + 1800]; // 1 hour later

	// if (!cwpStore.showSFL || selectedAircraftIds.size === 0) {
	// 	return null;
	// }

	const latestSelectedAircraft = Array.from(selectedAircraftIds).slice(-1)[0]; // last selected aircraft
	const latestSelectedAircraftData = aircraftStore.aircraftsWithPosition.find(
		(aircraft) => aircraft.assignedFlightId === latestSelectedAircraft,
	);
	const lastestSelectedAircraftType =
		latestSelectedAircraftData?.aircraftInfo.get(
			latestSelectedAircraftData.aircraftId,
		)?.aircraftType;
	const latestSelectedAircraftClass =
		latestSelectedAircraftData?.aircraftTypes.get(
			lastestSelectedAircraftType || "",
		)?.vehicleTypeId;
	// if (!latestSelectedAircraftData || !latestSelectedAircraft) {
	// 	return null;
	// }
	if (!latestSelectedAircraftData) {
		return null;
	}

	const latestSelectedTrajectory = getAircraftsWithFlightRoutes({
		aircraftStore,
		selectedAircraftIds: [
			latestSelectedAircraftData?.aircraftId,
		] as unknown as ObservableSet<string>,
	}).map(({ aircraft, route }) => ({
		aircraftId: aircraft.aircraftId,
		callSign: aircraft.callSign,
		trajectories: route.trajectory
			// Get the trajectories only within the xDomain period (1h)
			.filter(
				(trajectory) =>
					trajectory.timestamp >= xDomain[0] &&
					trajectory.timestamp <= xDomain[1],
			)
			.filter(
				(trajectory) =>
					trajectory.objectId !== undefined &&
					trajectory.objectId !== null &&
					trajectory.objectId !== "undefined" &&
					trajectory.objectId !== "null",
			)
			.map((t) => ({
				wayPoint: t.objectId,
				timestamp: formatSimulatorTimeHM(t.timestamp),
				flightLevel: 300, // TODO: Needed?
			})),
	}));

	return (
		<Draggable
			bounds="parent"
			cancel="input"
			onStart={startDragging}
			onStop={stopDragging}
		>
			<div className="dyp-flight-list">
				<Table className="dyp-flight-list-table" bordered>
					<tbody>
						{/* Header Row */}
						<tr className="footer-row">
							<td rowSpan={7} className="dyp-info-cell">
								DYP INFO
							</td>
							<td colSpan={2} className="flight-info-cell">
								<strong>
									{latestSelectedAircraftData?.callSign || "AFL2638"}
								</strong>
							</td>
							<td>{latestSelectedAircraftClass || "AEROFLOT"}</td>
							<td></td>
							<td>{latestSelectedAircraftData?.transponderCode || "7347"}</td>
							<td></td>
							<td>{lastestSelectedAircraftType || "A321"}</td>
							<td colSpan={2} className="time-cell">
								{latestSelectedAircraftData?.currentTime || "08:57"}
							</td>
							<td></td>
						</tr>

						{/* Altitude and Route Info */}
						<tr>
							<td colSpan={2} className="level-cell">
								{latestSelectedAircraftData?.lastKnownAltitude ?? "350"} - ---
							</td>
							<td rowSpan={3} className="adep-ades-cell">
								{latestSelectedAircraftData?.departureAirport || "UUEE"} →{" "}
								{latestSelectedAircraftData?.arrivalAirport || "LEBL"}
							</td>
							{latestSelectedTrajectory[0]?.trajectories
								.slice(0, 7)
								.map((trajectory, index) => (
									<td rowSpan={2} key={`wp-${index}`} className="waypoint-cell">
										<div>{trajectory.wayPoint}</div>
										<div>{`${trajectory.timestamp}-${trajectory.flightLevel}`}</div>
									</td>
								))}
							{/* <td colSpan={2} className="assigned-fl-cell">
								{latestSelectedAircraftData?.assignedFlightLevel || "35"}
							</td> */}
						</tr>

						<tr>
							<td colSpan={2} className="level-cell">
								--- --- k.--
							</td>
						</tr>

						<tr>
							<td colSpan={2} className="level-cell">
								&gt;---- x
								{latestSelectedAircraftData?.lastKnownAltitude &&
									Math.ceil(latestSelectedAircraftData?.lastKnownAltitude)}
							</td>
							{latestSelectedAircraftData?.routeWaypoints?.map((wp, index) => (
								<td key={`sec-${index}`} className="sector-cell">
									<div>{wp.sector}</div>
									<div>{wp.level}</div>
								</td>
							)) || (
								<>
									<td>B2 35</td>
									<td>M2 33</td>
									<td>M1 27</td>
									<td>XAL 27</td>
								</>
							)}
							<td colSpan={5}></td>
						</tr>

						{/* Sectors */}

						{/* Footer */}
						<tr className="footer-row">
							<td colSpan={2}>
								{latestSelectedAircraftData?.nextSectorController || "none"}
							</td>
							<td colSpan={2}>
								{latestSelectedAircraftData?.frequency || "132.490"}
							</td>
							<td colSpan={4}>Texte :</td>
							<td colSpan={4}></td>
						</tr>
					</tbody>
				</Table>
			</div>
		</Draggable>
	);
});
