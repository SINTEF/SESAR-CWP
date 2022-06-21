// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Dropdown, DropdownButton, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { changeBearingOfAircraft, tentativeFlight } from '../mqtt';
import { configurationStore, cwpStore } from '../state';

export default observer(function ChangeBearingPopup(properties) {
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

  const [controllerPlaceholder, setControllerPlaceholder] = React.useState(controlledBy);
  const shouldShow = cwpStore.aircraftsWithBearingPopup.has(aircraftId);
  if (!shouldShow) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
  const close = () => cwpStore.closeChangeBearingForAircraft(aircraftId);

  const submit = () => {
    const newBearing = Number.parseInt(document.querySelector('#new-changed-bearing').value, 10);
    console.log(newBearing);
    if (configurationStore.currentCWP === 'All') {
      changeBearingOfAircraft('All', assignedFlightId, newBearing);
    } else { changeBearingOfAircraft(controlledBy, assignedFlightId, newBearing); }
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
              <input id="new-changed-bearing" className="input-filter" />
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
