import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { polygon } from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { Position } from '@turf/turf';
import type { CirclePaint } from 'mapbox-gl';

import { aircraftStore, cwpStore, roleConfigurationStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

const layerPaint: CirclePaint = {
  'circle-radius': 25,
  'circle-color': ['get', 'circleColor'],
  'circle-blur': 0.9,
};

export default observer(function LimboFlights(/* properties */) {
  const currentSectorBounds = roleConfigurationStore.areaOfCurrentControlledSector?.map((point) => (
    [point.longitude, point.latitude]),
  );
  const nextSectorBounds = roleConfigurationStore.areaOfNextControlledSector?.map((point) => (
    [point.longitude, point.latitude]),
  );
  const [listOfAddedAircrafts, setListOfAddedAircrafts] = React.useState<AircraftModel[]>([]);
  const [listOfRemovedAircrafts, setListOfRemovedAircrafts] = React.useState<AircraftModel[]>([]);

  React.useEffect(() => {
    if (currentSectorBounds && nextSectorBounds) {
      const currentPolygon = polygon([currentSectorBounds] as unknown as Position[][]);
      const nextPolygon = polygon([nextSectorBounds] as unknown as Position[][]);
      const addedAircrafts: AircraftModel[] = [];
      const removedAircrafts: AircraftModel[] = [];
      for (const aircraft of aircraftStore.aircrafts) {
        const position: Position = [aircraft[1].lastKnownLongitude, aircraft[1].lastKnownLatitude];
        const inCurrentSector = booleanPointInPolygon(position, currentPolygon);
        const inNextSector = booleanPointInPolygon(position, nextPolygon);
        if (!inCurrentSector && inNextSector) {
          addedAircrafts.push(aircraft[1]);
        }
        if (inCurrentSector && !inNextSector) {
          removedAircrafts.push(aircraft[1]);
        }
      }
      setListOfAddedAircrafts(addedAircrafts);
      setListOfRemovedAircrafts(removedAircrafts);
    }
  }, [roleConfigurationStore.areaOfNextControlledSector]);

  if (!cwpStore.showLimboFlight) {
    return null;
  }
  if (listOfAddedAircrafts.length === 0 && listOfRemovedAircrafts.length === 0) return null;

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
    <Source id="limbo-flights-source" type="geojson" data={limboGeoJson}>
      <Layer id="limbo-flights" type="circle" paint={layerPaint} />
    </Source>
  );
});
