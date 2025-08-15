import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl/maplibre';
import type { SymbolLayerSpecification } from 'maplibre-gl';
import {
  configurationStore, cwpStore, roleConfigurationStore,
} from '../state';

const cwpLayerLayout: SymbolLayerSpecification['layout'] = {
  'text-field': ['get', 'title'],
  'text-allow-overlap': true,
  'text-font': [
    'IBM Plex Mono Bold',
  ],
  'text-size': 9,
  'text-offset': [0, -1],
  'text-anchor': 'bottom',
};

const cwpLayerPaint: SymbolLayerSpecification['paint'] = {
  'text-color': ['get', 'description'],
  'text-halo-color': '#000',
  'text-halo-width': 2,
};

export default observer(function ControllerLabel(/* properties */) {
  const aircrafts = configurationStore.aircraftsWithinExtendedEdges;

  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

  const filteredData = [...aircrafts.values()].filter(({ lastKnownAltitude }) => (
    lastKnownAltitude > lowestBound
    && lastKnownAltitude < highestBound
  ));
  const labels: GeoJSON.Feature[] = [];
  for (const aircraft of filteredData) {
    labels.push({
      type: 'Feature',
      properties: {
        title: aircraft.controlledBy,
        description: roleConfigurationStore.getOriginalColorOfAircraft(aircraft.aircraftId),
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
