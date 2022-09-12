import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { SymbolLayout, SymbolPaint } from 'mapbox-gl';

import {
  aircraftStore, configurationStore, cwpStore, roleConfigurationStore,
} from '../state';

const cwpLayerLayout: SymbolLayout = {
  'text-field': ['get', 'title'],
  'text-allow-overlap': true,
  'text-font': [
    'IBM Plex Mono Bold',
  ],
  'text-size': 8,
  'text-offset': [0, -1],
  'text-anchor': 'bottom',
};

const cwpLayerPaint: SymbolPaint = {
  'text-color': ['get', 'description'],
  'text-halo-color': '#000',
  'text-halo-width': 2,
};

export default observer(function ControllerLabel(/* properties */) {
  const aircrafts = aircraftStore.aircraftsWithPosition;

  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

  const filteredData = [...aircrafts.values()].filter(({ lastKnownAltitude }) => (
    lastKnownAltitude > lowestBound
    && lastKnownAltitude < highestBound
  ));
  const labels: GeoJSON.Feature[] = [];
  for (const aircraft of filteredData) {
    let flightColor = '#ffffff';
    const listOfTentatives = roleConfigurationStore.roleConfigurations
      .get(configurationStore.currentCWP)?.tentativeAircrafts;
    if (aircraft.controlledBy === configurationStore.currentCWP) {
      flightColor = '#78e251';
    }
    if (listOfTentatives?.includes(aircraft.aircraftId)) {
      flightColor = '#ff00ff';
    }
    labels.push({
      type: 'Feature',
      properties: {
        title: aircraft.controlledBy,
        description: flightColor,
      },
      geometry: {
        type: 'Point',
        coordinates: [aircraft.lastKnownLongitude, aircraft.lastKnownLatitude],
      },
    });
  }
  const labelJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: labels,
  };

  return (
    <Source id="cwpLabelSource" type="geojson" data={labelJson}>
      <Layer id="CWPName" type="symbol" layout={cwpLayerLayout} paint={cwpLayerPaint} />
    </Source>
  );
});
