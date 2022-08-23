/* eslint-disable @typescript-eslint/unbound-method */
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { changeSpeedOfAircraft } from '../mqtt';
import { configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeNextFixPopup(properties: { aircraft: AircraftModel }) {
  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    controlledBy,
    setAssignedSpeed,
  } = properties.aircraft;

  // TODO #95: Replace use of Ref/ID by a classic react value/onChange
  const newChangedSpeedInputReference = React.useRef<HTMLInputElement>(null);

  const shouldShow = cwpStore.aircraftWithSpeedChangePopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeChangeSpeedForAircraft(aircraftId);

  const submit = (): void => {
    const newSpeed = Number.parseInt(
      newChangedSpeedInputReference.current?.value ?? '',
      10);
    if (Number.isNaN(newSpeed)) {
      return;
    }
    setAssignedSpeed(newSpeed);
    if (configurationStore.currentCWP === 'All') {
      changeSpeedOfAircraft('All', assignedFlightId, newSpeed);
    } else {
      changeSpeedOfAircraft(controlledBy, assignedFlightId, newSpeed);
    }
    close();
  };

  return (
    <Popup
      className="change-bearing"
      anchor="bottom"
      longitude={longitude}
      latitude={latitude}
      offset={[53, 100]}
      closeOnClick={false}
      onClose={close}
      closeButton={false}
    >
      <Container className="choose-next-controller">
        <Row className="submit-cancel-wrapper">
          <Col className="gutter-2">
            <span>
              New Speed:
              <input ref={newChangedSpeedInputReference} className="input-filter-popup"
                type="number" min="0" />
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-2">
            <Button onClick={close}
              className="btn btn-light submit-cancel-button" size="sm" variant="secondary">
              Cancel
            </Button>
          </Col>
          <Col className="gutter-2">
            <Button onClick={submit}
              className="btn btn-light submit-cancel-button" size="sm" variant="secondary">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Popup>
  );
});
