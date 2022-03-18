import { observer } from 'mobx-react-lite';
import React from 'react';

import AircraftMarker from './AircraftMarker';
import { aircraftStore, cwpStore } from './state';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer((properties) => {
  const { onClick } = properties;
  const data = aircraftStore.aircraftsWithPosition;

  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

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
        aircraftId={aircraftId}
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
