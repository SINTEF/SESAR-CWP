import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { LinePaint } from 'mapbox-gl';

import { configurationStore, cwpStore, roleConfigurationStore } from '../state';

const sectorOutlinePaint: LinePaint = {
  'line-color': '#fff',
  'line-width': 2.5,
};

export default observer(function SectorPolygons(/* properties */) {
  const sectorId = roleConfigurationStore.currentControlledSector;
  const sectorStore = configurationStore.areaOfIncludedAirspaces;
  const sectorData = [...sectorStore.values()]
    .filter(([key]) => key === sectorId);

  if (configurationStore.currentCWP === '') {
    return null;
  }
  const sectors: GeoJSON.Feature[] = sectorData.map(([/* title */, area]) => {
    const coordinates = area.sectorArea.map((point) => (
      [point.longitude, point.latitude]),
    );
    cwpStore.setCurrentPolygonCoordinates([...coordinates, coordinates[0]]);
    // cwpStore.setCurrentPolygonCoordinates(coordinates);
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [[...coordinates, coordinates[0]]],
      },
    };
  });

  const geoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: sectors,
  };

  return (
    <Source id="current_sector_polygons_source" type="geojson" data={geoJson}>
      <Layer id="current_sector_polygons" type="line" paint={sectorOutlinePaint} />
    </Source>
  );
});
