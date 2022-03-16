import { types } from 'mobx-state-tree';

import AltitudeFilter from './AltitudeFilter';

export default types.model('CWPStore', {
  altitudeFilter: AltitudeFilter,
  showFlightLabels: types.optional(types.boolean, true),
  showSFL: types.optional(types.boolean, true),
  showFL: types.optional(types.boolean, true),
}).actions((store) => ({
  toggleFlightLabels() {
    store.showFlightLabels = !store.showFlightLabels;
  },
  toggleSFL() {
    store.showSFL = !store.showSFL;
  },
  toggleFL() {
    store.showFL = !store.showFL;
  },
}));
