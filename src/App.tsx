import './App.css';

import { Allotment } from 'allotment';
import * as React from 'react';
import { throttle } from 'throttle-debounce';

import AircraftListElement from './components/AircraftListElement';
import AltitudeFilterPanel from './components/AltitudeFilterPanel';
import BottomNavbar from './components/BottomNavbar';
import ControllerModal from './components/ControllerModal';
import HugeNextText from './components/HugeNextText';
import Map from './components/Map';
import SectorChangeCountDown from './components/SectorChangeCountDown';
import SectorConfiguration from './components/SectorConfiguration';
import SectorFlightList from './components/SectorFlightList';
import Sectors3DView from './components/Sectors3DView';
import SectorSideView from './components/SectorSideView';
import Time from './components/Time';
import VoiceCommandFeedback from './components/VoiceCommandFeedback';

const onLayoutChange = throttle(166, (): void => {
  // Dispatch a resize event to the whole application
  // Mapbox/Maplibre listen to it
  window.dispatchEvent(new Event('resize'));
});

export default function App(/* properties */): JSX.Element {
  const verticalSectorsPreferedSize = Math.min(Math.round(window.innerWidth / 4), 320);
  return (
    <>
      <main>
        <Allotment onChange={onLayoutChange}>
          <Allotment.Pane>
            <Map />
            <HugeNextText />
          </Allotment.Pane>
          <Allotment.Pane>
            <Allotment onChange={onLayoutChange}>
              <Allotment.Pane preferredSize={verticalSectorsPreferedSize}>
                <SectorSideView />
              </Allotment.Pane>
              <Allotment.Pane>
                <Sectors3DView />
                <HugeNextText />
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
        </Allotment>
      </main>
      <Time />
      <SectorFlightList />
      <AircraftListElement />
      <ControllerModal />
      <SectorConfiguration />
      <SectorChangeCountDown />
      <AltitudeFilterPanel />
      <BottomNavbar />
      <VoiceCommandFeedback />
    </>
  );
}
