import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { configurationStore } from '../state';

const sectorLinePaint = {
  'line-color': '#f0f',
  'line-width': 2,
};

export default observer(function SectorEdgesPolygon(/* properties */) {
  const { edgesPolygon } = configurationStore;
  const coordinates = edgesPolygon?.length > 0? [...edgesPolygon, edgesPolygon[0]] : [];

  const geoJson: GeoJSON.Feature = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  };

  return (
    <Source id="sector_edges_polygon_source" type="geojson" data={geoJson}>
      <Layer id="sector_edges_polygon" type="line" paint={sectorLinePaint} />
    </Source>
  );
});
