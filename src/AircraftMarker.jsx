import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Marker, Popup } from 'react-map-gl';

// eslint-disable-next-line max-len
const ICON = 'M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z';
const SIZE = 20;

export default observer((properties) => {
  const {
    // eslint-disable-next-line no-unused-vars
    bearing, longitude, latitude, altitude, onClick, callSign, wakeTurbulence,
  } = properties;

  const [showLevels, setShowLevels] = React.useState(false);
  const [showFlightLabel, setFlightLabel] = React.useState(true);

  return (
    <Marker longitude={longitude} latitude={latitude} rotation={bearing}>
      <svg
        height={SIZE}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        style={{
          cursor: 'pointer',
          fill: '#fff', // change depending on limbo or own flights
          stroke: 'none',
        }}
        onClick={() => setFlightLabel(true)}
      >
        <path d={ICON} />
      </svg>
      {showFlightLabel && (
        <Popup
          className="flight-popup"
          tipSize={2}
          offset={[50, 7]}
          anchor="top"
          longitude={longitude}
          latitude={latitude}
          closeOnClick={false}
          onClose={() => setFlightLabel(false)}
        >
          <Container className="flight-popup-container">
            <Row>
              <Col className="gutter-2" onClick={() => console.log('Accepting the flight')}>{callSign}</Col>
            </Row>
            <Row>
              <Col className="gutter-2" onClick={() => setShowLevels(true)}>{Number.parseFloat((altitude).toFixed(0))}</Col>
              <Col className="gutter-2">Fix</Col>
              <Col className="gutter-2" />
            </Row>
            <Row>
              <Col className="gutter-2">{wakeTurbulence}</Col>
              <Col className="gutter-2">FLNS</Col>
              <Col className="gutter-2" />
            </Row>
            <Row>
              <Col className="gutter-2" onClick={() => console.log('Show flight trajectory')}>NS</Col>
              <Col className="gutter-2">FLCP</Col>
              <Col className="gutter-2">FLACC</Col>
            </Row>
          </Container>
        </Popup>
      )}
      {showLevels && (
        <Popup
          className="level-popup"
          anchor="bottom"
          longitude={longitude}
          latitude={latitude}
          offset={[50, 100]}
          closeOnClick={false}
          onClose={() => setShowLevels(false)}
        >
          <Container className="choose-flight-level">
            <Col className="row justify-content-start">
              <Col>Fix</Col>
              <Col />
            </Col>
            <Col>
              Slider
            </Col>
          </Container>
        </Popup>
      )}
    </Marker>
  );
});
