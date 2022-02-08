import './App.css';

import { render } from '@testing-library/react';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

import AircraftListElement from './AircraftListElement';
import Map from './Map';
import SectorConfiguration from './SectorConfiguration';

export default function App() {
  return (
    <>
      <Map />
      {/* <h3 className ='flights-title' style={{ color: '#ffffff' }}>Flights</h3> */}
      <div className="aircraft-list">
        <ListGroup as="ul">
          <AircraftListElement />
        </ListGroup>
      </div>
      <SectorConfiguration />

    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
