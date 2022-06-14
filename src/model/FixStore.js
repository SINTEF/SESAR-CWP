import { makeAutoObservable, observable } from 'mobx';

import FixModel from './FixModel';

export default class FixStore {
  fixes = observable.map();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleNewPointMessage(newPoint) {
    const fullId = newPoint.getNodeid();
    const id = fullId.split('-')[1];
    if (this.fixes.has(id)) {
      // TODO?
    } else {
      const position = newPoint.getPosition().getPosition4d();
      this.fixes.set(id, new FixModel({
        pointId: id,
        latitude: position.getLatitude(),
        longitude: position.getLongitude(),
      }));
    }
  }

  // Not yet implemented with new simulator - missing waypoints
  handleNewMilestoneMessage(message) {
    const fixName = message.getPosition().getObjectid();
    const selectedFix = this.fixes.get(fixName);
    const aircraftId = message.getFlightuniqueid();
    if (selectedFix.sectorFlightList.has(aircraftId)) {
      const selectedAircraft = selectedFix.sectorFlightList.get(aircraftId);
      console.log(selectedAircraft);
    }
  }
}
