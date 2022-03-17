import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import { aircraftStore } from '../state';

function buildLineStringFromAircraft(aircraft, minutesInTheFuture) {
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [aircraft.lastKnownLongitude, aircraft.lastKnownLatitude],
        [aircraft.lastKnownLongitude + minutesInTheFuture / 2, aircraft.lastKnownLatitude],
        [aircraft.lastKnownLongitude + minutesInTheFuture, aircraft.lastKnownLatitude + minutesInTheFuture],
      ],
    },
  };
}

const paint = {
  'line-color': '#00f',
  'line-width': 3,
};

export default observer(() => {
  // TODO use a globablly filtered list of aircrafts
  const aircrafts = aircraftStore.aircraftsWithPosition;
  const speedVectors = aircrafts.map((aircraft) => buildLineStringFromAircraft(aircraft, 3));

  const geoJson = {
    type: 'FeatureCollection',
    features: speedVectors,
  };

  return (
    <Source id="speedvectors_source" type="geojson" data={geoJson}>
      <Layer id="speedvectors" type="line" paint={paint} />
    </Source>
  );
});
