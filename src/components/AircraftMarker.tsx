import { observer } from "mobx-react-lite";
import React from "react";
import { Marker } from "react-map-gl/maplibre";
import type AircraftModel from "../model/AircraftModel";
import { setCurrentAircraftId } from "../model/CurrentAircraft";
import {
	// aircraftStore,
	configurationStore,
	cwpStore,
	roleConfigurationStore,
} from "../state";
import AircraftPopup from "./AircraftPopup";

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
	const {
		hoveredMarkerAircraftId,
		setHoveredMarkerAircraftId,
		setFlightRouteForAircraft,
		toggleSelectedAircraftId,
		removeHoveredMarkerAircraftId,
		selectedAircraftIds,
	} = cwpStore;
	const pseudo =
		configurationStore.currentCWP === "All" || cwpStore.pseudoPilot;
	const isHovered = hoveredMarkerAircraftId === aircraftId;
	const history = positionHistory.slice(0, 8);

	const onClickOnAircraft = (): void => {
		setFlightRouteForAircraft(aircraftId, true);
		toggleSelectedAircraftId(aircraftId);
		setCurrentAircraftId(aircraftId);
	};

	const onHoverOnAircraft = (): void => {
		setFlightRouteForAircraft(aircraftId, true);
		setHoveredMarkerAircraftId(aircraftId);
	};
	const onHoverOffAircraft = (): void => {
		if (!cwpStore.selectedAircraftIds.has(aircraftId)) {
			cwpStore.setFlightRouteForAircraft(aircraftId, false);
		}
		removeHoveredMarkerAircraftId();
	};

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
						className="cursor-pointer"
						onClick={() => onClickOnAircraft()}
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
							onMouseEnter={onHoverOnAircraft}
							onMouseLeave={onHoverOffAircraft}
						>
							{selectedAircraftIds.has(aircraftId) && index === 0 ? (
								<polygon
									points={`
                ${size / 2},0
                ${size},${size / 4}
                ${size},${(3 * size) / 4}
                ${size / 2},${size}
                0,${(3 * size) / 4}
                0,${size / 4}
              `}
									fill="transparent"
									stroke={"#00ffff"}
								></polygon>
							) : (
								<circle
									cx="50%"
									cy="50%"
									r={size / 2}
									fill={isHovered ? "#00ffff" : "none"}
									stroke={
										isHovered
											? "#00ffff"
											: roleConfigurationStore.getOriginalColorOfAircraft(
													aircraftId,
												)
									}
									strokeWidth="0.6"
								/>
							)}
						</svg>
					</Marker>
				);
			})}

			<Marker longitude={lon} latitude={lat} rotation={bearing}>
				<AircraftPopup aircraft={properties.aircraft} pseudo={pseudo} />
			</Marker>
		</>
	);
});
