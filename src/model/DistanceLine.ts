import { action, makeObservable, observable } from 'mobx';

export interface MarkerElement {
  coordinates: [number, number];
  color: string;
}

export default class DistanceLine {
  features: unknown[] = [];

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

  addFeature(feature: unknown): void {
    this.features.push(feature);
  }

  removeFeature(index: number): void {
    this.features.splice(index);
  }

  addMarker(marker: MarkerElement): void {
    this.markerElements.push(marker);
  }

  removeMarker(index: number): void {
    this.markerElements.splice(index, 1);
  }
}
