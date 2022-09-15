import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

import { changeSpeedOfAircraft, handlePublishPromise, persistSpeedAircraft } from '../mqtt/publishers';
import { configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeNextFixPopup(properties: { aircraft: AircraftModel }) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    assignedFlightId,
    controlledBy,
    setAssignedSpeed,
  } = properties.aircraft;

  const [newSpeed, setNewSpeed] = React.useState('');

  const shouldShow = cwpStore.aircraftWithSpeedChangePopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }

  const close = (): void => cwpStore.closeChangeSpeedForAircraft(aircraftId);

  const submit = (): void => {
    const newSpeedNumber = Math.max(Math.min(Number.parseInt(newSpeed, 10), 9999), 0);
    if (Number.isNaN(newSpeed)) {
      return;
    }
    setAssignedSpeed(newSpeedNumber);
    const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
    handlePublishPromise(
      changeSpeedOfAircraft(pilotId, assignedFlightId, newSpeedNumber),
    );
    handlePublishPromise(
      persistSpeedAircraft(assignedFlightId, newSpeedNumber),
    );
    close();
  };

  return (
    <div className="change-speed">
      <form onSubmit={(event):void => { event.preventDefault(); submit(); }}>
        New Speed:
        <input className="input-filter-popup" type="number" min="0"
            value={newSpeed}
            onChange={(event): void => setNewSpeed(event.target.value)}/>
      </form>
      <div className="submit-cancel-buttons">
        <Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button>
        <Button onClick={submit} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Submit</Button>
      </div>
    </div>
  );
});
