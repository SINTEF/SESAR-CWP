import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Table,
} from 'react-bootstrap';
import type { ObservableMap } from 'mobx';

import convertTimestamp from '../model/convertTimestamp';
import {
  configurationStore, cwpStore, roleConfigurationStore,
} from '../state';
import type FlightInSectorModel from '../model/FlightInSectorModel';

const flightColor = (value: string, aircraftId: string, flightInSectorTimes :
ObservableMap<string, FlightInSectorModel>): string => {
  const listOfTentatives = roleConfigurationStore.roleConfigurations
    .get(configurationStore.currentCWP)?.tentativeAircrafts;
  if (roleConfigurationStore.currentControlledSector
  && flightInSectorTimes.get(roleConfigurationStore.currentControlledSector) !== undefined) {
    return '#006400';
  }
  if (value === configurationStore.currentCWP) {
    return '#78e251';
  }
  if (listOfTentatives?.includes(aircraftId)) {
    return '#ff00ff';
  }
  return '#ffffff';
};
const handleFlightClicked = (event: string): void => {
  cwpStore.setHighlightedAircraftId(event);
};
function ChangeToLocaleTime(time: number): string {
  const date = new Date(time * 1000);
  const localeTime = date.toLocaleTimeString('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  return localeTime;
}
// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function AircraftListElement(/* properties */) {
  const currentSector = roleConfigurationStore.currentControlledSector;
  const [filter, setFilter] = useState('');
  const listOfAircraftsInSector = roleConfigurationStore.aircraftsEnteringCurrentSector;
  return (
    <div className="aircraft-list">
      <Table className="aircraft-list-table" hover bordered variant="dark">
        <thead>
          <tr>
            <th colSpan={2}>
              <input
                className='input-filter'
                style={{ width: '100px', fontSize: '8px' }}
                name="filter"
                value={filter}
                placeholder="Search by callsign..."
                onChange={(event): void => setFilter((event.target.value).toUpperCase())}
              />
            </th>
            <th colSpan={2}>
              FL Sector :
              {' '}
              {currentSector ?? ''}
            </th>
          </tr>
          <tr>
            <th>
              C/S
            </th>
            <th>
              PLV
            </th>
            <th>
              OUT
            </th>
            <th>
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {listOfAircraftsInSector.filter((aircraftData) => aircraftData.callSign.includes(filter) || filter === '')
            .map((aircraftData) => {
              const entryTime = currentSector ? aircraftData.flightInSectorTimes.get(currentSector)?.entryPosition?.time : '';
              const exitWaypointId = currentSector ? aircraftData.flightInSectorTimes.get(currentSector)?.exitWaypointId : '';
              const toTime = entryTime ? ChangeToLocaleTime(convertTimestamp(entryTime)) : '';
              return (
                <tr
                style={{
                  color: flightColor(aircraftData.controlledBy,
                    aircraftData.aircraftId,
                    aircraftData.flightInSectorTimes),
                }}
                key={aircraftData.assignedFlightId}
                onClick={(): void => handleFlightClicked(aircraftData.assignedFlightId)}>

                  <td>
                    <b>
                      {aircraftData.callSign}
                    </b>
                  </td>
                  <td>
                    {Math.ceil(aircraftData.lastKnownAltitude)}
                  </td>
                  <td>
                    {exitWaypointId}
                  </td>
                  <td>
                    {toTime}
                  </td>
                </tr>
              );
            },
            )}
        </tbody>
      </Table>
    </div>

  );
});
