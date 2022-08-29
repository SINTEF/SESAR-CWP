import { observer } from 'mobx-react-lite';
import React from 'react';
import { useMap } from 'react-map-gl';

export default observer(function Compass(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  const { current: map } = useMap();

  const rotationButtonClicked = (rotation: string): void => {
    const currentBearing = map?.getBearing();
    console.log(currentBearing);
    switch (rotation) { // Do we keep pitch while rotating? Or setting to zero?
      case 'north': {
        map?.setBearing(0);

        break;
      }
      case 'south': {
        map?.setBearing(180);

        break;
      }
      case 'east': {
        map?.setBearing(90);

        break;
      }
      case 'west': {
        map?.setBearing(270);

        break;
      }
      case 'north-degrees': {
        if (currentBearing !== 0) {
          const newDegrees = Number(currentBearing) < 0 ? Number(currentBearing) + 30 : Number(currentBearing) - 30;
          if (newDegrees < -180) {
            map?.setBearing(0);
          } else if (currentBearing && currentBearing > 0 && newDegrees < 0) {
            map?.setBearing(0);
          } else {
            map?.setBearing(Number(newDegrees));
          }
        }
        break;
      }
      case 'west-degrees': {
        if (currentBearing !== 90) {
          // const positiveDegrees = Number(currentBearing) < 0 ? Number(currentBearing) + 360 : Number(currentBearing);
          const newDegrees = Number(currentBearing) < 0 ? Number(currentBearing) + 30 : Number(currentBearing) - 30;
          if (newDegrees < 90) {
            map?.setBearing(0);
          } else if (currentBearing && currentBearing > 0 && newDegrees < 0) {
            map?.setBearing(0);
          } else {
            map?.setBearing(Number(newDegrees));
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  // const degreesRotationClicked = (rotation: string) : void => {

  // }

  return (
    <div className="compass">
      <button className='north-button' onClick={():void => rotationButtonClicked('north')}></button>
      <button onClick={():void => rotationButtonClicked('east')} className='east-button'></button>
      <button onClick={():void => rotationButtonClicked('west')} className='west-button'></button>
      <button onClick={():void => rotationButtonClicked('south')} className='south-button'></button>
      <button onClick={():void => rotationButtonClicked('north-degrees')} className='chevron-north chevron-degrees-button'></button>
      <button onClick={():void => rotationButtonClicked('north-degrees')} className='chevron-south chevron-degrees-button'></button>
      <button onClick={():void => rotationButtonClicked('west-degrees')} className='chevron-west chevron-degrees-button'></button>
      <button onClick={():void => rotationButtonClicked('north-degrees')} className='chevron-east chevron-degrees-button'></button>
    </div>
  );
});
