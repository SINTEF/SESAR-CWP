import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";
import type AircraftModel from "../model/AircraftModel";
import {
	changeExitFlightLevelOfAircraft,
	changeFlightLevelOfAircraft,
	handlePublishPromise,
	persistACCFlightLevel,
	persistAssignedFlightLevel,
	persistLocalAssignedFlightLevel,
	persistNextSectorFlightLevel,
} from "../mqtt-client/publishers";
import { configurationStore, cwpStore, roleConfigurationStore } from "../state";
import { PopupCommunicationButtons } from "./shared/CommunicationButtons";

function ListOfLevels(properties: {
	value: number;
	onClick: (index: number) => void;
	topFlightLevel: number | undefined;
	bottomFlightLevel: number | undefined;
}) {
	const { value, onClick, topFlightLevel, bottomFlightLevel } = properties;
	const rows = [];

	const hasLevel =
		topFlightLevel !== undefined && bottomFlightLevel !== undefined;

	for (let index = 560; index > 200; index -= 10) {
		const isWithinRange =
			hasLevel && index >= bottomFlightLevel && index <= topFlightLevel;
		const isSelected = index === value;

		rows.push(
			<button
				key={index}
				onClick={(): void => onClick(index)}
				className={`
                    block px-0 py-1 text-xs text-center
                    bg-[#1e3a5f] text-white
                    hover:bg-[#4b90db]
                    border-none outline-none
                    ${isWithinRange ? "font-bold" : ""}
                `}
				data-level={index}
			>
				{isSelected ? (
					<>
						<span>&gt;</span>&nbsp;{index}&nbsp;<span>&lt;</span>
					</>
				) : (
					index
				)}
			</button>,
		);
	}

	return <>{rows}</>;
}

export default observer(function AircraftLevelPopup(properties: {
	aircraft: AircraftModel;
}) {
	const posthog = usePostHog();
	const {
		aircraftId,
		assignedFlightId,
		lastKnownAltitude: altitude,
		callSign,
		controlledBy,
		nextACCFL,
		setAssignedFlightLevel,
		setLocalAssignedFlightLevel,
		setNextSectorFL,
		setNextACCFL,
	} = properties.aircraft;

	const { areaOfIncludedAirspaces, currentCWP } = configurationStore;
	const { currentControlledSector } = roleConfigurationStore;

	const currentAircraftLevel = Math.round(altitude / 10) * 10;
	// Use nextACCFL as the default level if it's a number, otherwise use the aircraft altitude
	const getDefaultLevel = (): number => {
		if (nextACCFL !== "COO" && /^\d+$/.test(nextACCFL)) {
			return Math.round(Number.parseInt(nextACCFL) / 10) * 10;
		}
		return currentAircraftLevel;
	};
	const defaultLevel = getDefaultLevel();

	const [flightLevel, setFlightLevel] = React.useState(defaultLevel);
	const listOfLevelsReference = React.createRef<HTMLDivElement>();
	const shouldShow = cwpStore.aircraftsWithLevelPopup.has(aircraftId);

	const airspaceCurrent = areaOfIncludedAirspaces.find(
		({ sectorId }) => sectorId === currentControlledSector,
	);

	const topFlightLevel = airspaceCurrent?.topFlightLevel;
	const bottomFlightLevel = airspaceCurrent?.bottomFlightLevel;

	// Reset flight level to default when popup opens
	React.useEffect(() => {
		if (shouldShow) {
			setFlightLevel(defaultLevel);
		}
	}, [shouldShow, defaultLevel]);

	React.useEffect(() => {
		// Scroll to the level in the list (only within the container, not the whole page)
		const container = listOfLevelsReference.current;
		if (!container) {
			return;
		}

		const listElement = ([...container.children] as HTMLButtonElement[]).find(
			(element) => element.dataset.level === `${flightLevel}`,
		);

		if (listElement) {
			// Calculate scroll position to center the element within the container
			// Using getBoundingClientRect for accurate positioning
			const containerRect = container.getBoundingClientRect();
			const elementRect = listElement.getBoundingClientRect();
			const elementTopRelativeToContainer =
				elementRect.top - containerRect.top + container.scrollTop;
			container.scrollTop =
				elementTopRelativeToContainer -
				container.clientHeight / 2 +
				listElement.offsetHeight / 2;
		}
	}, [flightLevel, shouldShow]);

	const accepted = controlledBy === currentCWP;
	const isMaster = currentCWP === "All";
	if (!shouldShow) {
		return null;
	}

	const sliderStep = 10;
	const flightLevelMin = 210;
	const flightLevelMax = 560;

	const FlightLevelChange = (direction: "up" | "down"): void => {
		const newStepValue = Math.min(
			flightLevelMax,
			Math.max(
				flightLevelMin,
				direction === "up"
					? flightLevel + sliderStep
					: flightLevel - sliderStep,
			),
		);
		setFlightLevel(newStepValue);
	};

	const close = (): void => {
		cwpStore.clearTaRequestCallback();
		cwpStore.closeLevelPopupForAircraft(aircraftId);
		posthog?.capture("altitude_popup_closed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			action: "cancelled",
		});
	};

	const applyFlightLevel = (level: number): void => {
		const stringFlightLevel = level.toString();

		// If TA request callback is set, call it instead of normal behavior
		if (cwpStore.taRequestCallback) {
			cwpStore.taRequestCallback(stringFlightLevel);
			cwpStore.clearTaRequestCallback();
			cwpStore.closeLevelPopupForAircraft(aircraftId);
			return;
		}

		const previousAltitude = currentAircraftLevel;
		let changeType = "";

		if (cwpStore.nextSectorFlActivated) {
			changeType = "next_sector_fl";
			cwpStore.showNSFL(false);
			setNextSectorFL(stringFlightLevel);
			handlePublishPromise(
				persistNextSectorFlightLevel(assignedFlightId, stringFlightLevel),
			);
			handlePublishPromise(
				changeExitFlightLevelOfAircraft(
					controlledBy,
					assignedFlightId,
					stringFlightLevel,
				),
			);
		} else if (cwpStore.flightLevelNextAccActivated) {
			changeType = "next_acc_fl";
			cwpStore.showFlACC(false);
			setNextACCFL(stringFlightLevel);
			handlePublishPromise(
				persistACCFlightLevel(assignedFlightId, stringFlightLevel),
			);
		} else if (!cwpStore.pseudoPilot && !isMaster) {
			changeType = "local_assigned_fl";
			setLocalAssignedFlightLevel(stringFlightLevel);
			handlePublishPromise(
				persistLocalAssignedFlightLevel(assignedFlightId, stringFlightLevel),
			);
		} else {
			changeType = "assigned_fl";
			setAssignedFlightLevel(stringFlightLevel);
			handlePublishPromise(
				changeFlightLevelOfAircraft(
					controlledBy,
					assignedFlightId,
					stringFlightLevel,
				),
			);
			handlePublishPromise(
				persistAssignedFlightLevel(assignedFlightId, stringFlightLevel),
			);
		}

		posthog?.capture("altitude_changed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			previous_altitude: previousAltitude,
			new_altitude: level,
			altitude_change: level - previousAltitude,
			change_type: changeType,
			controlled_by: controlledBy,
			current_cwp: currentCWP,
			is_master: isMaster,
		});

		cwpStore.closeLevelPopupForAircraft(aircraftId);
	};

	const setFLCP = (): void => {
		applyFlightLevel(flightLevel);
	};

	// Handler for clicking a flight level button in the list
	const handleFlightLevelClick = (level: number): void => {
		// In TA request mode, always apply (even if clicking default level)
		if (cwpStore.taRequestCallback) {
			applyFlightLevel(level);
			return;
		}
		if (level === defaultLevel) {
			// If clicking on the default level (no change), just close the popup
			close();
		} else {
			// Otherwise, apply immediately
			applyFlightLevel(level);
		}
	};

	const isTaRequestMode = !!cwpStore.taRequestCallback;

	return (
		<div
			className={`
			w-20 bg-[#1e3a5f] p-0 shadow-lg
			${accepted ? "border-2 border-green-400" : ""}
			${isTaRequestMode ? "border-2 border-yellow-400" : ""}
		`}
			style={{ borderRadius: 0 }}
		>
			{isTaRequestMode && (
				<div className="text-center text-[10px] py-0.5 bg-yellow-500 text-black font-medium">
					TA Request
				</div>
			)}
			<div className="text-center font-bold text-xs py-1 bg-black text-white">
				{callSign}
			</div>
			<div className="flex flex-col">
				<button
					onClick={(): void => FlightLevelChange("up")}
					className="btn btn-ghost btn-xs text-xs"
				>
					▲
				</button>
				<div
					className="h-40 overflow-y-scroll scrollbar-hide bg-[#1e3a5f] flex flex-col"
					ref={listOfLevelsReference}
				>
					<ListOfLevels
						value={flightLevel}
						onClick={handleFlightLevelClick}
						topFlightLevel={topFlightLevel}
						bottomFlightLevel={bottomFlightLevel}
					/>
				</div>
				<button
					onClick={(): void => FlightLevelChange("down")}
					className="btn btn-ghost btn-xs text-xs"
				>
					▼
				</button>
			</div>
			<PopupCommunicationButtons
				hasCPDLC={properties.aircraft.hasCPDLC}
				onSubmit={setFLCP}
				onClose={close}
			/>
		</div>
	);
});
