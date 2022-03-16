import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';

import { render } from '@testing-library/react';
import * as React from 'react';

import AircraftListElement from './AircraftListElement';
import BottomNavbar from './components/BottomNavbar';
import Map from './Map';
import SectorConfiguration from './SectorConfiguration';
import SectorFlightList from './SectorFlightList';

export default function App(/* properties */) {
  return (
    <>
      <Map />
      <SectorFlightList />
      <AircraftListElement />
      <SectorConfiguration />
      <BottomNavbar />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
