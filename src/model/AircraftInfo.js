// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-tabs */
import { types } from 'mobx-state-tree';

export default types.model('AircraftInfo', {
	aircraftId: types.identifier,
	wakeTurbulence: types.optional(types.string, ''),
});
