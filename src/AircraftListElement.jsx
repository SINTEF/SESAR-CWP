import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Table,
} from 'react-bootstrap';

import { aircraftStore, configurationStore, cwpStore } from './state';

const flightColor = (value) => (value === configurationStore.currentCWP ? '#78e251' : '#ffffff');

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function AircraftListElement(/* properties */) {
  // const { onClick } = properties;
  const data = aircraftStore.aircraftsWithPosition;
  const [filter, setFilter] = useState('');

  // eslint-disable-next-line unicorn/no-null
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
                onChange={(event) => setFilter(event.target.value)}
              />
            </th>
            <th colSpan={2}>
              FL Sector : #
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
              >
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
