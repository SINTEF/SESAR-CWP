import { cwpStore } from '../state';

export default function AltitudeFilterCommand(_arguments: string[]): void {
  const [mode, altitudeA, altitudeB] = _arguments;

  const { altitudeFilter } = cwpStore;

  const numberAltitudeA = Number.parseInt(altitudeA, 10);
  const numberAltitudeB = Number.parseInt(altitudeB, 10);

  switch (true) {
    case /^(top|ceil|high)$/i.test(mode):
      altitudeFilter.setHighBound(numberAltitudeA);
      break;
    case /^(bottom|floor|low)$/i.test(mode):
      altitudeFilter.setLowBound(numberAltitudeA);
      break;
    case /^(both|range|between)$/i.test(mode):
      altitudeFilter.setBothBounds(numberAltitudeA, numberAltitudeB);
      break;
    default:
      throw new Error(`Invalid altitude filter mode: ${mode}`);
  }
}
