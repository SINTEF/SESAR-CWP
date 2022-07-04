import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import AirspaceModel from './AirspaceModel';
import CoordinatePair from './CoordinatePair';
import type { NewAirspaceMessage } from '../proto/ProtobufAirTrafficSimulator';

export default class AirspaceStore {
  airspaces: ObservableMap<string, AirspaceModel> = observable.map();

  constructor() {
    makeAutoObservable(this, {
      getAreaFromId: false,
      existIn: false,
    }, { autoBind: true });
  }

  handleNewAirspace(newAirspace: NewAirspaceMessage): void {
    const id = newAirspace.airspaceId;
    const differentiatingSector = id.split('_');
    if (differentiatingSector.length - 1 === 5) { // Getting only the sectors to look at
      if (this.airspaces.has(id)) {
        // eslint-disable-next-line no-console
        console.trace('TODO updating'); // How to actually update?
      } else {
        const airspaceArea = newAirspace.area.map((area) => {
          if (area.position.oneofKind !== 'position4D') {
            throw new Error('Insupported position type');
          }
          return new CoordinatePair({
            latitude: area.position.position4D.latitude,
            longitude: area.position.position4D.longitude,
          });
        },
        );
        this.airspaces.set(id, new AirspaceModel({
          airspaceId: id,
          airspaceArea,
        }));
      }
    }
  }

  getAreaFromId(airspaceId: string): AirspaceModel | undefined {
    return this.airspaces.get(airspaceId);
  }

  existIn(sectorId: string): boolean {
    return this.airspaces.has(sectorId);
  }
}
