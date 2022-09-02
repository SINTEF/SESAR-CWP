/* eslint-disable @typescript-eslint/unbound-method */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

import { changeSpeedOfAircraft } from '../mqtt';
import { configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeNextFixPopup(properties: { aircraft: AircraftModel }) {
  const {
    aircraftId,
    assignedFlightId,
    controlledBy,
    setAssignedSpeed,
  } = properties.aircraft;

  const [newSpeed, setNewSpeed] = React.useState(0);

  const shouldShow = cwpStore.aircraftWithSpeedChangePopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }

  const close = (): void => cwpStore.closeChangeSpeedForAircraft(aircraftId);

  const submit = (): void => {
    if (Number.isNaN(newSpeed)) {
      return;
    }
    setAssignedSpeed(newSpeed);
    if (configurationStore.currentCWP === 'All') {
      changeSpeedOfAircraft('All', assignedFlightId, newSpeed);
    } else {
      changeSpeedOfAircraft(controlledBy, assignedFlightId, newSpeed);
    }
    close();
  };

  return (
    <div className="change-speed">
      <div>
        New Speed:
        <input className="input-filter-popup" type="number" min="0"
            value={newSpeed}
            onChange={(event): void => setNewSpeed(Number.parseInt(event.target.value, 10))}
        />
      </div>
      <div className="submit-cancel-buttons">
        <Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button>
        <Button onClick={submit} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Submit</Button>
      </div>
    </div>
  );
});