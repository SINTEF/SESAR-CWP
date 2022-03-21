import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Table,
} from 'react-bootstrap';

import { aircraftStore, cwpStore } from './state';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function SectorFlightList(/* properties */) {
  // const { onClick } = properties;
  const data = aircraftStore.aircraftsWithPosition;
  const [filter, setFilter] = useState('');

  // eslint-disable-next-line unicorn/no-null
  if (!cwpStore.showSFL) return null;

  return (
    <div className="sector-flight-list">
      <Table hover bordered variant="dark">
        <thead>
          <tr>
            <th colSpan={3}>
              <input
                id="filter"
                name="filter"
                value={filter}
                placeholder="Search by callsign..."
                onChange={(event) => setFilter(event.target.value)}
              />
            </th>
            <th colSpan={6} style={{ fontSize: '12px' }}>
              SFL FIX: #
            </th>
          </tr>
          <tr>
            <th>
              FIX
            </th>
            <th>
              ETO
            </th>
            <th>
              OSSR
            </th>
            <th>
              C/S
            </th>
            <th>
              NSSR
            </th>
            <th>
              PEL
            </th>
            <th>
              COO
            </th>
            <th>
              PLV
            </th>
            <th>
              OUT
            </th>
          </tr>
        </thead>
        <tbody>
          {data.filter((aircraftData) => aircraftData.callSign.includes(filter) || filter === '')
            .map((aircraftData) => (
              <tr key={aircraftData.assignedFlightId}>
                <td>
                  {aircraftData.callSign}
                </td>
                <td>
                  {aircraftData.callSign}
                </td>
                <td />
                <td>
                  {aircraftData.callSign}
                </td>
                <td>
                  {aircraftData.callSign}
                </td>
                <td>
                  {aircraftData.callSign}
                </td>
                <td />
                <td>
                  {Math.ceil(aircraftData.lastKnownAltitude)}
                </td>
                <td>
                  {aircraftData.departureAirport}
                </td>
              </tr>
            ),
            )}
        </tbody>
      </Table>
    </div>

  );
});
