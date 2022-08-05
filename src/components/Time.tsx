/**
 * Time component that can be dragged around.
 */

import './Time.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import Draggable from 'react-draggable';

import { simulatorStore } from '../state';

export default observer(function Time() {
  const simulatorTime = simulatorStore.timestamp;
  const date = new Date(simulatorTime * 1000);

  // Get the tame in the hh:mm:ss format
  const time = date.toLocaleTimeString('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <Draggable bounds="parent">
      <div className="time">
        {time}
      </div>
    </Draggable>
  );
});
