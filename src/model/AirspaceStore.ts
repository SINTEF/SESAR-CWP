import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import CoordinatePair from './CoordinatePair';
import SectorModel from './SectorModel';
import type { NewAirspaceMessage } from '../proto/ProtobufAirTrafficSimulator';

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
    const airspaceArea = newAirspace.area.map((area) => {
      if (area.position.oneofKind !== 'position4D') {
        throw new Error('Insupported position type');
      }
      return new CoordinatePair({
        latitude: area.position.position4D.latitude,
        longitude: area.position.position4D.longitude,
      });
    });
    const existingAirspace = this.airspaces.get(id);
    if (existingAirspace) {
      existingAirspace.updateSectorArea(airspaceArea);
      existingAirspace.updateFlightLevels(
        newAirspace.bottomFlightLevel, newAirspace.topFlightLevel,
      );
    } else {
      this.airspaces.set(id, new SectorModel({
        sectorId: id,
        sectorArea: airspaceArea,
        bottomFlightLevel: newAirspace.bottomFlightLevel,
        topFlightLevel: newAirspace.topFlightLevel,
      }));
    }
  }

  getAreaFromId(airspaceId: string): SectorModel | undefined {
    return this.airspaces.get(airspaceId);
  }

  existIn(sectorId: string): boolean {
    return this.airspaces.has(sectorId);
  }
}
