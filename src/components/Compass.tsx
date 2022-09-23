import React from 'react';
import { useMap } from 'react-map-gl';

import { initialViewState } from './Sectors3DView';

export default function Compass(): JSX.Element {
  const { current: map } = useMap();

  const rotationButtonClicked = (rotation: string): void => {
    if (!map) {
      throw new Error('Map instance is not available');
    }

    if (rotation === 'reset') {
      map.easeTo({
        ...initialViewState,
        duration: 500,
      });
      return;
    }

    let newBearing = map.getBearing();
    let newPitch = map.getPitch();

    switch (rotation) {
      case 'north': {
        newPitch -= 20;
        break;
      }
      case 'south': {
        newPitch += 20;
        break;
      }
      case 'east': {
        newBearing -= 20;
        break;
      }
      case 'west': {
        newBearing += 20;
        break;
      }
      case 'north-degrees': {
        newPitch -= 5;
        break;
      }
      case 'south-degrees': {
        newPitch += 5;
        break;
      }
      case 'west-degrees': {
        newBearing += 5;
        break;
      }
      case 'east-degrees': {
        newBearing -= 5;
        break;
      }
      default: {
        throw new Error('Invalid rotation');
      }
    }
    map.easeTo({
      bearing: newBearing,
      pitch: newPitch,
      duration: 500,
    });
  };

  return (
    <div className="compass">
      <button onClick={(): void => rotationButtonClicked('reset')} className="reset-button"></button>
      <button onClick={(): void => rotationButtonClicked('north')} className="north-button"></button>
      <button onClick={(): void => rotationButtonClicked('east')} className="east-button"></button>
      <button onClick={(): void => rotationButtonClicked('west')} className="west-button"></button>
      <button onClick={(): void => rotationButtonClicked('south')} className="south-button"></button>
      <button onClick={(): void => rotationButtonClicked('north-degrees')} className="chevron-north chevron-degrees-button"></button>
      <button onClick={(): void => rotationButtonClicked('south-degrees')} className="chevron-south chevron-degrees-button"></button>
      <button onClick={(): void => rotationButtonClicked('west-degrees')} className="chevron-west chevron-degrees-button"></button>
      <button onClick={(): void => rotationButtonClicked('east-degrees')} className="chevron-east chevron-degrees-button"></button>
    </div>
  );
}
