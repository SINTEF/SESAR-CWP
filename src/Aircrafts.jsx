import { observer } from 'mobx-react-lite';
import React from 'react';

import AircraftMarker from './components/AircraftMarker';
import { aircraftStore } from './state';

export default observer(function Aircrafts(properties) {
  const { onClick } = properties;
  const aircrafts = aircraftStore.aircraftsWithPosition;

  return aircrafts.map((aircraft) => {
    const { aircraftId } = aircraft;

    return (
      <AircraftMarker
        aircraft={aircraft}
        onClick={() => onClick(aircraftId)}
        key={aircraftId}
      />
    );
  });
});
