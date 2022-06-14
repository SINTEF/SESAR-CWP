import { makeAutoObservable } from 'mobx';

export default class SimulatorStore {
  timestamp = 0;

  speedFactor = 1;

  timeIntervalId = 0;

  constructor() {
    makeAutoObservable(this, {
      timeIntervalId: false,
    }, { autoBind: true });
  }

  handleNewSimulatorTime(simulatorTime) {
    const time = simulatorTime.getTime();
    this.timestamp = time.getSeconds() + time.getNanos() * 1e-9;
    if (simulatorTime.length > 1) { // To get the paused state
      this.speedFactor = simulatorTime.getSpeedfactor();
      window.clearInterval(this.timeIntervalId);
      this.timeIntervalId = window.setInterval(() => {
        this.setTimestamp(this.timestamp + 1 / this.speedFactor);
      }, 1000 / this.speedFactor);
    }
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }
}
