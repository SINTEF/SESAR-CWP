import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';

import { isDragging } from '../draggableState';
import { acceptFlight } from '../mqtt';
import {
  aircraftStore, configurationStore, cwpStore, roleConfigurationStore,
} from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function AircraftPopupContent(properties: {
  aircraft: AircraftModel;
}) {
  const { aircraft } = properties;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    assignedFlightId,
    lastKnownAltitude: altitude,
    callSign,
    speedAndWakeTurbulenceLabel,
    controlledBy,
    nextSectorController,
    nextFix,
    localAssignedFlightLevel,
    setLocalAssignedFlightLevel,
  } = aircraft;

  if (localAssignedFlightLevel === altitude.toFixed(0)) {
    setLocalAssignedFlightLevel(' ');
  }

  const setController = (): void => {
    // TODO #97: Implement setController shared across browsers, usinq MQTT
    const listOfTentativeFlights = roleConfigurationStore
      .roleConfigurations.get(configurationStore.currentCWP)?.tentativeAircrafts;
    if (listOfTentativeFlights?.includes(aircraftId)) {
      roleConfigurationStore.roleConfigurations
        .get(configurationStore.currentCWP)?.removeTentativeAircraft(aircraftId);
    }
    aircraftStore.aircrafts.get(aircraftId)?.setController(configurationStore.currentCWP);
    acceptFlight(controlledBy, configurationStore.currentCWP, assignedFlightId);
  };
  return (<Container className="flight-popup-container">
    <Row>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && setController()}>{callSign}</Col>
    </Row>
    <Row>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>{Number.parseFloat((altitude).toFixed(0))}</Col>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.toggleFlightRouteForAircraft(aircraftId)}>
        {nextFix}
      </Col>
      <Col className="gutter-2" />
    </Row>
    <Row>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.toggleSpeedVectorForAircraft(aircraftId)}>{speedAndWakeTurbulenceLabel}</Col>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>NSFL</Col>
      <Col className="gutter-2" />
    </Row>
    <Row>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openNextSectorPopupForAircraft(aircraftId)}>{nextSectorController}</Col>
      <Col className="gutter-2">{localAssignedFlightLevel}</Col>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>COO</Col>
    </Row>
  </Container>);
});