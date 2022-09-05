import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { LinePaint } from 'mapbox-gl';

import { configurationStore, roleConfigurationStore } from '../state';

const sectorOutlinePaint: LinePaint = {
  'line-color': '#fff',
  'line-width': 2.5,
};

export default observer(function SectorPolygons(/* properties */) {
  const { areaOfCurrentControlledSector } = roleConfigurationStore;

  if (!areaOfCurrentControlledSector || configurationStore.currentCWP === '') {
    return null;
  }

  const coordinates = areaOfCurrentControlledSector.map((point) => (
    [point.longitude, point.latitude]),
  );
  const sectors: GeoJSON.Feature = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates],
    },
  };

  const geoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [sectors],
  };

  return (
    <Source id="current_sector_polygons_source" type="geojson" data={geoJson}>
      <Layer id="current_sector_polygons" type="line" paint={sectorOutlinePaint} />
    </Source>
  );
});
