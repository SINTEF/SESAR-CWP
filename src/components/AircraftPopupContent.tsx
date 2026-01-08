import { observer } from "mobx-react-lite";

import type AircraftModel from "../model/AircraftModel";
import { roleConfigurationStore } from "../state";
import { formatSpeed, formatVerticalSpeed } from "../utils";
import {
	Altitude,
	AssignedBearing,
	CallSign,
	NextACCFlightLevel,
	NextNav,
	NextSectorFL,
	TransferAltitude,
	VerticalSpeedIcon,
	WarningIcon,
} from "./AircraftLabelParts";

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
