import './BottomNavbar.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  ButtonGroup, Dropdown, DropdownButton, Navbar,
} from 'react-bootstrap';

import { configurationStore, cwpStore, distanceLineStore } from '../state';
import VoiceExample from '../voice/voice';
import MqttIndicators from './MqttIndicators';

const ControllerButton = observer(function ControllerButton() {
  const { currentCWP } = configurationStore;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { toggleControllerSelection } = cwpStore;
  return (
    <button type="button" onClick={(): void => toggleControllerSelection()}>{currentCWP}</button>
  );
});

const hello = (): void => {
  console.log('hello start');
  VoiceExample().then((): void => {
    console.log('hello done');
  }).catch((error): void => {
    console.error(error);
  });
};

export default observer(function BottomNavBar(/* properties */) {
  /* eslint-disable @typescript-eslint/unbound-method */
  const {
    toggleSFL, toggleFL, toggleFlightLabels, toggleFixes, toggleSectorLabels,
    toggleFILT, speedVectorMinutes, setSpeedVectorMinutes,
    activeMeasurements, setCurrentActiveMeasuring, addDistanceMeasurement,
  } = cwpStore;
  const {
    features, removeFeature, markerElements, removeMarker,
  } = distanceLineStore;
  /* eslint-enable @typescript-eslint/unbound-method */

  // TODO #95: Replace use of Ref/ID by a classic react value/onChange
  const speedVectorRangeInputReference = React.useRef<HTMLInputElement>(null);

  const [currentlyActive, setCurrentlyActive] = React.useState('');

  const [speedMinutesPlaceholder, setspeedMinutesPlaceholder] = React.useState(speedVectorMinutes);

  // TODO #96: Remove distance logic to cleanup
  const changeSpeedVectorMinutes = (value: string): void => {
    const numberValue = Number.parseInt(value, 10);
    setspeedMinutesPlaceholder(numberValue);
    setSpeedVectorMinutes(numberValue);
  };

  const speedVectorMinutesChange = (direction: 'right' | 'left'): void => {
    const slider = speedVectorRangeInputReference.current;
    if (!slider) return;
    const step = 1;
    const currentSliderValue = Number.parseInt(slider.value, 10);
    let newStepValue = currentSliderValue + step;

    newStepValue = direction === 'right' ? currentSliderValue + step : currentSliderValue - step;
    const stringNewStepValue = newStepValue.toString();
    slider.value = stringNewStepValue;
    changeSpeedVectorMinutes(stringNewStepValue);
  };

  const AddNewDistance = (color: string): void => {
    if (!activeMeasurements.has(color)) {
      setCurrentActiveMeasuring(color);
    }
    setCurrentlyActive(color);
    addDistanceMeasurement(color);
  };

  const removeDistance = (): void => {
    // Remove the feature from the features array where the feature.properties.color
    // equals currentlyActive
    const featureIndexToRemove = features.findIndex(
      (feature) => feature.properties?.color === currentlyActive,
    );
    if (featureIndexToRemove !== -1) {
      removeFeature(featureIndexToRemove);
    }

    const markerIndexToRemove = markerElements.findIndex(
      (marker) => marker.color === currentlyActive,
    );

    if (markerIndexToRemove !== -1) {
      removeMarker(markerIndexToRemove);
    }
  };

  return (
    <Navbar fixed="bottom" className="navbar button-navbar">

      <button type="button" onClick={(): void => hello()}>🎙</button>
      <button type="button" onClick={(): void => toggleFL()}>FL</button>
      <button type="button" onClick={(): void => toggleSFL()}>SFL</button>
      <button type="button" onClick={(): void => toggleSectorLabels()}>Toggle Sector Labels</button>
      <button type="button" onClick={(): void => toggleFlightLabels()}>Toggle Flight Labels</button>
      <button type="button" onClick={(): void => toggleFixes()}>Toggle Fixes</button>
      <button type="button" onClick={(): void => toggleFILT()}>FILT</button>
      <button disabled type="button">SPD:</button>
      <button onClick={(): void => speedVectorMinutesChange('left')}
        type="button" className="arrow-button justify-content-center">&#11164;</button>
      <button type="button" disabled>
        {' '}
        <input type="range" min="0" max="15" step={1}
          value={speedMinutesPlaceholder}
          onChange={(event): void => changeSpeedVectorMinutes(event.target.value)}
        />
      </button>
      <button onClick={(): void => speedVectorMinutesChange('right')}
        type="button" className="arrow-button justify-content-center">&#11166;</button>
      <button type="button" disabled>{speedMinutesPlaceholder}</button>
      <DropdownButton
        as={ButtonGroup}
        key="distance-measurement-drop-down"
        id="distance-measurement-drop-down"
        drop="up"
        variant="secondary"
        title="R&amp;B"
      >
        <Dropdown.Item eventKey="1" style={{ color: '#ffff00' }} onClick={(): void => AddNewDistance('#ffff00')}>R&amp;B1</Dropdown.Item>
        <Dropdown.Item eventKey="2" style={{ color: '#b7fa2e' }} onClick={(): void => AddNewDistance('#b7fa2e')}>R&amp;B2</Dropdown.Item>
        <Dropdown.Item eventKey="3" style={{ color: '#ed70d1' }} onClick={(): void => AddNewDistance('#ed70d1')}>R&amp;B3</Dropdown.Item>
        <Dropdown.Item eventKey="4" style={{ color: '#fdcb09' }} onClick={(): void => AddNewDistance('#fdcb09')}>R&amp;B4</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="5" onClick={(): void => removeDistance()}>CNL</Dropdown.Item>
      </DropdownButton>

      <ControllerButton />
      <MqttIndicators />
    </Navbar>
  );
});
