import { booleanPointInPolygon, polygon } from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Table,
} from 'react-bootstrap';
import type { Position } from '@turf/turf';

import {
  aircraftStore, configurationStore, cwpStore, roleConfigurationStore,
} from '../state';
import type AircraftModel from '../model/AircraftModel';

const flightColor = (value: string): string => (value === configurationStore.currentCWP ? '#78e251' : '#ffffff');

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function AircraftListElement(/* properties */) {
  const { currentCWP, currentConfigurationId } = configurationStore;
  const currentSector = roleConfigurationStore
    .getControlledSector(currentCWP, currentConfigurationId);
  const [filter, setFilter] = useState('');
  const [listOfSectorAircrafts, setlistOfSectorAircrafts] = React.useState<AircraftModel[]>([]);

  const handleFlightClicked = (event: string): void => {
    cwpStore.setHighlightedAircraftId(event);
  };
  if (!cwpStore.showFL) return null;

  React.useEffect(() => {
    if (cwpStore.coordinatesCurrentPolygon !== undefined) {
      const boundsGeometry = polygon(
        [cwpStore.coordinatesCurrentPolygon] as unknown as Position[][]);
      const temporaryAircrafts: AircraftModel[] = [];
      for (const aircraft of aircraftStore.aircrafts) {
        const position: Position = [aircraft[1].lastKnownLongitude, aircraft[1].lastKnownLatitude];
        const bool = booleanPointInPolygon(position, boundsGeometry);
        if (bool) {
          temporaryAircrafts.push(...aircraftStore.aircraftsWithPosition
            .filter((flight) => flight.assignedFlightId === aircraft[0]));
        }
      }
      setlistOfSectorAircrafts(temporaryAircrafts);
    }
  }, [cwpStore.coordinatesCurrentPolygon]);

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
          {listOfSectorAircrafts.filter((aircraftData) => aircraftData.callSign.includes(filter) || filter === '')
            .map((aircraftData) => (
              <tr
                style={{ color: flightColor(aircraftData.controlledBy) }}
                key={aircraftData.assignedFlightId}
                id={aircraftData.assignedFlightId}
                onClick={(event): void => handleFlightClicked(event.currentTarget.id)}>

                <td>
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
