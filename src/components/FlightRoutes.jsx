import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { aircraftStore, cwpStore, simulatorStore } from '../state';

function buildGeoJsonFlightRoute(aircraft, trajectories) {
  const locations = trajectories.map((trajectory) => [
    trajectory.trajectoryCoordinate.longitude,
    trajectory.trajectoryCoordinate.latitude,
  ]);

  const aircraftLocation = [
    aircraft.lastKnownLongitude,
    aircraft.lastKnownLatitude,
  ];

  return [{
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [aircraftLocation, ...locations],
    },
  }, {
    type: 'Feature',
    geometry: {
      type: 'MultiPoint',
      coordinates: locations,
    },
  }];
}

const paintLine = {
  'line-color': '#ff9800',
  'line-width': 1,
};

const paintCircle = {
  'circle-color': '#ff9800',
  'circle-radius': 2,
};

export default observer(() => {
  // Load data from states
  const { lowestBound, highestBound } = cwpStore.altitudeFilter;
  const simulatorTimestamp = simulatorStore.timestamp;
  const { aircraftsWithFlightRoutes } = cwpStore;

  // Load list of aircrafts that must have flightroutes
  const aircrafts = [...aircraftsWithFlightRoutes]
    .map((aircraftId) => aircraftStore.aircrafts.get(aircraftId))
    // Remove unfound aircrafts and aircrafts thare are not in the altitude range
    .filter((aircraft) => aircraft !== undefined
      && aircraft.lastKnownAltitude > lowestBound && aircraft.lastKnownAltitude < highestBound);

  const flightRoutes = aircrafts
    .map((aircraft) => ([aircraft, aircraftStore.flightRoutes.get(aircraft.assignedFlightId)]))
    .filter(([, flightRoute]) => flightRoute !== undefined);

  const features = flightRoutes.flatMap(
    ([aircraft, flightRoute]) => buildGeoJsonFlightRoute(aircraft, flightRoute.trajectory.filter(
      (trajectory) => trajectory.timestamp > simulatorTimestamp)));

  const geoJson = {
    type: 'FeatureCollection',
    features,
  };

  return (
    <Source id="flightroutes_source" type="geojson" data={geoJson}>
      <Layer id="flightroutesline" type="line" paint={paintLine} />
      <Layer id="flightroutespoint" type="circle" paint={paintCircle} />
    </Source>
  );
});
