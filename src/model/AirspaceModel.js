import { types } from 'mobx-state-tree';

import CoordinatePair from './CoordinatePair';

export const AirspaceModel = types.model('AirspaceModel', {
    airspaceId: types.identifier,
    // includedVolumes: types.map(SectorModel),
    airspaceArea: types.array(CoordinatePair),
});

export default types.model('AirspaceStore', {
    airspaces: types.map(AirspaceModel),
}).actions((self) => ({
    handleNewAirspace(newAirspace) {
        const id = newAirspace.getAirspaceid();
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
        // newAirspace.getIncludedVolumes
    },
    getAreaFromId(airspaceId) {
        const area = self.airspaces.get(airspaceId);
        if (area !== undefined) {
            return self.airspaces.get(airspaceId);
        }
        return undefined;
    },
}));
