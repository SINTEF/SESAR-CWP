import * as maplibregl from 'maplibre-gl';
import React from 'react';
import ReactMapGL, { FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';

import Aircrafts from './Aircrafts';
import ControllerLabel from './components/ControllerLabel';
import FixesPoint from './components/FixesPoint';
import FlightRoutes from './components/FlightRoutes';
import Sectors from './components/Sectors';
import SpeedVectors from './components/SpeedVectors';

const mapStyle = {
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
};

const style = {
  width: '100vw',
  height: 'calc(100vh - 3.2rem)',
  background: 'black',
};

export default function Map() {
  const initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  };

  return (
    <ReactMapGL
      style={style}
      initialViewState={initialViewState}
      mapStyle={mapStyle}
      attributionControl={false}
      mapLib={maplibregl}
      antialias
    >
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
