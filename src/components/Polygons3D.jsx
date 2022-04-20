// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import * as turf from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { configurationStore, cwpStore } from '../state';

const sectorOutlinePaint = {
  'line-color': ['get', 'color'],
  'line-width': 1,
  'line-dasharray': [2, 2],
};
const sectorNamesPaint = {
  'text-color': '#99ff99',
};

const sectorPaint = {
  'fill-color': ['get', 'color'],
  'fill-opacity': 0.5,
};

const sectorFillPaint = {
  'fill-extrusion-color': ['get', 'color'],
  'fill-extrusion-height': ['get', 'height'],
  'fill-extrusion-base': ['get', 'base_height'],
  'fill-extrusion-opacity': 0.8,
};
const fillColors = ['#fff', '#f59', '#0bb', '#94a', '#bb0', '#f80', '#f63', '#fff', '#f59', '#0bb', '#94a', '#bb0', '#f80', '#f63'];

export default observer(function SectorPolygons(/* properties */) {
  const { highestBound, lowestBound } = cwpStore.altitudeFilter;
  const { showSectorLabels } = cwpStore;
  const sectorStore = configurationStore.areaOfIncludedAirspaces;
  const sectorData = [...sectorStore.values()]
    .filter(([, area]) => area.sectorArea?.length > 0);

  const sectorNamesText = {
    visibility: showSectorLabels ? 'visible' : 'none',
    'text-field': ['get', 'title'],
    'text-allow-overlap': true,
    'text-font': [
      'Open Sans Bold',
    ],
    'text-size': 14,
  };
  const getSectorColor = (bottom, top) => {
    if (top > highestBound) {
      return '#ff4f00';
    } if (bottom < lowestBound) {
      return '#48A14D';
    }
    return '#fff';
  };
  let counter = 0;
  const sectors = sectorData.map(([title, area]) => {
    const coordinates = area.sectorArea.map((point) => (
      [point.longitude, point.latitude]),
    );
    counter += 1;
    return {
      type: 'Feature',
      properties: {
        t: `CWP-${area.bottomFlightLevel}-${area.topFlightLevel}`,
        color: fillColors[counter],
        height: area.topFlightLevel * 1000 - area.bottomFlightLevel * 1000,
        base_height: 0,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[...coordinates, coordinates[0]]],
      },
    };
  });
  // const centroidPoints = [];
  // for (const feature of sectors) {
  //   console.log(feature);
  //   const centroidPt = turf.centroid(feature);
  //   centroidPt.properties.title = feature.properties.t;
  //   centroidPoints.push(centroidPt);
  // }
  // const centroidPointsCollection = {
  //   type: 'FeatureCollection',
  //   features: centroidPoints,
  // };

  const geoJson = {
    type: 'FeatureCollection',
    features: sectors,
  };

  return (
    <>
      <Source id="sector_polygons_source" type="geojson" data={geoJson}>
        <Layer id="sector_polygons_fill" type="fill" paint={sectorPaint} />
        <Layer id="sector_polygons" type="fill-extrusion" paint={sectorFillPaint} />
      </Source>
      {/* <Source id="sector_polygon_names" type="geojson" data={centroidPointsCollection}>
        <Layer id="name-style" type="symbol" layout={sectorNamesText} paint={sectorNamesPaint} />
      </Source> */}
    </>
  );
});
