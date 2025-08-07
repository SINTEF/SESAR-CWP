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
			<div className="absolute bottom-14 left-12 text-xs uppercase font-mono z-[500]">
				<table className="table table-xs bg-base-300 w-fit border-collapse text-center h-full border-2 border-base-200">
					<tbody>
						{/* Header Row */}
						<tr className="bg-base-100 font-bold">
							<td rowSpan={7} className="text-center font-bold bg-blue-900 text-blue-200 p-1.5 border-2 border-base-100" style={{ writingMode: 'vertical-rl' }}>
								DYP INFO
							</td>
							<td colSpan={2} className="bg-base-200 text-center p-1.5 border-2 border-base-100">
								<strong>
									{latestSelectedAircraftData?.callSign || "AFL2638"}
								</strong>
							</td>
							<td className="bg-base-200 p-1.5 border-2 border-base-100">{latestSelectedAircraftClass || "AEROFLOT"}</td>
							<td className="bg-base-200 p-1.5 border-2 border-base-100"></td>
							<td className="bg-base-200 p-1.5 border-2 border-base-100">{latestSelectedAircraftData?.transponderCode || "7347"}</td>
							<td className="bg-base-200 p-1.5 border-2 border-base-100"></td>
							<td className="bg-base-200 p-1.5 border-2 border-base-100">{lastestSelectedAircraftType || "A321"}</td>
							<td colSpan={2} className="bg-slate-900 text-xs font-bold p-1.5 border-2 border-base-100">
								{latestSelectedAircraftData?.currentTime || "08:57"}
							</td>
							<td className="bg-base-200 p-1.5 border-2 border-base-100"></td>
						</tr>

						{/* Altitude and Route Info */}
						<tr>
							<td colSpan={2} className="bg-base-200 text-green-400 text-center p-1.5 border-2 border-base-100">
								{latestSelectedAircraftData?.lastKnownAltitude ?? "350"} - ---
							</td>
							<td rowSpan={3} className="bg-slate-800 font-bold text-white align-middle p-1.5 border-2 border-base-100">
								{latestSelectedAircraftData?.departureAirport || "UUEE"} →{" "}
								{latestSelectedAircraftData?.arrivalAirport || "LEBL"}
							</td>
							{latestSelectedTrajectory[0]?.trajectories
								.slice(0, 7)
								.map((trajectory, index) => (
									<td rowSpan={2} key={`wp-${index}`} className="bg-base-200 text-xs leading-tight p-1.5 border-2 border-base-100">
										<div>{trajectory.wayPoint}</div>
										<div>{`${trajectory.timestamp}-${trajectory.flightLevel}`}</div>
									</td>
								))}
							{/* <td colSpan={2} className="assigned-fl-cell">
								{latestSelectedAircraftData?.assignedFlightLevel || "35"}
							</td> */}
						</tr>

						<tr>
							<td colSpan={2} className="bg-base-200 text-green-400 text-center p-1.5 border-2 border-base-100">
								--- --- k.--
							</td>
						</tr>

						<tr>
							<td colSpan={2} className="bg-base-200 text-green-400 text-center p-1.5 border-2 border-base-100">
								&gt;---- x
								{latestSelectedAircraftData?.lastKnownAltitude &&
									Math.ceil(latestSelectedAircraftData?.lastKnownAltitude)}
							</td>
							{latestSelectedAircraftData?.routeWaypoints?.map((wp, index) => (
								<td key={`sec-${index}`} className="bg-slate-700 text-xs p-1.5 border-2 border-base-100">
									<div>{wp.sector}</div>
									<div>{wp.level}</div>
								</td>
							)) || (
								<>
									<td className="bg-slate-700 text-xs p-1.5 border-2 border-base-100">B2 35</td>
									<td className="bg-slate-700 text-xs p-1.5 border-2 border-base-100">M2 33</td>
									<td className="bg-slate-700 text-xs p-1.5 border-2 border-base-100">M1 27</td>
									<td className="bg-slate-700 text-xs p-1.5 border-2 border-base-100">XAL 27</td>
								</>
							)}
							<td colSpan={5} className="bg-base-200 p-1.5 border-2 border-base-100"></td>
						</tr>

						{/* Sectors */}

						{/* Footer */}
						<tr className="bg-gray-900 text-white pt-2">
							<td colSpan={2} className="bg-gray-900 p-1.5 border-2 border-base-100">
								{latestSelectedAircraftData?.nextSectorController || "none"}
							</td>
							<td colSpan={2} className="bg-gray-900 p-1.5 border-2 border-base-100">
								{latestSelectedAircraftData?.frequency || "132.490"}
							</td>
							<td colSpan={4} className="bg-gray-900 p-1.5 border-2 border-base-100">Texte :</td>
							<td colSpan={4} className="bg-gray-900 p-1.5 border-2 border-base-100"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</Draggable>
	);
});