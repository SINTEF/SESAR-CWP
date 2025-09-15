import { observer } from "mobx-react-lite";
import React from "react";

import { isDragging } from "../draggableState";
import type AircraftModel from "../model/AircraftModel";
import {
	acceptFlight,
	handlePublishPromise,
	persistFrontendFlightController,
} from "../mqtt-client/publishers";
import {
	aircraftStore,
	configurationStore,
	cwpStore,
	roleConfigurationStore,
} from "../state";
import Stca from "./conflict-detection-tools/Stca";

type SubContentProperties = {
	aircraft: AircraftModel;
	colSpan?: number;
};

const CallSign = observer(({ aircraft, colSpan }: SubContentProperties) => {
	const { callSign } = aircraft;
	const setController = (): void => {
		if (isDragging()) {
			return;
		}
		const { aircraftId, controlledBy, assignedFlightId } = aircraft;

		if (cwpStore.ATCMenuAircraftId === aircraftId) {
			cwpStore.setATCMenuAircraftId("");
			return;
		}
		cwpStore.setATCMenuAircraftId(aircraftId);

		// const listOfTentativeFlights =
		// 	roleConfigurationStore.roleConfigurations.get(
		// 		configurationStore.currentCWP,
		// 	)?.tentativeAircrafts;

		// if (listOfTentativeFlights?.includes(aircraftId)) {
		// 	roleConfigurationStore.roleConfigurations
		// 		.get(configurationStore.currentCWP)
		// 		?.removeTentativeAircraft(aircraftId);
		// }
		// handlePublishPromise(
		// 	persistFrontendFlightController(
		// 		aircraftId,
		// 		configurationStore.currentCWP,
		// 	),
		// );
	};
	return (
		<td onClick={setController} colSpan={colSpan}>
			{callSign}
		</td>
	);
});

export const Altitude = observer(({ aircraft }: SubContentProperties) => {
	const onClick = (): void => {
		if (isDragging()) {
			return;
		}
		cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);
	};
	return (
		<td onClick={onClick}>
			{Number.parseFloat(aircraft.lastKnownAltitude.toFixed(0))} -
		</td>
	);
});

const AssignedBearing = observer(({ aircraft }: SubContentProperties) => {
	const { assignedBearing } = aircraft;

	if (assignedBearing === -1 || assignedBearing === undefined) {
		return <td>h...</td>;
	}

	let displayedBearing = Math.round(assignedBearing) % 360;
	if (displayedBearing < 1) {
		displayedBearing = 360;
	}

	return <td>{`${displayedBearing.toString().padStart(3, "0")}`}</td>;
});

const NextFix = observer(({ aircraft }: SubContentProperties) => {
	const middleClickNextWaypoint = (
		_event: React.MouseEvent<HTMLElement>,
	): void => {
		// if (event.button === 1) {
		cwpStore.toggleFlightRouteForAircraft(aircraft.aircraftId);
		// }
	};

	const { nextFix, assignedBearing } = aircraft;
	const showNextFix = assignedBearing === -1 || assignedBearing === undefined;

	return (
		<td onMouseDown={middleClickNextWaypoint}>
			{showNextFix ? nextFix : "--"}
		</td>
	);
});

export const NextSectorFL = observer(({ aircraft }: SubContentProperties) => {
	const openNSFLPopup = (): void => {
		if (isDragging()) {
			return;
		}
		cwpStore.showNSFL(true);
		cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);
	};
	return <td onClick={openNSFLPopup}>{aircraft.nextSectorFL}</td>;
});

export const NextSectorController = observer(
	({ aircraft }: SubContentProperties) => {
		const onClick = (): void => {
			if (isDragging()) {
				return;
			}
			cwpStore.openNextSectorPopupForAircraft(aircraft.aircraftId);
		};
		return (
			<td onClick={onClick}>
				{aircraft.nextSectorController === "All"
					? "Master"
					: aircraft.nextSectorController}
			</td>
		);
	},
);

export const LocalAssignedFlightLevel = observer(
	({ aircraft }: SubContentProperties) => (
		<td>{aircraft.localAssignedFlightLevel}</td>
	),
);

export const NextACCFlightLevel = observer(
	({ aircraft }: SubContentProperties) => {
		const openNextACCPopup = (): void => {
			if (isDragging()) {
				return;
			}
			cwpStore.showFlACC(true);
			cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);
		};

		return <td onClick={openNextACCPopup}>{aircraft.nextACCFL}</td>;
	},
);

export default observer(function AircraftPopupContent(properties: {
	aircraft: AircraftModel;
	flightColor: string;
}) {
	const { aircraft, flightColor } = properties;
	const currentSector = roleConfigurationStore.currentControlledSector;
	return (
		<table className="border-spacing-0 m-1 w-full max-w-full">
			<tbody style={{ color: flightColor }}>
				<tr>
					<td className="flex flex-row">
						{Math.round(aircraft.lastKnownSpeed)}
					</td>
					<td>
						{aircraftStore.stcaConflictIds.has(aircraft.aircraftId) && <Stca />}
					</td>
				</tr>
				<tr>
					<CallSign aircraft={aircraft} colSpan={1} />
					<td>00</td>
					<td className="h-1 w-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="size-4"
						>
							<path
								fillRule="evenodd"
								d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
								clipRule="evenodd"
							/>
						</svg>
					</td>
				</tr>
				<tr>
					<Altitude aircraft={aircraft} />
					{/* <NextACCFlightLevel aircraft={aircraft} />  Is this something we need? */}
					<NextSectorFL aircraft={aircraft} />
					{/* <td>
						{" "}
						{aircraft.flightInSectorTimes?.get(currentSector)?.entryWaypointId}
					</td> */}
					<NextFix aircraft={aircraft} />
					<AssignedBearing aircraft={aircraft} />
				</tr>
				<tr>
					<td>
						x
						{currentSector &&
							aircraft.flightInSectorTimes?.get(currentSector)?.exitPosition
								?.altitude}
					</td>
					<td>
						x
						{currentSector &&
							aircraft.flightInSectorTimes?.get(currentSector)?.exitWaypointId}
					</td>
					{/* <NextSectorController aircraft={aircraft} /> */}
					{/* <LocalAssignedFlightLevel aircraft={aircraft} /> */}
					<td>{aircraft.arrivalAirport}</td>
				</tr>
			</tbody>
		</table>
	);
});
