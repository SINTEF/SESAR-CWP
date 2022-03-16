import { observer } from 'mobx-react-lite';
import React from 'react';
import {
 Button, Col, Container, Row,
} from 'react-bootstrap';
import { Marker, Popup } from 'react-map-gl';

// eslint-disable-next-line max-len
const ICON = 'M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z';
const SIZE = 20;

function ListOfLevels(properties) {
  const sliderValue = properties.value;
  const settingSlider = properties.onClick;
  const rows = [];
   for (let index = 560; index > 200; index -= 10) {
   if (index === sliderValue) {
      const element = <Row onClick={() => settingSlider(index)} key={index} className="child justify-content-center gutter-2"><Button id={`button-${index}`} className="flight-level-element" variant="secondary" size="sm" active>{index}</Button></Row>;
      rows.push(element);
   } else {
   rows.push(<Row onClick={() => settingSlider(index)} key={index} className="child justify-content-center gutter-2"><Button id={`button-${index}`} className="flight-level-element" variant="secondary" size="sm">{index}</Button></Row>,
);
}
   }

  return rows;
}
function FlightLevelChange(direction) {
  const slider = document.querySelector('#level-range');
  const step = Number.parseInt(slider.getAttribute('step'), 10);
  const currentSliderValue = Number.parseInt(slider.value, 10);
  let newStepValue = currentSliderValue + step;

  newStepValue = direction === 'up' ? currentSliderValue + step : currentSliderValue - step;
  slider.value = newStepValue;
  const listElement = document.querySelector(`#button-${newStepValue}`);
  listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  listElement.setAttribute('active', 'true');
}

export default observer((properties) => {
  const {
    // eslint-disable-next-line no-unused-vars
    bearing, longitude, latitude, altitude, onClick, callSign, wakeTurbulence,
  } = properties;

  const [showLevels, setShowLevels] = React.useState(false);
  const [showFlightLabel, setFlightLabel] = React.useState(true);
  const [flightLevel, setFlightLevel] = React.useState(350);

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
          offset={[50, 184]}
          closeOnClick={false}
          onClose={() => setShowLevels(false)}
        >
          <Container className="choose-flight-level">
            <Row className="justify-content-center">
              {callSign}

            </Row>
            <Row>
              <Col id="levels-container" className="levels-container">
                <ListOfLevels value={flightLevel} onClick={setFlightLevel} />
              </Col>
              <Col>
                <Button onClick={() => FlightLevelChange('up')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11165;</Button>
                <Row><input id="level-range" className="level-range" type="range" value={flightLevel} onChange={(event) => setFlightLevel(event.target.value)} step={10} min={210} max={560} size="sm" variant="secondary" /></Row>
                <Button onClick={() => FlightLevelChange('down')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11167;</Button>
              </Col>
            </Row>
            <Row>
              <Col className="apply-cancel-wrapper"><Button className="apply-cancel-button" size="sm" variant="secondary">Cancel</Button></Col>
              <Col className="apply-cancel-wrapper"><Button className="apply-cancel-button" size="sm" variant="secondary">Apply</Button></Col>
            </Row>
          </Container>
        </Popup>
      )}
    </Marker>
  );
});
