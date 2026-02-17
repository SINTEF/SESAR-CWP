import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";
import type AircraftModel from "../model/AircraftModel";
import type { SpeedChangeDisplayUnit } from "../model/CwpStore";
import {
	changeSpeedOfAircraft,
	handlePublishPromise,
	persistSpeedAircraft,
} from "../mqtt-client/publishers";
import { configurationStore, cwpStore } from "../state";

const METERS_PER_SECOND_TO_DECIKNOT = 0.194_384;
const DECIKNOT_TO_METERS_PER_SECOND = 1 / 0.194_384;
const KNOTS_PER_MACH = 661.47;
const METERS_PER_SECOND_TO_MACH = 1.943_84 / KNOTS_PER_MACH;
const MACH_TO_METERS_PER_SECOND = 1 / METERS_PER_SECOND_TO_MACH;

const MIN_KTM_SPEED = 20; // 200 kt
const MAX_KTM_SPEED = 60; // 600 kt
const MIN_MTN_SPEED = 30; // .30 Mach
const MAX_MTN_SPEED = 90; // .90 Mach

function clampSpeedForUnit(
	value: number,
	unit: SpeedChangeDisplayUnit,
): number {
	if (unit === "MTN") {
		return Math.max(MIN_MTN_SPEED, Math.min(MAX_MTN_SPEED, value));
	}

	return Math.max(MIN_KTM_SPEED, Math.min(MAX_KTM_SPEED, value));
}

function toDisplaySpeed(
	valueInMetersPerSecond: number,
	unit: SpeedChangeDisplayUnit,
): number {
	if (unit === "MTN") {
		return clampSpeedForUnit(
			Math.round(valueInMetersPerSecond * METERS_PER_SECOND_TO_MACH * 100),
			unit,
		);
	}

	return clampSpeedForUnit(
		Math.round(valueInMetersPerSecond * METERS_PER_SECOND_TO_DECIKNOT),
		unit,
	);
}

function fromDisplaySpeed(value: number, unit: SpeedChangeDisplayUnit): number {
	const clampedValue = clampSpeedForUnit(value, unit);

	if (unit === "MTN") {
		const mach = clampedValue / 100;
		return mach * MACH_TO_METERS_PER_SECOND;
	}

	return clampedValue * DECIKNOT_TO_METERS_PER_SECOND;
}

function formatDisplaySpeed(
	value: number,
	unit: SpeedChangeDisplayUnit,
): string {
	if (unit === "MTN") {
		return `.${value.toString().padStart(2, "0")}`;
	}

	return `${value}`;
}

function getAllDisplaySpeeds(unit: SpeedChangeDisplayUnit): number[] {
	const speeds: number[] = [];
	const maxSpeed = unit === "MTN" ? MAX_MTN_SPEED : MAX_KTM_SPEED;
	const minSpeed = unit === "MTN" ? MIN_MTN_SPEED : MIN_KTM_SPEED;

	for (let speed = maxSpeed; speed >= minSpeed; speed -= 1) {
		speeds.push(speed);
	}
	return speeds;
}

function ListOfSpeeds(properties: {
	selectedSpeed: number;
	currentSpeed: number;
	unit: SpeedChangeDisplayUnit;
	onClick: (speed: number) => void;
}) {
	const { selectedSpeed, currentSpeed, unit, onClick } = properties;

	return (
		<>
			{getAllDisplaySpeeds(unit).map((speed) => {
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
								<span>&gt;</span>&nbsp;
								{formatDisplaySpeed(speed, unit)}
								&nbsp;<span>&lt;</span>
							</>
						) : (
							formatDisplaySpeed(speed, unit)
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

	const speedDisplayUnit = cwpStore.speedChangeDisplayUnit;

	const defaultSelectedSpeedMetersPerSecond =
		typeof assignedSpeed === "number" && assignedSpeed >= 0
			? assignedSpeed
			: lastKnownSpeed;
	const [selectedSpeedMetersPerSecond, setSelectedSpeedMetersPerSecond] =
		React.useState(defaultSelectedSpeedMetersPerSecond);

	const currentSpeedDisplay = toDisplaySpeed(lastKnownSpeed, speedDisplayUnit);
	const selectedSpeedDisplay = toDisplaySpeed(
		selectedSpeedMetersPerSecond,
		speedDisplayUnit,
	);
	const listReference = React.useRef<HTMLDivElement>(null);

	const shouldShow = cwpStore.aircraftWithSpeedChangePopup.has(aircraftId);

	React.useEffect(() => {
		if (shouldShow) {
			setSelectedSpeedMetersPerSecond(defaultSelectedSpeedMetersPerSecond);
			posthog?.capture("speed_popup_opened", {
				haircraft_id: aircraftId,
				callsign: callSign,
				current_speed: lastKnownSpeed,
				assigned_speed: assignedSpeed,
			});
		}
	}, [
		shouldShow,
		defaultSelectedSpeedMetersPerSecond,
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

	const applySpeed = (nextSpeedMetersPerSecond: number): void => {
		const speedMetersPerSecond = Math.max(
			MIN_KTM_SPEED * DECIKNOT_TO_METERS_PER_SECOND,
			Math.min(
				MAX_KTM_SPEED * DECIKNOT_TO_METERS_PER_SECOND,
				nextSpeedMetersPerSecond,
			),
		);
		const speedKnots = speedMetersPerSecond * 1.943_84;
		const displaySpeed = toDisplaySpeed(speedMetersPerSecond, speedDisplayUnit);

		setAssignedSpeed(Math.round(speedMetersPerSecond));
		const pilotId =
			configurationStore.currentCWP === "All" ? "All" : controlledBy;

		posthog?.capture("speed_changed", {
			haircraft_id: aircraftId,
			callsign: callSign,
			previous_speed: lastKnownSpeed,
			new_speed: speedMetersPerSecond,
			new_speed_knots: speedKnots,
			display_speed: displaySpeed,
			display_unit: speedDisplayUnit,
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
		setSelectedSpeedMetersPerSecond((value) => {
			const currentDisplaySpeed = toDisplaySpeed(value, speedDisplayUnit);
			const nextDisplaySpeed = clampSpeedForUnit(
				currentDisplaySpeed + delta,
				speedDisplayUnit,
			);
			return fromDisplaySpeed(nextDisplaySpeed, speedDisplayUnit);
		});
	};

	const handleSpeedClick = (clickedSpeed: number): void => {
		if (clickedSpeed === currentSpeedDisplay) {
			close();
			return;
		}

		applySpeed(fromDisplaySpeed(clickedSpeed, speedDisplayUnit));
	};

	const submit = (): void => {
		applySpeed(selectedSpeedMetersPerSecond);
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
						unit={speedDisplayUnit}
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
					onClick={(): void => cwpStore.setSpeedChangeDisplayUnit("MTN")}
					className={`btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2 ${
						speedDisplayUnit === "MTN" ? "bg-[#4b90db] text-white" : ""
					}`}
				>
					MTN
				</button>
				<button
					type="button"
					onClick={(): void => cwpStore.setSpeedChangeDisplayUnit("KT/M")}
					className={`btn btn-sm btn-outline grow h-8 text-xs px-0 rounded-none border-2 ${
						speedDisplayUnit === "KT/M" ? "bg-[#4b90db] text-white" : ""
					}`}
				>
					KT/M
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
