import { makeAutoObservable } from 'mobx';

export default class SimulatorStore {
  timestamp = 0;

  speedFactor = 1;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleNewSimulatorTime(simulatorTime) {
    const time = simulatorTime.getTime();
    this.timestamp = time.getSeconds() + time.getNanos() * 1e-9;
    this.speedFactor = simulatorTime.getSpeedfactor();
  }
}
