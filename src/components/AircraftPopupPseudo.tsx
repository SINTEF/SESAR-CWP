import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useMap } from 'react-map-gl';

import { isDragging } from '../draggableState';
import { acceptFlight } from '../mqtt';
import { aircraftStore, configurationStore, cwpStore } from '../state';
import DraggablePopup from './DraggablePopup';
import type AircraftModel from '../model/AircraftModel';

export default observer(function AircraftPopupPseudo(properties: {
  aircraft: AircraftModel; children?: React.ReactNode;
}) {
  const { aircraft, children } = properties;
  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownAltitude: altitude,
    lastKnownBearing: bearing,
    lastKnownSpeed: speed,
    callSign,
    speedAndWakeTurbulenceLabel,
    controlledBy,
    nextSectorController,
    nextFix,
    assignedFlightLevel,
    setAssignedFlightLevel,
    assignedBearing,
    setAssignedBearing,
    assignedSpeed,
    setAssignedSpeed,
    localAssignedFlightLevel,
    nextSectorFL,
    setNextSectorFL,
    nextACCFL,
    setNextACCFL,
  } = aircraft;

  const flightColor = controlledBy === configurationStore.currentCWP ? '#78e251' : '#ffffff';

  const showAllFlightLabels = cwpStore.showFlightLabels;

  const shouldShow = cwpStore.aircraftsWithManuallyOpenedPopup.has(aircraftId)
    || (altitude >= lowestBound && altitude <= highestBound
      && showAllFlightLabels
      && !cwpStore.aircraftsWithManuallyClosedPopup.has(aircraftId));

  const { current } = useMap();

  if (!shouldShow) {
    return null;
  }

  if (assignedFlightLevel === altitude.toFixed(0)) {
    setAssignedFlightLevel('FL.S');
  }
  if (assignedBearing === bearing) {
    setAssignedBearing(-1);
  }
  if (assignedSpeed === speed) {
    setAssignedSpeed(-1);
  }
  if (nextSectorFL === altitude.toFixed(0)) {
    setNextSectorFL('NSFL');
  }
  if (nextACCFL === altitude.toFixed(0)) {
    setNextACCFL('COO');
  }

  const setController = (): void => {
    // TODO #97: Implement setController shared across browsers, usinq MQTT
    aircraftStore.aircrafts.get(aircraftId)?.setController(configurationStore.currentCWP);
    acceptFlight(controlledBy, configurationStore.currentCWP, assignedFlightId);
  };
  const handleSpeedClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.button === 1) {
      cwpStore.openChangeSpeedForAircraft(aircraftId);
    }
  };
  const middleClickNextWaypoint = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.button === 1) {
      cwpStore.openChangeNextFixForAircraft(aircraftId);
    }
  };

  function onWheel<T>(event: T): void {
    const map = current?.getMap();
    // @ts-expect-error - .wheel is an undocumented function that takes wheel events
    (map?.scrollZoom.wheel as (event: T) => void)({
      ...event,
      preventDefault: () => { },
    });
  }

  const openNSFLPopup = (flightId: string): void => {
    cwpStore.showNSFL(true);
    cwpStore.openLevelPopupForAircraft(flightId);
  };
  const openNextACCPopup = (flightId: string): void => {
    cwpStore.showFlACC(true);
    cwpStore.openLevelPopupForAircraft(flightId);
  };

  return (
    <DraggablePopup
      className="flight-popup flight-popup-pseudo"
      style={{ color: flightColor }}
      color={flightColor === '#ffffff' ? undefined : flightColor}
      offset={{ x: 0, y: 0 }}
      size={{ width: 110, height: 68 }}
      anchor="top"
      longitude={longitude}
      latitude={latitude}
      closeOnClick={false}
      closeButton={false}
      focusAfterOpen={false}
      cancel=".flight-popup-children"
      onClose={(): void => cwpStore.closeLevelPopupForAircraft(aircraftId)}
    >
      <div>
        <div className="flight-popup-main" style={{
          width: '110px', height: '68px',
        }} onWheel={onWheel}>
          <Button size="sm" variant="dark" onClick={(): false | void => !isDragging() && cwpStore.closePopupForAircraft(aircraftId)}>x</Button>
          <Container className="flight-popup-container">
            <Row>
              <Col className="gutter-2" onClick={(): false | void => !isDragging() && setController()}>{callSign}</Col>
            </Row>
            <Row>
              <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openChangeBearingForAircraft(aircraftId)}>{Math.round(bearing)}</Col>
              <Col className="gutter-2"/>
              <Col className="gutter-2">{assignedBearing === -1 ? 'BEG.S' : assignedBearing}</Col>
            </Row>
            <Row>
              <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>{Number.parseFloat((altitude).toFixed(0))}</Col>
              <Col className="gutter-2" onMouseDown={middleClickNextWaypoint} onClick={(): false | void => !isDragging() && cwpStore.toggleFlightRouteForAircraft(aircraftId)}>
                {nextFix}
              </Col>
              <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>{assignedFlightLevel}</Col>
            </Row>
            <Row>
              <Col className="gutter-2" onMouseDown={handleSpeedClick} onClick={(): false | void => !isDragging() && cwpStore.toggleSpeedVectorForAircraft(aircraftId)}>{speedAndWakeTurbulenceLabel}</Col>
              <Col className="gutter-2" onClick={(): false | void => !isDragging() && openNSFLPopup(aircraftId)}>{nextSectorFL}</Col>
              <Col className="gutter-2">{assignedSpeed === -1 ? 'S.S' : assignedSpeed}</Col>
            </Row>
            <Row>
              <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openNextSectorPopupForAircraft(aircraftId)}>{nextSectorController}</Col>
              <Col className="gutter-2">{localAssignedFlightLevel}</Col>
              <Col className="gutter-2" onClick={(): false | void => !isDragging() && openNextACCPopup(aircraftId)}>{nextACCFL}</Col>
            </Row>
          </Container>
        </div>
        <div className="flight-popup-children">
          {children}
        </div>
      </div>
    </DraggablePopup>
  );
});
