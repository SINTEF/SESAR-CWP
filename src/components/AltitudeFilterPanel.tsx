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
            <p>
              H:&nbsp;
              <input className="input-filter-panel" style={{ width: '40px', fontSize: '12px' }} type="text" value={Number.isNaN(highestBound) ? 0 : highestBound}
                onChange={(event): void => setHighBound(Number.parseInt(event.target.value, 10))} />
              {' '}
            </p>
            <p>
              L:&nbsp;
              <input className="input-filter-panel" style={{ width: '43px', fontSize: '12px' }} type="text" value={Number.isNaN(lowestBound) ? 0 : lowestBound}
                onChange={(event): void => setLowBound(Number.parseInt(event.target.value, 10))} />

              {' '}
            </p>
          </Col>
          <Col className="range-wrapper align-self-start">
            <input type="range" value={highestBound} className="range" min={lowestBound} max="1000"
              onChange={(event): void => setHighBound(
                Number.parseInt(event.target.value, 10) || 0)} />
            <input type="range" value={lowestBound} className="range" min="0" max={highestBound}
              onChange={(event): void => setLowBound(
                Number.parseInt(event.target.value, 10) || 0)} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
});
