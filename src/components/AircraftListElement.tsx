import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Table,
} from 'react-bootstrap';

import {
  aircraftStore, configurationStore, cwpStore, roleConfigurationStore,
} from '../state';

const flightColor = (value: string): string => (value === configurationStore.currentCWP ? '#78e251' : '#ffffff');

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function AircraftListElement(/* properties */) {
  const data = aircraftStore.aircraftsWithPosition;
  const { currentCWP, currentConfigurationId } = configurationStore;
  const currentSector = roleConfigurationStore
    .getControlledSector(currentCWP, currentConfigurationId);
  const [filter, setFilter] = useState('');

  const handleFlightClicked = (event: string): void => {
    cwpStore.setHighlightedAircraftId(event);
  };

  if (!cwpStore.showFL) return null;

  return (
    <div className="aircraft-list">
      <Table hover bordered variant="dark">
        <thead>
          <tr>
            <th colSpan={2}>
              <input
                id="filter"
                name="filter"
                value={filter}
                placeholder="Search by callsign..."
                onChange={(event): void => setFilter(event.target.value)}
              />
            </th>
            <th colSpan={2}>
              FL Sector :
              {' '}
              {currentSector.slice(-14)}
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
          {data.filter((aircraftData) => aircraftData.callSign.includes(filter) || filter === '')
            .map((aircraftData) => (
              <tr
                style={{ color: flightColor(aircraftData.controlledBy) }}
                key={aircraftData.assignedFlightId}
                id={aircraftData.assignedFlightId}
                onClick={(event): void => handleFlightClicked(event.currentTarget.id)}>

                <td>
                  {/* <li key={aircraft_data.aircraftId}>
<a href="#" onClick={() => undefined}> */}
                  <b>
                    {aircraftData.callSign}
                  </b>
                </td>
                <td>
                  {Math.ceil(aircraftData.lastKnownAltitude)}
                </td>
                <td>
                  {aircraftData.departureAirport}
                </td>
                <td>
                  13:30
                </td>
              </tr>
            ),
            )}
        </tbody>
      </Table>
    </div>

  );
});
