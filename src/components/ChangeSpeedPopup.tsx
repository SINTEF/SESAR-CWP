import { observer } from 'mobx-react-lite';
import React from 'react';

import { changeSpeedOfAircraft, handlePublishPromise, persistSpeedAircraft } from '../mqtt/publishers';
import { configurationStore, cwpStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeNextFixPopup(properties: { aircraft: AircraftModel }) {
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
    const speedNumberKnots = newSpeedNumber * 1.943_84;
    setAssignedSpeed(newSpeedNumber);
    const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
    handlePublishPromise(
      changeSpeedOfAircraft(pilotId, assignedFlightId, speedNumberKnots),
    );
    handlePublishPromise(
      persistSpeedAircraft(assignedFlightId, speedNumberKnots),
    );
    close();
  };

  return (
    <div className="bg-gray-700/50 rounded-sm p-1 w-[110px] relative">
      <form onSubmit={(event):void => { event.preventDefault(); submit(); }}>
        <div className="text-sm mb-2">New Speed:</div>
        <input className="input input-bordered input-xs bg-transparent text-white w-[6.2em]"
            type="text" inputMode="numeric" pattern="[0-9]*"
            value={newSpeed}
            onChange={(event): void => setNewSpeed(event.target.value)}/>
      </form>
      <div className="flex gap-0.5 mt-1 justify-between">
        <button onClick={close} className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2">Cancel</button>
        <button onClick={submit} className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2">Submit</button>
      </div>
    </div>
  );
});