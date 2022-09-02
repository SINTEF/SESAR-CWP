import { observer } from 'mobx-react-lite';
import React from 'react';
import { Marker } from 'react-map-gl';
import type { MapboxEvent, MarkerDragEvent } from 'react-map-gl';

import { distanceLineStore } from '../state';
import type { MarkerElement } from '../model/DistanceLine';

const DistanceMarker = observer((properties: {
  marker: MarkerElement,
}): JSX.Element => {
  const { marker } = properties;

  const { color, coordinates, key } = marker;
  const [longitude, latitude] = coordinates;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { updateMarkerCoordinates, removeMarker } = distanceLineStore;

  function onDrag(event: MarkerDragEvent): void {
    updateMarkerCoordinates(key, [event.lngLat.lng, event.lngLat.lat]);
  }

  function onClick(event: MapboxEvent<MouseEvent>): void {
    removeMarker(key);
    event.originalEvent.stopPropagation();
  }

  return (
    <Marker latitude={latitude} longitude={longitude}
      draggable={true} onDrag={onDrag} onClick={onClick}>
      <svg height="10" width="10">
        <circle cx="5" cy="5" r="5" stroke="black" strokeWidth="3" fill={color} />
      </svg>
    </Marker>
  );
});

export default observer(function DistanceMarkers() {
  const { markers } = distanceLineStore;

  return (
    <>
      {[...markers.entries()].map(([key, marker]) => (
        <DistanceMarker key={key} marker={marker} />
      ))}
    </>

  );
});
