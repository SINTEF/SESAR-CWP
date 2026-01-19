import { observer } from "mobx-react-lite";
import { JSX } from "react";
import type AircraftModel from "../model/AircraftModel";
import { formatSpeed } from "../utils";
import {
	Altitude,
	AssignedBearing,
	CallSign,
	NextACCFlightLevel,
	NextSectorFL,
	VerticalSpeedIcon,
	WarningIcon,
} from "./AircraftLabelParts";

export default observer(function AircraftContentSmall(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	width: number;
}) {
	const { aircraft, flightColor } = properties;
	const { lastKnownSpeed, assignedBearing, lastKnownBearing } = aircraft;

	const displayBearing = (): JSX.Element | null => {
		const hasBearingAssigned =
			assignedBearing !== undefined && assignedBearing !== -1;

		if (!hasBearingAssigned) {
			return null;
		}
		// Check if bearing is still changing (with a small tolerance of 2 degrees)
		const bearingDifference = Math.abs(assignedBearing - lastKnownBearing);
		const normalizedDiff = Math.min(bearingDifference, 360 - bearingDifference);
		const isBearingChanging = normalizedDiff > 2;

		if (!isBearingChanging) {
			return null;
		} else {
			return <AssignedBearing aircraft={aircraft} />;
		}
	};

	return (
		<div
			style={{ color: flightColor }}
			className={
				aircraft.degreased ? "font-normal font-mono" : "font-bold font-mono"
			}
		>
			{/* Line 0 */}
			<div>
				<span>{formatSpeed(lastKnownSpeed)}</span>
				<span className="ml-1">&nbsp;&nbsp;</span>
				<span>{aircraft.aircraftType}</span>
			</div>
			{/* Line 1 */}
			<div>
				<CallSign flightColor={flightColor} aircraft={aircraft} />
				<span className="ml-1"></span>
				<WarningIcon aircraft={aircraft} skipNone={true} />
			</div>
			{/* Line 2 - clearance in RESP state*/}
			<div>
				<Altitude aircraft={aircraft} />
				<span className="ml-0.5"></span>
				<VerticalSpeedIcon aircraft={aircraft} />
				<span className="ml-0.5"></span>
				<NextACCFlightLevel aircraft={aircraft} hideIfMatchesAltitude={true} />
				<span className="ml-0.5"></span>
				{/* <BearingChangeIcon aircraft={aircraft} />
				<span className="ml-0.5"></span> */}
				{displayBearing()}
			</div>
			{Math.round(aircraft.lastKnownAltitude) / 10 !==
				Number.parseInt(aircraft.nextSectorFL) && (
				<div>
					<NextSectorFL aircraft={aircraft} />
				</div>
			)}
		</div>
	);
});
