/* eslint-disable @typescript-eslint/unbound-method */
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";
import type AircraftModel from "../model/AircraftModel";
import {
	changeBearingOfAircraft,
	handlePublishPromise,
	persistACCBearing,
} from "../mqtt-client/publishers";
import { configurationStore, cwpStore } from "../state";
import { PopupCommunicationButtons } from "./shared/CommunicationButtons";

/** Normalize bearing to 5-360 range (wrapping at 360) */
function normalizeBearing(bearing: number): number {
	// First normalize to 0-359 range, then shift to 5-360
	const mod = ((bearing % 360) + 360) % 360;
	return mod === 0 ? 360 : mod;
}

function QuickAdjustColumn(properties: {
	offsets: number[];
	onApply: (offset: number) => void;
	side: "left" | "right";
}) {
	const { offsets, onApply, side } = properties;
	const isLeft = side === "left";

	return (
		<div className="flex flex-col justify-center gap-1.5 px-2">
			{offsets.map((offset) => (
				<button
					key={offset}
					onClick={() => onApply(offset)}
					className="
						btn btn-xs btn-primary
					"
					title={`${isLeft ? "" : "+"}${offset}°`}
				>
					{isLeft ? offset : `+${offset}`}
				</button>
			))}
		</div>
	);
}

function ListOfBearings(properties: {
	value: number;
	onClick: (bearing: number) => void;
	currentBearing: number;
}) {
	const { value, onClick, currentBearing } = properties;
	const rows = [];

	// Generate bearings from 360 down to 5 in steps of 5
	for (let bearing = 360; bearing >= 5; bearing -= 5) {
		const isSelected = bearing === value;
		const isCurrent = bearing === currentBearing;

		rows.push(
			<button
				key={bearing}
				onClick={(): void => onClick(bearing)}
				className={`
					block px-0 py-1 text-xs text-center
					bg-[#1e3a5f] text-white
					hover:bg-[#4b90db]
					border-none outline-none
					${isCurrent ? "font-bold" : ""}
				`}
				data-bearing={bearing}
			>
				{isSelected ? (
					<>
						<span>&gt;</span>&nbsp;{bearing.toString().padStart(3, "0")}&nbsp;
						<span>&lt;</span>
					</>
				) : (
					bearing.toString().padStart(3, "0")
				)}
			</button>,
		);
	}

	return <>{rows}</>;
}

export default observer(function ChangeBearingPopup(properties: {
	aircraft: AircraftModel;
}) {
	const posthog = usePostHog();
	const {
		aircraftId,
		assignedFlightId,
		controlledBy,
		setAssignedBearing,
		callSign,
		lastKnownBearing,
		assignedBearing,
	} = properties.aircraft;

	// Round current bearing to nearest 5 degrees for default selection
	const currentBearingRounded = Math.round(lastKnownBearing / 5) * 5 || 360;
	const getDefaultBearing = (): number => {
		if (assignedBearing && assignedBearing > 0) {
			return Math.round(assignedBearing / 5) * 5 || 360;
		}
		return currentBearingRounded;
	};
	const defaultBearing = getDefaultBearing();

	const [bearing, setBearing] = React.useState(defaultBearing);
	const listOfBearingsReference = React.createRef<HTMLDivElement>();
	const shouldShow = cwpStore.aircraftsWithBearingPopup.has(aircraftId);

	// Reset bearing to default when popup opens
	React.useEffect(() => {
		if (shouldShow) {
			setBearing(defaultBearing);
		}
	}, [shouldShow, defaultBearing]);

	React.useEffect(() => {
		// Scroll to the bearing in the list
		const container = listOfBearingsReference.current;
		if (!container) {
			return;
		}

		const listElement = ([...container.children] as HTMLButtonElement[]).find(
			(element) => element.dataset.bearing === `${bearing}`,
		);

		if (listElement) {
			const containerRect = container.getBoundingClientRect();
			const elementRect = listElement.getBoundingClientRect();
			const elementTopRelativeToContainer =
				elementRect.top - containerRect.top + container.scrollTop;
			container.scrollTop =
				elementTopRelativeToContainer -
				container.clientHeight / 2 +
				listElement.offsetHeight / 2;
		}
	}, [bearing, shouldShow]);

	const { currentCWP } = configurationStore;
	const accepted = controlledBy === currentCWP;

	if (!shouldShow) {
		return null;
	}

	const bearingStep = 5;
	const bearingMin = 5;
	const bearingMax = 360;

	const BearingChange = (direction: "up" | "down"): void => {
		let newValue: number;
		if (direction === "up") {
			newValue = bearing + bearingStep;
			if (newValue > bearingMax) {
				newValue = bearingMin;
			}
		} else {
			newValue = bearing - bearingStep;
			if (newValue < bearingMin) {
				newValue = bearingMax;
			}
		}
		setBearing(newValue);
	};

	const close = (): void => {
		cwpStore.clearTaRequestCallback();
		cwpStore.closeChangeBearingForAircraft(aircraftId);
		posthog?.capture("bearing_popup_closed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			action: "cancelled",
		});
	};

	const applyBearing = (newBearing: number): void => {
		// If TA request callback is set, call it instead of normal behavior
		if (cwpStore.taRequestCallback) {
			cwpStore.taRequestCallback(newBearing.toString());
			cwpStore.clearTaRequestCallback();
			cwpStore.closeChangeBearingForAircraft(aircraftId);
			return;
		}

		setAssignedBearing(newBearing);
		const pilotId = currentCWP === "All" ? "All" : controlledBy;

		posthog?.capture("bearing_changed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			previous_bearing: lastKnownBearing,
			new_bearing: newBearing,
			bearing_change: newBearing - lastKnownBearing,
			controlled_by: controlledBy,
			pilot_id: pilotId,
		});

		handlePublishPromise(
			changeBearingOfAircraft(pilotId, assignedFlightId, newBearing),
		);
		handlePublishPromise(persistACCBearing(aircraftId, newBearing));
		cwpStore.closeChangeBearingForAircraft(aircraftId);
	};

	const handleBearingClick = (clickedBearing: number): void => {
		// In TA request mode, always apply (even if clicking default bearing)
		if (cwpStore.taRequestCallback) {
			applyBearing(clickedBearing);
			return;
		}
		if (clickedBearing === defaultBearing) {
			// If clicking on the default bearing (no change), just close the popup
			close();
		} else {
			// Otherwise, apply immediately
			applyBearing(clickedBearing);
		}
	};

	const submit = (): void => {
		applyBearing(bearing);
	};

	const isTaRequestMode = !!cwpStore.taRequestCallback;

	const leftOffsets = [-5, -10, -15, -20, -30];
	const rightOffsets = [5, 10, 15, 20, 30];

	const handleQuickAdjust = (offset: number): void => {
		const newBearing = normalizeBearing(currentBearingRounded + offset);
		applyBearing(newBearing);
	};

	return (
		<div
			className={`
			bg-[#0d1f30] p-0 shadow-lg
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
			<div className="flex">
				{/* Left quick-adjust column */}
				<QuickAdjustColumn
					offsets={leftOffsets}
					onApply={handleQuickAdjust}
					side="left"
				/>

				{/* Center bearing selector */}
				<div className="flex flex-col bg-[#1e3a5f] w-16">
					<button
						onClick={(): void => BearingChange("up")}
						className="btn btn-ghost btn-xs text-xs"
					>
						▲
					</button>
					<div
						className="h-40 overflow-y-scroll scrollbar-hide bg-[#1e3a5f] flex flex-col"
						ref={listOfBearingsReference}
					>
						<ListOfBearings
							value={bearing}
							onClick={handleBearingClick}
							currentBearing={currentBearingRounded}
						/>
					</div>
					<button
						onClick={(): void => BearingChange("down")}
						className="btn btn-ghost btn-xs text-xs"
					>
						▼
					</button>
				</div>

				{/* Right quick-adjust column */}
				<QuickAdjustColumn
					offsets={rightOffsets}
					onApply={handleQuickAdjust}
					side="right"
				/>
			</div>
			<PopupCommunicationButtons
				hasCPDLC={properties.aircraft.hasCPDLC}
				onSubmit={submit}
				onClose={close}
			/>
		</div>
	);
});
