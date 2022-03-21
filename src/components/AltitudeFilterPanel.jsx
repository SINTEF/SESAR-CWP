import './AltitudeFilterPanel.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Card, Col, Row,
} from 'react-bootstrap';

import { cwpStore } from '../state';

export default observer((/* properties */) => {
  const { showFILT, altitudeFilter } = cwpStore;

  const {
    lowestBound, highestBound, setLowBound, setHighBound,
  } = altitudeFilter;

  // eslint-disable-next-line unicorn/no-null
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
            <input type="range" value={highestBound} onChange={(event) => setHighBound(Number.parseInt(event.target.value, 10))} className="range" min="300" max="1000" />
            <input type="range" value={lowestBound} onChange={(event) => setLowBound(Number.parseInt(event.target.value, 10))} className="range" min="0" max="300" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
});
