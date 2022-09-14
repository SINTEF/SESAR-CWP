/* eslint-disable @typescript-eslint/unbound-method */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

import { changeBearingOfAircraft, handlePublishPromise, persistACCBearing } from '../mqtt/publishers';
import { configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeBearingPopup(properties: { aircraft: AircraftModel }) {
  const {
    aircraftId,
    assignedFlightId,
    controlledBy,
    setAssignedBearing,
  } = properties.aircraft;

  const [newBearing, setNewBearing] = React.useState('');

  const shouldShow = cwpStore.aircraftsWithBearingPopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeChangeBearingForAircraft(aircraftId);

  const submit = (): void => {
    const newBearingNumber = Math.max(-360, Math.min(
      Number.parseInt(newBearing, 10) || 0, 360));
    setAssignedBearing(newBearingNumber);
    const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
    handlePublishPromise(
      changeBearingOfAircraft(pilotId, assignedFlightId, newBearingNumber),
    );
    handlePublishPromise(
      persistACCBearing(aircraftId, newBearingNumber),
    );
    close();
  };

  return (
    <div className="change-bearing">
      <div>
        New Bearing:
        <input className="input-filter-bearing" type="number" min="0" max="360"
            value={newBearing}
            onChange={(event): void => setNewBearing(event.target.value)}/>
      </div>
      <div className="submit-cancel-buttons">
        <Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button>
        <Button onClick={submit} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Submit</Button>
      </div>
    </div>
  );
});
