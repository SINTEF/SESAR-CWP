import { observer } from "mobx-react-lite";
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

// Memoized function to calculate hexagon points - cached for performance
// Using numeric keys with bit shifting for optimal performance
const hexPointsCache = new Map<number, string>();
const getRegularHexPoints = (
	size: number,
	inset = 1,
	strokeWidth = 2,
): string => {
	// Create a numeric key using bit shifting
	// size: 0-255 (8 bits), inset: 0-15 (4 bits), strokeWidth*10: 0-63 (6 bits)
	const cacheKey =
		(size << 10) | (inset << 6) | (Math.round(strokeWidth * 10) & 0x3f);
	const cached = hexPointsCache.get(cacheKey);
	if (cached) {
		return cached;
	}

	const cx = size / 2;
	const cy = size / 2;
	const margin = inset + strokeWidth / 2;
	const r = Math.max(0, size / 2 - margin);
	const anglesDeg = [-90, -30, 30, 90, 150, 210]; // pointy-top hex
	const points = anglesDeg
		.map((deg) => {
			const rad = (deg * Math.PI) / 180;
			const x = cx + r * Math.cos(rad);
			const y = cy + r * Math.sin(rad);
			return `${x.toFixed(2)},${y.toFixed(2)}`;
		})
		.join(" ");

	hexPointsCache.set(cacheKey, points);
	return points;
};

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
				const size = 8 + (6 - index) * 2;
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
									points={getRegularHexPoints(size, 1, 1.5)}
									transform={`rotate(${bearing} ${size / 2} ${size / 2})`}
									fill="transparent"
									stroke={"#00ffff"}
									strokeWidth="1.5"
								></polygon>
							) : null}
							<circle
								cx="50%"
								cy="50%"
								r={(size - 5) / 2 - 2}
								fill={isHovered ? "#00ffff" : "none"}
								stroke={
									isHovered
										? "#00ffff"
										: roleConfigurationStore.getOriginalColorOfAircraft(
												aircraftId,
											)
								}
								strokeWidth="1"
							/>
						</svg>
					</Marker>
				);
			})}

			<Marker longitude={lon} latitude={lat}>
				<AircraftPopup aircraft={properties.aircraft} pseudo={pseudo} />
			</Marker>
		</>
	);
});
