import { action, makeObservable, observable } from 'mobx';

export interface MarkerElement {
  coordinates: [number, number];
  color: string;
}

export default class DistanceLine {
  features: GeoJSON.Feature[] = [];

  markerElements: MarkerElement[] = [];

  constructor() {
    makeObservable(this,
      {
        features: observable,
        markerElements: observable,
        addFeature: action.bound,
        removeFeature: action.bound,
        addMarker: action.bound,
        removeMarker: action.bound,
      },
      { autoBind: true },
    );
  }

  addFeature(feature: GeoJSON.Feature): void {
    this.features.push(feature);
  }

  removeFeature(index: number): void {
    this.features.splice(index, 1);
  }

  addMarker(marker: MarkerElement): void {
    this.markerElements.push(marker);
  }

  removeMarker(index: number): void {
    this.markerElements.splice(index, 1);
  }
}
