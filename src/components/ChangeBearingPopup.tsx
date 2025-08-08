/* eslint-disable @typescript-eslint/unbound-method */
import { observer } from 'mobx-react-lite';
import React from 'react';

import { changeBearingOfAircraft, handlePublishPromise, persistACCBearing } from '../mqtt-client/publishers';
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
    <div className="bg-gray-700/50 rounded-sm p-1 w-[124px] relative">
      <form onSubmit={(event):void => { event.preventDefault(); submit(); }}>
        <div className="text-sm mb-2">New Bearing:</div>
        <input className="input input-bordered input-xs bg-transparent text-white w-[4.4em]"
            type="text" inputMode="numeric" pattern="-?[0-9]*"
            value={newBearing}
            onChange={(event): void => setNewBearing(event.target.value)}/>
      </form>
      <div className="flex gap-0.5 mt-1 justify-between">
        <button onClick={close} className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2">Cancel</button>
        <button onClick={submit} className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2">Submit</button>
      </div>
    </div>
  );
});