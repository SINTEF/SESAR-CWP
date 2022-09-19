import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { polygon } from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Form,
  Table,
} from 'react-bootstrap';
import type { Position } from '@turf/turf';

import convertTimestamp from '../model/convertTimestamp';
import {
  aircraftStore, configurationStore, cwpStore, fixStore,
  roleConfigurationStore,
} from '../state';
import type AircraftModel from '../model/AircraftModel';

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

const flightColor = (value: string): string => (value === configurationStore.currentCWP ? '#78e251' : '#ffffff');

const handleFlightClicked = (event: string): void => {
  cwpStore.setHighlightedAircraftId(event);
};
// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function SectorFlightList(/* properties */) {
  const currentSector = roleConfigurationStore.currentControlledSector;
  const [filter, setFilter] = useState('');
  const [valueSelected, setSelectedValue] = useState('');
  const [listOfFixes, setListOfFixes] = React.useState<string[]>([]);
  const [listOfAircraft, setListOfAircraft] = React.useState<AircraftModel[]>([]);
  const fixSelect = React.createRef<HTMLSelectElement>();

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
    setSelectedValue(value);
    if (value === 'ALL') {
      setListOfAircraft(roleConfigurationStore.aircraftsEnteringCurrentSector);
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

  const arrowClicked = (direction : string) : void => {
    let selectedValue = '';
    if (direction === 'down') {
      if (valueSelected === '' || valueSelected === 'ALL') {
        selectedValue = listOfFixes[0];
      } else {
        const index = listOfFixes.indexOf(valueSelected);
        selectedValue = index === listOfFixes.length - 1 ? listOfFixes[0] : listOfFixes[index + 1];
      }
    } else if (direction === 'up') {
      if (valueSelected === '' || valueSelected === 'ALL') {
        selectedValue = listOfFixes[listOfFixes.length - 1];
      } else {
        const index = listOfFixes.indexOf(valueSelected);
        selectedValue = index === 0 ? listOfFixes[listOfFixes.length - 1] : listOfFixes[index - 1];
      }
    }
    setSelectedValue(selectedValue);
    if (fixSelect.current) {
      fixSelect.current.value = selectedValue;
      setFix(selectedValue);
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
              <div className='fix-selector-container' >
                <div className='drop-down-container'><div className="SFL-text">SFL &nbsp;</div>
                  {/* <input placeholder='Type here'></input> */}

                  <Form.Select ref={fixSelect} className='fix-selector' size='sm' onChange={(event: { target: { value: string; }; }): void => setFix(event.target.value)}>
                    <option value='ALL' hidden>Select COP</option>
                    <option value='ALL'>ALL</option>
                    {listOfFixes.map((fix) => (
                      <option key={fix} value={fix}>{fix}</option>))}
                  </Form.Select>
                  <div className='number-of-flight'><span>&nbsp;:</span><span>{listOfAircraft.length} &#35;</span></div>

                </div>
                <div className='up-down-arrows'><div onClick={(): void => arrowClicked('up')}>&#x25B2;&nbsp;</div><div onClick={(): void => arrowClicked('down')}>&#x25BC;</div></div>

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
            .map((aircraftData) => {
              const enteringTime = currentSector ? aircraftData.flightInSectorTimes.get(currentSector)?.entryPosition?.time : '';
              const enteringFix = currentSector ? aircraftData.flightInSectorTimes.get(currentSector)?.entryWaypointId : '';
              const exitingFix = currentSector ? aircraftData.flightInSectorTimes.get(currentSector)?.exitWaypointId : '';
              const enteringToTime = enteringTime ? ChangeToLocaleTime(convertTimestamp(enteringTime)) : '';
              const enteringFL = currentSector ? aircraftData.flightInSectorTimes.get(currentSector)?.entryPosition?.altitude : '';
              return (
                <tr
                style={{ color: flightColor(aircraftData.controlledBy) }}
                key={aircraftData.assignedFlightId}
                id={aircraftData.assignedFlightId}
                onClick={(event): void => handleFlightClicked(event.currentTarget.id)}>
                  <td>
                    {enteringFix}
                  </td>
                  <td>
                    {enteringToTime}
                  </td>
                  <td>
                    {aircraftData.callSign}
                  </td>
                  <td
                  style={{ color: flightColor(aircraftData.controlledBy) }}
                >
                    {enteringFL}
                  </td>
                  <td>{aircraftData.nextACCFL === 'COO' ? '' : aircraftData.nextACCFL}</td>
                  <td
                  style={{ color: flightColor(aircraftData.controlledBy) }}

                >
                    {Math.ceil(aircraftData.lastKnownAltitude)}
                  </td>
                  <td>
                    {exitingFix}
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
