import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import outlineLayer from './outlineStyle';
import sectorLayer from './sectorLayer';
import { configurationStore } from './state';

export default observer((properties) => {
  const { highestBound, lowestBound } = properties;
  const edgeData = configurationStore.edgesOfCurrentConfiguration;
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
      color: '#fff',
      width: 1,
        t: airspace[0].toString(),
        dasharray: [2, 1],
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
    features:
      [...sectors,
      {
        type: 'Feature',
        properties: {
          color: '#f0f',
          width: 3,
          // 'dasharray':[2,2],

        },
        geometry: {
          type: 'Polygon',
          coordinates: [edgeData.map((edge) => (
            [edge.longitude, edge.latitude]),
          )],
        },
        },
      ],
  };
  return (
    <Source id="sector_source" type="geojson" data={geoJson}>
      <Layer id={sectorLayer.id} type={sectorLayer.type} paint={sectorLayer.paint} />
      <Layer id={outlineLayer.id} type={outlineLayer.type} paint={outlineLayer.paint} />
    </Source>
  );
});
