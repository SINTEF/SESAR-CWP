import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type {
  LineLayout, LinePaint, SymbolLayout, SymbolPaint,
} from 'mapbox-gl';

import { distanceLineStore } from '../state';

const linePaint: LinePaint = {
  'line-color': ['get', 'color'],
  'line-width': 2.5,
};

const lineLayout: LineLayout = {
  // 'line-cap': 'round',
  'line-join': 'round',
};
const measureNamePaint: SymbolPaint = {
  'text-color': ['get', 'color'],
};

const measureNameLayout: SymbolLayout = {
  'symbol-placement': 'line-center',
  'text-field': ['get', 'length'],
  'text-allow-overlap': true,
  'text-font': [
    'Open Sans Bold',
  ],
  'text-size': 20,
  'text-offset': [0, -1],
  'text-anchor': 'center',
};

export default observer(function DistanceMeasurements() {
  const { features } = distanceLineStore;
  const geoJSONDistance: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features,
  };

  return (
    <div id="distance">
      <Source id="distance-measurement-source" type="geojson" data={geoJSONDistance}>
        <Layer id="measure-lines" type="line" paint={linePaint} layout={lineLayout} />
        <Layer id="measure-length" type="symbol" paint={measureNamePaint} layout={measureNameLayout} />
      </Source>
    </div>

  );
});
