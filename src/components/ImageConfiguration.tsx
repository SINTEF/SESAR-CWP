import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";

import { configurationStore, cwpStore } from "../state";
import SpeedVectorNavbarControl from "./SpeedVectorNavbarControl";
import Time from "./Time";

const _ControllerButton = observer(function ControllerButton() {
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
				"focus:outline-none focus:shadow-none focus:border-[#3f77b2] p-1.5",
				active && "bg-[#4b90db] border-[#6bb3f0]",
			)}
		>
			{children}
		</button>
	);
}

const _FLButton = observer(function FLButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleFL()}
			active={cwpStore.showFL}
		>
			FL
		</GenericButton>
	);
});

const _NSFLButton = observer(function NSFLButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleFL()} // Not correct but might be useful?
			active={cwpStore.showFL}
		>
			NSFL
		</GenericButton>
	);
});

const _SFLButton = observer(function SFLButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleSFL()}
			active={cwpStore.showSFL}
		>
			SFL
		</GenericButton>
	);
});

const _N_AButton = observer(function N_AButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleSFL()}
			active={cwpStore.showSFL} // Not correct but might be useful?
		>
			N_A
		</GenericButton>
	);
});

const SectorLabelsButton = observer(function SectorLabelsButton() {
	const posthog = usePostHog();
	const onClick = (): void => {
		cwpStore.toggleSectorLabels();
		posthog?.capture("sectors_toggled", {
			enabled: !cwpStore.showSectorLabels,
		});
	};
	return (
		<GenericButton
			onClick={onClick}
			active={cwpStore.showSectorLabels} // Not sure if this is correct but might be useful?
		>
			Sectors
		</GenericButton>
	);
});

const AirwaysButton = observer(function AirwaysButton() {
	const posthog = usePostHog();
	const onClick = (): void => {
		cwpStore.toggleSectorLabels(); // Not correct but might be useful?
		posthog?.capture("airways_toggled", {
			enabled: !cwpStore.showSectorLabels,
		});
	};
	return (
		<GenericButton onClick={onClick} active={cwpStore.showSectorLabels}>
			Airways
		</GenericButton>
	);
});

const ResetButton = observer(function ResetButton() {
	const posthog = usePostHog();
	const resetAllToggles = (): void => {
		cwpStore.setShowSpeedVectors(false);
		posthog?.capture("ui_reset", {
			speed_vectors_reset: true,
		});
	};
	return (
		<GenericButton onClick={(): void => resetAllToggles()} active={true}>
			RESET
		</GenericButton>
	);
});

const _FlightLabelsButton = observer(function FlightLabelsButton() {
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
	const posthog = usePostHog();
	const onClick = (): void => {
		cwpStore.toggleFixes();
		posthog?.capture("fixes_toggled", {
			enabled: !cwpStore.showFixes,
		});
	};
	return (
		<GenericButton onClick={onClick} active={cwpStore.showFixes}>
			&#x25B2;
		</GenericButton>
	);
});

const _LimboFlightsButton = observer(function LimboFlightsButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleLimboFlights()}
			active={cwpStore.showLimboFlight}
		>
			Affected Flights
		</GenericButton>
	);
});

const _FilterButton = observer(function FilterButton() {
	return (
		<GenericButton
			onClick={(): void => cwpStore.toggleFILT()}
			active={cwpStore.showFILT}
		>
			FILT
		</GenericButton>
	);
});

const _CurrentSectorFlightLabelsButton = observer(
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

const _OtherSectorsFlightLabelsButton = observer(
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
	const posthog = usePostHog();
	const onClick = (): void => {
		cwpStore.toggleVerticalWindow();
		posthog?.capture("vertical_window_toggled", {
			enabled: !cwpStore.showVerticalWindow,
		});
	};
	return (
		<GenericButton onClick={onClick} active={cwpStore.showVerticalWindow}>
			VAW
		</GenericButton>
	);
});

export default function ImageConfiguration() {
	return (
		<div className="absolute top-0 left-0 h-auto p-0 flex flex-col justify-start items-start z-[1]">
			<div className="flex gap-2 bg-[#232323] p-4 ml-1 mt-1 items-center">
				<Time />
				<div>
					<ResetButton />
				</div>
				<div className="flex">
					<FixesButton />
					<AirwaysButton />
					<SectorLabelsButton />
				</div>
				<div>
					<OpenVerticalWindowButton />
				</div>
				{/* <div>
					<NSFLButton />
				</div>
				<div>
					<N_AButton />
				</div> */}
			</div>
			<div className="flex gap-4 bg-[#232323] p-4 ml-1 mt-1 items-center">
				<SpeedVectorNavbarControl />
			</div>
			{/* <div className="image-configuration-section">
				<FlightLabelsButton />
			</div>
			<div className="image-configuration-section">
				<CurrentSectorFlightLabelsButton />
				<OtherSectorsFlightLabelsButton />
				<LimboFlightsButton />
				<FilterButton />
				<DistanceMeasurementDropdown />
				<ControllerButton />
			</div> */}
		</div>
	);
}
