import './AircraftMarker.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
// import Draggable from 'react-draggable';
import { Marker } from 'react-map-gl';

import { distanceLineStore } from '../state';

export default observer(function DistanceMarker() {
  const { allMarkerElements } = distanceLineStore;

  return (
    <>
      {[...allMarkerElements].map(([key, data]) => (
        <Marker key={key} longitude={data.coordinates[0]} latitude={data.coordinates[1]}>
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="5" stroke="black" strokeWidth="3" fill={data.color} />
          </svg>
        </Marker>
      ))}
    </>

  );
});
