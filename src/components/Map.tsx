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

// Do not load the RTL plugin because it is unecessary
try {
  // @ts-expect-error invalid type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  maplibregl.setRTLTextPlugin('', () => {}, true);
} catch { /* ignore error */ }

const mapStyle: Style = {
  version: 8,
  name: 'Black',
  metadata: {},
  sources: {},
  glyphs: '/map-fonts/{fontstack}/{range}.pbf',
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
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { currentDistanceColor, setCurrentDistanceColor } = cwpStore;
  if (currentDistanceColor !== '') {
    const coordinates = event.lngLat;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { newMarker, getNumberOfMarkersForColour } = distanceLineStore;
    newMarker({
      lat: coordinates.lat,
      lng: coordinates.lng,
      colour: currentDistanceColor,
    });
    const numberOfMarkersForColor = getNumberOfMarkersForColour(currentDistanceColor);
    if (numberOfMarkersForColor >= 2) {
      setCurrentDistanceColor('');
    }
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
