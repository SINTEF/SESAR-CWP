// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-tabs */
import { types } from 'mobx-state-tree';

import CoordinatePair from './CoordinatePair';

export default types.model('Trajectory', {
	trajectoryCoordinate: CoordinatePair,
	timestamp: types.Date,
});
