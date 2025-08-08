import { observer } from 'mobx-react-lite';
import React from 'react';

import { cwpStore, distanceLineStore } from '../state';

export default observer(function DistanceMeasurementDropdown() {
  /* eslint-disable @typescript-eslint/unbound-method */
  const {
    currentDistanceColor, setCurrentDistanceColor,
  } = cwpStore;
  const {
    removeColor,
  } = distanceLineStore;
  /* eslint-enable @typescript-eslint/unbound-method */

  const removeDistance = (): void => {
    if (currentDistanceColor !== '') {
      removeColor(currentDistanceColor);
    }
    setCurrentDistanceColor('');
  };

  return (
    <div className="dropdown dropdown-top">
      <label 
        tabIndex={0} 
        className="btn btn-sm m-1"
        style={{
          backgroundColor: (currentDistanceColor || '#aaaaaa'),
          color: (currentDistanceColor ? 'black' : 'white'),
        }}
      >
        R&amp;B
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a 
            onClick={(): void => setCurrentDistanceColor('#ffff00')}
            style={{ color: '#ffff00' }}
          >
            R&amp;B1
          </a>
        </li>
        <li>
          <a 
            onClick={(): void => setCurrentDistanceColor('#b7fa2e')}
            style={{ color: '#b7fa2e' }}
          >
            R&amp;B2
          </a>
        </li>
        <li>
          <a 
            onClick={(): void => setCurrentDistanceColor('#ed70d1')}
            style={{ color: '#ed70d1' }}
          >
            R&amp;B3
          </a>
        </li>
        <li>
          <a 
            onClick={(): void => setCurrentDistanceColor('#fdcb09')}
            style={{ color: '#fdcb09' }}
          >
            R&amp;B4
          </a>
        </li>
        <li className="divider"></li>
        <li className={currentDistanceColor === '' ? 'disabled' : ''}>
          <a onClick={(): void => removeDistance()}>
            CNL
          </a>
        </li>
      </ul>
    </div>
  );
});