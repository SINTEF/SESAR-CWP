import { makeAutoObservable, observable } from 'mobx';
import type { ObservableMap } from 'mobx';

import FixModel from './FixModel';
import type {
  FlightMilestonePositionMessage,
  NewPointMessage,
} from '../proto/ProtobufAirTrafficSimulator';

export default class FixStore {
  fixes: ObservableMap<string, FixModel> = observable.map();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleNewPointMessage(newPoint: NewPointMessage): void {
    const fullId = newPoint.nodeId;
    const id = fullId.split('-')[1];
    const position = newPoint.position?.position;
    if (position?.oneofKind !== 'position4D') {
      throw new Error('Unsupported position');
    }
    this.fixes.set(id, new FixModel({
      pointId: id,
      latitude: position.position4D.latitude,
      longitude: position.position4D.longitude,
    }));
  }

  // TODO #92: Implement. It's missing waypoints
  handleNewMilestoneMessage(message: FlightMilestonePositionMessage): void {
    const fixName = message.position?.objectId;
    if (!fixName) {
      throw new Error('Missing fix name');
    }
    const selectedFix = this.fixes.get(fixName);
    const aircraftId = message.flightUniqueId;
    const selectedAircraft = selectedFix?.sectorFlightList.get(aircraftId);
    // eslint-disable-next-line no-console
    console.log(selectedAircraft);
  }
}
