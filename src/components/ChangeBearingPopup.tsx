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

	const { currentCWP } = configurationStore;
	const accepted = controlledBy === currentCWP;

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

	return (
		<div
			className={`
			w-20 bg-[#0d1f30] p-0 shadow-lg
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
			<div className="flex flex-col bg-[#1e3a5f]">
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
			<div className="flex gap-0.5 mt-1">
				<button
					onClick={close}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					Cancel
				</button>
				<button
					onClick={submit}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					Apply
				</button>
			</div>
		</div>
	);
});
