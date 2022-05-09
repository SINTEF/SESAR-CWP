// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { cwpStore } from '../state';

export default observer(function DistanceMeasurements(properties) {
  const { geoJSONDistance } = properties;
  console.log(geoJSONDistance);
  const linestring = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [],
    },
  };
  const circlePaint = {
    'circle-radius': 20,
    'circle-color': ['get', 'currentActive'],
  };
  const linePaint = {
    'line-color': '#ffffff',
    'line-width': 2.5,
  };

  const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  };

  return (
    <div id="distance">

      <Source id="distance-measurement-source" type="geojson" data={geoJSONDistance}>
        <Layer id="measure-points" type="circle" paint={circlePaint} />
        <Layer id="measure-lines" type="line" paint={linePaint} />
        {/* <Layer /> */}
      </Source>
    </div>

  );
});
