import { types } from 'mobx-state-tree';

export default types.model('AltitudeFilter', {
  lowestBound: types.number,
  highestBound: types.number,
}).actions((store) => ({
  setLowBound(newLowBound) {
    store.lowestBound = newLowBound;
  },
  setHighBound(newHighBound) {
    store.highestBound = newHighBound;
  },
}));
