import * as maplibregl from 'maplibre-gl';
import { observable } from 'mobx';
import React from 'react';
import ReactMapGL, {
  FullscreenControl, NavigationControl, ScaleControl,
} from 'react-map-gl';
import type { MapLayerMouseEvent, Style } from 'mapbox-gl';

import { cwpStore, distanceLineStore } from '../state';
import Aircrafts from './Aircrafts';
import ControllerLabel from './ControllerLabel';
import Distance from './Distance';
import DistanceMarkers from './DistanceMarkers';
import FixesPoint from './FixesPoint';
import FlightRoutes from './FlightRoutes';
import Sectors from './Sectors';
import SpeedVectors from './SpeedVectors';
import type { MarkerElement } from '../model/DistanceLine';

const mapStyle: Style = {
  version: 8,
  name: 'Black',
  metadata: {},
  sources: {},
  glyphs: 'http://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
  layers: [{
    id: 'background',
    type: 'background',
    paint: {},
  }],
  // antialias: true,
};

const style: React.CSSProperties = {
  width: '100%',
  height: 'calc(100vh - 1.9rem)',
  background: 'black',
};

export default function Map(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    getCurrentActiveMeasuring, setCurrentActiveMeasuring, setCurrentColoringString, setShowLine,
  } = cwpStore;

  // TODO #96: Remove distance logic to cleanup
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { addMarker } = distanceLineStore;

  const initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  };

  const measurementDistanceMarker = observable.map();

  const [counter, setCounter] = React.useState(0);

  const handleClick = (event: MapLayerMouseEvent): void => {
    const currentActive = getCurrentActiveMeasuring();
    setCurrentColoringString(currentActive);
    if (currentActive !== '') {
      if (counter === 2) {
        setCurrentActiveMeasuring('');
        setCounter(0);
        return;
      }
      const coordinates = event.lngLat;
      const marker: MarkerElement = {
        coordinates: [coordinates.lng, coordinates.lat],
        color: currentActive,
      };

      measurementDistanceMarker.set(`${counter.toString()}:${currentActive}`, marker);
      setCounter(counter + 1);
      addMarker(marker);
      setShowLine(true);
    }
  };

  return (
    <ReactMapGL
      style={style}
      initialViewState={initialViewState}
      mapStyle={mapStyle}
      attributionControl={false}
      mapLib={maplibregl}
      antialias
      onClick={handleClick}
      renderWorldCopies={false}
    >
      <DistanceMarkers />
      <Distance />
      <Sectors />
      <FixesPoint />
      <FlightRoutes />
      <SpeedVectors />
      <ControllerLabel />
      <Aircrafts />
      <ScaleControl position="bottom-left" />
      <NavigationControl position="bottom-left" />
      <FullscreenControl position="bottom-left" containerId="root" />
    </ReactMapGL>
  );
}
