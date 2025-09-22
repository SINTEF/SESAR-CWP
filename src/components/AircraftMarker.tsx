import { observer } from "mobx-react-lite";
import { Marker } from "react-map-gl/maplibre";
import { useDragging } from "../contexts/DraggingContext";
import type AircraftModel from "../model/AircraftModel";
import { setCurrentAircraftId } from "../model/CurrentAircraft";
import {
	cwpStore,
	roleConfigurationStore,
	trajectoryPredictionStore,
} from "../state";
import DraggableMarker from "./DraggableMarker";

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
		selectedAircraftIds,
	} = cwpStore;
	const { isStillDragging } = useDragging();
	const isHovered = hoveredMarkerAircraftId === aircraftId;
	const history = positionHistory.slice(0, 8);
	const isSelected = selectedAircraftIds.has(aircraftId);

	const onClickOnAircraft = (): void => {
		setFlightRouteForAircraft(aircraftId, true);
		toggleSelectedAircraftId(aircraftId);
		setCurrentAircraftId(aircraftId);
	};

	const onHoverOnAircraft = (): void => {
		if (isStillDragging()) {
			return;
		}
		setFlightRouteForAircraft(aircraftId, true);
		setHoveredMarkerAircraftId(aircraftId);
	};
	const onHoverOffAircraft = (): void => {
		if (!cwpStore.selectedAircraftIds.has(aircraftId)) {
			cwpStore.setFlightRouteForAircraft(aircraftId, false);
		}
		cwpStore.removeHoveredMarkerAircraftId();
	};

	const onDragStartAircraft = (
		offsetX: number,
		offsetY: number,
		lng: number,
		lat: number,
	): void => {
		// Enable trajectory prediction and set this as the main aircraft
		trajectoryPredictionStore.setEnabled(true);
		trajectoryPredictionStore.setMainAircraft(aircraftId);
		trajectoryPredictionStore.setDraggedHandlePosition(lat, lng);
	};

	const onDragAircraft = (
		offsetX: number,
		offsetY: number,
		lng: number,
		lat: number,
	): void => {
		// Update the dragged handle position
		trajectoryPredictionStore.setDraggedHandlePosition(lat, lng);
	};

	const onDragStopAircraft = (
		offsetX: number,
		offsetY: number,
		lng: number,
		lat: number,
	): void => {
		// Disable trajectory prediction when drag ends
		trajectoryPredictionStore.setEnabled(false);
	};

	return (
		<>
			{history.map((pos, index) => {
				const size = 8 + (6 - index) * 2;
				const opacity = 1;
				const radius = (size - 5) / 2 - 1.5;
				if (radius <= 0.5) {
					return null;
				}
				return (
					<Marker
						key={`trail-${index}`}
						longitude={pos.lon}
						latitude={pos.lat}
						className="cursor-pointer"
						onClick={onClickOnAircraft}
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
							{isSelected && index === 0 ? (
								<polygon
									points={getRegularHexPoints(size, 1, 1.5)}
									transform={`rotate(${bearing} ${size / 2} ${size / 2})`}
									fill={isHovered ? "#00ffff" : "transparent"}
									stroke={"#00ffff"}
									strokeWidth="1.5"
								></polygon>
							) : null}
							<circle
								cx="50%"
								cy="50%"
								r={radius}
								fill={isHovered ? "#00ffff" : "transparent"}
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

			{isSelected ? (
				<DraggableMarker
					longitude={lon}
					latitude={lat}
					onMouseEnter={onHoverOnAircraft}
					onMouseLeave={onHoverOffAircraft}
					onClick={onClickOnAircraft}
					onDragStart={onDragStartAircraft}
					onDrag={onDragAircraft}
					onDragStop={onDragStopAircraft}
					trackMousePosition={true}
				>
					<div className="w-6 h-6" />
				</DraggableMarker>
			) : null}
		</>
	);
});
