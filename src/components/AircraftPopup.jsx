import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';

import { isDragging } from '../draggableState';
import { acceptFlight } from '../mqtt';
import { aircraftStore, configurationStore, cwpStore } from '../state';
import DraggablePopup from './DraggablePopup';

export default observer(function AircraftPopup(properties) {
  const { aircraft } = properties;
  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

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

  const flightColor = controlledBy === configurationStore.currentCWP ? '#78e251' : '#ffffff';

  const showAllFlightLabels = cwpStore.showFlightLabels;

  const shouldShow = cwpStore.aircraftsWithManuallyOpenedPopup.has(aircraftId)
    || (altitude >= lowestBound && altitude <= highestBound
      && showAllFlightLabels
      && !cwpStore.aircraftsWithManuallyClosedPopup.has(aircraftId));

  if (!shouldShow) {
    // eslint-disable-next-line unicorn/no-null
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

  // const [position, setPosition] = useState({

  // })

  // const [events, logEvents] = useState < Record < string, LngLat>> ({});

  // const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
  //   logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
  // }, []);

  // const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
  //   logEvents(_events => ({ ..._events, onDrag: event.lngLat }));

  //   setMarker({
  //     longitude: event.lngLat.lng,
  //     latitude: event.lngLat.lat
  //   });
  // }, []);

  // const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
  //   logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
  // }, []);

  return (
    <DraggablePopup
      className="flight-popup"
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
            <Col className="gutter-2" onClick={() => !isDragging() && cwpStore.openLevelPopupForAircraft(aircraftId)}>{Number.parseFloat((altitude).toFixed(0))}</Col>
            <Col className="gutter-2" onClick={() => !isDragging() && cwpStore.toggleFlightRouteForAircraft(aircraftId)}>
              {nextFix}
            </Col>
            <Col className="gutter-2" />
          </Row>
          <Row>
            <Col className="gutter-2" onClick={() => !isDragging() && cwpStore.toggleSpeedVectorForAircraft(aircraftId)}>{speedAndWakeTurbulenceLabel}</Col>
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
