/**
 * Shared sub-components used by AircraftPopupContent and AircraftContentSmall.
 * These are the individual parts that make up the aircraft labels on the map.
 */
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";

import { useDragging } from "../contexts/DraggingContext";
import type AircraftModel from "../model/AircraftModel";
import { FLIGHT_LABEL_COLORS } from "../model/CwpStore";
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

		const handleContextMenu = (event: React.MouseEvent): void => {
			event.preventDefault();
			aircraft.degrease();
		};

		/**
		 * Get the callsign display color.
		 * Special case: For LIGHT_GREEN aircraft (imminent sector entry),
		 * the callsign is displayed in WHITE while the rest of the label uses light green.
		 */
		const getCallSignColor = (): string => {
			const category = roleConfigurationStore.getFlightLabelColorCategory(
				aircraft.aircraftId,
			);

			// For LIGHT_GREEN aircraft, display callsign in WHITE
			if (category === "lightGreen") {
				return FLIGHT_LABEL_COLORS.white;
			}

			// Check if aircraft is being transferred to current CWP (not yet controlled but coordinated)
			if (aircraft.nextSectorController === configurationStore.currentCWP) {
				return FLIGHT_LABEL_COLORS.white;
			}

			// Otherwise use the flight label color (which comes from the category)
			return flightColor ?? FLIGHT_LABEL_COLORS.grey;
		};

		return (
			<span
				style={{ color: getCallSignColor() }}
				onClick={openATCMenu}
				onContextMenu={handleContextMenu}
				className="hover:outline-2 hover:outline-white"
			>
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
		<span onClick={onClick} className="hover:outline-2 hover:outline-white">
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
	return (
		<span
			onClick={openNSFLPopup}
			className="hover:outline-2 hover:outline-white"
		>
			{aircraft.nextSectorFL}
		</span>
	);
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
			<span onClick={onClick} className="hover:outline-2 hover:outline-white">
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

		const { nextACCFL, lastKnownAltitude, isNextACCFLFlashing } = aircraft;

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

		return (
			<span
				onClick={openNextACCPopup}
				className={`hover:outline-2 hover:outline-white ${
					isNextACCFLFlashing
						? "bg-blue-500 outline-2 outline-blue-500"
						: "bg-transparent outline-0 outline-transparent transition-[background-color,outline-width,outline-color] duration-500"
				}`}
			>
				{displayValue}
			</span>
		);
	},
);

// Moon shape for "none" and "blue"
const MoonPath = (
	<path
		fillRule="evenodd"
		d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
		clipRule="evenodd"
	/>
);

// Diamond/losange shape for "orange"
const DiamondPath = (
	<path
		fillRule="evenodd"
		d="M12 2L22 12L12 22L2 12L12 2Z"
		clipRule="evenodd"
	/>
);

// Star shape for "yellow"
const StarPath = (
	<path
		fillRule="evenodd"
		d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
		clipRule="evenodd"
	/>
);

/**
 * Get the icon path based on warning level
 */
function getWarningIconPath(warningLevel: string): React.ReactNode {
	switch (warningLevel) {
		case "orange":
			return DiamondPath;
		case "yellow":
			return StarPath;
		default:
			// "none" and "blue" use moon
			return MoonPath;
	}
}

/**
 * Warning icon component that works with just an aircraftId.
 * Can be used anywhere without needing the full AircraftModel.
 */
export const WarningIconById = observer(
	({
		aircraftId,
		skipNone,
		className = "size-3",
	}: {
		aircraftId: string;
		skipNone?: boolean;
		className?: string;
	}) => {
		const warningLevel = cwpStore.getWarningLevel(aircraftId);
		const warningColor =
			roleConfigurationStore.getOriginalColorOfAircraft(aircraftId);

		if (skipNone && warningLevel === "none") {
			return null;
		}

		const handleClick = (event: React.MouseEvent): void => {
			event.stopPropagation();
			cwpStore.cycleWarningLevel(aircraftId);
		};

		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill={warningColor}
				className={`${className} inline cursor-pointer`}
				onClick={handleClick}
			>
				{getWarningIconPath(warningLevel)}
			</svg>
		);
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

		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill={warningColor}
				className="size-3 inline cursor-pointer -mt-0.5 -ml-0.5"
				onClick={handleClick}
			>
				{getWarningIconPath(warningLevel)}
			</svg>
		);
	},
);

export const AssignedBearing = observer(
	({ aircraft }: SubContentProperties) => {
		const { assignedBearing } = aircraft;
		const changeBearing = (current_bearing: number): void => {
			cwpStore.openChangeBearingForAircraft(aircraft.aircraftId);
		};
		if (assignedBearing === -1 || assignedBearing === undefined) {
			return (
				<span
					onClick={() => changeBearing(aircraft.lastKnownBearing)}
					className="hover:outline-2 hover:outline-white cursor-pointer"
				>
					h...
				</span>
			);
		}

		let displayedBearing = Math.round(assignedBearing) % 360;
		if (displayedBearing < 1) {
			displayedBearing = 360;
		}

		return (
			<span
				onClick={() => changeBearing(assignedBearing)}
				className="hover:outline-2 hover:outline-white cursor-pointer"
			>
				{`${displayedBearing.toString().padStart(3, "0")}`}
			</span>
		);
	},
);

export const NextNav = observer(({ aircraft }: SubContentProperties) => {
	const posthog = usePostHog();
	const { isDragging } = useDragging();

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

	const openNextFixPopup = (): void => {
		if (isDragging) {
			return;
		}
		cwpStore.openChangeNextFixForAircraft(aircraft.aircraftId);
		posthog?.capture("next_fix_popup_opened", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			next_nav: aircraft.nextNav,
		});
	};

	const { nextNav, assignedBearing } = aircraft;
	const showNextNav = assignedBearing === -1 || assignedBearing === undefined;

	return (
		<span
			onClick={openNextFixPopup}
			onMouseDown={middleClickNextWaypoint}
			className="hover:outline-2 hover:outline-white"
		>
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

export const ArrivalAirport = observer(({ aircraft }: SubContentProperties) => {
	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault();
		aircraft.degrease();
	};

	return (
		<span
			onContextMenu={handleContextMenu}
			className="hover:outline-2 hover:outline-white"
		>
			{aircraft.arrivalAirport}
		</span>
	);
});
