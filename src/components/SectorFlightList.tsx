import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Table,
} from 'react-bootstrap';

import { aircraftStore, configurationStore, cwpStore } from '../state';

const flightColor = (value: string): string => (value === configurationStore.currentCWP ? '#78e251' : '#ffffff');

const handleFlightClicked = (event: string): void => {
  cwpStore.setHighlightedAircraftId(event);
};
// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function SectorFlightList(/* properties */) {
  // const { onClick } = properties;
  const data = aircraftStore.aircraftsWithPosition;
  const [filter, setFilter] = useState('');

  if (!cwpStore.showSFL) return null;

  return (
    <div className="sector-flight-list">
      <Table hover bordered variant="dark">
        <thead>
          <tr>
            <th colSpan={3}>
              <input
                name="filter"
                value={filter}
                placeholder="Search by callsign..."
                onChange={(event): void => setFilter(event.target.value)}
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
              <tr
                style={{ color: flightColor(aircraftData.controlledBy) }}
                key={aircraftData.assignedFlightId}
                onClick={(event): void => handleFlightClicked(event.currentTarget.id)}>
                <td>
                  {aircraftData.callSign}
                </td>
                <td>
                  {aircraftData.assignedFlightId}
                </td>
                <td />
                <td>
                  {aircraftData.callSign}
                </td>
                <td
                  style={{ color: flightColor(aircraftData.controlledBy) }}
                >
                  {aircraftData.callSign}
                </td>
                <td>
                  {aircraftData.callSign}
                </td>
                <td />
                <td
                  style={{ color: flightColor(aircraftData.controlledBy) }}

                >
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
