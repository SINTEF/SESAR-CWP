import { types } from 'mobx-state-tree';

import CoordinatePair from './CoordinatePair';

export default types.model('AirspaceModel', {
    airspaceId: types.identifier,
    // includedVolumes: types.map(SectorModel),
    airspaceArea: types.array(CoordinatePair),
});
