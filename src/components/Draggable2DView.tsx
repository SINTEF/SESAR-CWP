import { observer } from 'mobx-react-lite';
import React from 'react';
import Draggable from 'react-draggable';

import { isDragging, startDragging, stopDragging } from '../draggableState';
import {
  cwpStore,
} from '../state';
import SectorSideView from './SectorSideView';

// function ChangeToLocaleTime(time: number): string {
//   const date = new Date(time * 1000);
//   const localeTime = date.toLocaleTimeString('en-GB', {
//     timeZone: 'UTC',
//     hour12: false,
//     hour: '2-digit',
//     minute: '2-digit',
//   });
//   return localeTime;
// }

export default observer(function Draggable2DView() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { selectedAircraftIds } = cwpStore;
  // eslint-disable-next-line no-console
  console.log(selectedAircraftIds);

  return (<Draggable
    bounds="parent" cancel="input"
    onStart={startDragging}
    onStop={stopDragging}
  >
    <div className="control-panel">
      <div className="sector-configuration-accordion" style={{ height: '100%', width: '100%', background: '#313131' }}>
        <SectorSideView />

        <div key={`${1}:${1}`}>
          <div className="accordion-header"
            onClickCapture={(event): void => {
              if (isDragging()) {
                event.stopPropagation();
              }
            }}>
          </div>
          {/* <div className="accordion-body sector-configuration-body"> */}
          {/* <div style={{ height: '100%', width: '100%', background: 'black' }}> */}
          {/* <SectorSideView /> */}
          {/* </div> */}
          {/* <VerticalSectorTimeline id={`${1}`} start={0} end={10} current={timestamp} /> */}
          {/* </div> */}
        </div>
        {/* ))} */}
      </div>
    </div>
  </Draggable>);
});
