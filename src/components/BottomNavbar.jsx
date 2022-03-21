import './BottomNavbar.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navbar } from 'react-bootstrap';

import { cwpStore } from '../state';
import MqttIndicators from './MqttIndicators';

export default observer((/* properties */) => {
  const {
    toggleSFL, toggleFL, toggleFlightLabels, toggleSectorLabels,
    toggleFILT,
  } = cwpStore;

  return (
    <Navbar fixed="bottom" className="navbar button-navbar">

      <button type="button" onClick={() => toggleFL()}>FL</button>
      <button type="button" onClick={() => toggleSFL()}>SFL</button>
      <button type="button" onClick={() => toggleSectorLabels()}>Toggle Sector Labels</button>
      <button type="button" onClick={() => toggleFlightLabels()}>Toggle Flight Labels</button>
      <button type="button" onClick={() => toggleFILT()}>FILT</button>

      <MqttIndicators />
    </Navbar>
  );
});
