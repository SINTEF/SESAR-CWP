import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { isDragging } from '../draggableState';
import { acceptFlight } from '../mqtt';
import { aircraftStore, configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function AircraftPopupPseudoContent(properties: {
  aircraft: AircraftModel;
}) {
  const { aircraft } = properties;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    assignedFlightId,
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
      cwpStore.toggleFlightRouteForAircraft(aircraftId);
    }
  };

  const openNSFLPopup = (): void => {
    cwpStore.showNSFL(true);
    cwpStore.openLevelPopupForAircraft(aircraftId);
  };
  const openNextACCPopup = (): void => {
    cwpStore.showFlACC(true);
    cwpStore.openLevelPopupForAircraft(aircraftId);
  };

  return (
    <Container className="flight-popup-container flight-popup-pseudo-container">
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
        <Col className="gutter-2" onMouseDown={middleClickNextWaypoint} onClick={(): false | void => !isDragging() && cwpStore.openChangeNextFixForAircraft(aircraftId)}>
          {nextFix}
        </Col>
        <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>{assignedFlightLevel}</Col>
      </Row>
      <Row>
        <Col className="gutter-2" onMouseDown={handleSpeedClick} onClick={(): false | void => !isDragging() && cwpStore.toggleSpeedVectorForAircraft(aircraftId)}>{speedAndWakeTurbulenceLabel}</Col>
        <Col className="gutter-2" onClick={(): false | void => !isDragging() && openNSFLPopup()}>{nextSectorFL}</Col>
        <Col className="gutter-2">{assignedSpeed === -1 ? 'S.S' : assignedSpeed}</Col>
      </Row>
      <Row>
        <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openNextSectorPopupForAircraft(aircraftId)}>{nextSectorController}</Col>
        <Col className="gutter-2">{localAssignedFlightLevel}</Col>
        <Col className="gutter-2" onClick={(): false | void => !isDragging() && openNextACCPopup()}>{nextACCFL}</Col>
      </Row>
    </Container>
  );
});
