import { observer } from 'mobx-react-lite';
import pointInPolygon from 'point-in-polygon';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import fixLayer from './fixLayer';
import fixNameLayer from './fixNameLayer';
import { configurationStore, fixStore } from './state';

export default observer((/* properties */) => {
  // Load required data
  const fixData = fixStore.fixes;
  const { edgesPolygon } = configurationStore;

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
      <Layer id={fixLayer.id} type={fixLayer.type} paint={fixLayer.paint} />
      <Layer
        id={fixNameLayer.id}
        type={fixNameLayer.type}
        layout={fixNameLayer.layout}
        paint={fixNameLayer.paint}
      />
    </Source>
  );
});
