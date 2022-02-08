import { observer } from 'mobx-react-lite';
import React from 'react';
import { Popup } from 'react-map-gl';

import { aircraftStore } from './state';

export default observer((properties) => {
  const { onClose, aircraftId } = properties;
  const info = aircraftStore.aircrafts.get(aircraftId);
  if (!info) {
    // eslint-disable-next-line no-console
    console.warn('No aircraft with id', aircraftId);
    return false;
  }

  return (
    <Popup
      tipSize={5}
      offsetTop={-5}
      anchor="bottom"
      longitude={info.lastKnownLongitude}
      latitude={info.lastKnownLatitude}
      closeOnClick
      onClose={onClose}
    >
      {' '}
      FlightId:
      {' '}
      {info.assignedFlightId}
      {' '}
      <br />
      {' '}
      Longitude:
      {' '}
      {Number.parseFloat((info.lastKnownLongitude).toFixed(5))}
      {' '}
      <br />
      {' '}
      Latitude:
      {' '}
      {Number.parseFloat((info.lastKnownLatitude).toFixed(5))}
    </Popup>
  );
});
