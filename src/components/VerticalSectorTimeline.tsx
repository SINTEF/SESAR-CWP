import { observer } from 'mobx-react-lite';
import React from 'react';

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
  const timeToNextConfiguration = Math.max(0, end - current);

  const showCountDown = current >= start && current <= end;

  const periodSize = end - start;
  const sinceStart = current - start;
  const percentage = Math.round(Math.min(1, (sinceStart / periodSize)) * 100_000) / 1000;
  return (
    <>
      {showCountDown ? (
        <span style={{ top: `calc(${percentage}% - 10px)` }}
        className='moveable-timeline-rectangle'>{
      ChangeCountDownTime(timeToNextConfiguration)}
        </span>) : null}
      <div className={`timeline-rectangle-${id}`}></div>
    </>
  );
});
