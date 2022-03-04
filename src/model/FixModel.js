import { types } from 'mobx-state-tree';

export default types.model('FixModel', {
    pointId: types.identifier,
    latitude: types.optional(types.number, 0),
    longitude: types.optional(types.number, 0),
    // altitude: types.optional(types.number, 0), // No Altitude so far
},
);
