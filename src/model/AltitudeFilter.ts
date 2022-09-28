import { action, makeObservable, observable } from 'mobx';

export default class AltitudeFilter {
  lowestBound: number;

  highestBound: number;

  constructor({
    lowestBound,
    highestBound,
  }: {
    lowestBound: number;
    highestBound: number;
  }) {
    makeObservable(this, {
      lowestBound: observable,
      highestBound: observable,
      setHighBound: action.bound,
      setLowBound: action.bound,
      setBothBounds: action.bound,
    });
    this.lowestBound = lowestBound;
    this.highestBound = highestBound;
  }

  setHighBound(value: number): void {
    if (Number.isNaN(value)) {
      throw new TypeError(`Invalid altitude: ${value}`);
    }
    this.highestBound = Math.max(Math.min(value, 10_000), 0);
    if (this.lowestBound > this.highestBound) {
      this.lowestBound = this.highestBound;
    }
  }

  setLowBound(value: number): void {
    if (Number.isNaN(value)) {
      throw new TypeError(`Invalid altitude: ${value}`);
    }
    this.lowestBound = Math.max(Math.min(value, 10_000), 0);
    if (this.lowestBound > this.highestBound) {
      this.highestBound = this.lowestBound;
    }
  }

  setBothBounds(low: number, high: number): void {
    if (Number.isNaN(low) || Number.isNaN(high)) {
      throw new TypeError(`Invalid altitudes: ${low} ${high}`);
    }
    this.lowestBound = Math.max(Math.min(low, 10_000), 0);
    this.highestBound = Math.max(Math.min(high, 10_000), 0);
    if (this.lowestBound > this.highestBound) {
      const temporary = this.lowestBound;
      this.lowestBound = this.highestBound;
      this.highestBound = temporary;
    }
  }
}
