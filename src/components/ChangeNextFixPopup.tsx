import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

import { changeNextWaypointOfAircraft } from '../mqtt';
import { configurationStore, cwpStore, fixStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeNextFixPopup(properties: { aircraft: AircraftModel }) {
  const {
    aircraftId,
    assignedFlightId,
    controlledBy,
  } = properties.aircraft;

  // TODO #95: Replace use of Ref/ID by a classic react value/onChange
  const newChangedFixInputReference = React.useRef<HTMLInputElement>(null);

  const shouldShow = cwpStore.aircraftsWithNextFixPopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeChangeNextFixForAircraft(aircraftId);

  const submit = (): void => {
  // add for strip white space
    const arrayOfWaypoints = newChangedFixInputReference.current?.value?.split(',');
    const newNextFix = arrayOfWaypoints?.length === 2 ? arrayOfWaypoints?.[1].trim().toLocaleUpperCase() ?? '' : arrayOfWaypoints?.[0].toLocaleUpperCase() ?? '';
    const nextViaFix = arrayOfWaypoints?.length === 2 ? arrayOfWaypoints?.[0].trim().toLocaleUpperCase() ?? '' : '';
    const latOfFix = fixStore.fixes.get(newNextFix)?.latitude;
    const longOfFix = fixStore.fixes.get(newNextFix)?.longitude;
    const viaLat = fixStore.fixes.get(nextViaFix)?.latitude;
    const viaLong = fixStore.fixes.get(nextViaFix)?.longitude;
    if (latOfFix !== undefined && longOfFix !== undefined
      && viaLat !== undefined && viaLong !== undefined) {
      const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
      changeNextWaypointOfAircraft(
        pilotId, newNextFix, assignedFlightId, latOfFix, longOfFix, viaLat, viaLong, nextViaFix,
      );
    } else if (latOfFix !== undefined && longOfFix !== undefined) {
      const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
      changeNextWaypointOfAircraft(
        pilotId, newNextFix, assignedFlightId, latOfFix, longOfFix, '', '', '',
      );
    }
    close();
  };

  return (
    <div className="change-next-fix">
      <div>
        Next Fix:
        <input ref={newChangedFixInputReference} className="input-filter-popup" />
      </div>
      <div className="submit-cancel-buttons">
        <Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button>
        <Button onClick={submit} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Submit</Button>
      </div>
    </div>
  );
});
