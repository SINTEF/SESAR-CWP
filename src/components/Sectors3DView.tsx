import * as maplibregl from 'maplibre-gl';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import ReactMapGL, { NavigationControl, ScaleControl } from 'react-map-gl';
import type { Style } from 'mapbox-gl';
import type { ViewState } from 'react-map-gl';

import Polygons3D from './Polygons3D';

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
};

const style: React.CSSProperties = {
  width: '100%',
  height: 'calc(100vh - 1.9rem)',
  background: 'black',
};

const initialViewState: Partial<ViewState> = {
  longitude: 9.27,
  latitude: 45.11,
  zoom: 6.3,
  pitch: 40,
};

// Rough bounds of the area
const maxBounds: mapboxgl.LngLatBoundsLike = [
  4, 11, 15, 70,
];

export default function Sectors3DView(): JSX.Element {
  return (
    <ReactMapGL
      style={style}
      initialViewState={initialViewState}
      maxBounds={maxBounds}
      mapStyle={mapStyle}
      attributionControl={false}
      mapLib={maplibregl}
      antialias
      maxPitch={75}
      renderWorldCopies={false}
    >
      <Polygons3D />

      <ScaleControl position="bottom-left" />
      <NavigationControl position="bottom-left" />
    </ReactMapGL>
  );
}
