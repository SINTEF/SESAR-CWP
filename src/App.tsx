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
// import SectorConfiguration from './SectorConfiguration';
import SectorFlightList from './components/SectorFlightList';
import Sectors3DView from './components/Sectors3DView';
import SectorSideView from './components/SectorSideView';
import Time from './components/Time';
import { roleConfigurationStore } from './state';

const onLayoutChange = throttle(166, (): void => {
  // Dispatch a resize event to the whole application
  // Mapbox/Maplibre listen to it
  window.dispatchEvent(new Event('resize'));
});

export default function App(/* properties */): JSX.Element {
  // Dummy data - we will get it directly from the new simulator
  // For debug choose dataset 2
  roleConfigurationStore.setControlledSector('CWP_NW', 'CONF10D', 'LIMM_RUN16_COBOS_10S9_SECTOR_12');
  roleConfigurationStore.setControlledSector('CWP_NE', 'CONF10D', 'LIMM_RUN16_COBOS_10S10_SECTOR_11');
  roleConfigurationStore.setControlledSector('CWP_S', 'CONF10D', 'LIMM_RUN16_COBOS_10S9_SECTOR_14');

  roleConfigurationStore.setControlledSector('CWP_NW', 'CONF7E', 'LIMM_RUN16_COBOS_7S6_SECTOR_8');
  roleConfigurationStore.setControlledSector('CWP_NE', 'CONF7E', 'LIMM_RUN16_COBOS_12S9_SECTOR_13');
  roleConfigurationStore.setControlledSector('CWP_S', 'CONF7E', 'LIMM_RUN16_COBOS_7S7_SECTOR_6');

  roleConfigurationStore.setControlledSector('CWP_NW', 'CONF11N', 'LIMM_RUN16_COBOS_11S10_SECTOR_20');
  roleConfigurationStore.setControlledSector('CWP_NE', 'CONF11N', 'LIMM_RUN16_COBOS_12S9_SECTOR_17');
  roleConfigurationStore.setControlledSector('CWP_S', 'CONF11N', 'LIMM_RUN16_COBOS_12S11_SECTOR_15');

  return (
    <>
      {' '}
      <Allotment onChange={onLayoutChange}>
        <Allotment.Pane>
          <ControllerModal />
          <Map />
          <SectorFlightList />
          <AircraftListElement />
          {/* <SectorConfiguration /> */}
          <AltitudeFilterPanel />
          <Time />
          <BottomNavbar />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment onChange={onLayoutChange}>
            <SectorSideView />
            <Sectors3DView />
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </>

  );
}
