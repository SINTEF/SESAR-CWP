import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { useMap } from "react-map-gl/maplibre";

import { useDragging } from "../contexts/DraggingContext";
import type AircraftModel from "../model/AircraftModel";
import { setCurrentAircraftId } from "../model/CurrentAircraft";
import { cwpStore, roleConfigurationStore } from "../state";
import AircraftContentSmall from "./AircraftContentSmall";
import AircraftLevelPopup from "./AircraftLevelPopup";
import AircraftPopupContent from "./AircraftPopupContent";
import ATCMenu from "./ATCMenu";
import ChangeBearingPopup from "./ChangeBearingPopup";
import ChangeNextFixPopup from "./ChangeNextFixPopup";
import ChangeSpeedPopup from "./ChangeSpeedPopup";
import DraggablePopup, { DraggablePopupProperties } from "./DraggablePopup";
import NextSectorPopup from "./NextSectorPopup";

/**
 * REQUIREMENTS:
 * 1. The popup should be positioned in the opposite direction of the aircraft's bearing
 * 2. The offset distance should scale with speed:
 *    - Minimum offset: 16 pixels (for slow/stationary aircraft)
 *    - Maximum offset: 40 pixels (for fast aircraft at ~600 knots)
 *    - Linear interpolation between min and max based on speed
 * 3. The popup must NOT overlap with a 16x16 pixel exclusion zone centered at (0,0)
 *    - This exclusion zone represents the aircraft marker
 *    - The zone extends from (-8, -8) to (8, 8)
 * 4. The popup has anchor="top", meaning:
 *    - The offset position is the top-center of the popup
 *    - The popup extends downward from this point
 *    - Horizontally, it extends from -width/2 to +width/2 from the offset position
 * 5. If the speed-based offset would cause overlap with the exclusion zone:
 *    - Calculate the minimum offset needed to clear the exclusion zone
 *    - Use this larger offset instead
 * 6. The total offset should never exceed 80 pixels, even if that means
 *    accepting some overlap with the exclusion zone in extreme cases
 *
 * @param bearing - Aircraft bearing in degrees (0 = North, 90 = East, 180 = South, 270 = West)
 * @param speed - Aircraft speed in knots
 * @param width - Popup width in pixels
 * @param height - Popup height in pixels
 * @returns Offset coordinates {x, y} in pixels
 */
function computePopupOffset(
	bearing: number,
	speed: number,
	width: number,
	height: number,
): { x: number; y: number } {
	return { x: 16, y: 16 }; // Placeholder implementation
}

export default observer(function AircraftPopup(properties: {
	aircraft: AircraftModel;
	pseudo: boolean;
}) {
	const { aircraft } = properties;
	const {
		aircraftId,
		lastKnownLongitude: longitude,
		lastKnownLatitude: latitude,
		lastKnownAltitude: altitude,
		localAssignedFlightLevel,
		lastKnownBearing: bearing,
		lastKnownSpeed: speed,
		setLocalAssignedFlightLevel,
	} = aircraft;
	const {
		setHoveredFlightLabelId,
		removeHoveredFlightLabelId,
		selectedAircraftIds,
	} = cwpStore;
	const isHoveredMarker = cwpStore.hoveredMarkerAircraftId === aircraftId;
	const isHoveredLabel = cwpStore.hoveredFlightLabelId === aircraftId;
	const isSelected = selectedAircraftIds.has(aircraft.aircraftId);
	const flightColor =
		roleConfigurationStore.getOriginalColorOfAircraft(aircraftId);

	const { current } = useMap();
	const { isDragging, isStillDragging } = useDragging();

	if (localAssignedFlightLevel === altitude.toFixed(0)) {
		setLocalAssignedFlightLevel(" ");
	}

	const onWheel = (event: React.WheelEvent): void => {
		const map = current?.getMap();
		if (map?.scrollZoom?.wheel) {
			(map.scrollZoom.wheel as (event: unknown) => void)({
				...event,
				preventDefault: () => {},
			});
		}
	};

	const height = 70;
	const width = isHoveredLabel ? 145 : 60;
	const Content = isHoveredLabel ? AircraftPopupContent : AircraftContentSmall;

	const onClick = (): void => {
		if (isDragging) {
			return;
		}
		setCurrentAircraftId(aircraftId);
	};
	const onMouseEnter = (): void => {
		if (isStillDragging()) {
			return;
		}
		setHoveredFlightLabelId(aircraftId);
	};
	const onMouseLeave = (): void => {
		if (!isDragging) {
			removeHoveredFlightLabelId();
		}
	};

	const offset = computePopupOffset(bearing, speed, width, height);

	return (
		<DraggablePopup
			className="text-xs p-0 m-0 backdrop-blur-[1.5px]"
			style={{ color: flightColor }}
			color={isHoveredMarker ? "#00FFFF" : flightColor}
			offset={offset as DraggablePopupProperties["offset"]}
			size={{ width, height }}
			borderRadius={1.5}
			anchor="top"
			longitude={longitude}
			latitude={latitude}
			closeOnClick={false}
			closeButton={false}
			focusAfterOpen={false}
			cancel="input, button"
			onClose={(): void => cwpStore.closeLevelPopupForAircraft(aircraftId)}
		>
			<div
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<div
					className={classNames(
						"p-1 select-none",
						isSelected
							? "bg-gray-600/40 border-[0.5px] border-cyan-400"
							: "bg-gray-500/50 rounded-sm border-0 border-transparent",
						isHoveredMarker ? "text-pink-400" : "text-white",
					)}
					onWheel={onWheel}
					style={{ width: `${width}px`, height: `${height}px` }}
				>
					<Content flightColor={flightColor} aircraft={aircraft} />
				</div>
				<div className="pt-1">
					<AircraftLevelPopup aircraft={aircraft} />
					<ChangeNextFixPopup aircraft={aircraft} />
					<NextSectorPopup aircraft={aircraft} />
					<ChangeSpeedPopup aircraft={aircraft} />
					<ChangeBearingPopup aircraft={aircraft} />
					<ATCMenu aircraft={aircraft} />
				</div>
			</div>
		</DraggablePopup>
	);
});
