// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import * as turf from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { cwpStore, distanceLineStore } from '../state';
import DistanceMeasurements from './DistanceMeasurements';

function getLength(coordinates) {
  const line = turf.lineString(coordinates);
  const lineLength = turf.length(line, { units: 'radians' });
  const lengthToNautical = turf.radiansToDistance(lineLength, 'nauticalmiles');
  return lengthToNautical.toFixed(3);
}

export default observer(function Distance() {
  const { addFeature, markerElements } = distanceLineStore;
  const {
    getCurrentActiveMeasuring, addDistanceMeasurement,
    showLines, setShowLine, currentColoringString,
  } = cwpStore;
  const currentActiveColor = getCurrentActiveMeasuring;
  const { currentFeatures } = distanceLineStore;

  React.useEffect(() => {
    if (showLines && markerElements.length % 2 === 0 && currentActiveColor !== '') {
      const coordinates = [];
      for (let index = 1; index < 3; index += 1) {
        const long = markerElements[markerElements.length - index][1].coordinates[0];
        const lat = markerElements[markerElements.length - index][1].coordinates[1];
        coordinates.push([long, lat]);
      }
      const singleFeature = {
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
  // const { geoJSONDistance } = properties;

  return (
    <DistanceMeasurements />

  );
});
