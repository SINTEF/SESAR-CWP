import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Accordion, Card, Col, Navbar, Row,
} from 'react-bootstrap';

import { cwpStore } from '../state';
import CustomToggle from './CustomToggle';

export default observer((/* properties */) => {
  const {
    lowestBound, highestBound, setLowBound, setHighBound,
  } = cwpStore.altitudeFilter;

  const { toggleSFL, toggleFL, toggleFlightLabels } = cwpStore;

  return (
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
                    <input type="range" value={highestBound} onChange={(event) => setHighBound(Number.parseInt(event.target.value, 10))} className="range" min="300" max="1000" />
                    <input type="range" value={lowestBound} onChange={(event) => setLowBound(Number.parseInt(event.target.value, 10))} className="range" min="0" max="300" />
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <button type="button" onClick={() => toggleFL()} style={{ backgroundColor: 'rgb(34, 34, 34)', color: '#fff' }} className="toggle-SFL-button">FL</button>
        <button type="button" onClick={() => toggleSFL()} style={{ backgroundColor: 'rgb(34, 34, 34)', color: '#fff' }} className="toggle-SFL-button">SFL</button>
        <button type="button" onClick={() => toggleFlightLabels()} style={{ backgroundColor: 'rgb(34, 34, 34)', color: '#fff' }} className="toggle-label-button">Toggle Sector Label</button>
      </Navbar>
    </div>
  );
});
