// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Dropdown, DropdownButton, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { changeNextWaypointOfAircraft } from '../mqtt';
import { configurationStore, cwpStore, fixStore } from '../state';

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

  const shouldShow = cwpStore.aircraftsWithNextFixPopup.has(aircraftId);
  if (!shouldShow) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
  const close = () => cwpStore.closeChangeNextFixForAircraft(aircraftId);

  const submit = () => {
    const newNextFix = document.querySelector('#new-changed-fix').value.toUpperCase();
    const latOfFix = fixStore.fixes.get(newNextFix).latitude;
    const longOfFix = fixStore.fixes.get(newNextFix).longitude;
    if (configurationStore.currentCWP === 'All') {
      changeNextWaypointOfAircraft('All', newNextFix, assignedFlightId, Number.parseFloat(latOfFix), Number.parseFloat(longOfFix));
      // changeNextWaypointOfAircraft('All', newNextFix, assignedFlightId);
    } else {
      changeNextWaypointOfAircraft(controlledBy, newNextFix, assignedFlightId, latOfFix, longOfFix);
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
              Next Fix:
              <input id="new-changed-fix" className="input-filter" />
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
