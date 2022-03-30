import * as turf from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { configurationStore, cwpStore } from '../state';

const sectorOutlinePaint = {
  'line-color': '#fff',
  'line-width': 1,
  'line-dasharray': [2, 2],
};
const sectorNamesPaint = {
  'text-color': '#99ff99',
};

export default observer(function SectorPolygons(/* properties */) {
  const { highestBound, lowestBound } = cwpStore.altitudeFilter;
  const { showSectorLabels } = cwpStore;
  const sectorStore = configurationStore.areaOfIncludedAirspaces;
  const sectorData = [...sectorStore.values()]
    .filter(([, area]) => area.bottomFlightLevel >= lowestBound
      && area.topFlightLevel <= highestBound
      && area.sectorArea?.length > 0,
    );
  const sectorNamesText = {
    visibility: showSectorLabels ? 'visible' : 'none',
    'text-field': ['get', 'title'],
    'text-allow-overlap': true,
    'text-font': [
      'Open Sans Bold',
    ],
    'text-size': 14,
  };
  // eslint-disable-next-line no-unused-vars
  const sectors = sectorData.map(([title, area]) => {
    const coordinates = area.sectorArea.map((point) => (
      [point.longitude, point.latitude]),
    );
    return {
      type: 'Feature',
      properties: {
        t: `CWP-${area.bottomFlightLevel}-${area.topFlightLevel}`,
      },
      geometry: {
        type: 'LineString',
        coordinates: [...coordinates, coordinates[0]],
      },
    };
  });
  const centroidPoints = [];
  for (const feature of sectors) {
    const centroidPt = turf.centroid(feature);
    centroidPt.properties.title = feature.properties.t;
    centroidPoints.push(centroidPt);
  }
  const centroidPointsCollection = {
    type: 'FeatureCollection',
    features: centroidPoints,
  };

  const geoJson = {
    type: 'FeatureCollection',
    features: sectors,
  };

  return (
    <>
      <Source id="sector_polygons_source" type="geojson" data={geoJson}>
        <Layer id="sector_polygons" type="line" paint={sectorOutlinePaint} />
      </Source>
      <Source id="sector_polygon_names" type="geojson" data={centroidPointsCollection}>
        <Layer id="name-style" type="symbol" layout={sectorNamesText} paint={sectorNamesPaint} />
      </Source>
    </>
  );
});
