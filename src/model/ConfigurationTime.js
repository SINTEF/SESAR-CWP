import { makeObservable, observable } from 'mobx';

export default class ConfigurationTime {
  configurationId = undefined;

  startTime = undefined;

  endTime = undefined;

  constructor({
    configurationId,
    startTime,
    endTime,
  }) {
    makeObservable(this, {
      configurationId: false,
      startTime: observable,
      endTime: observable,
    });
    this.configurationId = configurationId;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  handleAvailabilityMessage(newAvailabilitymessage) {
    const timeStart = newAvailabilitymessage.getStarttime();
    const timeEnd = newAvailabilitymessage.getEndtime();
    this.startTime = timeStart.getSeconds() + timeStart.getNanos() * 1e-9;
    this.endTime = timeEnd.getSeconds() + timeEnd.getNanos() * 1e-9;
  }
}
