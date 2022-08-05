import { observer } from 'mobx-react-lite';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Draggable from 'react-draggable';

import TableSectors from './components/TableSectors';
import { configurationStore, simulatorStore } from './state';
import type SectorModel from './model/SectorModel';

function ChangeToLocaleTime(time: number): string {
  const date = new Date(time * 1000);
  const localeTime = date.toLocaleTimeString('en', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  return localeTime;
}

export default observer(function SectorConfiguration() {
  const simulatorTime = simulatorStore.timestamp;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    currentConfigurationId, configurationPlan, sortedConfigurationPlan,
    areaOfIncludedAirspaces, getAreaOfIncludedAirpaces,
  } = configurationStore;
  const sortedList = sortedConfigurationPlan;

  if (sortedList.length === 0) {
    return null;
  }
  const listOfTimes = [];
  const listConfiguration = [];
  for (const element of sortedList) {
    for (const intervals of element.timeIntervals) {
      const startTimeInterval = intervals.startTime;
      if (startTimeInterval > simulatorTime) {
        listConfiguration.push([element.configurationId, startTimeInterval, intervals.endTime]);
      }
    }
  }
  const nextConfigId = listConfiguration[0];
  const currentConfigTime = configurationPlan.get(currentConfigurationId);
  if (!currentConfigTime) {
    return null;
  }
  listOfTimes.push([
    ChangeToLocaleTime(currentConfigTime.timeIntervals[0].startTime),
    ChangeToLocaleTime(currentConfigTime.timeIntervals[0].endTime),
  ]);

  let sectorsForNext: [string, SectorModel][] = [];
  if (nextConfigId !== undefined && nextConfigId[0] !== currentConfigurationId) {
    listOfTimes.push([
      ChangeToLocaleTime(Number(nextConfigId[1])),
      ChangeToLocaleTime(Number(nextConfigId[2])),
    ]);
    sectorsForNext = getAreaOfIncludedAirpaces(String(nextConfigId[0]));
  }
  const sectorsForCurrent = areaOfIncludedAirspaces;
  const sectorArray = [sectorsForCurrent, sectorsForNext];

  return (
    <Draggable>
      <div className="control-panel">
        <Accordion id="accordion" defaultActiveKey={['0']} alwaysOpen>
          {listOfTimes.sort().map((value, index) => (
            <Accordion.Item key={value[0]} eventKey={`${index}`}>
              <Accordion.Header className="accordion-header">
                From
                {' '}
                {value[0]}
                {' '}
                to
                {' '}
                {value[1]}
              </Accordion.Header>
              <Accordion.Body>
                <TableSectors sectorsOfArray={sectorArray[index]} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Draggable>
  );
});
