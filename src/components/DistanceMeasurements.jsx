// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { cwpStore, distanceLineStore } from '../state';

export default observer(function DistanceMeasurements() {
  // const { geoJSONDistance } = properties;
  const { currentFeatures } = distanceLineStore;
  const geoJSONDistance = {
    type: 'FeatureCollection',
    features: currentFeatures,
  };

  const circlePaint = {
    'circle-radius': 20,
    'circle-color': ['get', 'currentActive'],
  };
  const linePaint = {
    'line-color': ['get', 'color'],
    'line-width': 2.5,
  };

  const lineLayout = {
    // 'line-cap': 'round',
    'line-join': 'round',
  };
  const measureNamePaint = {
    'text-color': ['get', 'color'],
  };

  const measureNameLayout = {
    'symbol-placement': 'line-center',
    'text-field': ['get', 'length'],
    'text-allow-overlap': true,
    'text-font': [
      'Open Sans Bold',
    ],
    'text-size': 20,
    'text-offset': [0, -1],
    'text-anchor': 'center',
  };

  return (
    <div id="distance">
      <Source id="distance-measurement-source" type="geojson" data={geoJSONDistance}>
        <Layer id="measure-points" type="circle" paint={circlePaint} />
        <Layer id="measure-lines" type="line" paint={linePaint} layout={lineLayout} />
        <Layer id="measure-length" type="symbol" paint={measureNamePaint} layout={measureNameLayout} />
      </Source>
    </div>

  );
});
