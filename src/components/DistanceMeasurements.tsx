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
  'line-join': 'round',
};
const measureNamePaint: SymbolPaint = {
  'text-color': ['get', 'color'],
  'text-halo-color': '#000',
  'text-halo-width': 2,
};

const measureLinesLayout: SymbolLayout = {
  'symbol-placement': 'line',
  'text-field': ['get', 'length'],
  'text-allow-overlap': false,
  'text-max-angle': 90,
  'text-font': [
    'Open Sans Bold',
  ],
  'text-size': 9,
  'text-offset': [0, -1],
  'text-anchor': 'center',
};

const measurePointsLayout: SymbolLayout = {
  'symbol-placement': 'point',
  'text-field': ['get', 'length'],
  'text-allow-overlap': true,
  'text-max-angle': 90,
  'text-font': [
    'Open Sans Bold',
  ],
  'text-size': 12,
  'text-offset': [0, -1],
  'text-anchor': 'center',
};

export default observer(function DistanceMeasurements() {
  const { measureLines, measurePoints } = distanceLineStore;

  return (
    <>
      <Source id="distance-measurement-lines-source" type="geojson" data={measureLines}>
        <Layer id="measure-lines" type="line" paint={linePaint} layout={lineLayout} />
        <Layer id="measure-length" type="symbol" paint={measureNamePaint} layout={measureLinesLayout} />
      </Source>
      <Source id="distance-measurement-points-source" type="geojson" data={measurePoints}>
        <Layer id="measure-length-last" type="symbol" paint={measureNamePaint} layout={measurePointsLayout} />
      </Source>
    </>
  );
});
