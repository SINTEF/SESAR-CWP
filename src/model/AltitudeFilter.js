import { action, makeObservable, observable } from 'mobx';

export default class AltitudeFilter {
  lowestBound = undefined;

  highestBound = undefined;

  constructor({
    lowestBound,
    highestBound,
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

  setHighBound(value) {
    this.highestBound = value;
  }

  setLowBound(value) {
    this.lowestBound = value;
  }
}
