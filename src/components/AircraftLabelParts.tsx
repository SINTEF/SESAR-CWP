/**
 * Shared sub-components used by AircraftPopupContent and AircraftContentSmall.
 * These are the individual parts that make up the aircraft labels on the map.
 */
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";

import { useDragging } from "../contexts/DraggingContext";
import type AircraftModel from "../model/AircraftModel";
import { configurationStore, cwpStore, roleConfigurationStore } from "../state";
import { convertMetersToFlightLevel } from "../utils";

type SubContentProperties = {
	aircraft: AircraftModel;
	flightColor?: string;
	colSpan?: number;
};

export const CallSign = observer(
	({ flightColor, aircraft }: SubContentProperties) => {
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
			<span style={{ color: getColor(aircraft) }} onClick={openATCMenu}>
				{callSign}
			</span>
		);
	},
);

export const VerticalSpeedIcon = observer(
	({ aircraft }: SubContentProperties) => {
		const { lastKnownVerticalSpeed } = aircraft;
		if (Math.abs(lastKnownVerticalSpeed) < 1) {
			return <span>-</span>;
		}
		const sign = lastKnownVerticalSpeed > 0 ? "↗" : "↘";
		return <span>{sign}</span>;
	},
);

export const VerticalSpeed = observer(({ aircraft }: SubContentProperties) => {
	const { lastKnownVerticalSpeed } = aircraft;
	// convert m/s to ft/min and divide by 100
	const verticalSpeedFpm = Math.round(lastKnownVerticalSpeed * 1.96850394);
	if (verticalSpeedFpm === 0) {
		return <span>-</span>;
	}
	const sign = verticalSpeedFpm > 0 ? "↗" : "↘";
	return <span>{`${sign}${verticalSpeedFpm}`}</span>;
});

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
		<span onClick={onClick}>
			{Number.parseFloat(aircraft.lastKnownAltitude.toFixed(0))}
		</span>
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
	return <span onClick={openNSFLPopup}>{aircraft.nextSectorFL}</span>;
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
			<span onClick={onClick}>
				{aircraft.nextSectorController === "All"
					? "Master"
					: aircraft.nextSectorController}
			</span>
		);
	},
);

export const LocalAssignedFlightLevel = observer(
	({ aircraft }: SubContentProperties) => (
		<span>{aircraft.localAssignedFlightLevel}</span>
	),
);

export const NextACCFlightLevel = observer(
	({
		aircraft,
		hideIfMatchesAltitude = false,
	}: SubContentProperties & { hideIfMatchesAltitude?: boolean }) => {
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

		const { nextACCFL, lastKnownAltitude } = aircraft;

		// Don't display if COO (only when hideIfMatchesAltitude is true, i.e., in small content)
		if (hideIfMatchesAltitude && nextACCFL === "COO") {
			return null;
		}

		let displayValue = nextACCFL;
		// if digit
		if (/^\d+$/.test(nextACCFL)) {
			displayValue = Math.round(Number.parseInt(nextACCFL) / 10)
				.toString()
				.padStart(2, "0");
		}

		// Don't display if the rounded display value matches the rounded altitude (only in small content)
		if (hideIfMatchesAltitude && /^\d+$/.test(displayValue)) {
			const roundedAltitude = Math.round(lastKnownAltitude);
			if (Number.parseInt(displayValue) === roundedAltitude) {
				return null;
			}
		}

		return <span onClick={openNextACCPopup}>{displayValue}</span>;
	},
);

export const WarningIcon = observer(
	({ aircraft, skipNone }: { aircraft: AircraftModel; skipNone?: boolean }) => {
		const warningLevel = cwpStore.getWarningLevel(aircraft.aircraftId);
		const warningColor = roleConfigurationStore.getOriginalColorOfAircraft(
			aircraft.aircraftId,
		);

		if (skipNone && warningLevel === "none") {
			return null;
		}

		const handleClick = (event: React.MouseEvent): void => {
			event.stopPropagation();
			cwpStore.cycleWarningLevel(aircraft.aircraftId);
		};

		// Moon shape for "none" and "blue"
		const moonPath = (
			<path
				fillRule="evenodd"
				d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
				clipRule="evenodd"
			/>
		);

		// Diamond/losange shape for "orange"
		const diamondPath = (
			<path
				fillRule="evenodd"
				d="M12 2L22 12L12 22L2 12L12 2Z"
				clipRule="evenodd"
			/>
		);

		// Star shape for "yellow"
		const starPath = (
			<path
				fillRule="evenodd"
				d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
				clipRule="evenodd"
			/>
		);

		let iconPath: React.ReactNode;
		switch (warningLevel) {
			case "orange":
				iconPath = diamondPath;
				break;
			case "yellow":
				iconPath = starPath;
				break;
			default:
				// "none" and "blue" use moon
				iconPath = moonPath;
				break;
		}

		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill={warningColor}
				className="size-3 inline cursor-pointer -mt-0.5 -ml-0.5"
				onClick={handleClick}
			>
				{iconPath}
			</svg>
		);
	},
);

export const AssignedBearing = observer(
	({ aircraft }: SubContentProperties) => {
		const { assignedBearing } = aircraft;

		if (assignedBearing === -1 || assignedBearing === undefined) {
			return <span>h...</span>;
		}

		let displayedBearing = Math.round(assignedBearing) % 360;
		if (displayedBearing < 1) {
			displayedBearing = 360;
		}

		return <span>{`${displayedBearing.toString().padStart(3, "0")}`}</span>;
	},
);

export const NextNav = observer(({ aircraft }: SubContentProperties) => {
	const posthog = usePostHog();
	const middleClickNextWaypoint = (
		_event: React.MouseEvent<HTMLElement>,
	): void => {
		cwpStore.toggleFlightRouteForAircraft(aircraft.aircraftId);
		posthog?.capture("next_nav_clicked", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			next_nav: aircraft.nextNav,
			flight_route_visible: cwpStore.aircraftsWithFlightRoutes.has(
				aircraft.aircraftId,
			),
		});
	};

	const { nextNav, assignedBearing } = aircraft;
	const showNextNav = assignedBearing === -1 || assignedBearing === undefined;

	return (
		<span onMouseDown={middleClickNextWaypoint}>
			{showNextNav ? nextNav : "--"}
		</span>
	);
});

export const TransferAltitude = ({
	altitude,
}: {
	altitude: number | null | undefined;
}) => {
	if (altitude === null || altitude === undefined) {
		return <span>x</span>;
	}
	const flightLevel = Math.round(convertMetersToFlightLevel(altitude) / 10);
	return <span>x{flightLevel}</span>;
};
