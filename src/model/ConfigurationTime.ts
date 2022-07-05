import { makeObservable, observable } from 'mobx';

import convertTimestamp from './convertTimestamp';
import type { AirspaceAvailabilityMessage } from '../proto/ProtobufAirTrafficSimulator';

export default class ConfigurationTime {
  configurationId: string;

  startTime: number;

  endTime: number;

  constructor({
    configurationId,
    startTime,
    endTime,
  }: {
    configurationId: string;
    startTime: number;
    endTime: number;
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

  handleAvailabilityMessage(newAvailabilityMessage: AirspaceAvailabilityMessage): void {
    const { startTime, endTime } = newAvailabilityMessage;
    if (!startTime) {
      throw new Error('Missing start time');
    }
    if (!endTime) {
      throw new Error('Missing end time');
    }
    this.startTime = convertTimestamp(startTime);
    this.endTime = convertTimestamp(endTime);
  }
}
