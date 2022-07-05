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
    });
    this.lowestBound = lowestBound;
    this.highestBound = highestBound;
  }

  setHighBound(value: number): void {
    this.highestBound = value;
  }

  setLowBound(value: number): void {
    this.lowestBound = value;
  }
}
