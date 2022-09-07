import { makeAutoObservable } from 'mobx';

export default class AirspaceVolumeReference {
  volumeId: string;

  bottomFlightLevel: number;

  topFlightLevel: number;

  constructor({
    volumeId,
    bottomFlightLevel,
    topFlightLevel,
  }: {
    volumeId: string,
    bottomFlightLevel: number,
    topFlightLevel: number,
  }) {
    makeAutoObservable(this, {
      volumeId: false,
    }, { autoBind: true });
    this.volumeId = volumeId;
    this.bottomFlightLevel = bottomFlightLevel;
    this.topFlightLevel = topFlightLevel;
  }

  setBottomFlightLevel(bottomFlightLevel: number): void {
    this.bottomFlightLevel = bottomFlightLevel;
  }

  setTopFlightLevel(topFlightLevel: number): void {
    this.topFlightLevel = topFlightLevel;
  }
}
