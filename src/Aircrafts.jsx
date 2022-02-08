import { observer } from 'mobx-react-lite';
import React from 'react';

import AircraftMarker from './AircraftMarker';
import { aircraftStore } from './state';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer((properties) => {
  const { onClick } = properties;
  const data = aircraftStore.aircraftsWithPosition;
  // Convert the map to an array and remove the aircrafts containing undefined values
  // as we have not received a target report for them yet
  /* const geojson = {
      type: 'FeatureCollection',
      features: data.map(({ lastKnownLongitude, lastKnownLatitude }) => ({
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [lastKnownLongitude, lastKnownLatitude],
          }
      })),
  };

  const layerStyle = {
      id: 'point',
      type: 'circle',
      paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf'
      }
  };

  return (<Source id="aircrafts" type="geojson" data={geojson}>
      <Layer {...layerStyle} />
  </Source>);
  */
  return data.map((aircraftData) => {
    const {
      aircraftId,
      lastKnownBearing: bearing,
      lastKnownLongitude: longitude,
      lastKnownLatitude: latitude,
      assignedFlightId: flightId,
    } = aircraftData;

    return (
      <AircraftMarker
        key={flightId}
        flightId={flightId}
        bearing={bearing}
        longitude={longitude}
        latitude={latitude}
        onClick={() => onClick(aircraftId)}
      />
    );
  });
});
