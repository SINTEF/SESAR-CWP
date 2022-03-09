import { observer } from 'mobx-react-lite';
import React from 'react';

import AircraftMarker from './AircraftMarker';
import { aircraftStore } from './state';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer((properties) => {
  const { onClick, highestBound, lowestBound } = properties;
  const data = aircraftStore.aircraftsWithPosition;

  const filteredData = [...data.values()].filter(({ lastKnownAltitude }) => (
    lastKnownAltitude > lowestBound
    && lastKnownAltitude < highestBound
  ));
  return filteredData.map((filteredAircrafts) => {
    const {
      aircraftId,
      lastKnownBearing: bearing,
      lastKnownLongitude: longitude,
      lastKnownLatitude: latitude,
      lastKnownAltitude: altitude,
      assignedFlightId: flightId,
      callSign,
      wakeTurbulence,
    } = filteredAircrafts;

    return (
      <AircraftMarker
        key={flightId}
        flightId={flightId}
        bearing={bearing}
        longitude={longitude}
        altitude={altitude}
        latitude={latitude}
        callSign={callSign}
        wakeTurbulence={wakeTurbulence}
        onClick={() => onClick(aircraftId)}
      />
    );
  });
});
