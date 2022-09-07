import { observer } from 'mobx-react-lite';
import React from 'react';
import Draggable from 'react-draggable';

import { configurationStore } from '../state';

export function ChangeCountDownTime(time: number): string {
  const date = new Date(time * 1000);
  const localeTime = date.toLocaleTimeString('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return localeTime;
}

export default observer(function SectorChangeCountDown(/* properties */) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { timeToNextConfiguration, toggleConfiguration } = configurationStore;
  if (timeToNextConfiguration > 600) {
    return null;
  }
  return (<Draggable>
    <div className='toggle-countdown-container'>
      <div className='time-to-change'>
        Sector change countdown:
        {' '}
        {ChangeCountDownTime(timeToNextConfiguration)}
      </div>
      <button onClick={toggleConfiguration} className='toggle-sectors-button'>Toggle Sector Change</button>
    </div>
  </Draggable>);
});
