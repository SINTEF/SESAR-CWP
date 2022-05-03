// Not in use right now
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { DraggableCore } from 'react-draggable';
import { Popup } from 'react-map-gl';

import { acceptFlight } from '../mqtt';
import { aircraftStore, configurationStore, cwpStore } from '../state';

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

  const [offsetX, setOffsetX] = React.useState(50);
  const [offsetY, setOffsetY] = React.useState(7);
  const [firstX, setFirstX] = React.useState(0);
  const [firstY, setFirstY] = React.useState(0);

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

  const onDragStart = (event) => {
    const { clientX, clientY } = event;
    setFirstX(clientX);
    setFirstY(clientY);
  };

  const onDrag = (event) => {
    const { clientX, clientY } = event;
    const diffX = clientX - firstX;
    const diffY = clientY - firstY;
    console.log(event, {
      firstX, firstY, diffX, diffY,
    });
    setOffsetX(diffX + 50);
    setOffsetY(diffY + 7);
  };

  return (
    <Popup
      className="flight-popup"
      tipSize={2}
      style={{ color: flightColor }}
      offset={[offsetX, offsetY]}
      anchor="top"
      draggable
      longitude={longitude}
      latitude={latitude}
      closeOnClick={false}
      closeButton={false}
      focusAfterOpen={false}
      onClose={() => cwpStore.closeLevelPopupForAircraft(aircraftId)}
    >
      <DraggableCore onStart={onDragStart} onDrag={onDrag}>
        <div>
          <Button size="sm" variant="dark" onClick={() => cwpStore.closePopupForAircraft(aircraftId)}>x</Button>
          <Container className="flight-popup-container">
            <Row>
              <Col className="gutter-2" onClick={() => setController()}>{callSign}</Col>
            </Row>
            <Row>
              <Col className="gutter-2" onClick={() => cwpStore.openLevelPopupForAircraft(aircraftId)}>{Number.parseFloat((altitude).toFixed(0))}</Col>
              <Col className="gutter-2" onClick={() => cwpStore.toggleFlightRouteForAircraft(aircraftId)}>
                {nextFix}
              </Col>
              <Col className="gutter-2" />
            </Row>
            <Row>
              <Col className="gutter-2" onClick={() => cwpStore.toggleSpeedVectorForAircraft(aircraftId)}>{speedAndWakeTurbulenceLabel}</Col>
              <Col className="gutter-2" onClick={() => cwpStore.openLevelPopupForAircraft(aircraftId)}>NSFL</Col>
              <Col className="gutter-2" />
            </Row>
            <Row>
              <Col className="gutter-2" onClick={() => cwpStore.openNextSectorPopupForAircraft(aircraftId)}>{nextSectorController}</Col>
              <Col className="gutter-2">{assignedFlightLevel}</Col>
              <Col className="gutter-2" onClick={() => cwpStore.openLevelPopupForAircraft(aircraftId)}>COO</Col>
            </Row>
          </Container>

        </div>
      </DraggableCore>
    </Popup>

  );
});
