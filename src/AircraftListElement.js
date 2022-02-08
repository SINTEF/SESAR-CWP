import * as React from 'react';
import { useState } from 'react';

import { ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { aircraftStore } from './state';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function AircraftListElement(props) {
  const { onClick } = props;
  const [filter,setFilter] = useState('');
  const data = aircraftStore.aircraftsWithPosition;
  return (
    <div className='aircraft-list'>
    <p>Search flight: 
      <input id ="filter"
    name="filter"
    value={filter}
    onChange={event => setFilter(event.target.value)}
    /></p>
    <ListGroup as="ul">
    {data.filter(aircraft_data => aircraft_data.assignedFlightId.includes(filter) || filter ==='')
          .map((aircraft_data) => (
    <ListGroup.Item key={aircraft_data.assignedFlightId} action as="li">
      {/* <li key={aircraft_data.aircraftId}>
              <a href="#" onClick={() => undefined}> */}
      <b>FlightId: {aircraft_data.assignedFlightId}</b> <br></br> 
      Speed: {Math.floor(aircraft_data.lastKnownSpeed)} <br></br> 
      Position: {Math.floor(aircraft_data.lastKnownLongitude)}, {Math.floor(aircraft_data.lastKnownLatitude)}, {Math.floor(aircraft_data.lastKnownAltitude)} <br></br>
      {/* </a>
            </li> */}
    </ListGroup.Item>))}
      
      </ListGroup></div>
  );
});