
import './App.css';
import * as React from 'react';
import SectorConfiguration from './SectorConfiguration';
import { render } from '@testing-library/react';
import { ListGroup } from 'react-bootstrap';
import AircraftListElement from './AircraftListElement';
import Map from './Map';



export default function App(props) {
  return (
    <>
      <Map />
      {/* <h3 className ='flights-title' style={{ color: '#ffffff' }}>Flights</h3> */}
      <div className='aircraft-list'>
        <ListGroup as="ul">
          <AircraftListElement />
        </ListGroup>
      </div>
      <SectorConfiguration />

    </>
  )
}

export function renderToDom(container) {
  render(<App />, container);
}
