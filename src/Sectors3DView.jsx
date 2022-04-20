import * as maplibregl from 'maplibre-gl';
import React from 'react';
import ReactMapGL, { NavigationControl, ScaleControl } from 'react-map-gl';

import Polygons3D from './components/Polygons3D';

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
  width: '100%',
  height: 'calc(100vh - 1.9rem)',
  background: 'black',
};

export default function Map() {
  const initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
    pitch: 40,
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
      <Polygons3D />

      <ScaleControl position="bottom-left" />
      <NavigationControl position="bottom-left" />
    </ReactMapGL>
  );
}
