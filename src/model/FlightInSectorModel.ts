import { makeObservable, observable } from 'mobx';

import type { Position4D } from '../proto/ProtobufAirTrafficSimulator';

export default class FlightInSectorModel {
  sectorId: string;

  entryPosition: Position4D | undefined;

  exitPosition: Position4D | undefined;

  entryWaypointId: string;

  exitWaypointId: string;

  constructor({
    sectorId,
    entryPosition,
    exitPosition,
    entryWaypointId,
    exitWaypointId,
  }: {
    sectorId: string;
    entryPosition: Position4D | undefined;
    exitPosition: Position4D | undefined;
    entryWaypointId: string;
    exitWaypointId: string;
  }) {
    makeObservable(this, {
      sectorId: false, // ID is not observable
      entryPosition: observable,
      exitPosition: observable,
      entryWaypointId: observable,
      exitWaypointId: observable,
    });
    this.sectorId = sectorId;
    this.entryPosition = entryPosition;
    this.exitPosition = exitPosition;
    this.entryWaypointId = entryWaypointId;
    this.exitWaypointId = exitWaypointId;
  }
}
