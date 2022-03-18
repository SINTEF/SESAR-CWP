import './AircraftMarker.css';

import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { Marker, Popup } from 'react-map-gl';

import { cwpStore } from './state';

// eslint-disable-next-line max-len
const ICON = 'M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z';
const SIZE = 20;

function ListOfLevels(properties) {
  const sliderValue = properties.value;
  const settingSlider = properties.onClick;
  const rows = [];
  for (let index = 560; index > 200; index -= 10) {
    if (index === sliderValue) {
      rows.push(<Row onClick={() => settingSlider(index)} key={index} className="child justify-content-center gutter-2"><Button id={`button${index}`} className="flight-level-element" variant="secondary" size="sm" active>{index}</Button></Row>,
      );
    } else {
      rows.push(<Row onClick={() => settingSlider(index)} key={index} className="child justify-content-center gutter-2"><Button id={`button${index}`} className="flight-level-element" variant="secondary" size="sm">{index}</Button></Row>,
      );
    }
  }

  return rows;
}

export default observer((properties) => {
  const showAllFlightLabels = cwpStore.showFlightLabels;

  const {
    // eslint-disable-next-line no-unused-vars
    bearing, longitude, latitude, altitude, onClick, callSign, wakeTurbulence, aircraftId,
  } = properties;

  const [showLevels, setShowLevels] = React.useState(false);
  const showFlightLabel = cwpStore.aircraftsWithPopups.has(aircraftId);
  const [flightLevel, setFlightLevel] = React.useState(Math.ceil(altitude / 10) * 10);
  const [flightColor, setFlightColor] = React.useState('#fff');
  const [FLCP, setFLCP] = React.useState('');

  const FlightLevelChangeSlide = (value) => {
    const parentElement = document.querySelector(`#${callSign}rangelist`);
    const listElement = parentElement.querySelector(`#button${Math.ceil(value / 10) * 10}`);
    listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const FlightLevelChange = (direction) => {
    const slider = document.querySelector(`#level-range${callSign}`);
    const step = Number.parseInt(slider.getAttribute('step'), 10);
    const currentSliderValue = Number.parseInt(slider.value, 10);
    let newStepValue = currentSliderValue + step;

    newStepValue = direction === 'up' ? currentSliderValue + step : currentSliderValue - step;
    slider.value = newStepValue;
    setFlightLevel(newStepValue);
    const parentElement = document.querySelector(`#${callSign}rangelist`);
    const listElement = parentElement.querySelector(`#button${Math.ceil(newStepValue / 10) * 10}`);
    listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Marker longitude={longitude} latitude={latitude} rotation={bearing}>
      <svg
        height={SIZE}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        style={{
          cursor: 'pointer',
          fill: flightColor, // change depending on limbo or own flights
          stroke: 'none',
        }}
        onClick={() => cwpStore.openPopupForAircraft(aircraftId)}
      >
        <path d={ICON} />
      </svg>
      {showAllFlightLabels && showFlightLabel && (
        <Popup
          className="flight-popup"
          tipSize={2}
          style={{ color: flightColor }}
          offset={[50, 7]}
          anchor="top"
          longitude={longitude}
          latitude={latitude}
          closeOnClick={false}
          closeButton={false}
          onClose={() => setShowLevels(false)}

        >
          <Button size="sm" variant="dark" onClick={() => cwpStore.closePopupForAircraft(aircraftId)}>x</Button>
          <Container className="flight-popup-container">
            <Row>
              <Col className="gutter-2" onClick={() => setFlightColor('#0f0')}>{callSign}</Col>
            </Row>
            <Row>
              <Col className="gutter-2" onClick={() => setShowLevels(true)}>{Number.parseFloat((altitude).toFixed(0))}</Col>
              <Col className="gutter-2">Fix</Col>
              <Col className="gutter-2" />
            </Row>
            <Row>
              <Col className="gutter-2" onClick={() => cwpStore.toggleSpeedVectorForAircraft(aircraftId)}>{wakeTurbulence}</Col>
              <Col className="gutter-2">FLNS</Col>
              <Col className="gutter-2" />
            </Row>
            <Row>
              <Col className="gutter-2" onClick={() => cwpStore.toggleFlightRouteForAircraft(aircraftId)}>NS</Col>
              <Col className="gutter-2">{FLCP}</Col>
              <Col className="gutter-2">FLACC</Col>
            </Row>
          </Container>
        </Popup>
      )}
      {showLevels && (
        <Popup
          // className="level-popup"
          anchor="bottom"
          longitude={longitude}
          latitude={latitude}
          offset={[50, 240]}
          className={classnames({
            pending: false,
            accepted: true,
            other: false,
            'level-popup': true,
          })}
          closeOnClick={false}
          onClose={() => setShowLevels(false)}
        >
          <Container className="choose-flight-level">
            <Row className="justify-content-center">
              {callSign}

            </Row>
            <Row>
              <Col id="levels-container" className="levels-container">
                <div id={`${callSign}rangelist`}>
                  <ListOfLevels id={callSign} value={flightLevel} />

                </div>
              </Col>
              <Col>
                <Button onClick={() => FlightLevelChange('up')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11165;</Button>
                <Row><input id={`level-range${callSign}`} className="level-range" type="range" value={flightLevel} onChange={(event) => setFlightLevel(event.target.value)} onMouseUp={(event) => FlightLevelChangeSlide(event.target.value)} step={10} min={210} max={560} size="sm" variant="secondary" /></Row>
                <Button onClick={() => FlightLevelChange('down')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11167;</Button>
              </Col>
            </Row>
            <Row>
              <Col className="apply-cancel-wrapper"><Button onClick={() => setShowLevels(false)} className="apply-cancel-button" size="sm" variant="secondary">Cancel</Button></Col>
              <Col className="apply-cancel-wrapper"><Button onClick={() => setFLCP(flightLevel)} className="apply-cancel-button" size="sm" variant="secondary">Apply</Button></Col>
            </Row>
          </Container>
        </Popup>
      )}
    </Marker>
  );
});
