import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";

import type AircraftModel from "../model/AircraftModel";
import { cwpStore, roleConfigurationStore } from "../state";
import { convertMetersToFlightLevel } from "../utils";
import {
	Altitude,
	CallSign,
	NextSectorFL,
	WarningIcon,
} from "./AircraftContentSmall";

type SubContentProperties = {
	aircraft: AircraftModel;
	colSpan?: number;
};

export const AssignedBearing = observer(
	({ aircraft }: SubContentProperties) => {
		const { assignedBearing /* aircraftId */ } = aircraft;

		if (assignedBearing === -1 || assignedBearing === undefined) {
			return <td>h...</td>;
		}

		let displayedBearing = Math.round(assignedBearing) % 360;
		if (displayedBearing < 1) {
			displayedBearing = 360;
		}

		return <td>{`${displayedBearing.toString().padStart(3, "0")}`}</td>;
	},
);

const NextFix = observer(({ aircraft }: SubContentProperties) => {
	const posthog = usePostHog();
	const middleClickNextWaypoint = (
		_event: React.MouseEvent<HTMLElement>,
	): void => {
		// if (event.button === 1) {
		cwpStore.toggleFlightRouteForAircraft(aircraft.aircraftId);
		posthog?.capture("next_fix_clicked", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			next_fix: aircraft.nextFix,
			flight_route_visible: cwpStore.aircraftsWithFlightRoutes.has(
				aircraft.aircraftId,
			),
		});
		// }
	};

	const { nextFix, assignedBearing } = aircraft;
	const showNextFix = assignedBearing === -1 || assignedBearing === undefined;

	return (
		<td onMouseDown={middleClickNextWaypoint}>
			{showNextFix ? nextFix : "--"}
		</td>
	);
});

function formatSpeed(speed: number): string {
	// convert from m/s to knots / 10
	const lowImperialishSpeed = speed * 0.194384;
	return Math.round(lowImperialishSpeed).toString();
}

function formatVerticalSpeed(verticalSpeed: number): string {
	// convert from m/s to ft/min and divide by 100
	const verticalSpeedFpm = Math.round(verticalSpeed * 1.96850394);
	if (verticalSpeedFpm === 0) {
		return "00";
	}
	const speedString = Math.abs(verticalSpeedFpm).toString().padStart(2, "0");
	return verticalSpeedFpm > 0 ? `+${speedString}` : `-${speedString}`;
}

export default observer(function AircraftPopupContent(properties: {
	aircraft: AircraftModel;
	flightColor: string;
}) {
	const { aircraft, flightColor } = properties;
	const currentSector = roleConfigurationStore.currentControlledSector;
	const { lastKnownSpeed, lastKnownVerticalSpeed, aircraftType, nextSector } =
		aircraft;
	return (
		<div style={{ color: flightColor }}>
			{/* Line 0 */}
			<div>
				<span>{formatSpeed(lastKnownSpeed)}</span>{" "}
				<span>{formatVerticalSpeed(lastKnownVerticalSpeed)}</span>{" "}
				<span>{aircraftType}</span>
			</div>
			{/* Line 1 */}
			<div>
				<CallSign flightColor={flightColor} aircraft={aircraft} />{" "}
				<span>{nextSector}</span> <NextSectorFL aircraft={aircraft} />{" "}
				<WarningIcon aircraft={aircraft} skipNone={false} />
			</div>
			{/* Line 2 - clearance in RESP state */}
			<div>
				<Altitude aircraft={aircraft} />
				{/* <NextACCFlightLevel aircraft={aircraft} />  Is this something we need? */}
				{/* <td>
						{" "}
						{aircraft.flightInSectorTimes?.get(currentSector)?.entryWaypointId}
					</td> */}
				<NextFix aircraft={aircraft} />
				<AssignedBearing aircraft={aircraft} />
			</div>
			<div>
				<td>
					x
					{currentSector &&
					aircraft.flightInSectorTimes?.get(currentSector)?.exitPosition
						?.altitude !== null
						? convertMetersToFlightLevel(
								aircraft.flightInSectorTimes?.get(currentSector)?.exitPosition
									?.altitude as number,
							)
						: ""}
				</td>
				{/* Line 3 - exit */}
				<td>
					x
					{currentSector &&
						aircraft.flightInSectorTimes?.get(currentSector)?.exitWaypointId}
				</td>
				{/* <NextSectorController aircraft={aircraft} /> */}
				{/* <LocalAssignedFlightLevel aircraft={aircraft} /> */}
				<td>{aircraft.arrivalAirport}</td>
			</div>
		</div>
	);
});

/*
			{/* Line 3 - exit* /}
			<div>
				x
				{currentSector &&
				aircraft.flightInSectorTimes?.get(currentSector)?.exitPosition
					?.altitude !== null
					? convertMetersToFlightLevel(
							aircraft.flightInSectorTimes?.get(currentSector)?.exitPosition
								?.altitude as number,
						)
					: ""}
			</div>
			*/
