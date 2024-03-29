import { observer } from 'mobx-react-lite';
import React from 'react';
import { Marker } from 'react-map-gl';
import type { MapboxEvent, MarkerDragEvent } from 'react-map-gl';

import { distanceLineStore } from '../state';
import type DistanceMarker from '../model/DistanceMarker';

const MapDistanceMarker = observer((properties: {
  marker: DistanceMarker,
}): JSX.Element => {
  const { marker } = properties;

  const {
    colour, lat: latitude, lng: longitude, key,
  } = marker;

  function onDrag(event: MarkerDragEvent): void {
    marker.setLatLng(event.lngLat.lat, event.lngLat.lng);
  }

  function onClick(event: MapboxEvent<MouseEvent>): void {
    distanceLineStore.removeMarker(key);
    event.originalEvent.stopPropagation();
  }

  return (
    <Marker latitude={latitude} longitude={longitude}
      draggable={true} onDrag={onDrag} onClick={onClick}>
      <svg height="10" width="10">
        <circle cx="5" cy="5" r="5" stroke="black" strokeWidth="3" fill={colour} />
      </svg>
    </Marker>
  );
});

export default observer(function DistanceMarkers() {
  const { markers } = distanceLineStore;

  return (
    <>
      {[...markers.entries()].map(([key, marker]) => (
        <MapDistanceMarker key={key} marker={marker} />
      ))}
    </>

  );
});
