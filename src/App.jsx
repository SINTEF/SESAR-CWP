import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';

import { render } from '@testing-library/react';
import * as React from 'react';

import AircraftListElement from './AircraftListElement';
import AltitudeFilterPanel from './components/AltitudeFilterPanel';
import BottomNavbar from './components/BottomNavbar';
import Time from './components/Time';
import ControllerModal from './ControllerModal';
import Map from './Map';
import SectorConfiguration from './SectorConfiguration';
import SectorFlightList from './SectorFlightList';

export default function App(/* properties */) {
  return (
    <>
      <ControllerModal />
      <Map />
      <SectorFlightList />
      <AircraftListElement />
      <SectorConfiguration />
      <AltitudeFilterPanel />
      <Time />
      <BottomNavbar />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
