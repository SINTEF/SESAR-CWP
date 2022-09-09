import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Draggable from 'react-draggable';

import { ShowNextConfiguration } from '../model/CwpStore';
import { configurationStore, cwpStore } from '../state';

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
  const { timeToNextConfiguration, shouldShowNextConfiguration } = configurationStore;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { toggleShowNextSectorsConfiguration, showNextSectorsConfiguration } = cwpStore;
  if (timeToNextConfiguration > 60_000 || timeToNextConfiguration < 0) {
    return null;
  }

  let buttonText = '';
  switch (showNextSectorsConfiguration) {
    case ShowNextConfiguration.Automatic:
    case ShowNextConfiguration.Off:
      buttonText = 'Show next sectors';
      break;
    case ShowNextConfiguration.On:
      buttonText = 'Show current sectors';
      break;
    default:
      throw new Error('Invalid showNextSectorsConfiguration');
  }
  return (<Draggable bounds="parent" cancel="button, input">
    <div className={
      classnames({
        'toggle-countdown-container': true,
        'toggle-countdown-container-next': shouldShowNextConfiguration,
      })}>
      <div className="time-to-change">
        Sector change countdown:
        {' '}
        {ChangeCountDownTime(timeToNextConfiguration)}
      </div>
      <button onClick={toggleShowNextSectorsConfiguration} className="toggle-sectors-button">
        {buttonText}
      </button>
    </div>
  </Draggable>);
});
