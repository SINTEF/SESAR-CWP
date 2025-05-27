import './App.css';

import * as React from 'react';

// import { throttle } from 'throttle-debounce';
import AircraftListElement from './components/AircraftListElement';
import AltitudeFilterPanel from './components/AltitudeFilterPanel';
import BottomNavbar from './components/BottomNavbar';
import ControllerModal from './components/ControllerModal';
import HugeNextText from './components/HugeNextText';
// biome-ignore lint/suspicious/noShadowRestrictedNames: Should change one day, but not today
import Draggable2DView from './components/Draggable2DView';
import Map from './components/Map';
import SectorFlightList from './components/SectorFlightList';
import Time from './components/Time';
import VoiceCommandFeedback from './components/VoiceCommandFeedback';

// Might be reused for DIALOG
// const onLayoutChange = throttle(166, (): void => {
//   // Dispatch a resize event to the whole application
//   // Mapbox/Maplibre listen to it
//   window.dispatchEvent(new Event('resize'));
// });

export default function App(/* properties */): JSX.Element {
  return (
    <>
      <main>
        <Map />
        <Draggable2DView />
        <Time />
        <SectorFlightList />
        <AircraftListElement />
        <ControllerModal />
        <AltitudeFilterPanel />
      </main>
      <BottomNavbar />
      <VoiceCommandFeedback />
    </>
  );
}
