import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';
import 'allotment/dist/style.css';

import { render } from '@testing-library/react';
import { Allotment } from 'allotment';
import * as React from 'react';

import AircraftListElement from './AircraftListElement';
import AltitudeFilterPanel from './components/AltitudeFilterPanel';
import BottomNavbar from './components/BottomNavbar';
import Time from './components/Time';
import ControllerModal from './ControllerModal';
import Map from './Map';
import SectorConfiguration from './SectorConfiguration';
import SectorFlightList from './SectorFlightList';
import Sectors3DView from './Sectors3DView';
import SectorSideView from './SectorSideView';

export default function App(/* properties */) {
  return (
    <>
      {' '}
      <Allotment>
        <Allotment.Pane>
          <ControllerModal />
          <Map />
          <SectorFlightList />
          <AircraftListElement />
          <SectorConfiguration />
          <AltitudeFilterPanel />
          <Time />
          <BottomNavbar />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment>
            <SectorSideView />
            <Sectors3DView />
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </>

  );
}

export function renderToDom(container) {
  render(<App />, container);
}
