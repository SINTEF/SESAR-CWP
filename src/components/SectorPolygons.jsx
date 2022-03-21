import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { configurationStore, cwpStore } from '../state';

const sectorOutlinePaint = {
  'line-color': '#fff',
  'line-width': 1,
  'line-dasharray': [2, 2],
};

export default observer(function SectorPolygons(/* properties */) {
  const { highestBound, lowestBound } = cwpStore.altitudeFilter;
  const sectorStore = configurationStore.areaOfIncludedAirspaces;
  const sectorData = [...sectorStore.values()]
    .filter(([, area]) => area.bottomFlightLevel > lowestBound
      && area.topFlightLevel < highestBound
      && area.sectorArea?.length > 0,
    );

  const sectors = sectorData.map(([title, area]) => {
    const coordinates = area.sectorArea.map((point) => (
      [point.longitude, point.latitude]),
    );
    return {
      type: 'Feature',
      properties: {
        t: title.toString(),
      },
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
    <Source id="sector_polygons_source" type="geojson" data={geoJson}>
      <Layer id="sector_polygons" type="line" paint={sectorOutlinePaint} />
    </Source>
  );
});
