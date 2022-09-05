/* eslint-disable @typescript-eslint/indent */
import { makeObservable, observable } from 'mobx';

import convertTimestamp from './convertTimestamp';
import TimeConfigurations from './TimeConfigurations';
import type { AirspaceAvailabilityMessage, AvailabilityIntervalsMessage } from '../proto/ProtobufAirTrafficSimulator';

export default class ConfigurationTime {
  configurationId: string;

  timeIntervals: TimeConfigurations[];

  constructor({
    configurationId,
    timeIntervals,
  }: {
    configurationId: string;
      timeIntervals: TimeConfigurations[];
  }) {
    makeObservable(this, {
      configurationId: false,
      timeIntervals: observable,
    });
    this.configurationId = configurationId;
    this.timeIntervals = timeIntervals;
  }

  handleAvailabilityMessage(newAvailabilityMessage: AirspaceAvailabilityMessage): void {
    const { startTime, endTime } = newAvailabilityMessage;
    if (!startTime) {
      throw new Error('Missing start time');
    }
    if (!endTime) {
      throw new Error('Missing end time');
    }
    const timeInterval = new TimeConfigurations({
      startTime: convertTimestamp(startTime),
      endTime: convertTimestamp(endTime),
    });
    this.timeIntervals.push(timeInterval);
  }

  handleAvailabilityIntervalsMessage(newAvailabilityMessage: AvailabilityIntervalsMessage): void {
    const { timeIntervals } = newAvailabilityMessage;
    for (const timeInterval of timeIntervals) {
      if (!timeInterval.starttime) {
        throw new Error('Missing start time');
      }
      if (!timeInterval.endttime) {
        throw new Error('Missing end time');
      }
      const interval = new TimeConfigurations({
        startTime: convertTimestamp(timeInterval.starttime),
        endTime: convertTimestamp(timeInterval.endttime),
      });
      this.timeIntervals.push(interval);
    }
  }
}
