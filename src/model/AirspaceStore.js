import { makeAutoObservable, observable } from 'mobx';

import AirspaceModel from './AirspaceModel';
import CoordinatePair from './CoordinatePair';

export default class AirspaceStore {
  airspaces = observable.map();

  constructor() {
    makeAutoObservable(this, {
      getAreaFromId: false,
      existIn: false,
    });
  }

  handleNewAirspace(newAirspace) {
    const id = newAirspace.getAirspaceid();
    const differentiatingSector = id.split('_');
    if (differentiatingSector.length - 1 === 5) { // Getting only the sectors to look at
      if (this.airspaces.has(id)) {
        // eslint-disable-next-line no-console
        console.trace('TODO updating'); // How to actually update?
      } else {
        const airspaceArea = newAirspace.getAreaList().map((area) => new CoordinatePair({
          latitude: area.getPosition4d().getLatitude(),
          longitude: area.getPosition4d().getLongitude(),
        }));
        // this.airspaceArea = airspaceArea;
        this.airspaces.set(id, new AirspaceModel({
          airspaceId: id,
          airspaceArea,
        }));
      }
    }
  }

  getAreaFromId(airspaceId) {
    const area = this.airspaces.get(airspaceId);
    if (area !== undefined) {
      return this.airspaces.get(airspaceId);
    }
    return undefined;
  }

  existIn(sectorId) {
    if (this.airspaces.has(sectorId)) {
      return true;
    }
    return false;
  }
}
