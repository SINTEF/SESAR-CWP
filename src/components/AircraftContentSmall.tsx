import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import { useDragging } from "../contexts/DraggingContext";
import type AircraftModel from "../model/AircraftModel";
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
		const posthog = usePostHog();
		const { callSign, controlledBy } = aircraft;
		const { isDragging } = useDragging();

		const openATCMenu = (): void => {
			if (isDragging) {
				return;
			}
			const { aircraftId } = aircraft;

			const wasOpen = cwpStore.ATCMenuAircraftId === aircraftId;

			if (wasOpen) {
				cwpStore.setATCMenuAircraftId("");
			} else {
				cwpStore.setATCMenuAircraftId(aircraftId);
			}

			posthog?.capture("atc_menu_toggled", {
				aircraft_id: aircraftId,
				callsign: callSign,
				action: wasOpen ? "closed" : "opened",
				controlled_by: controlledBy,
			});

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
	const posthog = usePostHog();
	const { isDragging } = useDragging();
	const onClick = (): void => {
		if (isDragging) {
			return;
		}
		cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);

		posthog?.capture("altitude_popup_opened", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			current_altitude: aircraft.lastKnownAltitude,
		});
	};
	return (
		<td onClick={onClick}>
			{Number.parseFloat(aircraft.lastKnownAltitude.toFixed(0))} -
		</td>
	);
});

export const NextSectorFL = observer(({ aircraft }: SubContentProperties) => {
	const posthog = usePostHog();
	const { isDragging } = useDragging();
	const openNSFLPopup = (): void => {
		if (isDragging) {
			return;
		}
		cwpStore.showNSFL(true);
		cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);

		posthog?.capture("next_sector_fl_popup_opened", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			next_sector_fl: aircraft.nextSectorFL,
		});
	};
	return <td onClick={openNSFLPopup}>{aircraft.nextSectorFL}</td>;
});

export const NextSectorController = observer(
	({ aircraft }: SubContentProperties) => {
		const posthog = usePostHog();
		const { isDragging } = useDragging();
		const onClick = (): void => {
			if (isDragging) {
				return;
			}
			cwpStore.openNextSectorPopupForAircraft(aircraft.aircraftId);

			posthog?.capture("next_sector_controller_popup_opened", {
				aircraft_id: aircraft.aircraftId,
				callsign: aircraft.callSign,
				current_next_sector_controller: aircraft.nextSectorController,
			});
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
		const posthog = usePostHog();
		const { isDragging } = useDragging();
		const openNextACCPopup = (): void => {
			if (isDragging) {
				return;
			}
			cwpStore.showFlACC(true);
			cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);

			posthog?.capture("next_acc_popup_opened", {
				aircraft_id: aircraft.aircraftId,
				callsign: aircraft.callSign,
				next_acc_fl: aircraft.nextACCFL,
			});
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
		<table className="border-spacing-2 w-full max-w-full">
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
