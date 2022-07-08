import { length as turfLength, lineString, radiansToDistance } from '@turf/turf';
import {
  makeAutoObservable, observable,
} from 'mobx';
import type { ObservableMap } from 'mobx';

export interface MarkerElement {
  coordinates: [number, number];
  color: string;
  key: number;
}

export function getLength(coordinates: number[][]): string {
  if (coordinates.length < 2) {
    return '';
  }
  const line = lineString(coordinates);
  const lineLength = turfLength(line, { units: 'radians' });
  const lengthToNautical = radiansToDistance(lineLength, 'nauticalmiles');
  return `${lengthToNautical.toFixed(3)} NM`;
}

export default class DistanceLine {
  markersCounter = 0;

  markers: ObservableMap<number, MarkerElement> = observable.map();

  constructor() {
    makeAutoObservable(this,
      {
        markersCounter: false,
      },
      { autoBind: true },
    );
  }

  newMarker({ coordinates, color }: { coordinates: [number, number], color: string }): void {
    this.markers.set(this.markersCounter, {
      coordinates,
      color,
      key: this.markersCounter,
    });
    this.markersCounter += 1;
  }

  updateMarkerCoordinates(key: number, coordinates: [number, number]): void {
    const marker = this.markers.get(key);
    if (marker) {
      marker.coordinates = coordinates;
    }
  }

  removeMarker(key: number): void {
    this.markers.delete(key);
  }

  removeColor(color: string): void {
    for (const marker of this.markers.values()) {
      if (marker.color === color) {
        this.markers.delete(marker.key);
      }
    }
  }

  get measureLines(): GeoJSON.FeatureCollection<GeoJSON.LineString, {
    color: string;
    length: string;
  }> {
    const markers = [...this.markers.values()];

    const markersByColors = new Map<string, MarkerElement[]>();
    for (const marker of markers) {
      const { color } = marker;
      const markersForColor = markersByColors.get(color);
      if (!markersForColor) {
        markersByColors.set(color, [marker]);
      } else {
        markersForColor.push(marker);
      }
    }

    return {
      type: 'FeatureCollection',
      features: [...markersByColors.entries()].map(([color, markersForColor]) => {
        const lines = markersForColor.map((marker) => marker.coordinates);
        return {
          type: 'Feature',
          properties: {
            color,
            length: getLength(lines),
          },
          geometry: {
            type: 'LineString',
            coordinates: lines,
          },
        };
      }),
    };
  }

  // Return the last marker of each color
  get measurePoints(): GeoJSON.FeatureCollection<GeoJSON.Point, {
    color: string;
    length: string;
  }> {
    const lines = this.measureLines;
    return {
      type: 'FeatureCollection',
      features: lines.features.map((line) => {
        const { color, length } = line.properties;
        const lastCoordinates = line.geometry.coordinates[line.geometry.coordinates.length - 1];
        return {
          type: 'Feature',
          properties: {
            color,
            length,
          },
          geometry: {
            type: 'Point',
            coordinates: lastCoordinates,
          },
        };
      }),
    };
  }
}
