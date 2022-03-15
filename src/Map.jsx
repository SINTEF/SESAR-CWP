import * as maplibregl from 'maplibre-gl';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Accordion,
Card, Col, Navbar, Row, useAccordionButton,
} from 'react-bootstrap';
import ReactMapGL, { FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';

// import AircraftPopup from './AircraftPopup';
import Aircrafts from './Aircrafts';
import FixesPoint from './FixesPoint';
import SectorPolygon from './SectorPolygons';

const mapStyle = {
  version: 8,
  name: 'Black',
  metadata: {},
  sources: {},
  glyphs: 'http://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
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

function ToggleFlightLabels() {
const popup = document.querySelectorAll('.mapboxgl-popup');
let count = 0;
for (const element of popup) {
if (element.style.display === 'none') {
count += 1;
}
}
if (count > 10) {
  for (const element of popup) {
  element.style.display = 'grid';
  }
} else {
 for (const element of popup) {
element.style.display = 'none';
    }
  }
}
function ToggleSFL() {
  const sectorFlightList = document.querySelectorAll('.sector-flight-list');
  sectorFlightList[0].style.display = sectorFlightList[0].style.display === 'none' ? 'block' : 'none';
}
function ToggleFL() {
  const flightList = document.querySelectorAll('.aircraft-list');
  flightList[0].style.display = flightList[0].style.display === 'none' ? 'block' : 'none';
}

export default function Map() {
  const initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  };

  // const [popupInfo, setPopupInfo] = useState(undefined);

  // const onAircraftClick = (aircraftId) => {
  //   setPopupInfo(aircraftId);
  // };
  // // eslint-disable-next-line unicorn/consistent-function-scoping
  // const onPopupClose = () => {
  //   setPopupInfo(undefined);
  // };
  const [highestBound, setHighBound] = useState('400');
  const [lowestBound, setLowBound] = useState('205');

  return (
    <ReactMapGL
      style={style}
      initialViewState={initialViewState}
      mapStyle={mapStyle}
      attributionControl={false}
      mapLib={maplibregl}
      antialias
    >

      <Aircrafts highestBound={highestBound} lowestBound={lowestBound} />
      {/* {popupInfo && (<AircraftPopup onClose={onPopupClose} aircraftId={popupInfo} />)} */}
      <SectorPolygon highestBound={highestBound} lowestBound={lowestBound} />
      <FixesPoint />
      <div className="navbar button-navbar fixed-bottom">
        <Navbar fixed="bottom">
          <Accordion className="filter-panel">
            <Card className="card">
              <Card.Header className="filter-header">
                <CustomToggle eventKey="0">FILT</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="body-panel">
                  <Row className="justify-content-center">
                    <Col>
                      Altitude Filter
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col className="align-self-center">
                      <button type="button" className="set-button"> SET </button>
                    </Col>
                    <Col className="align-self-start">
                      <h6>
                        H:
                        {' '}
                        {highestBound}
                      </h6>

                      <h6>
                        L:
                        {' '}
                        {lowestBound}
                      </h6>
                    </Col>
                    <Col className="range-wrapper align-self-start">
                      <input type="range" value={highestBound} onChange={(event) => setHighBound(event.target.value)} className="range" min="300" max="1000" />
                      <input type="range" value={lowestBound} onChange={(event) => setLowBound(event.target.value)} className="range" min="0" max="300" />
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <button type="button" onClick={() => ToggleFL()} style={{ backgroundColor: 'rgb(34, 34, 34)', color: '#fff' }} className="toggle-SFL-button">FL</button>
          <button type="button" onClick={() => ToggleSFL()} style={{ backgroundColor: 'rgb(34, 34, 34)', color: '#fff' }} className="toggle-SFL-button">SFL</button>
          <button type="button" onClick={() => ToggleFlightLabels()} style={{ backgroundColor: 'rgb(34, 34, 34)', color: '#fff' }} className="toggle-label-button">Toggle Sector Label</button>
        </Navbar>
      </div>
      <ScaleControl position="bottom-left" />
      <NavigationControl position="bottom-left" />
      <FullscreenControl position="bottom-left" containerId="root" />
    </ReactMapGL>
  );
}
