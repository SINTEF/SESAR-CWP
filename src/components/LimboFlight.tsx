import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { CirclePaint } from 'mapbox-gl';

import { aircraftStore, cwpStore } from '../state';

const layerPaint: CirclePaint = {
  'circle-radius': 25,
  'circle-color': '#FFF9A6',
  'circle-blur': 0.9,
};

export default observer(function LimboFlights(/* properties */) {
  const selectedAircraft = aircraftStore.aircrafts.get(cwpStore.highlightedAircraftId);
  // new sector bounds - current sector bounds
  const newSectorBounds = cwpStore.coordinatesCurrentPolygon;
  // if plane part of old bound but not new bound, then highlight
  const [listOfIncludedAircrafts, setListOfIncludedAircrafts] = React.useState([]);

  if (!selectedAircraft) return null;
  const geoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features:
      [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [selectedAircraft.lastKnownLongitude, selectedAircraft.lastKnownLatitude],
        },
      }],
  };

  return (
    <Source id="highlighted-plane-source" type="geojson" data={geoJson}>
      <Layer id="highlighted-plane" type="circle" paint={layerPaint} />
    </Source>
  );
});
