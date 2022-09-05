import './AltitudeFilterPanel.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Card, Col, Row,
} from 'react-bootstrap';

import { cwpStore } from '../state';

export default observer(function AltitudeFilterPanel(/* properties */) {
  const { showFILT, altitudeFilter } = cwpStore;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    lowestBound, highestBound, setLowBound, setHighBound,
  } = altitudeFilter;

  if (!showFILT) return null;

  return (
    <Card className="card altitude-filter-panel">
      <Card.Body className="body-panel">
        <Row className="justify-content-center">
          <Col>
            Altitude Filter
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="align-self-center">
            {/* <button type="button" className="set-button"> SET </button> */}
          </Col>
          <Col className="align-self-start">
            <h6>
              H:
              <input className="input-filter" style={{ width: '2.5em' }} type="text" value={highestBound}
                onChange={(event): void => setHighBound(Number.parseInt(event.target.value, 10))} />
              {' '}
            </h6>
            <h6>
              L:
              <input className="input-filter" style={{ width: '2.5em' }} type="text" value={lowestBound}
                onChange={(event): void => setLowBound(Number.parseInt(event.target.value, 10))} />

              {' '}
            </h6>
          </Col>
          <Col className="range-wrapper align-self-start">
            <input type="range" value={highestBound} className="range" min="500" max="1000"
              onChange={(event): void => setHighBound(Number.parseInt(event.target.value, 10))} />
            <input type="range" value={lowestBound} className="range" min="0" max="500"
              onChange={(event): void => setLowBound(Number.parseInt(event.target.value, 10))} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
});
