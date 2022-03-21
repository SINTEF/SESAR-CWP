import SphericalMercator from '@mapbox/sphericalmercator';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { aircraftStore, cwpStore } from '../state';

const degreesToRad = Math.PI / 180;
const sphericalMercator = new SphericalMercator();

function buildSpeedVectorLocations(aircraft, minutesInTheFuture) {
  // Make an array the size of minutesInTheFuture
  return Array.from({ length: minutesInTheFuture + 1 }, (_, index) => {
    const lon = aircraft.lastKnownLongitude;
    const lat = aircraft.lastKnownLatitude;

    if (index === 0) {
      return [lon, lat];
    }

    const nbSeconds = index * 60;

    // m/s speed
    const currentSpeedMS = aircraft.lastKnownSpeed;
    // degrees
    const currentBearing = aircraft.lastKnownBearing;

    // Compute the change in meters
    const addX = Math.sin(currentBearing * degreesToRad) * currentSpeedMS * nbSeconds;
    const addY = Math.cos(currentBearing * degreesToRad) * currentSpeedMS * nbSeconds;

    // Convert lat/lon to meters
    let [x, y] = sphericalMercator.forward([lon, lat]);

    // Add the new position
    x += addX;
    y += addY;

    // Convert back to lat/lon
    return sphericalMercator.inverse([x, y]);
  });
}

function buildGeoJsonSpeedVector(aircraft, minutesInTheFuture) {
  const locations = buildSpeedVectorLocations(aircraft, minutesInTheFuture);
  return [{
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: locations,
    },
  }, {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: locations.slice(1),
    },
  }];
}

const paintLine = {
  'line-color': '#b39ddb',
  'line-width': 1,
};

const paintCircle = {
  'circle-color': '#b39ddb',
  'circle-radius': 2,
};

export default observer(function SpeedVectors() {
  const aircraftIds = cwpStore.aircraftsWithSpeedVectors;
  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

  const aircrafts = [...aircraftIds]
    .map((aircraftId) => aircraftStore.aircrafts.get(aircraftId))
    .filter((aircraft) => aircraft !== undefined
      && aircraft.lastKnownAltitude > lowestBound
      && aircraft.lastKnownAltitude < highestBound);

  const speedVectors = aircrafts.flatMap((aircraft) => buildGeoJsonSpeedVector(aircraft, 3));

  const geoJson = {
    type: 'FeatureCollection',
    features: speedVectors,
  };

  return (
    <Source id="speedvectors_source" type="geojson" data={geoJson}>
      <Layer id="speedvectorsline" type="line" paint={paintLine} />
      <Layer id="speedvectorspoint" type="circle" paint={paintCircle} />
    </Source>
  );
});
