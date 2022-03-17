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
      configurationId: observable,
      startTime: observable,
      endTime: observable,
    });
    this.configurationId = configurationId;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
