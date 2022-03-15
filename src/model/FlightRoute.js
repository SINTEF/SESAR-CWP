// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-tabs */
import { types } from 'mobx-state-tree';

import Trajectory from './Trajectory';

export default types.model('FlightRoute', {
	flightId: types.optional(types.string, ''),
	trajectoryId: types.optional(types.string, ''),
	trajectory: types.array(Trajectory),
});
