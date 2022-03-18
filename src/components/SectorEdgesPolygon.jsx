import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { configurationStore } from '../state';

const sectorLinePaint = {
  'line-color': '#f0f',
  'line-width': 3,
};

export default observer((/* properties */) => {
  const edgeData = configurationStore.edgesOfCurrentConfiguration;

  const geoJson = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [edgeData.map((edge) => (
        [edge.longitude, edge.latitude]),
      )],
    },
  };

  return (
    <Source id="sector_edges_polygon_source" type="geojson" data={geoJson}>
      <Layer id="sector_edges_polygon" type="line" paint={sectorLinePaint} />
    </Source>
  );
});
