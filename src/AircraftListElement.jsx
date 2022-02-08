import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

import { aircraftStore } from './state';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer((/* properties */) => {
  // const { onClick } = properties;
  const data = aircraftStore.aircraftsWithPosition;
  const [filter, setFilter] = useState('');
  return (
    <div className="aircraft-list">
      <p>
        Search flight:
        <input
          id="filter"
          name="filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </p>
      <ListGroup
        as="ul"
      >
        {data.filter((aircraftData) => aircraftData.assignedFlightId.includes(filter) || filter === '')
          .map((aircraftData) => (
            <ListGroup.Item key={aircraftData.assignedFlightId} action as="li">
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
          ),
          )}
      </ListGroup>
    </div>
  );
});
