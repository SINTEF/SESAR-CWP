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
	} = properties.aircraft;

	const [newSpeed, setNewSpeed] = React.useState("");

	const shouldShow = cwpStore.aircraftWithSpeedChangePopup.has(aircraftId);
	if (!shouldShow) {
		return null;
	}

	const close = (): void => {
		cwpStore.closeChangeSpeedForAircraft(aircraftId);
		posthog?.capture("speed_popup_closed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			action: "cancelled",
		});
	};

	const submit = (): void => {
		const newSpeedNumber = Math.max(
			Math.min(Number.parseInt(newSpeed, 10), 9999),
			0,
		);
		if (Number.isNaN(newSpeed)) {
			return;
		}
		const speedNumberKnots = newSpeedNumber * 1.943_84;
		setAssignedSpeed(newSpeedNumber);
		const pilotId =
			configurationStore.currentCWP === "All" ? "All" : controlledBy;

		posthog?.capture("speed_changed", {
			aircraft_id: aircraftId,
			callsign: callSign,
			previous_speed: lastKnownSpeed,
			new_speed: newSpeedNumber,
			new_speed_knots: speedNumberKnots,
			speed_change: newSpeedNumber - lastKnownSpeed,
			controlled_by: controlledBy,
			pilot_id: pilotId,
		});

		handlePublishPromise(
			changeSpeedOfAircraft(pilotId, assignedFlightId, speedNumberKnots),
		);
		handlePublishPromise(
			persistSpeedAircraft(assignedFlightId, speedNumberKnots),
		);
		close();
	};

	return (
		<div className="bg-gray-700/50 rounded-sm p-1 w-[110px] relative">
			<form
				onSubmit={(event): void => {
					event.preventDefault();
					submit();
				}}
			>
				<div className="text-sm mb-2">New Speed:</div>
				<input
					className="input input-bordered input-xs bg-transparent text-white w-[6.2em]"
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					value={newSpeed}
					onChange={(event): void => setNewSpeed(event.target.value)}
				/>
			</form>
			<div className="flex gap-0.5 mt-1 justify-between">
				<button
					onClick={close}
					className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2"
				>
					Cancel
				</button>
				<button
					onClick={submit}
					className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2"
				>
					Submit
				</button>
			</div>
		</div>
	);
});
