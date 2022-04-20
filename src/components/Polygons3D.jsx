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
  'fill-opacity': 0.4,
};

const sectorFillPaint = {
  'fill-extrusion-color': ['get', 'color'],
  'fill-extrusion-height': ['get', 'height'],
  'fill-extrusion-base': ['get', 'base_height'],
  'fill-extrusion-opacity': 0.8,
};
const fillColors = ['#fff', '#f59', '#0bb', '#94a', '#b00', '#f80', '#f63', '#3c0', '#40f', '#0bb', '#94a', '#b00', '#f80', '#f63'];

function ConvertFlightLevelToMeters(altitude) {
  const feet = altitude * 100;
  const meters = feet * 0.3048;
  return meters;
}

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

  let counter = 0;
  const sectors = sectorData.map(([title, area]) => {
    const coordinates = area.sectorArea.map((point) => (
      [point.longitude, point.latitude]),
    );
    counter += 1;
    return {
      type: 'Feature',
      properties: {
        t: `${title}-${area.bottomFlightLevel}-${area.topFlightLevel}`,
        color: fillColors[counter],
        height: ConvertFlightLevelToMeters(area.topFlightLevel - 205) * 20,
        base_height: ConvertFlightLevelToMeters(area.bottomFlightLevel - 205) * 20,
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
