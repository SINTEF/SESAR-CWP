import { observer } from "mobx-react-lite";
import React from "react";
import { useMap } from "react-map-gl/maplibre";

import { isDragging } from "../draggableState";
import type AircraftModel from "../model/AircraftModel";
import {
	getCurrentAircraftId,
	setCurrentAircraftId,
} from "../model/CurrentAircraft";
import { configurationStore, cwpStore, roleConfigurationStore } from "../state";
import AircraftContentSmall from "./AircraftContentSmall";
import AircraftLevelPopup from "./AircraftLevelPopup";
import AircraftPopupContent from "./AircraftPopupContent";
import ATCMenu from "./ATCMenu";
// import AircraftPopupPseudoContent from "./AircraftPopupPseudoContent";
import ChangeBearingPopup from "./ChangeBearingPopup";
import ChangeNextFixPopup from "./ChangeNextFixPopup";
import ChangeSpeedPopup from "./ChangeSpeedPopup";
import DraggablePopup, { DraggablePopupProperties } from "./DraggablePopup";
import NextSectorPopup from "./NextSectorPopup";

export default observer(function AircraftPopup(properties: {
	aircraft: AircraftModel;
	pseudo: boolean;
}) {
	const { aircraft /* pseudo */ } = properties; // Not removing 'pseudo' yet as it might be used for the TA
	// const { lowestBound, highestBound } = cwpStore.altitudeFilter;
	const {
		aircraftId,
		lastKnownLongitude: longitude,
		lastKnownLatitude: latitude,
		lastKnownAltitude: altitude,
		localAssignedFlightLevel,
		setLocalAssignedFlightLevel,
	} = aircraft;
	const {
		setHoveredFlightLabelId,
		hoveredFlightLabelId,
		hoveredMarkerAircraftId,
		removeHoveredFlightLabelId,
		selectedAircraftIds,
	} = cwpStore;
	const isHoveredMarker = cwpStore.hoveredMarkerAircraftId === aircraftId;
	const isHoveredLabel = cwpStore.hoveredFlightLabelId === aircraftId;
	const { currentCWP } = configurationStore;
	const flightColor =
		roleConfigurationStore.getOriginalColorOfAircraft(aircraftId);
	// const {
	// 	showFlightLabelsForCurrentSector,
	// 	showFlightLabelsForOtherSectors,
	// 	aircraftsWithManuallyOpenedPopup,
	// 	aircraftsWithManuallyClosedPopup,
	// 	showFlightLabels: showAllFlightLabels,
	// } = cwpStore;

	const { current } = useMap();

	// Hiding logic for the popup for now as all popups are set to be shown as far as I know

	// if (!aircraftsWithManuallyOpenedPopup.has(aircraftId)) {
	// 	if (
	// 		!showAllFlightLabels ||
	// 		altitude < lowestBound ||
	// 		altitude > highestBound ||
	// 		aircraftsWithManuallyClosedPopup.has(aircraftId)
	// 	) {
	// 		return null;
	// 	}

	// 	if (
	// 		currentCWP !== "All" &&
	// 		(!showFlightLabelsForCurrentSector || !showFlightLabelsForOtherSectors)
	// 	) {
	// 		if (
	// 			!showFlightLabelsForCurrentSector &&
	// 			!showFlightLabelsForOtherSectors
	// 		) {
	// 			return null;
	// 		}
	// 		const inside = roleConfigurationStore.pointInCurrentControlledSector(
	// 			latitude,
	// 			longitude,
	// 		);

	// 		if (showFlightLabelsForCurrentSector && !inside) {
	// 			return null;
	// 		}
	// 		if (showFlightLabelsForOtherSectors && inside) {
	// 			return null;
	// 		}
	// 	}
	// }

	if (localAssignedFlightLevel === altitude.toFixed(0)) {
		setLocalAssignedFlightLevel(" ");
	}

	function onWheel<T>(event: T): void {
		const map = current?.getMap();
		(map?.scrollZoom.wheel as unknown as (event: T) => void)({
			...event,
			preventDefault: () => {},
		});
	}

	const height = 70;
	const width = isHoveredLabel ? 150 : 60; // Width of the popup changes based on hover state

	const Content = isHoveredLabel ? AircraftPopupContent : AircraftContentSmall;

	const onClick = (): void => {
		if (isDragging()) {
			return;
		}
		// if (
		// 	aircraft.controlledBy === configurationStore.currentCWP ||
		// 	currentCWP === "All"
		// ) {
		// 	setCurrentAircraftId(aircraftId);
		// }
		setCurrentAircraftId(aircraftId);
	};

	return (
		<DraggablePopup
			className="text-xs p-0 m-0 backdrop-blur-[1.5px]"
			style={{ color: flightColor }}
			color={isHoveredMarker ? "#00FFFF" : flightColor}
			offset={{ x: 0, y: 0 } as DraggablePopupProperties["offset"]}
			size={{ width: 110, height }}
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
				onMouseEnter={(): void => setHoveredFlightLabelId(aircraftId)}
				onMouseLeave={(): void => removeHoveredFlightLabelId()}
			>
				<div
					className="bg-gray-500/50 rounded-sm select-none"
					// style={{
					// 	width: `${width}px`,
					// 	height: `${height}px`,
					// }}
					onWheel={onWheel}
					style={
						selectedAircraftIds.has(aircraft.aircraftId)
							? { borderColor: "#00ffff", borderWidth: "0.5px" }
							: { borderColor: "transparent", borderWidth: "0px" }
					}
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
