import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { polygon } from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Form,
  Table,
} from 'react-bootstrap';
import type { Position } from '@turf/turf';

import {
  aircraftStore, configurationStore, cwpStore, fixStore,
  roleConfigurationStore,
} from '../state';
import type AircraftModel from '../model/AircraftModel';

const flightColor = (value: string): string => (value === configurationStore.currentCWP ? '#78e251' : '#ffffff');

const handleFlightClicked = (event: string): void => {
  cwpStore.setHighlightedAircraftId(event);
};
// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function SectorFlightList(/* properties */) {
  const [filter, setFilter] = useState('');
  const [listOfFixes, setListOfFixes] = React.useState<string[]>([]);
  const [listOfAircraft, setListOfAircraft] = React.useState<AircraftModel[]>([]);

  React.useEffect(() => {
    if (roleConfigurationStore.areaOfCurrentControlledSector !== undefined) {
      const coordinates = roleConfigurationStore.areaOfCurrentControlledSector.map((point) => (
        [point.longitude, point.latitude]),
      );
      const boundsGeometry = polygon(
        [coordinates] as unknown as Position[][]);
      const temporaryFixes: string[] = [];
      for (const fix of fixStore.fixes) {
        const position: Position = [fix[1].longitude, fix[1].latitude];
        const bool = booleanPointInPolygon(position, boundsGeometry);
        if (bool) {
          temporaryFixes.push(fix[0]);
        }
      }
      temporaryFixes.sort();
      setListOfFixes(temporaryFixes);
    }
  }, [roleConfigurationStore.areaOfCurrentControlledSector]);

  if (!cwpStore.showSFL) return null;

  const setFix = (value:string) : void => {
    if (value === 'ALL') {
      setListOfAircraft(roleConfigurationStore.listOfFlightsInCurrentSector);
    } else {
      const fixValues = fixStore.fixes.get(value);
      const aircrafts = [];
      for (const flightRoutes of aircraftStore.flightRoutes) {
        const flightId = flightRoutes[0];
        const { trajectory } = flightRoutes[1];
        for (const coordinates of trajectory) {
          const { trajectoryCoordinate } = coordinates;
          if (trajectoryCoordinate.longitude === fixValues?.longitude
        && trajectoryCoordinate.latitude === fixValues?.latitude) {
            aircrafts
              .push(...aircraftStore.aircraftsWithPosition
                .filter((aircraft) => aircraft.assignedFlightId === flightId));
          }
        }
      }
      setListOfAircraft(aircrafts);
    }
  };

  return (
    <div className="sector-flight-list">
      <Table className="sector-flight-list-table" hover bordered variant="dark">
        <thead>
          <tr>
            <th colSpan={3}>
              <input
              className='input-filter'
              style={{ width: '10em !important' }}
                name="filter"
                value={filter}
                placeholder="Search by callsign..."
                onChange={(event): void => setFilter(event.target.value)}
              />
            </th>
            <th colSpan={6} style={{ fontSize: '10px' }}>
              <div className='fix-selector-container' >SFL &nbsp;
                {/* <input placeholder='Type here'></input> */}

                <Form.Select className='fix-selector' size='sm' onChange={(event: { target: { value: string; }; }): void => setFix(event.target.value)}>
                  <option hidden>Select COP</option>
                  <option value='ALL'>ALL</option>
                  {listOfFixes.map((fix) => (
                    <option key={fix} value={fix}>{fix}</option>))}
                </Form.Select>
                <div className='number-of-flight'><span>&nbsp;:</span><span>{listOfAircraft.length}</span></div>

              </div>
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
              C/S
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
          {listOfAircraft.filter((aircraftData) => aircraftData.callSign.includes(filter) || filter === '')
            .map((aircraftData) => (
              <tr
                style={{ color: flightColor(aircraftData.controlledBy) }}
                key={aircraftData.assignedFlightId}
                id={aircraftData.assignedFlightId}
                onClick={(event): void => handleFlightClicked(event.currentTarget.id)}>
                <td>
                  Entering fix
                </td>
                <td>
                  Entering time
                </td>
                <td>
                  {aircraftData.callSign}
                </td>
                <td
                  style={{ color: flightColor(aircraftData.controlledBy) }}
                >
                </td>
                <td>{aircraftData.nextACCFL === 'COO' ? '' : aircraftData.nextACCFL}</td>
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
