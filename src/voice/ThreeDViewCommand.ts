import type { CameraOptions } from 'maplibre-gl';

import { initialViewState } from '../components/Sectors3DView';
import { getMap } from './SectorsVoiceControl';

export default function ThreeDViewCommand(_arguments: string[]): void {
  const [orientation, angle] = _arguments;
  if (!orientation) {
    throw new Error('Missing orientation');
  }
  const hasAngle = angle !== undefined;
  const angleNumber = (Number.parseInt(angle, 10) ?? 0) % 360;

  const map = getMap();
  const bearing = map.getBearing();
  const pitch = map.getPitch();
  let view: CameraOptions & { bearing: number; pitch: number; } = {
    bearing,
    pitch,
  };

  switch (orientation) {
    case 'default':
      view = {
        bearing: initialViewState.bearing ?? 0,
        pitch: initialViewState.pitch ?? 0,
        ...initialViewState,
      };
      break;
    case 'west':
      view.bearing = hasAngle ? bearing + angleNumber : 90;
      break;
    case 'east':
      view.bearing = hasAngle ? bearing - angleNumber : -90;
      break;
    case 'north':
      view.pitch = hasAngle ? pitch - angleNumber : 0;
      break;
    case 'south':
      view.pitch = hasAngle ? pitch + angleNumber : 60;
      break;
    default:
      throw new Error(`Unknown orientation: ${orientation}`);
  }

  map.easeTo({
    ...view,
    duration: 500,
  });
}
