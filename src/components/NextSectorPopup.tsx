import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Dropdown, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { tentativeFlight } from '../mqtt';
import { configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function NextSectorPopup(properties: {
  aircraft: AircraftModel,
}) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    controlledBy,
    setNextSectorController,
  } = properties.aircraft;

  const [controllerPlaceholder, setControllerPlaceholder] = React.useState(controlledBy);
  const shouldShow = cwpStore.aircraftsWithSectorPopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeNextSectorPopupForAircraft(aircraftId);

  const handleSelect = (value: string | null): void => {
    if (value) {
      setControllerPlaceholder(value);
    }
  };
  const submit = (): void => {
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
      offset={[75, 98]}
      closeOnClick={false}
      onClose={close}
      closeButton={false}
    >
      <Container className="choose-next-controller">
        <Row className="submit-cancel-wrapper">
          <Col className="gutter-2">
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle className="btn btn-light dropdown-button">
                {controllerPlaceholder}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* Needs to be set by configuration-file */}
                <Dropdown.Item eventKey="CWP_NW">CWP_NW</Dropdown.Item>
                <Dropdown.Item eventKey="CWP_NE">CWP_NE</Dropdown.Item>
                <Dropdown.Item eventKey="CWP_S">CWP_S</Dropdown.Item>
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
