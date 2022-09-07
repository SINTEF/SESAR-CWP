import { observer } from 'mobx-react-lite';
import React from 'react';

import { configurationStore } from '../state';
import { ChangeCountDownTime } from './SectorChangeCountDown';

export default observer(function VerticalSectorTimeline(properties: {
  id: string,
  start: number,
  end: number,
  current: number,
}) {
  const {
    id, start, end, current,
  } = properties;
  const { timeToNextConfiguration } = configurationStore;

  const periodSize = end - start;
  const sinceStart = current - start;
  const percentage = Math.round(Math.min(1, (sinceStart / periodSize)) * 100_000) / 1000;
  return (
    <>
      <span style={{ top: `calc(${percentage}% - 10px)` }}
        className='moveable-timeline-rectangle'>{
      ChangeCountDownTime(timeToNextConfiguration)}
      </span>
      <div className={`timeline-rectangle-${id}`}></div>
    </>
  );
});
