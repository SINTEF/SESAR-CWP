import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { aircraftStore } from './state';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer((/* properties */) => {
  // const { onClick } = properties;
  const data = aircraftStore.aircraftsWithPosition;
  return data.map((aircraftData) => (
    <ListGroup.Item variant="secondary" key={aircraftData.assignedFlightId} action as="li">
      {/* <li key={aircraft_data.aircraftId}>
              <a href="#" onClick={() => undefined}> */}
      <b>
        FlightId:
        {aircraftData.assignedFlightId}
      </b>
      {' '}
      <br />
      Speed:
      {' '}
      {Math.floor(aircraftData.lastKnownSpeed)}
      {' '}
      <br />
      Position:
      {' '}
      {Math.floor(aircraftData.lastKnownLongitude)}
      ,
      {' '}
      {Math.floor(aircraftData.lastKnownLatitude)}
      ,
      {' '}
      {Math.floor(aircraftData.lastKnownAltitude)}
      {' '}
      <br />
      {/* </a>
            </li> */}
    </ListGroup.Item>
  ));
});
