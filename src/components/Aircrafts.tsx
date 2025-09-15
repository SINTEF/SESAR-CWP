import { observer } from 'mobx-react-lite';

import { configurationStore } from '../state';
import AircraftMarker from './AircraftMarker';

export default observer(function Aircrafts() {
  const aircrafts = configurationStore.aircraftsWithinExtendedEdges;

  return (<>
    {aircrafts.map((aircraft) => {
      const { aircraftId } = aircraft;

      return (
        <AircraftMarker
          aircraft={aircraft}
          key={aircraftId}
        />
      );
    })}
  </>);
});
