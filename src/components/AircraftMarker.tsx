import { observer } from "mobx-react-lite";
import React from "react";
import { Marker } from "react-map-gl/maplibre";

import {
	// aircraftStore,
	configurationStore,
	cwpStore,
	roleConfigurationStore,
} from "../state";
import AircraftPopup from "./AircraftPopup";
import type AircraftModel from "../model/AircraftModel";

const SIZE = 20;
/**
 * AircraftMarker component displays a marker for an aircraft on the map.
 * It shows the aircraft's last known position and a trail of its previous positions.
 * Clicking on the marker toggles the selection of the aircraft in the CWP store.
 */
export default observer(function AircraftMarker(properties: {
	aircraft: AircraftModel;
}) {
	const {
		lastKnownLongitude: lon,
		lastKnownLatitude: lat,
		lastKnownBearing: bearing,
		// lastKnownSpeed: speed,
		aircraftId,
		positionHistory,
	} = properties.aircraft;

	const pseudo =
		configurationStore.currentCWP === "All" || cwpStore.pseudoPilot;

	const onClick = (): void => {
		cwpStore.toggleSelectedAircraftId(aircraftId);
	};
	const history = positionHistory.slice(0, 8);

	return (
		<>
			{history.map((pos, index) => {
				const size = 3 + (6 - index) * 2;
				const opacity = 1;
				return (
					<Marker
						key={`trail-${index}`}
						longitude={pos.lon}
						latitude={pos.lat}
						style={{
							cursor: "pointer",
						}}
						onClick={
							index !== 0
								? () => cwpStore.toggleFlightRouteForAircraft(aircraftId)
								: undefined
						}
					>
						<svg
							width={size}
							height={size}
							viewBox={`0 0 ${size} ${size}`}
							style={{
								transform: `translate(-50%, -50%)`, // ensures SVG is centered on marker
								position: "absolute",
								left: "50%",
								top: "50%",
								opacity,
							}}
						>
							<circle
								cx="50%"
								cy="50%"
								r={size / 2}
								fill={
									roleConfigurationStore.getOriginalColorOfAircraft(
										aircraftId,
									) === "#ffffff" ||
									roleConfigurationStore.getOriginalColorOfAircraft(
										aircraftId,
									) === "#78e251"
										? "none"
										: roleConfigurationStore.getOriginalColorOfAircraft(
												aircraftId,
											)
								}
								stroke={roleConfigurationStore.getOriginalColorOfAircraft(
									aircraftId,
								)}
								strokeWidth="0.6"
							/>
						</svg>
					</Marker>
				);
			})}

			<Marker longitude={lon} latitude={lat} rotation={bearing}>
				<svg
					height={SIZE}
					viewBox="0 0 24 24"
					preserveAspectRatio="xMidYMid meet"
					style={{
						cursor: "pointer",
						fill: roleConfigurationStore.getOriginalColorOfAircraft(aircraftId),
						stroke: "black",
						strokeWidth: 2.5,
						paintOrder: "stroke fill",
					}}
					onClick={onClick}
				></svg>
				<AircraftPopup aircraft={properties.aircraft} pseudo={pseudo} />
			</Marker>
		</>
	);
});
