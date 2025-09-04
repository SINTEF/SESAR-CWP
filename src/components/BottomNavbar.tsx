import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";

import { configurationStore, cwpStore } from "../state";
import DistanceMeasurementDropdown from "./DistanceMeasurementDropdown";
import MqttIndicators from "./MqttIndicators";
import SpeedVectorNavbarControl from "./SpeedVectorNavbarControl";

const ControllerButton = observer(function ControllerButton() {
	const { currentCWP } = configurationStore;
	const { toggleControllerSelection } = cwpStore;
	return (
		<button 
			type="button" 
			onClick={(): void => toggleControllerSelection()}
			className="h-full text-white text-xs bg-[#1e3a5f] rounded-none border border-[#2a5d8f] overflow-hidden whitespace-nowrap shrink hover:bg-[#2a5d8f] hover:border-[#4b90db] active:bg-[#366fa3] active:border-[#5aa1e6] focus:outline-none focus:shadow-none focus:border-[#3f77b2]"
		>
			{currentCWP || "Controller"}
		</button>
	);
});

function GenericButton({
	children,
	onClick,
	active,
}: {
	children: React.ReactNode;
	onClick: () => void;
	active: boolean;
}) {
	return (
		<button 
			type="button" 
			onClick={onClick} 
			className={classNames(
				"h-full text-white text-xs bg-[#1e3a5f] rounded-none border border-[#2a5d8f] overflow-hidden whitespace-nowrap shrink",
				"hover:bg-[#2a5d8f] hover:border-[#4b90db] active:bg-[#366fa3] active:border-[#5aa1e6]",
				"focus:outline-none focus:shadow-none focus:border-[#3f77b2]",
				active && "bg-[#4b90db] border-[#6bb3f0]"
			)}
		>
			{children}
		</button>
	);
}

const FLButton = observer(function FLButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleFL()}
			active={cwpStore.showFL}
		>
			FL
		</GenericButton>
	);
});

const SFLButton = observer(function SFLButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleSFL()}
			active={cwpStore.showSFL}
		>
			SFL
		</GenericButton>
	);
});

const SectorLabelsButton = observer(function SectorLabelsButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleSectorLabels()}
			active={cwpStore.showSectorLabels}
		>
			Sector Labels
		</GenericButton>
	);
});

const FlightLabelsButton = observer(function FlightLabelsButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleFlightLabels()}
			active={cwpStore.showFlightLabels}
		>
			Flight Labels
		</GenericButton>
	);
});

const FixesButton = observer(function FixesButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleFixes()}
			active={cwpStore.showFixes}
		>
			Fixes
		</GenericButton>
	);
});

const LimboFlightsButton = observer(function LimboFlightsButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleLimboFlights()}
			active={cwpStore.showLimboFlight}
		>
			Affected Flights
		</GenericButton>
	);
});

const FilterButton = observer(function FilterButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleFILT()}
			active={cwpStore.showFILT}
		>
			FILT
		</GenericButton>
	);
});

const CurrentSectorFlightLabelsButton = observer(
	function CurrentSectorFlightLabelsButton() {
		const { currentCWP } = configurationStore;
		if (!currentCWP || currentCWP === "All") {
			return null;
		}
		return (
			<GenericButton
				onClick={(): void => cwpStore.toggleFlightLabelsForCurrentSector()}
				active={cwpStore.showFlightLabelsForCurrentSector}
			>
				{currentCWP} Flight Labels
			</GenericButton>
		);
	},
);

const OtherSectorsFlightLabelsButton = observer(
	function OtherSectorsFlightLabelsButton() {
		const { currentCWP } = configurationStore;
		if (!currentCWP || currentCWP === "All") {
			return null;
		}
		return (
			<GenericButton
				onClick={(): void => cwpStore.toggleFlightLabelsForOtherSectors()}
				active={cwpStore.showFlightLabelsForOtherSectors}
			>
				Other Flight Labels
			</GenericButton>
		);
	},
);

export default function BottomNavBar() {
	return (
		<div className="absolute top-0 left-0 h-[1.9em] p-0 bg-[#1a1a1a] flex flex-row justify-start z-[1]">
			<FLButton />
			<SFLButton />
			<SectorLabelsButton />
			<FlightLabelsButton />
			<CurrentSectorFlightLabelsButton />
			<OtherSectorsFlightLabelsButton />
			<FixesButton />
			<LimboFlightsButton />
			<FilterButton />
			<SpeedVectorNavbarControl />
			<DistanceMeasurementDropdown />
			<ControllerButton />
			<MqttIndicators />
		</div>
	);
}
