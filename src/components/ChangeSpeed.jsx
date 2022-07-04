// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Dropdown, DropdownButton, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { changeSpeedOfAircraft } from '../mqtt';
import { configurationStore, cwpStore } from '../state';

export default observer(function ChangeNextFixPopup(properties) {
  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownAltitude: altitude,
    callSign,
    controlledBy,
    setAssignedFlightLevel,
    setNextSectorController,
  } = properties.aircraft;

  const shouldShow = cwpStore.aircraftWithSpeedChangePopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = () => cwpStore.closeChangeSpeedForAircraft(aircraftId);

  const submit = () => {
    const newSpeed = Number.parseInt(document.querySelector('#new-changed-speed').value, 10);
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
      offset={[45, 100]}
      closeOnClick={false}
      onClose={close}
      closeButton={false}
    >
      <Container className="choose-next-controller">
        <Row className="submit-cancel-wrapper">
          <Col className="gutter-2">
            <span>
              New Speed:
              <input id="new-changed-speed" className="input-filter" />
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
