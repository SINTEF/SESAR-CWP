import * as maplibregl from 'maplibre-gl';
import { observable } from 'mobx';
import React from 'react';
import ReactMapGL, {
  FullscreenControl, NavigationControl, ScaleControl,
} from 'react-map-gl';

import Aircrafts from './Aircrafts';
import ControllerLabel from './components/ControllerLabel';
import Distance from './components/Distance';
import DistanceMarkers from './components/DistanceMarkers';
// import DistanceMeasurements from './components/DistanceMeasurements';
import FixesPoint from './components/FixesPoint';
import FlightRoutes from './components/FlightRoutes';
import Sectors from './components/Sectors';
import SpeedVectors from './components/SpeedVectors';
import { cwpStore, distanceLineStore } from './state';

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
  antialias: true,
};

const style = {
  width: '100%',
  height: 'calc(100vh - 1.9rem)',
  background: 'black',
};

export default function Map() {
  const {
    getCurrentActiveMeasuring, setCurrentActiveMeasuring, setCurrentColoringString, setShowLine,
  } = cwpStore;
  const { addMarker } = distanceLineStore;

  const initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  };
  const measurementDistanceMarker = observable.map();

  const [counter, setCounter] = React.useState(0);

  const handleClick = (event) => {
    const currentActive = getCurrentActiveMeasuring();
    setCurrentColoringString(currentActive);
    if (currentActive !== '') {
      if (counter === 2) {
        setCurrentActiveMeasuring('');
        setCounter(0);
        return;
      }
      const coordinates = event.lngLat;
      measurementDistanceMarker.set(`${counter.toString()}:${currentActive}`,
        {
          coordinates: [coordinates.lng, coordinates.lat],
          color: currentActive,
        });
      setCounter(counter + 1);
      addMarker(...measurementDistanceMarker);
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
      {/* <DistanceMeasurements /> */}
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
