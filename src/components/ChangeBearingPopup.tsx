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

function RelativeBearingColumn(properties: {
	values: number[];
	onClickRelative: (delta: number) => void;
}) {
	const { values, onClickRelative } = properties;
	return (
		<div className="flex flex-col justify-center gap-0.5 bg-[#2a5a8f] p-1">
			{values.map((delta) => (
				<button
					key={delta}
					onClick={(): void => onClickRelative(delta)}
					className="px-2 py-1 text-xs text-center bg-[#3a6a9f] text-white hover:bg-[#4b90db] border-none outline-none"
				>
					{delta > 0 ? `+${delta}` : delta}
				</button>
			))}
		</div>
	);
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
		cwpStore.closeChangeBearingForAircraft(aircraftId);
		posthog?.capture("bearing_popup_closed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			action: "cancelled",
		});
	};

	const applyBearing = (newBearing: number): void => {
		setAssignedBearing(newBearing);
		const pilotId = currentCWP === "All" ? "All" : controlledBy;
	const applyBearing = (newBearing: number): void => {
		setAssignedBearing(newBearing);
		const pilotId = currentCWP === "All" ? "All" : controlledBy;

		posthog?.capture("bearing_changed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			previous_bearing: lastKnownBearing,
			new_bearing: newBearing,
			bearing_change: newBearing - lastKnownBearing,
			new_bearing: newBearing,
			bearing_change: newBearing - lastKnownBearing,
			controlled_by: controlledBy,
			pilot_id: pilotId,
		});

		handlePublishPromise(
			changeBearingOfAircraft(pilotId, assignedFlightId, newBearing),
			changeBearingOfAircraft(pilotId, assignedFlightId, newBearing),
		);
		handlePublishPromise(persistACCBearing(aircraftId, newBearing));
		cwpStore.closeChangeBearingForAircraft(aircraftId);
	};

	const handleBearingClick = (clickedBearing: number): void => {
		if (clickedBearing === defaultBearing) {
			// If clicking on the default bearing (no change), just close the popup
			close();
		} else {
			// Otherwise, apply immediately
			applyBearing(clickedBearing);
		}
	};

	const handleRelativeBearingClick = (delta: number): void => {
		// Calculate new bearing based on current bearing + delta
		let newBearing = (currentBearingRounded + delta) % 360;
		if (newBearing <= 0) {
			newBearing += 360;
		}
		applyBearing(newBearing);
	};

	const submit = (): void => {
		applyBearing(bearing);
	};

	// Relative bearing values for left and right columns
	const negativeDeltaValues = [-5, -10, -15, -20, -25, -30];
	const positiveDeltaValues = [5, 10, 15, 20, 25, 30];

	return (
		<div
			className={`
			bg-[#0d1f30] p-1 shadow-lg
			${accepted ? "border-2 border-green-400" : ""}
		`}
			style={{ borderRadius: 0 }}
		>
			<div className="text-center font-bold text-xs py-1 bg-black text-white">
				{callSign}
			</div>
			<div className="flex flex-row gap-1 justify-center items-center mt-1">
				{/* Left column: negative relative changes */}
				<RelativeBearingColumn
					values={negativeDeltaValues}
					onClickRelative={handleRelativeBearingClick}
				/>
				{/* Center: absolute bearing list */}
				<div className="flex flex-col bg-[#1e3a5f] p-1">
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
				{/* Right column: positive relative changes */}
				<RelativeBearingColumn
					values={positiveDeltaValues}
					onClickRelative={handleRelativeBearingClick}
				/>
			</div>
			<div className="flex gap-0.5 mt-1">
				<button
					onClick={close}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					Cancel
				</button>
				<button
					onClick={submit}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					Apply
					Apply
				</button>
			</div>
		</div>
	);
});
