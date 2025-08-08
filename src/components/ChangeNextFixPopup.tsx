import { observer } from 'mobx-react-lite';
import React from 'react';

import { changeNextWaypointOfAircraft, handlePublishPromise } from '../mqtt-client/publishers';
import { configurationStore, cwpStore, fixStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeNextFixPopup(properties: { aircraft: AircraftModel }) {
  const {
    aircraftId,
    assignedFlightId,
    controlledBy,
  } = properties.aircraft;

  const [changedFix, setChangedFix] = React.useState('');

  const shouldShow = cwpStore.aircraftsWithNextFixPopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeChangeNextFixForAircraft(aircraftId);

  const submit = (): void => {
  // add for strip white space
    const arrayOfWaypoints = changedFix.split(/[\s+,]/);
    const newNextFix = arrayOfWaypoints?.length === 2 ? arrayOfWaypoints?.[1].trim().toLocaleUpperCase() ?? '' : arrayOfWaypoints?.[0].toLocaleUpperCase() ?? '';
    const nextViaFix = arrayOfWaypoints?.length === 2 ? arrayOfWaypoints?.[0].trim().toLocaleUpperCase() ?? '' : '';
    const latOfFix = fixStore.fixes.get(newNextFix)?.latitude;
    const longOfFix = fixStore.fixes.get(newNextFix)?.longitude;
    const viaLat = fixStore.fixes.get(nextViaFix)?.latitude;
    const viaLong = fixStore.fixes.get(nextViaFix)?.longitude;
    if (latOfFix !== undefined && longOfFix !== undefined
      && viaLat !== undefined && viaLong !== undefined) {
      const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
      handlePublishPromise(
        changeNextWaypointOfAircraft({
          pilotId,
          waypointId: newNextFix,
          flightId: assignedFlightId,
          latitude: latOfFix,
          longitude: longOfFix,
          viaLat,
          viaLong,
          viaWaypointId: nextViaFix,
        }),
      );
    } else if (latOfFix !== undefined && longOfFix !== undefined) {
      const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
      handlePublishPromise(
        changeNextWaypointOfAircraft({
          pilotId,
          waypointId: newNextFix,
          flightId: assignedFlightId,
          latitude: latOfFix,
          longitude: longOfFix,
          viaLat: '',
          viaLong: '',
          viaWaypointId: '',
        }),
      );
    }
    close();
  };

  return (
    <div className="bg-gray-700/50 rounded-sm p-1 w-[124px] relative">
      <div>
        <div className="text-sm mb-2">Next Fix:</div>
        <input className="input input-bordered input-xs bg-transparent text-white w-[6.2em]"
          value={changedFix}
          onChange={(event): void => setChangedFix(event.target.value)}
        />
      </div>
      <div className="flex gap-0.5 mt-1 justify-between">
        <button onClick={close} className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2">Cancel</button>
        <button onClick={submit} className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2">Submit</button>
      </div>
    </div>
  );
});