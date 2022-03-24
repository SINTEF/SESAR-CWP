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
    toggleFILT,
  } = cwpStore;

  return (
    <Navbar fixed="bottom" className="navbar button-navbar">

      <button type="button" onClick={() => toggleFL()}>FL</button>
      <button type="button" onClick={() => toggleSFL()}>SFL</button>
      <button type="button" onClick={() => toggleSectorLabels()}>Toggle Sector Labels</button>
      <button type="button" onClick={() => toggleFlightLabels()}>Toggle Flight Labels</button>
      <button type="button" onClick={() => toggleFixes()}>Toggle Fixes</button>
      <button type="button" onClick={() => toggleFILT()}>FILT</button>
      <ControllerButton />
      <MqttIndicators />
    </Navbar>
  );
});
