import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import { useMap } from "react-map-gl/maplibre";

import { useDragging } from "../contexts/DraggingContext";
import type AircraftModel from "../model/AircraftModel";
import { setCurrentAircraftId } from "../model/CurrentAircraft";
import {
	adminStore,
	aircraftStore,
	configurationStore,
	cwpStore,
	roleConfigurationStore,
} from "../state";
import AircraftContentSmall from "./AircraftContentSmall";
import AircraftLevelPopup from "./AircraftLevelPopup";
import AircraftPopupContent from "./AircraftPopupContent";
import ATCMenu from "./ATCMenu";
import ChangeBearingPopup from "./ChangeBearingPopup";
import ChangeNextFixPopup from "./ChangeNextFixPopup";
import ChangeSpeedPopup from "./ChangeSpeedPopup";
import Stca from "./conflict-detection-tools/Stca";
import Tct from "./conflict-detection-tools/Tct";
import DraggablePopup, { DraggablePopupProperties } from "./DraggablePopup";
import NextSectorPopup from "./NextSectorPopup";
import AddRequestButton from "./team-assistant/AddRequestButton";
import AddRequestDialog from "./team-assistant/AddRequestDialog";
import RequestPanelContainer from "./team-assistant/RequestPanelContainer";

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
	const posthog = usePostHog();
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
	const hasOpenPopup = cwpStore.aircraftHasOpenPopup(aircraftId);

	// Use base color (without warning) for popup content
	const flightColor = roleConfigurationStore.getBaseColorOfAircraft(aircraftId);
	// Use original color (with warning) for border/icon elements
	const iconColor =
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

		posthog?.capture("aircraft_popup_wheel_scroll", {
			aircraft_id: aircraftId,
			callsign: aircraft.callSign,
			delta_y: event.deltaY,
		});
	};

	// Show expanded content when hovering OR when any popup is open
	const showExpandedContent = isHoveredLabel || hasOpenPopup;
	const height =
		Math.round(aircraft.lastKnownAltitude) / 10 !==
			Number.parseInt(aircraft.nextSectorFL) || showExpandedContent
			? 70
			: 56;
	const width = showExpandedContent ? 135 : 83;
	const Content = showExpandedContent
		? AircraftPopupContent
		: AircraftContentSmall;

	const onClick = (): void => {
		if (isDragging) {
			return;
		}
		setCurrentAircraftId(aircraftId);

		posthog?.capture("aircraft_popup_clicked", {
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
		setHoveredFlightLabelId(aircraftId);

		posthog?.capture("aircraft_popup_hover_start", {
			aircraft_id: aircraftId,
			callsign: aircraft.callSign,
			is_selected: isSelected,
		});
	};
	const onMouseLeave = (): void => {
		if (!isDragging) {
			removeHoveredFlightLabelId();

			posthog?.capture("aircraft_popup_hover_end", {
				aircraft_id: aircraftId,
				callsign: aircraft.callSign,
			});
		}
	};

	const offset = computePopupOffset(bearing, speed, width, height);
	const hasStcaConflict = aircraftStore.hasStcaConflict(aircraft.aircraftId);
	const hasTctConflict = aircraftStore.hasTctConflict(aircraft.aircraftId);

	// Determine line color: selected takes priority, then hovered, then default iconColor
	const lineColor = isSelected || isHoveredMarker ? "#00FFFF" : iconColor;

	const showAddTaRequestButton =
		showExpandedContent &&
		(cwpStore.pseudoPilot ||
			adminStore.adminModeEnabled ||
			configurationStore.currentCWP === "All");

	const showAddTaDialogOpened =
		cwpStore.aircraftsWithAddRequestDialog.has(aircraftId);

	const showRequestPanelContainer = aircraftStore.hasTeamAssistantRequests(
		properties.aircraft.callSign,
	);

	return (
		<DraggablePopup
			className="text-xs p-0 m-0 z-0"
			style={{ color: flightColor }}
			color={lineColor}
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
			trackingId={aircraftId}
			trackingName={aircraft.callSign}
			trackingType="aircraft_popup"
		>
			<div
				className="flex flex-row gap-1 items-start"
				// onClick={onClick}
				// onMouseEnter={onMouseEnter} // if we want both open at the same time, then uncomment these
				// onMouseLeave={onMouseLeave}
			>
				<div
					onClick={onClick}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					className={classNames(
						"p-1 select-none backdrop-blur-[1.5px]",
						isSelected
							? "bg-neutral-800/40 rounded-xs border-[0.5px] border-cyan-400"
							: "bg-neutral-800/50 rounded-sm border-0 border-transparent",
						isHoveredMarker ? "text-pink-400" : "text-white",
						showAddTaDialogOpened ? "rounded-tr-none" : "",
					)}
					onWheel={onWheel}
					style={{ width: `${width}px`, height: `${height}px` }}
				>
					<Content
						flightColor={flightColor}
						aircraft={aircraft}
						width={width}
					/>
					{showAddTaRequestButton && <AddRequestButton aircraft={aircraft} />}
				</div>
			</div>
			{showRequestPanelContainer ? (
				<div className="absolute left-full top-0">
					{showRequestPanelContainer && (
						<RequestPanelContainer
							height={height}
							aircraft={properties.aircraft}
						/>
					)}
					{showAddTaDialogOpened && (
						<AddRequestDialog
							aircraft={aircraft}
							onClose={() => {
								cwpStore.closeAddRequestDialogForAircraft(aircraftId);
								cwpStore.removeHoveredFlightLabelId();
							}}
						/>
					)}
				</div>
			) : null}
			<div className="pt-0 pl-0.5">
				<AircraftLevelPopup aircraft={aircraft} />
				<ChangeNextFixPopup aircraft={aircraft} />
				<NextSectorPopup aircraft={aircraft} />
				<ChangeSpeedPopup aircraft={aircraft} />
				<ChangeBearingPopup aircraft={aircraft} />
			</div>
			<ATCMenu aircraft={properties.aircraft} />
			{hasStcaConflict || hasTctConflict ? (
				<div className="absolute bottom-full left-1 flex">
					{hasStcaConflict && <Stca />}
					{hasTctConflict && <Tct />}
				</div>
			) : null}
		</DraggablePopup>
	);
});
