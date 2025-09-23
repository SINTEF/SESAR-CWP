import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";
import type AircraftModel from "../model/AircraftModel";
import {
	changeFlightLevelOfAircraft,
	handlePublishPromise,
	persistACCFlightLevel,
	persistAssignedFlightLevel,
	persistLocalAssignedFlightLevel,
	persistNextSectorFlightLevel,
} from "../mqtt-client/publishers";
import { configurationStore, cwpStore, roleConfigurationStore } from "../state";

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
                    w-full px-0 py-1 text-xs 
                    bg-[#1e3a5f] text-white
                    hover:bg-[#4b90db]
                    border-none outline-none
                    flex items-center justify-center
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
		setAssignedFlightLevel,
		setLocalAssignedFlightLevel,
		setNextSectorFL,
		setNextACCFL,
	} = properties.aircraft;

	const { areaOfIncludedAirspaces, currentCWP } = configurationStore;
	const { currentControlledSector } = roleConfigurationStore;

	const [flightLevel, setFlightLevel] = React.useState(
		Math.round(altitude / 10) * 10,
	);
	const listOfLevelsReference = React.createRef<HTMLDivElement>();
	const shouldShow = cwpStore.aircraftsWithLevelPopup.has(aircraftId);

	const airspaceCurrent = areaOfIncludedAirspaces.find(
		({ sectorId }) => sectorId === currentControlledSector,
	);

	const topFlightLevel = airspaceCurrent?.topFlightLevel;
	const bottomFlightLevel = airspaceCurrent?.bottomFlightLevel;

	React.useEffect(() => {
		// Scroll to the level in the list
		const listElement = (
			[
				...(listOfLevelsReference.current?.children ?? []),
			] as HTMLButtonElement[]
		).find((element) => element.dataset.level === `${flightLevel}`);
		listElement?.scrollIntoView({ block: "center" });
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
		cwpStore.closeLevelPopupForAircraft(aircraftId);
		posthog?.capture("altitude_popup_closed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			action: "cancelled",
		});
	};
	const setFLCP = (): void => {
		const stringFlightLevel = flightLevel.toString();
		const previousAltitude = Math.round(altitude / 10) * 10;
		let changeType = "";

		if (cwpStore.nextSectorFlActivated) {
			changeType = "next_sector_fl";
			cwpStore.showNSFL(false);
			setNextSectorFL(stringFlightLevel);
			handlePublishPromise(
				persistNextSectorFlightLevel(assignedFlightId, stringFlightLevel),
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
			new_altitude: flightLevel,
			altitude_change: flightLevel - previousAltitude,
			change_type: changeType,
			controlled_by: controlledBy,
			current_cwp: currentCWP,
			is_master: isMaster,
		});

		close();
	};

	return (
		<div
			className={`
			w-[80px] bg-[#1e3a5f] p-0 shadow-lg
			${accepted ? "border-2 border-green-400" : ""}
		`}
			style={{ borderRadius: 0 }}
		>
			<div className="text-center font-bold text-xs py-1 bg-black text-white">
				{callSign}
			</div>
			<div className="flex flex-col">
				<button
					onClick={(): void => FlightLevelChange("up")}
					className="btn btn-ghost btn-xs text-xs"
				>
					⮝
				</button>
				<div
					className="snap-y snap-mandatory h-40 overflow-y-scroll scrollbar-hide bg-[#1e3a5f]"
					ref={listOfLevelsReference}
				>
					<ListOfLevels
						value={flightLevel}
						onClick={setFlightLevel}
						topFlightLevel={topFlightLevel}
						bottomFlightLevel={bottomFlightLevel}
					/>
				</div>
				<button
					onClick={(): void => FlightLevelChange("down")}
					className="btn btn-ghost btn-xs text-xs"
				>
					⮟
				</button>
			</div>
			<div className="flex gap-0.5 mt-1">
				<button
					onClick={close}
					className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2"
				>
					Cancel
				</button>
				<button
					onClick={setFLCP}
					className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2"
				>
					Apply
				</button>
			</div>
		</div>
	);
});
