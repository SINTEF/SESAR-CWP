import './BottomNavbar.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navbar } from 'react-bootstrap';

import { configurationStore, cwpStore } from '../state';
import MqttIndicators from './MqttIndicators';

const ControllerButton = observer(function ControllerButton() {
  const { currentCWP } = configurationStore;
  const { toggleControllerSelection } = cwpStore;
  return (
    <button type="button" onClick={() => toggleControllerSelection()}>{currentCWP}</button>
  );
});

export default observer(function BottomNavBar(/* properties */) {
  const {
    toggleSFL, toggleFL, toggleFlightLabels, toggleFixes, toggleSectorLabels,
    toggleFILT, speedVectorMinutes, setSpeedVectorMinutes,
  } = cwpStore;

  const [speedMinutesPlaceholder, setspeedMinutesPlaceholder] = React.useState(speedVectorMinutes);

  const changeSpeedVectorMinutes = (value) => {
    setspeedMinutesPlaceholder(value);
    setSpeedVectorMinutes(value);
  };

  const speedVectorMinutesChange = (direction) => {
    const slider = document.querySelector('#speed-vector-range');
    const step = 1;
    const currentSliderValue = Number.parseInt(slider.value, 10);
    let newStepValue = currentSliderValue + step;

    newStepValue = direction === 'right' ? currentSliderValue + step : currentSliderValue - step;
    slider.value = newStepValue;
    changeSpeedVectorMinutes(newStepValue);
  };
  // const [speedVectorMinutes, setSpeedVectorMinutes] = React.useState('3');

  return (
    <Navbar fixed="bottom" className="navbar button-navbar">

      <button type="button" onClick={() => toggleFL()}>FL</button>
      <button type="button" onClick={() => toggleSFL()}>SFL</button>
      <button type="button" onClick={() => toggleSectorLabels()}>Toggle Sector Labels</button>
      <button type="button" onClick={() => toggleFlightLabels()}>Toggle Flight Labels</button>
      <button type="button" onClick={() => toggleFixes()}>Toggle Fixes</button>
      <button type="button" onClick={() => toggleFILT()}>FILT</button>
      <button disabled type="button">SPD:</button>
      <button onClick={() => speedVectorMinutesChange('left')} type="button" size="sm" variant="secondary" className="arrow-button justify-content-center">&#11164;</button>
      <button type="button" disabled>
        {' '}
        <input id="speed-vector-range" type="range" variant="secondary" value={speedMinutesPlaceholder} size="sm" min="0" max="15" step={1} onChange={(event) => changeSpeedVectorMinutes(event.target.value)} />
      </button>
      <button onClick={() => speedVectorMinutesChange('right')} type="button" size="sm" variant="secondary" className="arrow-button justify-content-center">&#11166;</button>
      <button type="button" disabled>{speedMinutesPlaceholder}</button>

      <ControllerButton />
      <MqttIndicators />
    </Navbar>
  );
});
