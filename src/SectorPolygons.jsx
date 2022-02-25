import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import outlineLayer from './outlineStyle';
import sectorLayer from './sectorLayer';
import { configurationStore } from './state';

export default observer((properties) => {
  const { highestBound, lowestBound } = properties;
  const edgeData = configurationStore.edges;
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
      // 'dasharray':[2,1],
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
      // {
      //   type: 'Feature',
      //   properties: {
      //     color: '#fff',
      //   },
      //   geometry: {
      //     type: 'Polygon',
      //     coordinates: [
      //       [
      //         [67.137_34, 9.137_45],
      //         [66.964_66, 9.8097],
      //         [68.032_52, 10.3252],
      //         [69.06, 11.98],
      //         [68.06, 10.98],
      //         [67.06, 12.98],
      //         [66.06, 9.98],
      //         [67.137_34, 9.137_45],
      //       ]],
      //   },
      // },
      ],
  };
  return (
    <Source type="geojson" data={geoJson}>
      <Layer id={sectorLayer.id} type={sectorLayer.type} paint={sectorLayer.paint} />
      <Layer id={outlineLayer.id} type={outlineLayer.type} paint={outlineLayer.paint} />
    </Source>
  );
});
