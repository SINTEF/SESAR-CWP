import { observer } from "mobx-react-lite";
import React from "react";
import { isDragging } from "../draggableState";
import type AircraftModel from "../model/AircraftModel";
import { getCurrentAircraftId } from "../model/CurrentAircraft";
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
import { convertMetersToFlightLevel } from "../utils";
import Stca from "./conflict-detection-tools/Stca";

type SubContentProperties = {
	aircraft: AircraftModel;
	flightColor?: string;
	colSpan?: number;
};

export const CallSign = observer(
	({ flightColor, aircraft, colSpan }: SubContentProperties) => {
		const { callSign, controlledBy } = aircraft;

		const openATCMenu = (): void => {
			if (isDragging()) {
				return;
			}
			const { aircraftId } = aircraft;

			if (cwpStore.ATCMenuAircraftId === aircraftId) {
				cwpStore.setATCMenuAircraftId("");
				return;
			}
			cwpStore.setATCMenuAircraftId(aircraftId);

			// handlePublishPromise(
			// 	persistFrontendFlightController(
			// 		aircraftId,
			// 		configurationStore.currentCWP,
			// 	),
			// );
		};
		const getColor = (aircraft: AircraftModel): string => {
			if (controlledBy === "NS") {
				// Setting transfering to next sector as NS for DIALOG
				return "grey";
			}
			if (aircraft.nextSectorController === configurationStore.currentCWP) {
				// Not yet controlled by current CWP but transferred by another CWP
				return "white";
			}
			return flightColor ? flightColor : "grey";
		};

		return (
			<td
				style={{ color: getColor(aircraft) }}
				onClick={openATCMenu}
				colSpan={colSpan}
			>
				{callSign}
			</td>
		);
	},
);

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

export default observer(function AircraftContentSmall(properties: {
	aircraft: AircraftModel;
	flightColor: string;
}) {
	const { aircraft, flightColor } = properties;
	const currentSector = roleConfigurationStore.currentControlledSector;
	return (
		<table className="border-spacing-2 m-1 w-full max-w-full">
			<tbody style={{ color: flightColor }}>
				<tr>
					<td className="flex flex-row">
						{Math.round(aircraft.lastKnownSpeed)}
						{aircraftStore.stcaConflictIds.has(aircraft.aircraftId) && <Stca />}
					</td>
				</tr>
				<tr>
					<CallSign flightColor={flightColor} aircraft={aircraft} colSpan={1} />
				</tr>
				<tr>
					<Altitude aircraft={aircraft} />
				</tr>
				<tr>
					<td>
						x
						{currentSector &&
						aircraft.flightInSectorTimes?.get(currentSector)?.exitPosition
							?.altitude !== null
							? convertMetersToFlightLevel(
									aircraft.flightInSectorTimes?.get(currentSector)?.exitPosition
										?.altitude as number,
								)
							: ""}
					</td>
				</tr>
			</tbody>
		</table>
	);
});
