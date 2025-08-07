import { observer } from 'mobx-react-lite';
import React from 'react';

import { cwpStore } from '../state';

export default observer(function AltitudeFilterPanel(/* properties */) {
  const { showFILT, altitudeFilter } = cwpStore;

  const {
    lowestBound, highestBound, setLowBound, setHighBound,
  } = altitudeFilter;

  if (!showFILT) { return null; }

  return (
    <div className="card absolute bottom-8 left-[37rem] ml-px text-sm text-white z-[500] flex-col-reverse bg-transparent">
      <div className="card-body border border-white bg-gray-700 pb-0 mb-0 w-80 h-48">
        <div className="flex justify-center">
          <div className="text-center">
            Altitude Filter
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="self-center">
            {/* <button type="button" className="btn btn-sm"> SET </button> */}
          </div>
          <div className="self-start">
            <p>
              H:&nbsp;
              <input className="input input-xs input-ghost w-10 text-xs bg-transparent text-white"
                type="text" inputMode="numeric" pattern="[0-9]*"
                value={Number.isNaN(highestBound) ? 0 : highestBound}
                onChange={(event): void => setHighBound(Number.parseInt(event.target.value, 10))} />
              {' '}
            </p>
            <p>
              L:&nbsp;
              <input className="input input-xs input-ghost w-11 text-xs bg-transparent text-white"
                type="text" inputMode="numeric" pattern="[0-9]*"
                value={Number.isNaN(lowestBound) ? 0 : lowestBound}
                onChange={(event): void => setLowBound(Number.parseInt(event.target.value, 10))} />

              {' '}
            </p>
          </div>
          <div className="self-start h-5 w-5">
            <input type="range" value={highestBound} 
              className="range range-xs range-vertical w-20 h-20 m-0 pl-0" 
              min="0" max="1000"
              onChange={(event): void => setHighBound(
                Number.parseInt(event.target.value, 10) || 0)} />
            <input type="range" value={lowestBound} 
              className="range range-xs range-vertical w-20 h-20 m-0 pl-0" 
              min="0" max="1000"
              onChange={(event): void => setLowBound(
                Number.parseInt(event.target.value, 10) || 0)} />
          </div>
        </div>
      </div>
    </div>
  );
});