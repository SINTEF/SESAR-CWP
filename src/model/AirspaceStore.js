import { types } from 'mobx-state-tree';

import AirspaceModel from './AirspaceModel';
import CoordinatePair from './CoordinatePair';

export default types.model('AirspaceStore', {
    airspaces: types.map(AirspaceModel),
}).actions((self) => ({
    handleNewAirspace(newAirspace) {
        const id = newAirspace.getAirspaceid();
        const differentiatingSector = id.split('_');
        if (differentiatingSector.length - 1 === 5) { // Getting only the sectors to look at
            if (self.airspaces.has(id)) {
                // eslint-disable-next-line no-console
                console.trace('TODO updating'); // How to actually update?
            } else {
                const airspaceArea = newAirspace.getAreaList().map((area) => CoordinatePair.create({
                    latitude: area.getPosition4d().getLatitude(),
                    longitude: area.getPosition4d().getLongitude(),
                }));
                // self.airspaceArea = airspaceArea;
                self.airspaces.set(id, AirspaceModel.create({
                    airspaceId: id,
                    airspaceArea,
                }));
            }
        }
    },
    getAreaFromId(airspaceId) {
        const area = self.airspaces.get(airspaceId);
        if (area !== undefined) {
            return self.airspaces.get(airspaceId);
        }
        return undefined;
    },
    existIn(sectorId) {
        if (self.airspaces.has(sectorId)) {
            return true;
        }
        return false;
    },
    // eslint-disable-next-line eol-last
}));