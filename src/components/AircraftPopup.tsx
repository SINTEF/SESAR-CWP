import { observer } from "mobx-react-lite";
import React from "react";
import { Button } from "react-bootstrap";
import { useMap } from "react-map-gl";

import { isDragging } from "../draggableState";
import { setCurrentAircraftId } from "../model/CurrentAircraft";
import { configurationStore, cwpStore, roleConfigurationStore } from "../state";
import AircraftLevelPopup from "./AircraftLevelPopup";
import AircraftPopupContent from "./AircraftPopupContent";
// import AircraftPopupPseudoContent from "./AircraftPopupPseudoContent";
import ChangeBearingPopup from "./ChangeBearingPopup";
import ChangeNextFixPopup from "./ChangeNextFixPopup";
import ChangeSpeedPopup from "./ChangeSpeedPopup";
import DraggablePopup from "./DraggablePopup";
import NextSectorPopup from "./NextSectorPopup";
import type AircraftModel from "../model/AircraftModel";
import AircraftContentSmall from "./AircraftContentSmall";

export default observer(function AircraftPopup(properties: {
	aircraft: AircraftModel;
	pseudo: boolean;
}) {
	const { aircraft, pseudo } = properties; // Not removing 'pseudo' yet as it might be used for the TA
	const { lowestBound, highestBound } = cwpStore.altitudeFilter;
	const [isHovered, setIsHovered] = React.useState(false);
	const {
		aircraftId,
		lastKnownLongitude: longitude,
		lastKnownLatitude: latitude,
		lastKnownAltitude: altitude,
		localAssignedFlightLevel,
		setLocalAssignedFlightLevel,
	} = aircraft;

	const { currentCWP } = configurationStore;
	const flightColor =
		roleConfigurationStore.getOriginalColorOfAircraft(aircraftId);
	const {
		showFlightLabelsForCurrentSector,
		showFlightLabelsForOtherSectors,
		aircraftsWithManuallyOpenedPopup,
		aircraftsWithManuallyClosedPopup,
		showFlightLabels: showAllFlightLabels,
	} = cwpStore;

	const { current } = useMap();

	if (!aircraftsWithManuallyOpenedPopup.has(aircraftId)) {
		if (
			!showAllFlightLabels ||
			altitude < lowestBound ||
			altitude > highestBound ||
			aircraftsWithManuallyClosedPopup.has(aircraftId)
		) {
			return null;
		}

		if (
			currentCWP !== "All" &&
			(!showFlightLabelsForCurrentSector || !showFlightLabelsForOtherSectors)
		) {
			if (
				!showFlightLabelsForCurrentSector &&
				!showFlightLabelsForOtherSectors
			) {
				return null;
			}
			const inside = roleConfigurationStore.pointInCurrentControlledSector(
				latitude,
				longitude,
			);

			if (showFlightLabelsForCurrentSector && !inside) {
				return null;
			}
			if (showFlightLabelsForOtherSectors && inside) {
				return null;
			}
		}
	}

	if (localAssignedFlightLevel === altitude.toFixed(0)) {
		setLocalAssignedFlightLevel(" ");
	}

	function onWheel<T>(event: T): void {
		const map = current?.getMap();
		// @ts-expect-error - .wheel is an undocumented function that takes wheel events
		(map?.scrollZoom.wheel as (event: T) => void)({
			...event,
			preventDefault: () => {},
		});
	}

	const height = 65;
	const width = isHovered ? 150 : 60; // Width of the popup changes based on hover state

	const Content = isHovered ? AircraftPopupContent : AircraftContentSmall;

	const onClick = (): void => {
		if (isDragging()) {
			return;
		}
		if (
			aircraft.controlledBy === configurationStore.currentCWP ||
			currentCWP === "All"
		) {
			setCurrentAircraftId(aircraftId);
		}
	};

	return (
		<DraggablePopup
			className="flight-popup"
			style={{ color: flightColor }}
			color={flightColor}
			offset={{ x: 0, y: 0 }}
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
				onMouseEnter={(): void => setIsHovered(true)}
				onMouseLeave={(): void => setIsHovered(false)}
			>
				<div
					className="flight-popup-main"
					style={{
						width: `${width}px`,
						height: `${height}px`,
					}}
					onWheel={onWheel}
				>
					<Content flightColor={flightColor} aircraft={aircraft} />
				</div>
				<div className="flight-popup-children">
					<AircraftLevelPopup aircraft={aircraft} />
					<ChangeNextFixPopup aircraft={aircraft} />
					<NextSectorPopup aircraft={aircraft} />
					<ChangeSpeedPopup aircraft={aircraft} />
					<ChangeBearingPopup aircraft={aircraft} />
				</div>
			</div>
		</DraggablePopup>
	);
});
