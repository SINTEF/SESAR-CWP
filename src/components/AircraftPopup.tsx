import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useMap } from 'react-map-gl';

import { isDragging } from '../draggableState';
import { acceptFlight } from '../mqtt';
import {
  aircraftStore, configurationStore, cwpStore, roleConfigurationStore,
} from '../state';
import DraggablePopup from './DraggablePopup';
import type AircraftModel from '../model/AircraftModel';

export default observer(function AircraftPopup(properties: { aircraft: AircraftModel }) {
  const { aircraft } = properties;
  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownAltitude: altitude,
    callSign,
    speedAndWakeTurbulenceLabel,
    controlledBy,
    nextSectorController,
    nextFix,
    assignedFlightLevel,
    setAssignedFlightLevel,
  } = aircraft;

  let flightColor = '#ffffff';
  const listOfTentatives = roleConfigurationStore.roleConfigurations
    .get(configurationStore.currentCWP)?.tentativeAircrafts;
  if (controlledBy === configurationStore.currentCWP) {
    flightColor = '#78e251';
  }
  if (listOfTentatives?.includes(aircraftId)) {
    flightColor = '#ff00ff';
  }
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
    setAssignedFlightLevel(' ');
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

  function onWheel<T>(event: T): void {
    const map = current?.getMap();
    // @ts-expect-error - .wheel is an undocumented function that takes wheel events
    (map?.scrollZoom.wheel as (event: T) => void)({
      ...event,
      preventDefault: () => { },
    });
  }

  return (
    <DraggablePopup
      className="flight-popup"
      style={{ color: flightColor }}
      color={flightColor === '#ffffff' ? undefined : flightColor}
      offset={{ x: 0, y: 0 }}
      anchor="top"
      longitude={longitude}
      latitude={latitude}
      closeOnClick={false}
      closeButton={false}
      focusAfterOpen={false}
      onClose={(): void => cwpStore.closeLevelPopupForAircraft(aircraftId)}
    >
      <div onWheel={onWheel}>
        <Button size="sm" variant="dark" onClick={(): false | void => !isDragging() && cwpStore.closePopupForAircraft(aircraftId)}>x</Button>
        <Container className="flight-popup-container">
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
            <Col className="gutter-2">{assignedFlightLevel}</Col>
            <Col className="gutter-2" onClick={(): false | void => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>COO</Col>
          </Row>
        </Container>
      </div>
    </DraggablePopup>
  );
});
