import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';

import { render } from '@testing-library/react';
import * as React from 'react';

import AircraftListElement from './AircraftListElement';
import AltitudeFilterPanel from './components/AltitudeFilterPanel';
import BottomNavbar from './components/BottomNavbar';
import ControllerModal from './ControllerModal';
import Map from './Map';
import SectorConfiguration from './SectorConfiguration';
import SectorFlightList from './SectorFlightList';

export default function App(/* properties */) {
  const [controllerShow, setControllerShow] = React.useState(true);

  return (
    <>
      <ControllerModal show={controllerShow} onHide={() => setControllerShow(false)} />
      <Map />
      <SectorFlightList />
      <AircraftListElement />
      <SectorConfiguration />
      <AltitudeFilterPanel />
      <BottomNavbar />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
