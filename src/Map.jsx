// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import * as maplibregl from 'maplibre-gl';
import React from 'react';
import ReactMapGL, {
  FullscreenControl, Layer, NavigationControl, ScaleControl, Source,
} from 'react-map-gl';

import Aircrafts from './Aircrafts';
import ControllerLabel from './components/ControllerLabel';
import DistanceMeasurements from './components/DistanceMeasurements';
import FixesPoint from './components/FixesPoint';
import FlightRoutes from './components/FlightRoutes';
import Sectors from './components/Sectors';
import SpeedVectors from './components/SpeedVectors';
import { cwpStore } from './state';

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
  const { getCurrentActiveMeasuring } = cwpStore;
  const initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  };
  // const [geoJSONDistance, setgeoJSONDistance] = React.useState(
  //   {
  //     type: 'FeatureCollection',
  //     features: [{
  //       type: 'Feature',
  //       geometry: {
  //         coordinates: [8.336, 45.9057],
  //         type: 'Point',
  //       },
  //       properties: {
  //         id: String(Date.now()),
  //         currentActive: '#f00',
  //       },
  //     }],
  //   });

  const geoJSONDistance = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        coordinates: [8.336, 45.9057],
        type: 'Point',
      },
      properties: {
        id: String(Date.now()),
        currentActive: '#f00',
      },
    }],
  };
  const linestring = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [],
    },
  };
  const circlePaint = {
    'circle-radius': 20,
    'circle-color': ['get', 'currentActive'],
  };
  const linePaint = {
    'line-color': '#ffffff',
    'line-width': 2.5,
  };

  const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  };

  const handleClick = (event) => {
    const currentActive = getCurrentActiveMeasuring();
    if (currentActive !== '') {
      const features = event.target.queryRenderedFeatures(event.point, {
        layers: ['measure-points'],
      });
      console.log(features);
      // console.log(features);
      const point = {
        type: 'Feature',
        geometry: {
          coordinates: [Number(event.lngLat.lng.toFixed(3)), Number(event.lngLat.lat.toFixed(3))],
          type: 'Point',
        },
        properties: {
          id: String(Date.now()),
          currentActive,
        },

      };
      geoJSONDistance.features.push(point);
      if (geoJSONDistance.features.length > 1) {
        linestring.geometry.coordinates = geoJSONDistance.features.map(
          (circle) => circle.geometry.coordinates);
        geoJSONDistance.features.push(linestring);
      }
    }
    console.log(geoJSONDistance);
    // setgeoJSONDistance(geoJSONDistance);
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
    >
      <Source id="distance-measurement-source" type="geojson" data={geoJSONDistance}>
        <Layer id="measure-points" type="circle" paint={circlePaint} />
        <Layer id="measure-lines" type="line" paint={linePaint} />
        {/* <Layer /> */}
      </Source>
      <DistanceMeasurements geoJSONDistance={geoJSONDistance} />
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
