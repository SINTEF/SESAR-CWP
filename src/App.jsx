import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';

import { render } from '@testing-library/react';
import * as React from 'react';

import AircraftListElement from './AircraftListElement';
import Map from './Map';
import SectorConfiguration from './SectorConfiguration';

export default function App(/* properties */) {
  return (
    <>
      <Map />
      <AircraftListElement />
      <SectorConfiguration />

    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
