import { ObservableSet } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { useDragging } from "../contexts/DraggingContext";
import type AircraftModel from "../model/AircraftModel";
import { getAircraftsWithFlightRoutes } from "../selectors/flightRouteSelectors";
import {
	aircraftStore,
	cwpStore,
	roleConfigurationStore,
	simulatorStore,
} from "../state";
import { formatSimulatorTimeHM } from "../utils";

const _handleFlightClicked = (event: string): void => {
	cwpStore.setHighlightedAircraftId(event);
};
// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function DypTable(/* properties */) {
	const draggableRef = React.createRef<HTMLDivElement>();
	const { startDragging, stopDragging } = useDragging();
	const { selectedAircraftIds } = cwpStore;
	const _currentSector = roleConfigurationStore.currentControlledSector;
	const [_filter, _setFilter] = useState("");
	const [_valueSelected, _setSelectedValue] = useState("");
	const _listOfFixes = roleConfigurationStore.listOfFixesInPolygon;
	const [_listOfAircraft, _setListOfAircraft] = React.useState<AircraftModel[]>(
		[],
	);
	const simulatorTime = simulatorStore.timestamp;
	const _fixSelect = React.createRef<HTMLSelectElement>();
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
			nodeRef={draggableRef}
		>
			<div
				className="absolute bottom-14 left-12 text-[11px] leading-tight uppercase font-mono z-[500]"
				ref={draggableRef}
			>
				<table className="border border-[#182937] border-collapse text-[#ffffff] text-center h-full bg-[#315070]">
					<tbody>
						{/* Header Row */}
						<tr className="font-bold">
							<td
								rowSpan={7}
								className="text-center font-bold bg-[#394e5f] text-blue-200 px-1 py-2 border border-slate-700 [writing-mode:vertical-rl]"
							>
								DYP INFO
							</td>
							<td
								colSpan={2}
								className="bg-[#182937] text-center px-1 py-1.5 border border-[#182937]"
							>
								<strong>
									{latestSelectedAircraftData?.callSign || "AFL2638"}
								</strong>
							</td>
							<td className="bg-slate-800 px-1 py-1.5">
								{latestSelectedAircraftClass || "AEROFLOT"}
							</td>
							<td className="bg-slate-800 px-1 py-1.5"></td>
							<td className="bg-slate-800 px-1 py-1.5">
								{latestSelectedAircraftData?.transponderCode || "7347"}
							</td>
							<td className="bg-slate-800 px-1 py-1.5"></td>
							<td className="bg-slate-800 px-1 py-1.5">
								{lastestSelectedAircraftType || "A321"}
							</td>
							<td
								colSpan={2}
								className="bg-[#182937] text-[10px] font-bold px-1 py-1.5"
							>
								{latestSelectedAircraftData?.currentTime || "08:57"}
							</td>
							<td className="bg-slate-800 px-1 py-1.5 border border-slate-700"></td>
						</tr>

						{/* Altitude and Route Info */}
						<tr>
							<td
								colSpan={2}
								className="text-center px-1 py-1.5 border border-slate-700"
							>
								{latestSelectedAircraftData?.lastKnownAltitude ?? "350"} - ---
							</td>
							<td
								rowSpan={3}
								className="font-bold text-white align-middle px-1 py-1.5 border border-slate-700 border-xl"
							>
								{latestSelectedAircraftData?.departureAirport || "UUEE"} →{" "}
								{latestSelectedAircraftData?.arrivalAirport || "LEBL"}
							</td>
							{latestSelectedTrajectory[0]?.trajectories
								.slice(0, 7)
								.map((trajectory, index) => (
									<td
										rowSpan={2}
										key={`wp-${index}`}
										className="text-[10px] leading-tight px-1 py-1 border border-slate-700"
									>
										<div>{trajectory.wayPoint}</div>
										<div className="opacity-80">{`${trajectory.timestamp}-${trajectory.flightLevel}`}</div>
									</td>
								))}
						</tr>

						<tr>
							<td
								colSpan={2}
								className="text-center px-1 py-1.5 border border-slate-700"
							>
								--- --- k.--
							</td>
						</tr>

						<tr>
							<td
								colSpan={2}
								className="text-center px-1 py-1.5 border border-slate-700"
							>
								&gt;---- x
								{latestSelectedAircraftData?.lastKnownAltitude &&
									Math.ceil(latestSelectedAircraftData?.lastKnownAltitude)}
							</td>
							{latestSelectedAircraftData?.routeWaypoints?.map(
								(wp, index) => (
									<td
										key={`sec-${index}`}
										className="text-[10px] px-1 py-1 border border-slate-700"
									>
										<div className="font-semibold">{wp.sector}</div>
										<div className="opacity-90">{wp.level}</div>
									</td>
								),
							) || (
								<>
									<td className="text-[10px] px-1 py-1">B2 35</td>
									<td className="text-[10px] px-1 py-1">M2 33</td>
									<td className="text-[10px] px-1 py-1">M1 27</td>
									<td className="text-[10px] px-1 py-1">XAL 27</td>
								</>
							)}
							<td
								colSpan={5}
								className="px-1 py-1.5 border border-slate-700"
							></td>
						</tr>

						{/* Footer */}
						<tr className="bg-[#182937] text-white">
							<td colSpan={2} className="px-1 py-1.5">
								{latestSelectedAircraftData?.nextSectorController || "none"}
							</td>
							<td colSpan={2} className="px-1 py-1.5">
								{latestSelectedAircraftData?.frequency || "132.490"}
							</td>
							<td colSpan={4} className="px-1 py-1.5">
								Texte :
							</td>
							<td colSpan={4} className="px-1 py-1.5"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</Draggable>
	);
});
