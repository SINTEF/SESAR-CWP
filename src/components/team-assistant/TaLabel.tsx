import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import { useMap } from "react-map-gl/maplibre";
import { useDragging } from "../../contexts/DraggingContext";
import type AircraftModel from "../../model/AircraftModel";
import { TeamAssistantRequest } from "../../model/AircraftStore";
import { setCurrentAircraftId } from "../../model/CurrentAircraft";
import { PilotRequestType } from "../../schemas/pilotRequestSchema";
import { cwpStore, roleConfigurationStore } from "../../state";
import TaRequestHovered from "./TaRequestHovered";
import TaRequestIdle from "./TaRequestIdle";

/**
 * Three display states for a Team Assistant request label.
 * - idle: not hovered — small icon + status dot
 * - compact: AP2 hovered, arrow not yet clicked — summary view
 * - full: AP1 hovered (always), or AP2 hovered + arrow clicked — all goal details
 */
type TaDisplayState = "idle" | "compact" | "full";

function getTaDisplayState(
	isHovered: boolean,
	isAP2: boolean,
	isArrowClicked: boolean,
): TaDisplayState {
	if (!isHovered) {
		return "idle";
	}
	if (isAP2 && !isArrowClicked) {
		return "compact";
	}
	return "full";
}

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
 * @returns Offset coordinates {x, y} in pixels
 */

export default observer(function TaLabel(properties: {
	aircraft: AircraftModel;
	request: TeamAssistantRequest;
	pseudo?: boolean;
}) {
	const posthog = usePostHog();
	const { aircraft, request } = properties;
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

	// Autonomy Profile determines display behavior:
	// AP1 (autonomyProfile === 1): Information — always shows full detail on hover
	// AP2 (autonomyProfile === 2): Decision — compact on hover, full after arrow clicked
	const isAP2 = request.autonomyProfile === 2;

	const { selectedAircraftIds, taArrowClickedAircraftId } = cwpStore;
	const isHoveredMarker =
		cwpStore.hoveredMarkerAircraftId === aircraftId ||
		cwpStore.hoveredConflictAircraftIds.has(aircraftId);
	const isHoveredLabel = cwpStore.hoveredTaLabelAircraftId === aircraftId;
	const isSelected = selectedAircraftIds.has(aircraft.aircraftId);

	const displayState = getTaDisplayState(
		isHoveredLabel,
		isAP2,
		taArrowClickedAircraftId === aircraftId,
	);
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

	const width = {
		idle: request.context?.request_type === PilotRequestType.Direct ? 55 : 37, // Direct requests are slightly wider
		compact: 100,
		full: 140,
	}[displayState];

	/**
	 * Get the icon path based on request type.
	 */
	function getIconForRequestType(
		requestType: number,
		_requestParameter: number | string,
	): string {
		switch (requestType) {
			case PilotRequestType.FlightLevel:
				return "/flight_level_request.svg";
			case PilotRequestType.Direct:
				return "/icon_direct_request.svg";
			case PilotRequestType.AbsoluteHeading:
			case PilotRequestType.RelativeHeading:
				return "/icon_thunderstorm.svg";
			default:
				return "/flight_level_request.svg";
		}
	}

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
		posthog?.capture("TA_aircraft_popup_hover_start", {
			aircraft_id: aircraftId,
			callsign: aircraft.callSign,
			is_selected: isSelected,
		});
	};

	const onMouseLeave = (): void => {
		if (!isDragging) {
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
					"p-1 select-none backdrop-blur-[1.5px]",
					isSelected
						? "bg-gray-600/40 border-[0.5px] border-cyan-400"
						: "bg-gray-800/40 rounded-sm border-0 border-transparent",
					isHoveredMarker ? "text-pink-400" : "text-white",
				)}
				onWheel={onWheel}
				style={{
					width: "auto",
					height: "auto",
				}}
			>
				{displayState === "idle" ? (
					<TaRequestIdle
						flightColor={flightColor}
						aircraft={aircraft}
						width={width}
						request={request}
						requestParameter={String(request.context?.request_parameter ?? "")}
						requestTypeIcon={getIconForRequestType(
							request.context?.request_type ?? 0,
							request.context?.request_parameter ?? "",
						)}
					/>
				) : (
					<TaRequestHovered
						flightColor={flightColor}
						aircraft={aircraft}
						width={width}
						request={request}
						requestParameter={String(request.context?.request_parameter ?? "")}
						requestTypeIcon={getIconForRequestType(
							request.context?.request_type ?? 0,
							request.context?.request_parameter ?? "",
						)}
						autonomyProfile={request.autonomyProfile}
						isExpanded={displayState === "full"}
					/>
				)}
			</div>
		</div>
	);
});
