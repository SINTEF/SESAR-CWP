import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { changeFlightLevelOfAircraft } from '../mqtt';
import { configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

function ListOfLevels(
  properties: { value: number, onClick: (index: number) => void },
): JSX.Element {
  const sliderValue = properties.value;
  const settingSlider = properties.onClick;
  const rows: JSX.Element[] = [];

  for (let index = 560; index > 200; index -= 10) {
    rows.push(<Row
      onClick={(): void => settingSlider(index)}
      key={index}
      className="child justify-content-center gutter-2"
    >
      <Button id={`button${index}`}
        className="flight-level-element"
        variant="secondary" size="sm"
        active={index === sliderValue}>
        {index}
      </Button>
    </Row>,
    );
  }

  return (<>{rows}</>);
}

export default observer(function AircraftLevelPopup(properties: { aircraft: AircraftModel }) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownAltitude: altitude,
    callSign,
    controlledBy,
    setAssignedFlightLevel,
    setLocalAssignedFlightLevel,
    setNextSectorFL,
    setNextACCFL,
  } = properties.aircraft;

  const [flightLevel, setFlightLevel] = React.useState(Math.ceil(altitude / 10) * 10);

  const accepted = controlledBy === configurationStore.currentCWP;

  const shouldShow = cwpStore.aircraftsWithLevelPopup.has(aircraftId);

  if (!shouldShow) {
    return null;
  }

  const FlightLevelChangeSlide = (): void => {
    // TODO #95: Replace use of Ref/ID by a classic react value/onChange
    const parentElement = document.querySelector(`#${callSign}rangelist`);
    const listElement = parentElement?.querySelector(`#button${Math.ceil(flightLevel / 10) * 10}`);
    listElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const FlightLevelChange = (direction: 'up' | 'down'): void => {
    // TODO #95: Replace use of Ref/ID by a classic react value/onChange
    const slider = document.querySelector<HTMLInputElement>(`#level-range${callSign}`);
    if (!slider) {
      throw new Error('No level range for flight level found');
    }
    const step = Number.parseInt(slider.getAttribute('step') ?? '', 10);
    const currentSliderValue = Number.parseInt(slider.value, 10);
    let newStepValue = currentSliderValue + step;

    newStepValue = direction === 'up' ? currentSliderValue + step : currentSliderValue - step;
    setFlightLevel(newStepValue);
    const stringNewStepValue = newStepValue.toString();
    slider.value = stringNewStepValue;

    const parentElement = document.querySelector(`#${callSign}rangelist`);
    const listElement = parentElement?.querySelector(`#button${Math.ceil(newStepValue / 10) * 10}`);
    listElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const close = (): void => cwpStore.closeLevelPopupForAircraft(aircraftId);
  const setFLCP = (): void => {
    const stringFlightLevel = flightLevel.toString();
    if (cwpStore.nextSectorFlActivated) {
      cwpStore.showNSFL(false);
      setNextSectorFL(stringFlightLevel);
    } else if (cwpStore.flightLevelNextAccActivated) {
      cwpStore.showFlACC(false);
      setNextACCFL(stringFlightLevel);
    } else if (!cwpStore.pseudoPilot) {
      setLocalAssignedFlightLevel(stringFlightLevel);
    } else {
      setAssignedFlightLevel(stringFlightLevel);
      changeFlightLevelOfAircraft(controlledBy, assignedFlightId, stringFlightLevel);
    }
    close();
  };

  return (
    <Popup
      anchor="bottom"
      longitude={longitude}
      latitude={latitude}
      offset={[53, 246]}
      className={classnames({
        pending: false,
        accepted,
        other: false,
        'level-popup': true,
      })}
      closeOnClick={false}
      onClose={(): void => close()}
    >
      <Container className="choose-flight-level">
        <Row className="justify-content-center">
          {callSign}

        </Row>
        <Row>
          <Col id="levels-container" className="levels-container">
            <div id={`${callSign}rangelist`}>
              <ListOfLevels value={flightLevel} onClick={setFlightLevel} />
            </div>
          </Col>
          <Col>
            <Button onClick={(): void => FlightLevelChange('up')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11165;</Button>
            <Row>
              <input id={`level-range${callSign}`} className="level-range" type="range" value={flightLevel}
                onChange={(event): void => setFlightLevel(Number.parseInt(event.target.value, 10))}
                onMouseUp={(): void => FlightLevelChangeSlide()}
                step={10} min={210} max={560}
              />
            </Row>
            <Button onClick={(): void => FlightLevelChange('down')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11167;</Button>
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
