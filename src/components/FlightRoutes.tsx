import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type {
  CirclePaint, LinePaint, SymbolLayout, SymbolPaint,
} from 'mapbox-gl';

import { aircraftStore, cwpStore, simulatorStore } from '../state';
import type AircraftModel from '../model/AircraftModel';
import type FlightRoute from '../model/FlightRoute';
import type Trajectory from '../model/Trajectory';

function timestampToTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function buildGeoJsonFlightRoute(
  aircraft: AircraftModel, trajectories: Trajectory[],
): GeoJSON.Feature[] {
  const locations = trajectories.map((trajectory) => [
    trajectory.trajectoryCoordinate.longitude,
    trajectory.trajectoryCoordinate.latitude,
  ]);

  const aircraftLocation = [
    aircraft.lastKnownLongitude,
    aircraft.lastKnownLatitude,
  ];

  const points: GeoJSON.Feature[] = trajectories.map((trajectory) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        trajectory.trajectoryCoordinate.longitude,
        trajectory.trajectoryCoordinate.latitude,
      ],
    },
    properties: {
      title: trajectory.objectId ? `${trajectory.objectId}\n${timestampToTime(trajectory.timestamp)}` : undefined,
    },
  }));

  return [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [aircraftLocation, ...locations],
      },
    },
    ...points,
  ];
}

const paintLine: LinePaint = {
  'line-color': '#FFB100',
  'line-width': 1.5,
};

const paintCircle: CirclePaint = {
  'circle-color': '#FFB100',
  'circle-radius': 3,
};

const paintSymbol: SymbolPaint = {
  'text-color': '#FFB100',
  'text-halo-color': '#000',
  'text-halo-width': 10,
};

const layoutSymbol: SymbolLayout = {
  'text-field': ['get', 'title'],
  'text-allow-overlap': true,
  'text-font': [
    'IBM Plex Mono Bold',
  ],
  'text-size': 9,
  'text-offset': [0, 0.45],
  'text-anchor': 'top',
};

export default observer(function FlightRoutes() {
  // Load data from states
  const simulatorTimestamp = simulatorStore.timestamp;
  const { aircraftsWithFlightRoutes } = cwpStore;

  // Load list of aircrafts that must have flightroutes
  const aircrafts = [...aircraftsWithFlightRoutes]
    .map((aircraftId) => aircraftStore.aircrafts.get(aircraftId))
    // Remove unfound aircrafts and aircrafts thare are not in the altitude range
    .filter((aircraft): aircraft is AircraftModel => aircraft !== undefined);

  const flightRoutes = aircrafts
    .map((aircraft) => ({
      aircraft,
      route: aircraftStore.flightRoutes.get(aircraft.assignedFlightId),
    }))
    .filter((flightRoute): flightRoute is { aircraft: AircraftModel, route: FlightRoute } => (
      flightRoute.route !== undefined));

  const features = flightRoutes.flatMap(
    ({ aircraft, route }) => buildGeoJsonFlightRoute(aircraft, route.trajectory.filter(
      (trajectory) => trajectory.timestamp >= simulatorTimestamp)));

  const geoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features,
  };

  return (
    <Source id="flightroutes_source" type="geojson" data={geoJson}>
      <Layer id="flightroutesline" type="line" paint={paintLine} />
      <Layer id="flightroutespoint" type="circle" paint={paintCircle} />
      <Layer id="flightroutesnames" type="symbol" layout={layoutSymbol} paint={paintSymbol} />
    </Source>
  );
});
