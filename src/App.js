import * as React from 'react';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';
import SectorConfiguration from './SectorConfiguration';
import { render } from '@testing-library/react';
import AircraftListElement from './AircraftListElement';
import Map from './Map';



export default function App(props) {

  return (
    <>
      <Map />
      <AircraftListElement />
      <SectorConfiguration />

    </>
  )
}

export function renderToDom(container) {
  render(<App />, container);
}
