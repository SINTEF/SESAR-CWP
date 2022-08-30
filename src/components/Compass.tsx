import { observer } from 'mobx-react-lite';
import React from 'react';
import { useMap } from 'react-map-gl';

export default observer(function Compass(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  const { current: map } = useMap();

  const rotationButtonClicked = (rotation: string): void => {
    const currentBearing = Number(map?.getBearing());
    const currentPitch = Number(map?.getPitch());
    switch (rotation) {
      case 'north': {
        map?.setPitch(currentPitch - 20);

        break;
      }
      case 'south': {
        map?.setPitch(currentPitch + 20);

        break;
      }
      case 'east': {
        map?.setBearing(currentBearing - 20);

        break;
      }
      case 'west': {
        map?.setBearing(currentBearing + 20);

        break;
      }
      case 'north-degrees': {
        map?.setPitch(currentPitch - 5);
        break;
      }
      case 'south-degrees': {
        map?.setPitch(currentPitch + 5);
        break;
      }
      case 'west-degrees': {
        map?.setBearing(currentBearing + 5);
        break;
      }
      case 'east-degrees': {
        map?.setBearing(currentBearing - 5);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div className="compass">
      <button className='north-button' onClick={():void => rotationButtonClicked('north')}></button>
      <button onClick={():void => rotationButtonClicked('east')} className='east-button'></button>
      <button onClick={():void => rotationButtonClicked('west')} className='west-button'></button>
      <button onClick={():void => rotationButtonClicked('south')} className='south-button'></button>
      <button onClick={():void => rotationButtonClicked('north-degrees')} className='chevron-north chevron-degrees-button'></button>
      <button onClick={():void => rotationButtonClicked('south-degrees')} className='chevron-south chevron-degrees-button'></button>
      <button onClick={():void => rotationButtonClicked('west-degrees')} className='chevron-west chevron-degrees-button'></button>
      <button onClick={():void => rotationButtonClicked('east-degrees')} className='chevron-east chevron-degrees-button'></button>
    </div>
  );
});
