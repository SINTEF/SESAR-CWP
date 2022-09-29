// import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
// import { polygon, transformScale } from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
// import type { Position } from '@turf/turf';
import type { CirclePaint } from 'mapbox-gl';

import {
  cwpStore, roleConfigurationStore,
} from '../state';
// import type AircraftModel from '../model/AircraftModel';

const layerPaint: CirclePaint = {
  'circle-radius': 25,
  'circle-color': ['get', 'circleColor'],
  'circle-blur': 0.9,
};

export default observer(function LimboFlights(/* properties */) {
  const listOfAddedAircrafts = roleConfigurationStore.addedRemovedAircrafts[0];
  const listOfRemovedAircrafts = roleConfigurationStore.addedRemovedAircrafts[1];

  if (!cwpStore.showLimboFlight) {
    return null;
  }
  if (listOfAddedAircrafts === undefined || listOfRemovedAircrafts === undefined) {
    return null;
  }
  // if (listOfAddedAircrafts.length === 0 && listOfRemovedAircrafts.length === 0) return null;

  const addedGeoJson = [
    ...listOfAddedAircrafts.map((aircraft) => ({
      type: 'Feature',
      properties: {
        circleColor: '#006400',
      },
      geometry: {
        type: 'Point',
        coordinates: [aircraft.lastKnownLongitude, aircraft.lastKnownLatitude],
      },
    })),
    ...listOfRemovedAircrafts.map((aircraft) => ({
      type: 'Feature',
      properties: {
        circleColor: '#8b0000',
      },
      geometry: {
        type: 'Point',
        coordinates: [aircraft.lastKnownLongitude, aircraft.lastKnownLatitude],
      },
    })),
  ];

  const limboGeoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: addedGeoJson as GeoJSON.Feature[],
  };

  return (
    <>
      <Source id="limbo-flights-source" type="geojson" data={limboGeoJson}>
        <Layer id="limbo-flights" type="circle" paint={layerPaint} />
      </Source>
    </>
  );
});
