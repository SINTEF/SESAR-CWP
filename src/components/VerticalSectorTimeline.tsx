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
  // Different styles based on id
  const getRectangleClasses = () => {
    if (id === '0') {
      return 'bg-[#4472c4] h-[282px] w-[15px] absolute right-[1px] top-0 z-0';
    } else if (id === '1') {
      return 'bg-[#4472c4] h-[282px] w-[15px] absolute right-[1px] top-0 z-0 float-right';
    }
    return 'bg-[#4472c4] h-[250px] w-[15px] absolute right-[1px] top-[10px] z-0';
  };

  return (
    <>
      {showCountDown ? (
        <span 
          style={{ top: `calc(${percentage}% - 10px)` }}
          className='text-white text-xs w-16 h-5 absolute -right-6 bg-[#ed7d31] z-20 border-2 border-[#b66129] font-mono text-center leading-4'
        >
          {ChangeCountDownTime(timeToNextConfiguration)}
        </span>
      ) : null}
      <div className={getRectangleClasses()}></div>
    </>
  );
});
