import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { changeBearingOfAircraft } from '../mqtt';
import { configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeBearingPopup(properties: { aircraft: AircraftModel }) {
  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    controlledBy,
  } = properties.aircraft;

  // TODO #95: Replace use of Ref/ID by a classic react value/onChange
  const newChangedBearingInputReference = React.useRef<HTMLInputElement>(null);

  const shouldShow = cwpStore.aircraftsWithBearingPopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeChangeBearingForAircraft(aircraftId);

  const submit = (): void => {
    const newBearing = Number.parseInt(
      newChangedBearingInputReference.current?.value ?? '',
      10);
    const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
    changeBearingOfAircraft(pilotId, assignedFlightId, newBearing);
    close();
  };

  return (
    <Popup
      className="change-bearing"
      anchor="bottom"
      longitude={longitude}
      latitude={latitude}
      offset={[45, 100]}
      closeOnClick={false}
      onClose={close}
      closeButton={false}
    >
      <Container className="choose-next-controller">
        <Row className="submit-cancel-wrapper">
          <Col className="gutter-2">
            <span>
              New Bearing:
              <input ref={newChangedBearingInputReference} className="input-filter"
                type="number" min="0" max="360" />
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-2"><Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button></Col>
          <Col className="gutter-2"><Button onClick={submit} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Submit</Button></Col>
        </Row>
      </Container>
    </Popup>
  );
});
