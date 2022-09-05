import * as maplibregl from 'maplibre-gl';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import ReactMapGL, {
  FullscreenControl, NavigationControl, ScaleControl,
} from 'react-map-gl';
import type { MapLayerMouseEvent, Style } from 'mapbox-gl';
import type { ViewState } from 'react-map-gl';

import { cwpStore, distanceLineStore } from '../state';
import Aircrafts from './Aircrafts';
import ControllerLabel from './ControllerLabel';
import DistanceMarkers from './DistanceMarkers';
import DistanceMeasurements from './DistanceMeasurements';
import FixesPoint from './FixesPoint';
import FlightRoutes from './FlightRoutes';
import HighlightedAircraft from './HighlightedAircraft';
import LimboAircrafts from './LimboAircrafts';
import Sectors from './Sectors';
import SpeedVectors from './SpeedVectors';

const mapStyle: Style = {
  version: 8,
  name: 'Black',
  metadata: {},
  sources: {},
  glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
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

const handleMapClick = (event: MapLayerMouseEvent): void => {
  const { currentDistanceColor } = cwpStore;
  if (currentDistanceColor !== '') {
    const coordinates = event.lngLat;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { newMarker } = distanceLineStore;
    newMarker({
      coordinates: [coordinates.lng, coordinates.lat],
      color: currentDistanceColor,
    });
  }
};

const initialViewState: Partial<ViewState> = {
  longitude: 9.27,
  latitude: 45.11,
  zoom: 6.3,
};

// Rough bounds of the area
const maxBounds: mapboxgl.LngLatBoundsLike = [
  4, 11, 15, 70,
];

export default function Map(): JSX.Element {
  return (
    <ReactMapGL
      style={style}
      initialViewState={initialViewState}
      maxBounds={maxBounds}
      mapStyle={mapStyle}
      attributionControl={false}
      mapLib={maplibregl}
      antialias
      onClick={handleMapClick}
      renderWorldCopies={false}
    >
      <DistanceMarkers />
      <DistanceMeasurements />
      <Sectors />
      <FixesPoint />
      <FlightRoutes />
      <SpeedVectors />
      <ControllerLabel />
      <Aircrafts />
      <HighlightedAircraft />
      <LimboAircrafts/>
      <ScaleControl position="bottom-left" />
      <NavigationControl position="bottom-left" visualizePitch={true} />
      <FullscreenControl position="bottom-left" containerId="root" />
    </ReactMapGL>
  );
}
