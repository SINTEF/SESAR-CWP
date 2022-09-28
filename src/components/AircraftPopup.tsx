import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import { Button } from 'react-bootstrap';
import { useMap } from 'react-map-gl';

import { isDragging } from '../draggableState';
import { setCurrentAircraftId } from '../model/CurrentAircraft';
import {
  configurationStore, cwpStore, roleConfigurationStore,
} from '../state';
import AircraftLevelPopup from './AircraftLevelPopup';
import AircraftPopupContent from './AircraftPopupContent';
import AircraftPopupPseudoContent from './AircraftPopupPseudoContent';
import ChangeBearingPopup from './ChangeBearingPopup';
import ChangeNextFixPopup from './ChangeNextFixPopup';
import ChangeSpeedPopup from './ChangeSpeedPopup';
import DraggablePopup from './DraggablePopup';
import NextSectorPopup from './NextSectorPopup';
import type AircraftModel from '../model/AircraftModel';

export default observer(function AircraftPopup(properties: {
  aircraft: AircraftModel; pseudo: boolean;
}) {
  const { aircraft, pseudo } = properties;
  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownAltitude: altitude,
    localAssignedFlightLevel,
    setLocalAssignedFlightLevel,
  } = aircraft;

  const { currentCWP } = configurationStore;
  const flightColor = roleConfigurationStore.getOriginalColorOfAircraft(aircraftId);
  const {
    showFlightLabelsForCurrentSector,
    showFlightLabelsForOtherSectors,
    aircraftsWithManuallyOpenedPopup,
    aircraftsWithManuallyClosedPopup,
    showFlightLabels: showAllFlightLabels,
  } = cwpStore;

  const { current } = useMap();

  if (!(aircraftsWithManuallyOpenedPopup.has(aircraftId)
    || (altitude >= lowestBound && altitude <= highestBound
      && showAllFlightLabels
      && !aircraftsWithManuallyClosedPopup.has(aircraftId)
    ))) {
    return null;
  }

  if (currentCWP !== 'All' && (!showFlightLabelsForCurrentSector || !showFlightLabelsForOtherSectors)) {
    if (!showFlightLabelsForCurrentSector && !showFlightLabelsForOtherSectors) {
      return null;
    }
    const inside = roleConfigurationStore.pointInCurrentControlledSector(latitude, longitude);

    if (showFlightLabelsForCurrentSector && !inside) {
      return null;
    }
    if (showFlightLabelsForOtherSectors && inside) {
      return null;
    }
  }

  if (localAssignedFlightLevel === altitude.toFixed(0)) {
    setLocalAssignedFlightLevel(' ');
  }

  function onWheel<T>(event: T): void {
    const map = current?.getMap();
    // @ts-expect-error - .wheel is an undocumented function that takes wheel events
    (map?.scrollZoom.wheel as (event: T) => void)({
      ...event,
      preventDefault: () => { },
    });
  }

  const height = pseudo ? 80 : 64;

  const Content = pseudo ? AircraftPopupPseudoContent : AircraftPopupContent;

  const onClick = (): void => {
    if (isDragging()) {
      return;
    }
    // eslint-disable-next-line unicorn/consistent-destructuring
    if (aircraft.controlledBy === configurationStore.currentCWP
      || currentCWP === 'All') {
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
      <div onClick={onClick}>
        <div className="flight-popup-main" style={{
          width: '124px', height: `${height}px`,
        }} onWheel={onWheel}>
          <Button size="sm" variant="dark" onClick={(): false | void => !isDragging() && cwpStore.closePopupForAircraft(aircraftId)}>x</Button>
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
