import * as maplibregl from 'maplibre-gl';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Accordion, Card, Col, Container, Row, useAccordionButton,
} from 'react-bootstrap';
import ReactMapGL, { FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';

import AircraftPopup from './AircraftPopup';
import Aircrafts from './Aircrafts';
import SectorPolygon from './SectorPolygons';

const mapStyle = {
  version: 8,
  name: 'Black',
  metadata: {},
  sources: {},
  layers: [{
    id: 'background',
    type: 'background',
    paint: {},
  }],
};

const style = {
  width: '100vw',
  height: '100vh',
  background: 'black',
};
function CustomToggle({ children, eventKey }) {
  const smallerButton = useAccordionButton(eventKey);
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      style={{ backgroundColor: 'rgb(34, 34, 34)', color: '#fff' }}
      onClick={smallerButton}
    >
      {children}
    </button>
  );
}
CustomToggle.propTypes = {
  children: PropTypes.string.isRequired,
  eventKey: PropTypes.string.isRequired,
};

export default function Map() {
  const initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  };

  const [popupInfo, setPopupInfo] = useState(undefined);

  const onAircraftClick = (aircraftId) => {
    setPopupInfo(aircraftId);
  };
  const onPopupClose = () => {
    setPopupInfo(undefined);
  };
  const highestBound = 10_500;
  const lowestBound = 2500;

  return (
    <ReactMapGL
      style={style}
      initialViewState={initialViewState}
      mapStyle={mapStyle}
      attributionControl={false}
      mapLib={maplibregl}
      antialias
    >
      <Aircrafts onClick={onAircraftClick} />
      {popupInfo && (<AircraftPopup onClose={onPopupClose} aircraftId={popupInfo} />)}
      <SectorPolygon />
      <Accordion className="filter-panel">
        <Card className="card">
          <Card.Header className="filter-header">
            <CustomToggle eventKey="0">FILT</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="body-panel">
              <Container>
                <Col className="align-self-center">
                  <p>
                    Altitude Filter
                  </p>
                </Col>
                <Row className="justify-content-md-center">
                  <div className="col align-self-center">
                    <button type="button" className="set-button"> SET </button>
                  </div>
                  <div className="col align-self-start">
                    <h4>
                      H:
                      {' '}
                      {highestBound / 10}
                    </h4>

                    <h4>
                      L:
                      {' '}
                      {lowestBound / 10}
                    </h4>
                  </div>
                </Row>
              </Container>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <ScaleControl position="bottom-left" />
      <NavigationControl position="bottom-left" />
      <FullscreenControl position="bottom-left" containerId="root" />
    </ReactMapGL>
  );
}
