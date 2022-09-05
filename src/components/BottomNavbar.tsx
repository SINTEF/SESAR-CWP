import './BottomNavbar.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navbar } from 'react-bootstrap';

import { configurationStore, cwpStore } from '../state';
import DistanceMeasurementDropdown from './DistanceMeasurementDropdown';
import MicrophoneButton from './MicrophoneButton';
import MqttIndicators from './MqttIndicators';
import SpeedVectorNavbarControl from './SpeedVectorNavbarControl';

const ControllerButton = observer(function ControllerButton() {
  const { currentCWP } = configurationStore;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { toggleControllerSelection } = cwpStore;
  return (
    <button type="button" onClick={(): void => toggleControllerSelection()}>{currentCWP}</button>
  );
});

export default function BottomNavBar(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    toggleSFL, toggleFL, toggleFlightLabels, toggleFixes, toggleSectorLabels,
    toggleFILT, toggleLimboFlights,
  } = cwpStore;

  return (
    <Navbar className="navbar button-navbar">
      <MicrophoneButton />
      <button type="button" onClick={(): void => toggleFL()}>FL</button>
      <button type="button" onClick={(): void => toggleSFL()}>SFL</button>
      <button type="button" onClick={(): void => toggleSectorLabels()}>Toggle Sector Labels</button>
      <button type="button" onClick={(): void => toggleFlightLabels()}>Toggle Flight Labels</button>
      <button type="button" onClick={(): void => toggleFixes()}>Toggle Fixes</button>
      <button type="button" onClick={(): void => toggleLimboFlights()}>Toggle Affected Flights</button>
      <button type="button" onClick={(): void => toggleFILT()}>FILT</button>
      <SpeedVectorNavbarControl />
      <DistanceMeasurementDropdown />
      <ControllerButton />
      <MqttIndicators />
    </Navbar>
  );
}
