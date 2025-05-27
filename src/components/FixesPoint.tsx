import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { CirclePaint, SymbolLayout, SymbolPaint } from 'mapbox-gl';

import { configurationStore, cwpStore, fixStore } from '../state';

const fixLayerPaint: CirclePaint = {
  'circle-radius': 2.5,
  'circle-color': '#fff',
};

const fixNamePaint: SymbolPaint = {
  'text-color': '#fff',
};

const fixNameLayout: SymbolLayout = {
  'text-field': ['get', 'title'],
  'text-allow-overlap': true,
  'text-font': [
    'IBM Plex Mono',
  ],
  'text-size': 9.5,
  'text-offset': [0, 0.5],
  'text-anchor': 'top',
};

export default observer(function FixesPoint(/* properties */) {
  // Load required data
  const fixData = fixStore.fixes;
  const bounds = configurationStore.extendedEdgesBounds;

  if (!cwpStore.showFixes) { return null; }

  // Get all points
  const points = [...fixData.values()].filter((fix) => bounds !== undefined
    && fix.latitude >= bounds.minLat
    && fix.latitude <= bounds.maxLat
    && fix.longitude >= bounds.minLon
    && fix.longitude <= bounds.maxLon,
  )
    // Compute an easy to use location array
    .map((fix) => ({ fix, coordinates: [fix.longitude, fix.latitude] }));
  // Filter the points out of the edge sector, if we have an edge sector
  // .filter(([, point]) => !edgesPolygon?.length || pointInPolygon(point, edgesPolygon));

  // Build the GeoJSON
  const features: GeoJSON.Feature[] = points.map(({ fix, coordinates }) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates,
    },
    properties: {
      title: fix.pointId,
    },
  }));

  const fixJson: GeoJSON.FeatureCollection = {
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
