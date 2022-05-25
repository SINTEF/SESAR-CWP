import { action, makeObservable, observable } from 'mobx';

export default class DistanceLine {
  features = [];

  markerElements = [];

  constructor({
    features,
    markerElements,
  }) {
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
    this.features = features;
    this.markerElements = markerElements;
  }

  addFeature(feature) {
    this.features.push(feature);
  }

  removeFeature(index) {
    this.features.splice(index);
  }

  get currentFeatures() {
    return [...this.features];
  }

  addMarker(marker) {
    this.markerElements.push(marker);
  }

  removeMarker(index) {
    this.markerElements.splice(index);
  }

  get allMarkerElements() {
    return [...this.markerElements];
  }
}
