import { observer } from 'mobx-react-lite';
import React from 'react';

import { cwpStore } from '../state';

export default observer(function SpeedVectorNavbarControl() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    speedVectorMinutes, setSpeedVectorMinutes,
  } = cwpStore;

  const changeSpeedVectorMinutes = (value: string): void => {
    const numberValue = Number.parseInt(value, 10);
    setSpeedVectorMinutes(numberValue);
  };

  const speedVectorMinutesChange = (direction: 'up' | 'down'): void => {
    const step = 1;
    const newValue = speedVectorMinutes + (direction === 'up' ? step : -step);
    setSpeedVectorMinutes(newValue);
  };

  return (<>
    <button disabled type="button">SPD:</button>
    <button onClick={(): void => speedVectorMinutesChange('down')}
      type="button" className="arrow-button justify-content-center">&#11164;</button>
    <button type="button" disabled>
      {' '}
      <input type="range" min="0" max="15" step={1}
        value={speedVectorMinutes}
        onChange={(event): void => changeSpeedVectorMinutes(event.target.value)}
      />
    </button>
    <button onClick={(): void => speedVectorMinutesChange('up')}
      type="button" className="arrow-button justify-content-center">&#11166;</button>
    <button type="button" disabled>{speedVectorMinutes}</button>
  </>);
});
