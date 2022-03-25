// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { configurationStore, cwpStore } from '../state';

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

export default observer(function AircraftLevelPopup(properties) {
  const {
    aircraftId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownAltitude: altitude,
    callSign,
    controlledBy,
    setAssignedFlightLevel,
  } = properties.aircraft;

  const [flightLevel, setFlightLevel] = React.useState(Math.ceil(altitude / 10) * 10);

  const accepted = controlledBy === configurationStore.currentCWP;

  const shouldShow = cwpStore.aircraftsWithLevelPopup.has(aircraftId);

  if (!shouldShow) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

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

  const close = () => cwpStore.closeLevelPopupForAircraft(aircraftId);
  const setFLCP = () => {
    setAssignedFlightLevel(flightLevel);
    close();
  };

  return (
    <Popup
      // className="level-popup"
      anchor="bottom"
      longitude={longitude}
      latitude={latitude}
      offset={[50, 240]}
      className={classnames({
        pending: false,
        accepted,
        other: false,
        'level-popup': true,
      })}
      closeOnClick={false}
      onClose={() => close()}
    >
      <Container className="choose-flight-level">
        <Row className="justify-content-center">
          {callSign}

        </Row>
        <Row>
          <Col id="levels-container" className="levels-container">
            <div id={`${callSign}rangelist`}>
              <ListOfLevels id={callSign} value={flightLevel} onClick={setFlightLevel} />
            </div>
          </Col>
          <Col>
            <Button onClick={() => FlightLevelChange('up')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11165;</Button>
            <Row><input id={`level-range${callSign}`} className="level-range" type="range" value={flightLevel} onChange={(event) => setFlightLevel(event.target.value)} onMouseUp={(event) => FlightLevelChangeSlide(event.target.value)} step={10} min={210} max={560} size="sm" variant="secondary" /></Row>
            <Button onClick={() => FlightLevelChange('down')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11167;</Button>
          </Col>
        </Row>
        <Row>
          <Col className="apply-cancel-wrapper"><Button onClick={close} className="apply-cancel-button" size="sm" variant="secondary">Cancel</Button></Col>
          <Col className="apply-cancel-wrapper"><Button onClick={setFLCP} className="apply-cancel-button" size="sm" variant="secondary">Apply</Button></Col>
        </Row>
      </Container>
    </Popup>
  );
});
