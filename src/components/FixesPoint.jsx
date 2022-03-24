import { observer } from 'mobx-react-lite';
import pointInPolygon from 'point-in-polygon';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { configurationStore, cwpStore, fixStore } from '../state';

const fixLayerPaint = {
  'circle-radius': 2.5,
  'circle-color': '#fff',
};

const fixNamePaint = {
  'text-color': '#fff',
};

const fixNameLayout = {
  'text-field': ['get', 'title'],
  'text-allow-overlap': true,
  'text-font': [
    'Open Sans Bold',
  ],
  'text-size': 7,
  'text-offset': [0, 0.5],
  'text-anchor': 'top',
};

export default observer(function FixesPoint(/* properties */) {
  // Load required data
  const fixData = fixStore.fixes;
  const { edgesPolygon } = configurationStore;

  // eslint-disable-next-line unicorn/no-null
  if (!cwpStore.showFixes) return null;
  // Get all points
  const points = [...fixData.values()]
    // Compute an easy to use location array
    .map((fix) => ([fix, [fix.longitude, fix.latitude]]))
    // Filter the points out of the edge sector, if we have an edge sector
    .filter(([, point]) => !edgesPolygon?.length || pointInPolygon(point, edgesPolygon));

  // Build the GeoJSON
  const features = points.map(([fix, coordinates]) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates,
    },
    properties: {
      title: fix.pointId,
    },
  }));

  const fixJson = {
    type: 'FeatureCollection',
    features,
  };

  return (
    <Source id="fixSources" type="geojson" data={fixJson}>
      <Layer id="fixPoints" type="circle" paint={fixLayerPaint} />
      <Layer
        id="fixName"
        type="symbol"
        layout={fixNameLayout}
        paint={fixNamePaint}
      />
    </Source>
  );
});
