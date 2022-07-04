import './BottomNavbar.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  ButtonGroup, Dropdown, DropdownButton, Navbar,
} from 'react-bootstrap';

// import MapRef from 'react-map-gl';
import { configurationStore, cwpStore, distanceLineStore } from '../state';
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
    activeMeasurements, setCurrentActiveMeasuring, addDistanceMeasurement,
  } = cwpStore;
  const {
    currentFeatures, removeFeature, markerElements, removeMarker,
  } = distanceLineStore;
  const [currentlyActive, setCurrentlyActive] = React.useState('');

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

  const AddNewDistance = (color) => {
    if (!activeMeasurements.has(color)) {
      setCurrentActiveMeasuring(color);
    }
    setCurrentlyActive(color);
    addDistanceMeasurement(color);
  };

  const removeDistance = () => {
    for (const [index, currentFeature] of currentFeatures.entries()) {
      if (currentFeature.properties.color === currentlyActive) {
        removeFeature(index);
      }
    }
    for (const [index, markerElement] of markerElements.entries()) {
      const idSplit = markerElement[0].split(':');
      const markerId = idSplit[1];
      if (markerId === currentlyActive) {
        removeMarker(index);
      }
    }
  };

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
      <DropdownButton
        as={ButtonGroup}
        key="distance-measurement-drop-down"
        id="distance-measurement-drop-down"
        drop="up"
        variant="secondary"
        title="R&amp;B"
      >
        <Dropdown.Item eventKey="1" style={{ color: '#ffff00' }} onClick={() => AddNewDistance('#ffff00')}>R&amp;B1</Dropdown.Item>
        <Dropdown.Item eventKey="2" style={{ color: '#b7fa2e' }} onClick={() => AddNewDistance('#b7fa2e')}>R&amp;B2</Dropdown.Item>
        <Dropdown.Item eventKey="3" style={{ color: '#ed70d1' }} onClick={() => AddNewDistance('#ed70d1')}>R&amp;B3</Dropdown.Item>
        <Dropdown.Item eventKey="4" style={{ color: '#fdcb09' }} onClick={() => AddNewDistance('#fdcb09')}>R&amp;B4</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="5" onClick={() => removeDistance()}>CNL</Dropdown.Item>
      </DropdownButton>

      <ControllerButton />
      <MqttIndicators />
    </Navbar>
  );
});
