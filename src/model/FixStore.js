import { types } from 'mobx-state-tree';

import FixModel from './FixModel';

export default types.model('FixStore', {
    fixes: types.map(FixModel),
}).actions((self) => ({
    handleNewPointMessage(newPoint) {
        const fullId = newPoint.getNodeid();
        const id = fullId.split('-')[1];
        if (self.fixes.has(id)) {
            // TODO?
        } else {
            const position = newPoint.getPosition().getPosition4d();
            self.fixes.set(id, FixModel.create({
                pointId: id,
                latitude: position.getLatitude(),
                longitude: position.getLongitude(),
            }));
        }
    },
}));
