import "./css-files/ImageConfiguration.css";

import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";

import { configurationStore, cwpStore } from "../state";
import DistanceMeasurementDropdown from "./DistanceMeasurementDropdown";
import SpeedVectorNavbarControl from "./SpeedVectorNavbarControl";
import Time from "./Time";

const ControllerButton = observer(function ControllerButton() {
	const { currentCWP } = configurationStore;
	const { toggleControllerSelection } = cwpStore;
	return (
		<button type="button" onClick={(): void => toggleControllerSelection()}>
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
}): JSX.Element {
	return (
		<button type="button" onClick={onClick} className={classNames({ active })}>
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
			&#x25B2;
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

const OpenVerticalWindowButton = observer(function OpenVerticalWindowButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleVerticalWindow()}
			active={cwpStore.showVerticalWindow}
		>
			VAW
		</GenericButton>
	);
});

export default function ImageConfiguration(): JSX.Element {
	return (
		<div className="navbar button-navbar">
			<div className="image-configuration-section">
				<Time />
				<FLButton />
				<SFLButton />
				<FixesButton />
				<SectorLabelsButton />
				<OpenVerticalWindowButton />
			</div>
			<div className="image-configuration-section">
				<SpeedVectorNavbarControl />
			</div>
			<div className="image-configuration-section">
				<FlightLabelsButton />
			</div>
			<div className="image-configuration-section">
				<CurrentSectorFlightLabelsButton />
				<OtherSectorsFlightLabelsButton />
				<LimboFlightsButton />
				<FilterButton />
				<DistanceMeasurementDropdown />
				<ControllerButton />
			</div>
			{/* <MqttIndicators /> */}
		</div>
	);
}
