import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import { Button } from 'react-bootstrap';
import { useMap } from 'react-map-gl';

import { isDragging } from '../draggableState';
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
    controlledBy,
    localAssignedFlightLevel,
    setLocalAssignedFlightLevel,
    flightInSectorTimes,
  } = aircraft;

  let flightColor = '#ffffff';
  const listOfTentatives = roleConfigurationStore.roleConfigurations
    .get(configurationStore.currentCWP)?.tentativeAircrafts;
  if (roleConfigurationStore.currentControlledSector
  && flightInSectorTimes.get(roleConfigurationStore.currentControlledSector) !== undefined) {
    flightColor = '#006400';
  }
  if (controlledBy === configurationStore.currentCWP) {
    flightColor = '#78e251';
  }
  if (listOfTentatives?.includes(aircraftId)) {
    flightColor = '#ff00ff';
  }
  const showAllFlightLabels = cwpStore.showFlightLabels;

  const bounds = configurationStore.extendedEdgesBounds;

  const shouldShow = cwpStore.aircraftsWithManuallyOpenedPopup.has(aircraftId)
    || (altitude >= lowestBound && altitude <= highestBound
      && showAllFlightLabels
      && !cwpStore.aircraftsWithManuallyClosedPopup.has(aircraftId)
      // Airplanes far the sectors are not shown by default
      && bounds !== undefined
      && latitude >= bounds.minLat
      && latitude <= bounds.maxLat
      && longitude >= bounds.minLon
      && longitude <= bounds.maxLon
    );

  const { current } = useMap();

  if (!shouldShow) {
    return null;
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

  const height = pseudo ? 68 : 55;

  const Content = pseudo ? AircraftPopupPseudoContent : AircraftPopupContent;

  return (
    <DraggablePopup
      className="flight-popup"
      style={{ color: flightColor }}
      color={flightColor === '#ffffff' ? undefined : flightColor}
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
      <div>
        <div className="flight-popup-main" style={{
          width: '110px', height: `${height}px`,
        }} onWheel={onWheel}>
          <Button size="sm" variant="dark" onClick={(): false | void => !isDragging() && cwpStore.closePopupForAircraft(aircraftId)}>x</Button>
          <Content aircraft={aircraft} />
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
