import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';
import 'allotment/dist/style.css';

import { Allotment } from 'allotment';
import * as React from 'react';
import { throttle } from 'throttle-debounce';

import AircraftListElement from './components/AircraftListElement';
import AltitudeFilterPanel from './components/AltitudeFilterPanel';
import BottomNavbar from './components/BottomNavbar';
import ControllerModal from './components/ControllerModal';
import Map from './components/Map';
import SectorFlightList from './components/SectorFlightList';
import Sectors3DView from './components/Sectors3DView';
import SectorSideView from './components/SectorSideView';
import Time from './components/Time';
import VoiceCommandFeedback from './components/VoiceCommandFeedback';
import SectorConfiguration from './SectorConfiguration';
import { roleConfigurationStore } from './state';

const onLayoutChange = throttle(166, (): void => {
  // Dispatch a resize event to the whole application
  // Mapbox/Maplibre listen to it
  window.dispatchEvent(new Event('resize'));
});

export default function App(/* properties */): JSX.Element {
  // Dummy data - we will get it directly from the new simulator
  // For debug choose dataset 2
  roleConfigurationStore.setControlledSector('CWP_NW', 'CONF12E', 'LIMM_RUN16_COBOS_12S8_SECTOR_17');
  roleConfigurationStore.setControlledSector('CWP_NE', 'CONF12E', 'LIMM_RUN16_COBOS_11S9_SECTOR_17');
  roleConfigurationStore.setControlledSector('CWP_S', 'CONF12E', 'LIMM_RUN16_COBOS_11S10_SECTOR_16');

  roleConfigurationStore.setControlledSector('CWP_NW', 'CONF12D', 'LIMM_RUN16_COBOS_11S5_SECTOR_15');
  roleConfigurationStore.setControlledSector('CWP_NE', 'CONF12D', 'LIMM_RUN16_COBOS_11S6_SECTOR_15');
  roleConfigurationStore.setControlledSector('CWP_S', 'CONF12D', 'LIMM_RUN16_COBOS_10S9_SECTOR_15');

  roleConfigurationStore.setControlledSector('CWP_NW', 'CONF11N', 'LIMM_RUN16_COBOS_11S10_SECTOR_20');
  roleConfigurationStore.setControlledSector('CWP_NE', 'CONF11N', 'LIMM_RUN16_COBOS_12S9_SECTOR_17');
  roleConfigurationStore.setControlledSector('CWP_S', 'CONF11N', 'LIMM_RUN16_COBOS_12S11_SECTOR_15');

  return (
    <>
      <main>
        <Allotment onChange={onLayoutChange}>
          <Allotment.Pane>
            <ControllerModal />
            <Map />
            <SectorFlightList />
            <AircraftListElement />
            <AltitudeFilterPanel />
            <Time />
          </Allotment.Pane>
          <Allotment.Pane>
            <Allotment onChange={onLayoutChange}>
              <SectorSideView />
              <Sectors3DView />
            </Allotment>
          </Allotment.Pane>
        </Allotment>
      </main>
      <SectorConfiguration key="sector-configuration" />
      <BottomNavbar />
      <VoiceCommandFeedback />
    </>
  );
}
