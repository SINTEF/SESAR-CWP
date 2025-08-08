import { observer } from "mobx-react-lite";
import React from "react";

import { isDragging } from "../draggableState";
import {
	acceptFlight,
	handlePublishPromise,
	persistFrontendFlightController,
} from "../mqtt/publishers";
import {
	aircraftStore,
	configurationStore,
	cwpStore,
	roleConfigurationStore,
} from "../state";
import type AircraftModel from "../model/AircraftModel";

type SubContentProperties = {
	aircraft: AircraftModel;
	colSpan?: number;
};

const CallSign = observer(
	({ aircraft, colSpan }: SubContentProperties): JSX.Element => {
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
			handlePublishPromise(
				persistFrontendFlightController(
					aircraftId,
					configurationStore.currentCWP,
				),
			);
		};
		return (
			<td onClick={setController} colSpan={colSpan}>
				{callSign}
			</td>
		);
	},
);

export const Altitude = observer(
	({ aircraft }: SubContentProperties): JSX.Element => {
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
	},
);

export const NextSectorFL = observer(
	({ aircraft }: SubContentProperties): JSX.Element => {
		const openNSFLPopup = (): void => {
			if (isDragging()) {
				return;
			}
			cwpStore.showNSFL(true);
			cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);
		};
		return <td onClick={openNSFLPopup}>{aircraft.nextSectorFL}</td>;
	},
);

export const NextSectorController = observer(
	({ aircraft }: SubContentProperties): JSX.Element => {
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
	({ aircraft }: SubContentProperties): JSX.Element => (
		<td>{aircraft.localAssignedFlightLevel}</td>
	),
);

export const NextACCFlightLevel = observer(
	({ aircraft }: SubContentProperties): JSX.Element => {
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
		<table className="border-spacing-0 w-full max-w-full">
			<tbody style={{ color: flightColor }}>
				<tr>
					<td>{Math.round(aircraft.lastKnownSpeed)}</td>
				</tr>
				<tr>
					<CallSign aircraft={aircraft} colSpan={1} />
				</tr>
				<tr>
					<Altitude aircraft={aircraft} />
				</tr>
				<tr>
					<td>
						x
						{currentSector &&
							aircraft.flightInSectorTimes?.get(currentSector)?.exitPosition
								?.altitude}
					</td>
				</tr>
			</tbody>
		</table>
	);
});
