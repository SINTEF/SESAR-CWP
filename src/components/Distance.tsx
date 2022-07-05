import * as turf from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { cwpStore, distanceLineStore } from '../state';
import DistanceMeasurements from './DistanceMeasurements';

export function getLength(coordinates: number[][]): string {
  const line = turf.lineString(coordinates);
  const lineLength = turf.length(line, { units: 'radians' });
  const lengthToNautical = turf.radiansToDistance(lineLength, 'nauticalmiles');
  return lengthToNautical.toFixed(3);
}

export default observer(function Distance() {
  /* eslint-disable @typescript-eslint/unbound-method */
  const { addFeature, markerElements } = distanceLineStore;
  const {
    getCurrentActiveMeasuring, addDistanceMeasurement,
    showLines, setShowLine, currentColoringString,
  } = cwpStore;
  /* eslint-enable @typescript-eslint/unbound-method */

  const currentActiveColor = getCurrentActiveMeasuring();

  React.useEffect(() => {
    if (showLines && markerElements.length % 2 === 0 && currentActiveColor !== '') {
      const coordinates: number[][] = [];
      for (let index = 1; index < 3; index += 1) {
        const long = markerElements[markerElements.length - index].coordinates[0];
        const lat = markerElements[markerElements.length - index].coordinates[1];
        coordinates.push([long, lat]);
      }
      const singleFeature: GeoJSON.Feature = {
        type: 'Feature',
        properties: {
          color: currentColoringString,
          length: getLength(coordinates),
        },
        geometry: {
          type: 'LineString',
          coordinates,
        },
      };
      addFeature(singleFeature);
      addDistanceMeasurement(currentColoringString);
      setShowLine(false);
    }
  }, [showLines, setShowLine, markerElements]);

  return (
    <DistanceMeasurements />
  );
});
