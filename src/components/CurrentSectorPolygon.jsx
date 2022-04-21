import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { configurationStore, currentRoleConfiguration } from '../state';

const sectorOutlinePaint = {
  'line-color': '#fff',
  'line-width': 2.5,
};

export default observer(function SectorPolygons(/* properties */) {
  const sectorId = currentRoleConfiguration.getControlledSector(configurationStore.currentCWP);
  const sectorStore = configurationStore.areaOfIncludedAirspaces;
  const sectorData = [...sectorStore.values()]
    .filter(([key]) => key === sectorId);
  // eslint-disable-next-line no-unused-vars
  const sectors = sectorData.map(([title, area]) => {
    const coordinates = area.sectorArea.map((point) => (
      [point.longitude, point.latitude]),
    );
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [...coordinates, coordinates[0]],
      },
    };
  });

  const geoJson = {
    type: 'FeatureCollection',
    features: sectors,
  };

  return (
    <Source id="current_sector_polygons_source" type="geojson" data={geoJson}>
      <Layer id="current_sector_polygons" type="line" paint={sectorOutlinePaint} />
    </Source>
  );
});
