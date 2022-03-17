import { makeObservable, observable } from 'mobx';

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
    });
    this.lowestBound = lowestBound;
    this.highestBound = highestBound;
  }
}
