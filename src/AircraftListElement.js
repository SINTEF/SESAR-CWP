import * as React from 'react';
import {ListGroup} from 'react-bootstrap';


// Important for perf: the markers never change, avoid rerender when the map viewport changes
function AircraftListElement(props){
    const{data,onClick} = props;
    return data.map((aircraft_data)=>(
        <ListGroup.Item key={aircraft_data.assignedFlightId} action as="li">
            {/* <li key={aircraft_data.aircraftId}>
              <a href="#" onClick={() => undefined}> */}
                {aircraft_data.assignedFlightId}
              {/* </a>
            </li> */}
        </ListGroup.Item>
    ));
}

// export default React.memo(Aircrafts);
export default AircraftListElement;