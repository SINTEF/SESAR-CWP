import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import { useMap } from "react-map-gl/maplibre";
import { useDragging } from "../../contexts/DraggingContext";
import type AircraftModel from "../../model/AircraftModel";
import { setCurrentAircraftId } from "../../model/CurrentAircraft";
import { cwpStore, roleConfigurationStore } from "../../state";
import TaPopupFull from "./TaPopupFull";
import TaPopupSmall from "./TaPopupSmall";

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

export default observer(function TaLabel(properties: {
	aircraft: AircraftModel;
	pseudo?: boolean;
}) {
	const posthog = usePostHog();
	const { aircraft } = properties;
	const {
		aircraftId,
		// lastKnownLongitude: longitude,
		// lastKnownLatitude: latitude,
		lastKnownAltitude: altitude,
		localAssignedFlightLevel,
		// lastKnownBearing: bearing,
		lastKnownSpeed: speed,
		setLocalAssignedFlightLevel,
	} = aircraft;
	const {
		setHoveredTaLabelAircraftId,
		removeHoveredTaLabelAircraftId,
		selectedAircraftIds,
		removeTaArrowClickedAircraftId,
		taArrowClickedAircraftId,
	} = cwpStore;
	const isTaArrowClicked = taArrowClickedAircraftId === aircraftId;
	const isHoveredMarker = cwpStore.hoveredMarkerAircraftId === aircraftId;
	const isHoveredLabel = cwpStore.hoveredTaLabelAircraftId === aircraftId;
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

		posthog?.capture("TA_aircraft_popup_wheel_scroll", {
			aircraft_id: aircraftId,
			callsign: aircraft.callSign,
			delta_y: event.deltaY,
		});
	};

	const height = isTaArrowClicked ? 150 : 70;
	let width;
	switch (true) {
		case isHoveredLabel === true && isTaArrowClicked === true:
			width = 140;
			break;
		case isHoveredLabel === true && isTaArrowClicked === false:
			width = 70;
			break;
		default:
			width = 30;
			break;
	}

	const Content = isHoveredLabel ? TaPopupFull : TaPopupSmall;

	const onClick = (): void => {
		if (isDragging) {
			return;
		}
		setCurrentAircraftId(aircraftId);

		posthog?.capture("TA_aircraft_popup_clicked", {
			aircraft_id: aircraftId,
			callsign: aircraft.callSign,
			altitude: altitude,
			speed: speed,
			is_selected: isSelected,
		});
	};
	const onMouseEnter = (): void => {
		if (isStillDragging()) {
			return;
		}
		setHoveredTaLabelAircraftId(aircraftId);

		posthog?.capture("TA_aircraft_popup_hover_start", {
			aircraft_id: aircraftId,
			callsign: aircraft.callSign,
			is_selected: isSelected,
		});
	};
	const onMouseLeave = (): void => {
		if (!isDragging) {
			removeHoveredTaLabelAircraftId();
			removeTaArrowClickedAircraftId();

			posthog?.capture("TA_aircraft_popup_hover_end", {
				aircraft_id: aircraftId,
				callsign: aircraft.callSign,
			});
		}
	};

	return (
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
				style={{
					width: `${width}px`,
					height: isTaArrowClicked ? "auto" : `${height}px`,
				}}
			>
				<Content flightColor={flightColor} aircraft={aircraft} width={width} />
			</div>
		</div>
	);
});
