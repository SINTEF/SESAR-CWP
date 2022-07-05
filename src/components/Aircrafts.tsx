import { observer } from 'mobx-react-lite';
import React from 'react';

import { aircraftStore } from '../state';
import AircraftMarker from './AircraftMarker';

export default observer(function Aircrafts() {
  const aircrafts = aircraftStore.aircraftsWithPosition;

  return (<>
    {aircrafts.map((aircraft) => {
      const { aircraftId } = aircraft;

      return (
        <AircraftMarker
          aircraft={aircraft}
          key={aircraftId}
        />
      );
    })}
  </>);
});
