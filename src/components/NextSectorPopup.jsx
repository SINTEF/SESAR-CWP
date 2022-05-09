// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Dropdown, DropdownButton, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { tentativeFlight } from '../mqtt';
import { configurationStore, cwpStore } from '../state';

export default observer(function NextSectorPopup(properties) {
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
  const shouldShow = cwpStore.aircraftsWithSectorPopup.has(aircraftId);
  if (!shouldShow) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
  const close = () => cwpStore.closeNextSectorPopupForAircraft(aircraftId);

  const handleSelect = (value) => {
    setControllerPlaceholder(value);
  };
  const submit = () => {
    setNextSectorController(controllerPlaceholder);
    if (configurationStore.currentCWP === 'All') {
      tentativeFlight('All', controllerPlaceholder, assignedFlightId);
    } else { tentativeFlight(controlledBy, controllerPlaceholder, assignedFlightId); }
    close();
  };

  return (
    <Popup
      className="next-sector-popup"
      anchor="bottom"
      longitude={longitude}
      latitude={latitude}
      offset={[75, 95]}
      closeOnClick={false}
      onClose={close}
      closeButton={false}
    >
      <Container className="choose-next-controller">
        <Row className="justify-content-center submit-cancel-wrapper">
          <Col className="gutter-2">
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle className="btn btn-light dropdown-button">
                {controllerPlaceholder}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* Needs to be set by configuration-file */}
                <Dropdown.Item className="apply-cancel-button" eventKey="CWP_NW">CWP_NW</Dropdown.Item>
                <Dropdown.Item className="apply-cancel-button" eventKey="CWP_NE">CWP_NE</Dropdown.Item>
                <Dropdown.Item className="apply-cancel-button" eventKey="CWP_S">CWP_S</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col className="gutter-2"><Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button></Col>
          <Col className="gutter-2"><Button onClick={submit} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Submit</Button></Col>
        </Row>
      </Container>
    </Popup>
  );
});
