import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import CoordinatePair from './CoordinatePair';
import SectorModel from './SectorModel';
import type { NewAirspaceMessage } from '../proto/ProtobufAirTrafficSimulator';
// import type AirspaceModel from './AirspaceModel';

export default class AirspaceStore {
  airspaces: ObservableMap<string, SectorModel> = observable.map();

  constructor() {
    makeAutoObservable(this, {
      getAreaFromId: false,
      existIn: false,
    }, { autoBind: true });
  }

  handleNewAirspace(newAirspace: NewAirspaceMessage): void {
    const id = newAirspace.airspaceId;
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
      this.airspaces.set(id, new SectorModel({
        sectorId: id,
        sectorArea: airspaceArea,
        bottomFlightLevel: newAirspace.bottomFlightLevel,
        topFlightLevel: newAirspace.topFlightLevel,
      }));
    }
    // }
  }

  getAreaFromId(airspaceId: string): SectorModel | undefined {
    return this.airspaces.get(airspaceId);
  }

  existIn(sectorId: string): boolean {
    return this.airspaces.has(sectorId);
  }
}
