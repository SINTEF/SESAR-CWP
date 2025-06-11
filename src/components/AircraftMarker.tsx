import { observer } from "mobx-react-lite";
import React from "react";
import { Marker } from "react-map-gl";

import { configurationStore, cwpStore, roleConfigurationStore } from "../state";
import AircraftPopup from "./AircraftPopup";
import type AircraftModel from "../model/AircraftModel";

const SIZE = 20;

function computeOffsetPosition(
	lat: number,
	lon: number,
	distanceMeters: number,
	bearingDegrees: number,
) {
	const R = 6371000;
	const bearingRad = (bearingDegrees * Math.PI) / 180;
	const latRad = (lat * Math.PI) / 180;
	const lonRad = (lon * Math.PI) / 180;

	const lat2 = Math.asin(
		Math.sin(latRad) * Math.cos(distanceMeters / R) +
			Math.cos(latRad) * Math.sin(distanceMeters / R) * Math.cos(bearingRad),
	);

	const lon2 =
		lonRad +
		Math.atan2(
			Math.sin(bearingRad) * Math.sin(distanceMeters / R) * Math.cos(latRad),
			Math.cos(distanceMeters / R) - Math.sin(latRad) * Math.sin(lat2),
		);

	return {
		lat: (lat2 * 180) / Math.PI,
		lon: (lon2 * 180) / Math.PI,
	};
}

export default observer(function AircraftMarker(properties: {
	aircraft: AircraftModel;
}) {
	const {
		lastKnownLongitude: lon,
		lastKnownLatitude: lat,
		lastKnownBearing: bearing,
		lastKnownSpeed: speed,
		aircraftId,
	} = properties.aircraft;

	const pseudo =
		configurationStore.currentCWP === "All" || cwpStore.pseudoPilot;

	const onClick = (): void => {
		cwpStore.toggleSelectedAircraftId(aircraftId);
	};

	// Compute last 8 positions using time steps of 10 seconds each (80s total)
	const history = Array.from({ length: 8 }, (_, i) => {
		const timeAgo = (i + 1) * 4; // seconds ago
		const distance = speed * timeAgo; // meters
		return computeOffsetPosition(lat, lon, -distance, bearing); // negative = backward
	});

	return (
		<>
			{history.map((pos, index) => {
				const size = 3 + (6 - index) * 2;
				// const opacity = 0.3 + (index / 8) * 0.5;
				const opacity = 1;

				return (
					<Marker
						key={`trail-${index}`}
						longitude={pos.lon}
						latitude={pos.lat}
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
								transform: `translate(-${size / 2}px, -${size / 2}px)`,
								opacity,
							}}
						>
							<circle
								cx={size / 2}
								cy={size / 2}
								r={size / 2}
								// fill="none"
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

								// onClick={()=> showTrajectory(aircraftId, properties.aircraft.trajectory)}
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
