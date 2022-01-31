import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { aircraftStore } from './state';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function AircraftListElement(props) {
  const { onClick } = props;
  const data = aircraftStore.aircraftsWithPosition;
  return data.map((aircraft_data) => (
    <ListGroup.Item key={aircraft_data.assignedFlightId} action as="li">
      {/* <li key={aircraft_data.aircraftId}>
              <a href="#" onClick={() => undefined}> */}
      <b>FlightId: {aircraft_data.assignedFlightId}</b> <br></br> 
      Speed: {Math.floor(aircraft_data.lastKnownSpeed)} <br></br> 
      Position: {Math.floor(aircraft_data.lastKnownLongitude)}, {Math.floor(aircraft_data.lastKnownLatitude)}, {Math.floor(aircraft_data.lastKnownAltitude)} <br></br> 
      {/* </a>
            </li> */}
    </ListGroup.Item>
  ));
});