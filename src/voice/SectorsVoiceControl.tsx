// let map:

import React from 'react';
import { useMap } from 'react-map-gl';
import type { MapboxMap, MapRef } from 'react-map-gl';

let currentMapReference: MapRef | undefined;

export default function SectorsVoiceControl(): JSX.Element {
  const { current } = useMap();
  if (current !== undefined && currentMapReference !== current) {
    currentMapReference = current;
  }

  return <></>;
}

export function getMap(): MapboxMap {
  if (currentMapReference === undefined) {
    throw new Error('Map instance is not available');
  }
  return currentMapReference.getMap();
}
