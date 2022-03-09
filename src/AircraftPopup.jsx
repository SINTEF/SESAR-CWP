// Not in use right now
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { aircraftStore } from './state';

export default observer((properties) => {
  const { onClose, aircraftId } = properties;
  const info = aircraftStore.aircrafts.get(aircraftId);
  if (!info) {
    // eslint-disable-next-line no-console
    console.warn('No aircraft with id', aircraftId);
    return false;
  }

  const [showLevels, setShowLevels] = React.useState(false);

  return (
    <div>
      <Popup
        className="flight-popup"
        tipSize={2}
        offset={[50, 7]}
        anchor="top"
        longitude={info.lastKnownLongitude}
        latitude={info.lastKnownLatitude}
        closeOnClick={false}
        onClose={onClose}
      >
        <Container className="flight-popup-container">
          <Row>
            <Col className="gutter-2" onClick={() => console.log('Accepting the flight')}>{info.callSign}</Col>
          </Row>
          <Row>
            <Col className="gutter-2" onClick={() => setShowLevels(true)}>{Number.parseFloat((info.lastKnownAltitude).toFixed(0))}</Col>
            <Col className="gutter-2">Fix</Col>
            <Col className="gutter-2" />
          </Row>
          <Row>
            <Col className="gutter-2">{info.wakeTurbulence}</Col>
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
      {showLevels && (
        <Popup
          className="level-popup"
          anchor="bottom"
          longitude={info.lastKnownLongitude}
          latitude={info.lastKnownLatitude}
          offset={[50, 50]}
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
    </div>
  );
});
