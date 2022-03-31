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

export default observer(function AircraftLevelPopup(properties) {
  const {
    aircraftId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownAltitude: altitude,
    callSign,
    controlledBy,
    setAssignedFlightLevel,
    setNextSectorController,
  } = properties.aircraft;

  // Not using controllBy, because value is CWP and not only C as in dropdown
  const [controllerPlaceholder, setControllerPlaceholder] = React.useState('C-NW');
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
    tentativeFlight(controlledBy, controllerPlaceholder, aircraftId);
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
                <Dropdown.Item className="apply-cancel-button" eventKey="C-NW">C-NW</Dropdown.Item>
                <Dropdown.Item className="apply-cancel-button" eventKey="C-NE">C-NE</Dropdown.Item>
                <Dropdown.Item className="apply-cancel-button" eventKey="C-SE">C-SE</Dropdown.Item>
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
