import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { configurationStore, cwpStore } from '../state';

const sectorOutlinePaint = {
  'line-color': '#fff',
  'line-width': 1.5,
  'line-dasharray': [2, 2],
};

export default observer((/* properties */) => {
  const { highestBound, lowestBound } = cwpStore.altitudeFilter;
  const sectorStore = configurationStore.areaOfIncludedAirspaces;
  const sectorData = [...sectorStore.values()]
    .filter((area) => area[1].bottomFlightLevel > lowestBound
      && area[1].topFlightLevel < highestBound,
    );
  const sectors = [];
  for (const airspace of sectorData) {
    sectors.push({
      type: 'Feature',
      properties: {
        t: airspace[0].toString(),
      },
      geometry: {
        type: 'Polygon',
        coordinates: [airspace[1].sectorArea.map((area) => (
          [area.longitude, area.latitude]),
        )],
      },
    });
  }
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
