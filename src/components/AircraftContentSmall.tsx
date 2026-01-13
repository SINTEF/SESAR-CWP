import { observer } from "mobx-react-lite";

import type AircraftModel from "../model/AircraftModel";
import { formatSpeed } from "../utils";
import {
	Altitude,
	CallSign,
	NextACCFlightLevel,
	VerticalSpeedIcon,
	WarningIcon,
} from "./AircraftLabelParts";

export default observer(function AircraftContentSmall(properties: {
	aircraft: AircraftModel;
	flightColor: string;
	width: number;
}) {
	const { aircraft, flightColor } = properties;
	const { lastKnownSpeed } = aircraft;
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
			</div>
		</div>
	);
});
