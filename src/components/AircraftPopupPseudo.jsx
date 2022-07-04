import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';

import { isDragging } from '../draggableState';
import { acceptFlight } from '../mqtt';
import { aircraftStore, configurationStore, cwpStore } from '../state';
import DraggablePopup from './DraggablePopup';

export default observer(function AircraftPopupPseudo(properties) {
  const { aircraft } = properties;
  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownAltitude: altitude,
    lastKnownBearing: bearing,
    callSign,
    speedAndWakeTurbulenceLabel,
    controlledBy,
    nextSectorController,
    nextFix,
    assignedFlightLevel,
    setAssignedFlightLevel,
  } = aircraft;

  const flightColor = controlledBy === configurationStore.currentCWP ? '#78e251' : '#ffffff';

  const showAllFlightLabels = cwpStore.showFlightLabels;

  const shouldShow = cwpStore.aircraftsWithManuallyOpenedPopup.has(aircraftId)
    || (altitude >= lowestBound && altitude <= highestBound
      && showAllFlightLabels
      && !cwpStore.aircraftsWithManuallyClosedPopup.has(aircraftId));

  if (!shouldShow) {
    return null;
  }
  if (assignedFlightLevel === Number.parseFloat((altitude).toFixed(0))) {
    setAssignedFlightLevel(' ');
  }

  const setController = () => {
    // TODO do something with MQTT
    aircraftStore.aircrafts.get(aircraftId).setController(configurationStore.currentCWP);
    acceptFlight(controlledBy, configurationStore.currentCWP, assignedFlightId);
  };
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSpeedClick = (event) => {
    if (event.button === 1) {
      cwpStore.openChangeSpeedForAircraft(aircraftId);
    }
  };
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const middleClickNextWaypoint = (event) => {
    if (event.button === 1) {
      cwpStore.openChangeNextFixForAircraft(aircraftId);
    }
  };
  return (
    <DraggablePopup
      className="flight-popup flight-popup-pseudo"
      tipSize={2}
      style={{ color: flightColor }}
      offset={{ x: 0, y: 0 }}
      anchor="top"
      draggable
      longitude={longitude}
      latitude={latitude}
      closeOnClick={false}
      closeButton={false}
      focusAfterOpen={false}
      onClose={() => cwpStore.closeLevelPopupForAircraft(aircraftId)}
    >
      <div>
        <Button size="sm" variant="dark" onClick={() => !isDragging() && cwpStore.closePopupForAircraft(aircraftId)}>x</Button>
        <Container className="flight-popup-container">
          <Row>
            <Col className="gutter-2" onClick={() => !isDragging() && setController()}>{callSign}</Col>
          </Row>
          <Row>
            <Col className="gutter-2" onClick={() => !isDragging() && cwpStore.openChangeBearingForAircraft(aircraftId)}>{Math.round(bearing)}</Col>
            <Col className="gutter-2" />
            <Col className="gutter-2" />
          </Row>
          <Row>
            <Col className="gutter-2" onClick={() => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>{Number.parseFloat((altitude).toFixed(0))}</Col>
            <Col className="gutter-2" onMouseDown={middleClickNextWaypoint} onClick={() => !isDragging() && cwpStore.toggleFlightRouteForAircraft(aircraftId)}>
              {nextFix}
            </Col>
            <Col className="gutter-2" />
          </Row>
          <Row>
            <Col className="gutter-2" onMouseDown={handleSpeedClick} onClick={() => !isDragging() && cwpStore.toggleSpeedVectorForAircraft(aircraftId)}>{speedAndWakeTurbulenceLabel}</Col>
            <Col className="gutter-2" onClick={() => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>NSFL</Col>
            <Col className="gutter-2" />
          </Row>
          <Row>
            <Col className="gutter-2" onClick={() => !isDragging() && cwpStore.openNextSectorPopupForAircraft(aircraftId)}>{nextSectorController}</Col>
            <Col className="gutter-2">{assignedFlightLevel}</Col>
            <Col className="gutter-2" onClick={() => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>COO</Col>
          </Row>
        </Container>
      </div>
    </DraggablePopup>
  );
});
