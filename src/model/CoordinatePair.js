import { types } from 'mobx-state-tree';

export default types.model('CoordinatePair', {
  longitude: types.optional(types.number, 0),
  latitude: types.optional(types.number, 0),
}).actions((store) => ({
  setCoordinatePair(newLongitude, newLatitude) {
    store.longitude = newLongitude;
    store.latitude = newLatitude;
  },
}));
