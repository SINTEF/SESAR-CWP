import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";
import type AircraftModel from "../model/AircraftModel";
import {
	changeSpeedOfAircraft,
	handlePublishPromise,
	persistSpeedAircraft,
} from "../mqtt-client/publishers";
import { configurationStore, cwpStore } from "../state";
import { formatSpeed } from "../utils";

// formatSpeed() displays speed as deci-knots (e.g. 45 => 450 kt)
// because it rounds m/s * 0.194384.
const DECIKNOT_TO_METERS_PER_SECOND = 1 / 0.194_384;
const MIN_DISPLAY_SPEED = 20; // 200 kt
const MAX_DISPLAY_SPEED = 60; // 600 kt

function clampDisplaySpeed(value: number): number {
	return Math.max(MIN_DISPLAY_SPEED, Math.min(MAX_DISPLAY_SPEED, value));
}

function toDisplaySpeed(valueInMetersPerSecond: number): number {
	return clampDisplaySpeed(
		Number.parseInt(formatSpeed(valueInMetersPerSecond), 10),
	);
}

function getAllDisplaySpeeds(): number[] {
	const speeds: number[] = [];
	for (let speed = MAX_DISPLAY_SPEED; speed >= MIN_DISPLAY_SPEED; speed -= 1) {
		speeds.push(speed);
	}
	return speeds;
}

function ListOfSpeeds(properties: {
	selectedSpeed: number;
	currentSpeed: number;
	onClick: (speed: number) => void;
}) {
	const { selectedSpeed, currentSpeed, onClick } = properties;

	return (
		<>
			{getAllDisplaySpeeds().map((speed) => {
				const isSelected = speed === selectedSpeed;
				const isCurrent = speed === currentSpeed;

				return (
					<button
						key={speed}
						type="button"
						onClick={(): void => onClick(speed)}
						data-speed={speed}
						className={`
							block w-full px-1 py-1 text-xs text-center
							bg-[#1e3a5f] text-white
							hover:bg-[#4b90db]
							border-none outline-none
							${isCurrent ? "font-bold" : ""}
						`}
					>
						{isSelected ? (
							<>
								<span>&gt;</span>&nbsp;{speed}&nbsp;<span>&lt;</span>
							</>
						) : (
							speed
						)}
					</button>
				);
			})}
		</>
	);
}

export default observer(function ChangeSpeedPopup(properties: {
	aircraft: AircraftModel;
}) {
	const posthog = usePostHog();
	const {
		aircraftId,
		assignedFlightId,
		controlledBy,
		setAssignedSpeed,
		callSign,
		lastKnownSpeed,
		assignedSpeed,
	} = properties.aircraft;

	const currentSpeedDisplay = toDisplaySpeed(lastKnownSpeed);
	const defaultSpeedDisplay =
		typeof assignedSpeed === "number" && assignedSpeed >= 0
			? toDisplaySpeed(assignedSpeed)
			: currentSpeedDisplay;
	const [selectedSpeedDisplay, setSelectedSpeedDisplay] =
		React.useState(defaultSpeedDisplay);
	const listReference = React.useRef<HTMLDivElement>(null);

	const shouldShow = cwpStore.aircraftWithSpeedChangePopup.has(aircraftId);

	React.useEffect(() => {
		if (shouldShow) {
			setSelectedSpeedDisplay(defaultSpeedDisplay);
			posthog?.capture("speed_popup_opened", {
				haircraft_id: aircraftId,
				callsign: callSign,
				current_speed: lastKnownSpeed,
				assigned_speed: assignedSpeed,
			});
		}
	}, [
		shouldShow,
		defaultSpeedDisplay,
		posthog,
		aircraftId,
		callSign,
		lastKnownSpeed,
		assignedSpeed,
	]);

	React.useEffect(() => {
		const container = listReference.current;
		if (!container || !shouldShow) {
			return;
		}

		const selectedElement = (
			[...container.children] as HTMLButtonElement[]
		).find((element) => element.dataset.speed === `${selectedSpeedDisplay}`);

		if (!selectedElement) {
			return;
		}

		const containerRect = container.getBoundingClientRect();
		const elementRect = selectedElement.getBoundingClientRect();
		const elementTopRelativeToContainer =
			elementRect.top - containerRect.top + container.scrollTop;

		container.scrollTop =
			elementTopRelativeToContainer -
			container.clientHeight / 2 +
			selectedElement.offsetHeight / 2;
	}, [selectedSpeedDisplay, shouldShow]);

	if (!shouldShow) {
		return null;
	}

	const close = (): void => {
		cwpStore.closeChangeSpeedForAircraft(aircraftId);
		posthog?.capture("speed_popup_closed", {
			haircraft_id: aircraftId,
			callsign: callSign,
			action: "cancelled",
		});
	};

	const applySpeed = (nextDisplaySpeed: number): void => {
		const clampedDisplaySpeed = clampDisplaySpeed(nextDisplaySpeed);
		const speedMetersPerSecond =
			clampedDisplaySpeed * DECIKNOT_TO_METERS_PER_SECOND;
		const speedKnots = speedMetersPerSecond * 1.943_84;

		setAssignedSpeed(Math.round(speedMetersPerSecond));
		const pilotId =
			configurationStore.currentCWP === "All" ? "All" : controlledBy;

		posthog?.capture("speed_changed", {
			haircraft_id: aircraftId,
			callsign: callSign,
			previous_speed: lastKnownSpeed,
			new_speed: speedMetersPerSecond,
			new_speed_knots: speedKnots,
			display_speed: clampedDisplaySpeed,
			speed_change: speedMetersPerSecond - lastKnownSpeed,
			controlled_by: controlledBy,
			pilot_id: pilotId,
		});

		handlePublishPromise(
			changeSpeedOfAircraft(pilotId, assignedFlightId, speedMetersPerSecond),
		);
		handlePublishPromise(
			persistSpeedAircraft(assignedFlightId, speedMetersPerSecond),
		);

		close();
	};

	const changeSpeed = (direction: "up" | "down"): void => {
		const delta = direction === "up" ? 1 : -1;
		setSelectedSpeedDisplay((value) => clampDisplaySpeed(value + delta));
	};

	const handleSpeedClick = (clickedSpeed: number): void => {
		if (clickedSpeed === currentSpeedDisplay) {
			close();
			return;
		}

		applySpeed(clickedSpeed);
	};

	const submit = (): void => {
		applySpeed(selectedSpeedDisplay);
	};

	return (
		<div
			className="w-20 bg-[#1e3a5f] p-0 shadow-lg"
			style={{ borderRadius: 0 }}
		>
			<div className="text-center font-bold text-xs py-1 bg-black text-white">
				{callSign}
			</div>
			<div className="text-center text-xs py-1 bg-gray-700/50">Speed</div>
			<div className="flex flex-col">
				<button
					type="button"
					onClick={(): void => changeSpeed("up")}
					className="btn btn-ghost btn-xs text-xs"
				>
					▲
				</button>
				<div
					className="h-32 overflow-y-scroll scrollbar-hide bg-[#1e3a5f] flex flex-col"
					ref={listReference}
				>
					<ListOfSpeeds
						selectedSpeed={selectedSpeedDisplay}
						currentSpeed={currentSpeedDisplay}
						onClick={handleSpeedClick}
					/>
				</div>
				<button
					type="button"
					onClick={(): void => changeSpeed("down")}
					className="btn btn-ghost btn-xs text-xs"
				>
					▼
				</button>
			</div>
			<div className="flex gap-0.5 mt-1">
				<button
					type="button"
					onClick={close}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={submit}
					className="btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2"
				>
					Apply
				</button>
			</div>
		</div>
	);
});
