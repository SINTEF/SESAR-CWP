import { observer } from "mobx-react-lite";
import React from "react";

import { isDragging } from "../draggableState";
import {
	acceptFlight,
	handlePublishPromise,
	persistHiddenAircraft,
} from "../mqtt/publishers";
import { aircraftStore, configurationStore, cwpStore } from "../state";
import {
	Altitude,
	LocalAssignedFlightLevel,
	NextACCFlightLevel,
	NextSectorController,
	NextSectorFL,
} from "./AircraftPopupContent";
import type AircraftModel from "../model/AircraftModel";

type SubContentProperties = {
	aircraft: AircraftModel;
	colSpan?: number;
	flightColor?: string;
};

const CallSign = observer(
	({ aircraft, colSpan }: SubContentProperties): JSX.Element => {
		const { callSign } = aircraft;
		const setController = (): void => {
			if (isDragging()) {
				return;
			}
			const { aircraftId, controlledBy, assignedFlightId } = aircraft;
			aircraftStore.aircrafts
				.get(aircraftId)
				?.setController(configurationStore.currentCWP);
			handlePublishPromise(
				acceptFlight(
					controlledBy,
					configurationStore.currentCWP,
					assignedFlightId,
				),
			);
		};
		return (
			<td onClick={setController} colSpan={colSpan}>
				{callSign}
			</td>
		);
	},
);

const Bearing = observer(({ aircraft }: SubContentProperties): JSX.Element => {
	const onClick = (): void => {
		if (isDragging()) {
			return;
		}
		cwpStore.openChangeBearingForAircraft(aircraft.aircraftId);
	};

	let displayedBearing = Math.round(aircraft.lastKnownBearing) % 360;
	if (displayedBearing < 1) {
		displayedBearing = 360;
	}

	return (
		<td onClick={onClick}>H{displayedBearing.toString().padStart(3, "0")}</td>
	);
});

const SpeedAndWakeTurbulenceLabel = observer(
	({ aircraft }: SubContentProperties): JSX.Element => {
		const handleSpeedClick = (event: React.MouseEvent<HTMLElement>): void => {
			if (event.button === 1) {
				cwpStore.openChangeSpeedForAircraft(aircraft.aircraftId);
			}
		};
		const onClick = (): void => {
			if (isDragging()) {
				return;
			}
			cwpStore.toggleSpeedVectorForAircraft(aircraft.aircraftId);
		};

		return (
			<td onMouseDown={handleSpeedClick} onClick={onClick}>
				{aircraft.speedAndWakeTurbulenceLabel}
			</td>
		);
	},
);

const NextFix = observer(({ aircraft }: SubContentProperties): JSX.Element => {
	const middleClickNextWaypoint = (
		event: React.MouseEvent<HTMLElement>,
	): void => {
		if (event.button === 1) {
			cwpStore.toggleFlightRouteForAircraft(aircraft.aircraftId);
		}
	};

	const onClick = (): void => {
		if (isDragging()) {
			return;
		}
		cwpStore.openChangeNextFixForAircraft(aircraft.aircraftId);
	};
	const { nextFix, assignedBearing } = aircraft;
	const showNextFix = assignedBearing === -1 || assignedBearing === undefined;

	return (
		<td onMouseDown={middleClickNextWaypoint} onClick={onClick}>
			{showNextFix ? nextFix : "--"}
		</td>
	);
});

const _AssignedBearing = observer(
	({ aircraft }: SubContentProperties): JSX.Element => (
		<td>
			{aircraft.assignedBearing === -1 || aircraft.assignedBearing === undefined
				? "BEG.S"
				: `${aircraft.assignedBearing}`}
		</td>
	),
);

const AssignedFlightLevel = observer(
	({ aircraft }: SubContentProperties): JSX.Element => {
		const onClick = (): void => {
			if (isDragging()) {
				return;
			}
			cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);
		};

		return <td onClick={onClick}>{aircraft.assignedFlightLevel}</td>;
	},
);

const AssignedSpeed = observer(
	({ aircraft }: SubContentProperties): JSX.Element => (
		<td>
			{aircraft.assignedSpeed === -1 || aircraft.assignedSpeed === undefined
				? "S.S"
				: aircraft.assignedSpeed}
		</td>
	),
);

const _HideAircraft = observer(
	({ aircraft }: SubContentProperties): JSX.Element => {
		const [confirm, setConfirm] = React.useState(false);
		const [doubleConfirm, setDoubleConfirm] = React.useState(false);
		const [timer, setTimer] = React.useState(-1);
		const [timerTimeoutId, setTimerTimeoutId] = React.useState(0);
		const [timerIntervalId, setTimerIntervalId] = React.useState(0);

		React.useEffect(() => {
			if (timerTimeoutId !== 0) {
				window.clearTimeout(timerTimeoutId);
				setTimerTimeoutId(0);
			}
			if (timerIntervalId !== 0) {
				window.clearInterval(timerIntervalId);
				setTimerIntervalId(0);
			}
			if (confirm) {
				const id = window.setTimeout(() => {
					setConfirm(false);
					setTimerTimeoutId(0);
				}, 5000);
				setTimerTimeoutId(id);
			}
		}, [confirm]);

		React.useEffect(() => {
			if (timerTimeoutId !== 0) {
				window.clearTimeout(timerTimeoutId);
				setTimerTimeoutId(0);
			}
			if (timerIntervalId !== 0) {
				window.clearInterval(timerIntervalId);
				setTimerIntervalId(0);
			}
			if (doubleConfirm) {
				setTimer(5);
				const id = window.setInterval(() => {
					setTimer((t) => t - 1);
				}, 1000);
				setTimerIntervalId(id);
			} else {
				setTimer(-1);
				const id = window.setTimeout(() => {
					setConfirm(false);
					setTimerTimeoutId(0);
				}, 5000);
				setTimerTimeoutId(id);
			}
		}, [doubleConfirm]);

		React.useEffect(() => {
			if (timer === 0) {
				handlePublishPromise(persistHiddenAircraft(aircraft.assignedFlightId));
				setTimer(-1);
				setConfirm(false);
				setDoubleConfirm(false);
				window.clearInterval(timerIntervalId);
				setTimerIntervalId(0);
			}
		}, [timer]);

		if (confirm) {
			return (
				<>
					<input
						type="checkbox"
						className="toggle toggle-sm"
						checked={doubleConfirm}
						onChange={(event): void => setDoubleConfirm(event.target.checked)}
						id="hide-switch"
					/>
					{timer < 0 ? null : <strong style={{ color: "red" }}>{timer}</strong>}
				</>
			);
		}
		return <div onClick={(): void => setConfirm(true)}>DEL</div>;
	},
);

export default observer(function AircraftPopupPseudoContent({
	aircraft,
	flightColor,
}: SubContentProperties): JSX.Element {
	// const isMaster = configurationStore.currentCWP === "All";
	return (
		<table className="border-spacing-0 w-full max-w-full">
			<tbody style={{ color: flightColor }}>
				<tr>
					<td>{aircraft.lastKnownSpeed}</td>
				</tr>
				<tr>
					<CallSign aircraft={aircraft} colSpan={1} />
					<SpeedAndWakeTurbulenceLabel aircraft={aircraft} />
					<Bearing aircraft={aircraft} />
					{/* <AssignedSpeed aircraft={aircraft} /> */}
					{/* <td>{isMaster && <HideAircraft aircraft={aircraft} />}</td> */}
				</tr>
				<tr>
					<Altitude aircraft={aircraft} />
					<NextFix aircraft={aircraft} />
					<AssignedFlightLevel aircraft={aircraft} />
				</tr>
				<tr>
					<SpeedAndWakeTurbulenceLabel aircraft={aircraft} />
					<NextSectorFL aircraft={aircraft} />
					<AssignedSpeed aircraft={aircraft} />
				</tr>
				{/* <tr>
					<NextSectorController aircraft={aircraft} />
					<LocalAssignedFlightLevel aircraft={aircraft} />
					<NextACCFlightLevel aircraft={aircraft} />
				</tr> */}
			</tbody>
		</table>
	);
});
