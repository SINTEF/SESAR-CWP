import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';

import { isDragging } from '../draggableState';
import { acceptFlight, handlePublishPromise, persistFrontendFlightController } from '../mqtt/publishers';
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
    nextSectorFL,
    setNextSectorFL,
    nextACCFL,
    setNextACCFL,
  } = aircraft;
  if (nextSectorFL === altitude.toFixed(0)) {
    setNextSectorFL('NSFL');
  }
  if (nextACCFL === altitude.toFixed(0)) {
    setNextACCFL('COO');
  }
  if (localAssignedFlightLevel === altitude.toFixed(0)) {
    setLocalAssignedFlightLevel(' ');
  }
  const openNextACCPopup = (): void => {
    cwpStore.showFlACC(true);
    cwpStore.openLevelPopupForAircraft(aircraftId);
  };
  const openNSFLPopup = (): void => {
    cwpStore.showNSFL(true);
    cwpStore.openLevelPopupForAircraft(aircraftId);
  };
  const middleClickNextWaypoint = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.button === 1) {
      cwpStore.toggleFlightRouteForAircraft(aircraftId);
    }
  };

  const setController = (): void => {
    const listOfTentativeFlights = roleConfigurationStore
      .roleConfigurations.get(configurationStore.currentCWP)?.tentativeAircrafts;
    if (listOfTentativeFlights?.includes(aircraftId)) {
      roleConfigurationStore.roleConfigurations
        .get(configurationStore.currentCWP)?.removeTentativeAircraft(aircraftId);
    }
    aircraftStore.aircrafts.get(aircraftId)?.setController(configurationStore.currentCWP);
    handlePublishPromise(
      acceptFlight(controlledBy, configurationStore.currentCWP, assignedFlightId),
    );
    handlePublishPromise(
      persistFrontendFlightController(aircraftId, configurationStore.currentCWP),
    );
  };
  return (<Container className="flight-popup-container">
    <Row>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && setController()}>{callSign}</Col>
    </Row>
    <Row>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>{Number.parseFloat((altitude).toFixed(0))}</Col>
      <Col className="gutter-2" onMouseDown={middleClickNextWaypoint}>
        {nextFix}
      </Col>
      <Col className="gutter-2" />
    </Row>
    <Row>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.toggleSpeedVectorForAircraft(aircraftId)}>{speedAndWakeTurbulenceLabel}</Col>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && openNSFLPopup()}>{nextSectorFL}</Col>
      <Col className="gutter-2" />
    </Row>
    <Row>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openNextSectorPopupForAircraft(aircraftId)}>{nextSectorController}</Col>
      <Col className="gutter-2">{localAssignedFlightLevel}</Col>
      <Col className="gutter-2" onClick={(): false | void => !isDragging() && openNextACCPopup()}>{nextACCFL}</Col>
    </Row>
  </Container>);
});
