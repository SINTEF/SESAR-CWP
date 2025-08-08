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
    <div className="absolute right-[16.5em] top-[23em]">
      <button 
        onClick={(): void => rotationButtonClicked('reset')} 
        className="absolute z-[2147483637] bottom-[11.5em] left-[5.8em] w-12 h-12 border-none bg-transparent outline-none"
      ></button>
      <button 
        onClick={(): void => rotationButtonClicked('north')} 
        className="absolute bottom-[16em] left-[4.8em] w-20 h-12 bg-transparent border-0 bg-[url('/saveDirectionArrow.png')] bg-cover rotate-90"
      ></button>
      <button 
        onClick={(): void => rotationButtonClicked('east')} 
        className="absolute left-[9.2em] bottom-[11.5em] w-20 h-12 bg-transparent border-0 bg-[url('/saveDirectionArrow.png')] bg-cover rotate-180"
      ></button>
      <button 
        onClick={(): void => rotationButtonClicked('west')} 
        className="absolute left-[0.5em] bottom-[11.5em] w-20 h-12 bg-transparent border-0 bg-[url('/saveDirectionArrow.png')] bg-cover"
      ></button>
      <button 
        onClick={(): void => rotationButtonClicked('south')} 
        className="absolute left-[4.8em] bottom-[7em] w-20 h-12 bg-transparent border-0 bg-[url('/saveDirectionArrow.png')] bg-cover -rotate-90"
      ></button>
      <button 
        onClick={(): void => rotationButtonClicked('north-degrees')} 
        className="absolute bottom-[19em] left-[5.8em] w-12 h-12 bg-[url('/arrow_chevron.png')] bg-transparent border-0 bg-cover rotate-90"
      ></button>
      <button 
        onClick={(): void => rotationButtonClicked('south-degrees')} 
        className="absolute left-[5.8em] bottom-[4em] w-12 h-12 bg-[url('/arrow_chevron.png')] bg-transparent border-0 bg-cover -rotate-90"
      ></button>
      <button 
        onClick={(): void => rotationButtonClicked('west-degrees')} 
        className="absolute left-[-1.5em] bottom-[11.5em] w-12 h-12 bg-[url('/arrow_chevron.png')] bg-transparent border-0 bg-cover"
      ></button>
      <button 
        onClick={(): void => rotationButtonClicked('east-degrees')} 
        className="absolute left-[13.2em] bottom-[11.5em] w-12 h-12 bg-[url('/arrow_chevron.png')] bg-transparent border-0 bg-cover rotate-180"
      ></button>
    </div>
  );
}
