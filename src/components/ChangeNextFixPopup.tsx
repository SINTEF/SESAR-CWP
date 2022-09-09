import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

import { changeNextWaypointOfAircraft, handlePublishPromise } from '../mqtt/publishers';
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
    const arrayOfWaypoints = changedFix.split(',');
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
    <div className="change-next-fix">
      <div>
        Next Fix:
        <input className="input-filter-popup"
          value={changedFix}
          onChange={(event): void => setChangedFix(event.target.value)}
        />
      </div>
      <div className="submit-cancel-buttons">
        <Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button>
        <Button onClick={submit} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Submit</Button>
      </div>
    </div>
  );
});
