import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

// eslint-disable-next-line no-unused-vars
import { aircraftStore, configurationStore, cwpStore } from '../state';

const cwpLayer = {
  id: 'CWPName',
  type: 'symbol',
  source: 'cwpLabelSource',
  layout: {
    'text-field': ['get', 'title'],
    'text-allow-overlap': true,
    'text-font': [
      'Open Sans Bold',
    ],
    'text-size': 8,
    'text-offset': [0, -1],
    'text-anchor': 'bottom',
  },
  paint: {
    'text-color': ['get', 'description'],
  },
};
export default observer(function ControllerLabel(/* properties */) {
  const aircrafts = aircraftStore.aircraftsWithPosition;

  const { lowestBound, highestBound } = cwpStore.altitudeFilter;

  const filteredData = [...aircrafts.values()].filter(({ lastKnownAltitude }) => (
    lastKnownAltitude > lowestBound
    && lastKnownAltitude < highestBound
  ));
  const labels = [];
  for (const aircraft of filteredData) {
    let color = '#fff';
    if (configurationStore.currentCWP !== 'OTHER' && aircraft.controlledBy === configurationStore.currentCWP) {
      color = '#0f0';
    }
    labels.push({
      type: 'Feature',
      properties: {
        title: aircraft.controlledBy,
        description: color,
      },
      geometry: {
        type: 'Point',
        coordinates: [aircraft.lastKnownLongitude, aircraft.lastKnownLatitude],
      },
    });
  }
  const labelJson = {
    type: 'FeatureCollection',
    features: labels,
  };

  return (
    <Source id="cwpLabelSource" type="geojson" data={labelJson}>
      <Layer id={cwpLayer.id} type={cwpLayer.type} layout={cwpLayer.layout} paint={cwpLayer.paint} />
    </Source>
  );
});
