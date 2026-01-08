import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import React from "react";

import type AircraftModel from "../model/AircraftModel";
import { cwpStore, roleConfigurationStore } from "../state";
import { convertMetersToFlightLevel } from "../utils";
import {
	Altitude,
	CallSign,
	NextACCFlightLevel,
	NextSectorFL,
	VerticalSpeedIcon,
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
			return <span>h...</span>;
		}

		let displayedBearing = Math.round(assignedBearing) % 360;
		if (displayedBearing < 1) {
			displayedBearing = 360;
		}

		return <span>{`${displayedBearing.toString().padStart(3, "0")}`}</span>;
	},
);

const TransferAltitude = ({
	altitude,
}: {
	altitude: number | null | undefined;
}) => {
	if (altitude === null || altitude === undefined) {
		return <span>x</span>;
	}
	const flightLevel = Math.round(convertMetersToFlightLevel(altitude) / 10);
	return <span>x{flightLevel}</span>;
};

const NextNav = observer(({ aircraft }: SubContentProperties) => {
	const posthog = usePostHog();
	const middleClickNextWaypoint = (
		_event: React.MouseEvent<HTMLElement>,
	): void => {
		// if (event.button === 1) {
		cwpStore.toggleFlightRouteForAircraft(aircraft.aircraftId);
		posthog?.capture("next_nav_clicked", {
			aircraft_id: aircraft.aircraftId,
			callsign: aircraft.callSign,
			next_nav: aircraft.nextNav,
			flight_route_visible: cwpStore.aircraftsWithFlightRoutes.has(
				aircraft.aircraftId,
			),
		});
		// }
	};

	const { nextNav, assignedBearing } = aircraft;
	const showNextNav = assignedBearing === -1 || assignedBearing === undefined;

	return (
		<span onMouseDown={middleClickNextWaypoint}>
			{showNextNav ? nextNav : "--"}
		</span>
	);
});

export function formatSpeed(speed: number): string {
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
	const sectorTimes = currentSector
		? aircraft.flightInSectorTimes?.get(currentSector)
		: undefined;
	return (
		<div style={{ color: flightColor }}>
			{/* Line 0 */}
			<div>
				<span>{formatSpeed(lastKnownSpeed)}</span>
				<span className="ml-0.5"></span>
				<span>{formatVerticalSpeed(lastKnownVerticalSpeed)}</span>
				<span className="ml-0.5"></span>
				<span>{aircraftType}</span>
			</div>
			{/* Line 1 */}
			<div>
				<CallSign flightColor={flightColor} aircraft={aircraft} />
				<span className="ml-0.5"></span>
				<span>{nextSector}</span>
				<span className="ml-0.5"></span>
				<NextSectorFL aircraft={aircraft} />
				<span className="ml-0.5"></span>
				<WarningIcon aircraft={aircraft} skipNone={false} />
			</div>
			{/* Line 2 - clearance in RESP state */}
			<div>
				<Altitude aircraft={aircraft} />
				<span className="ml-0.5"></span>
				<VerticalSpeedIcon aircraft={aircraft} />
				<span className="ml-0.5"></span>
				<NextACCFlightLevel aircraft={aircraft} />
				<span className="ml-0.5"></span>
				<NextNav aircraft={aircraft} />
				<span className="ml-0.5"></span>
				<AssignedBearing aircraft={aircraft} />
			</div>
			<div>
				<TransferAltitude altitude={sectorTimes?.exitPosition?.altitude} />
				<span className="ml-0.5"></span>
				{/* Line 3 - exit */}
				<span>{aircraft.nextSectorExitPoint}</span>
				{/* <NextSectorController aircraft={aircraft} /> */}
				{/* <LocalAssignedFlightLevel aircraft={aircraft} /> */}
				<span className="ml-0.5"></span>
				<span>{aircraft.arrivalAirport}</span>
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
