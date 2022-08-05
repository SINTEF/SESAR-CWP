import { observer } from 'mobx-react-lite';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Draggable from 'react-draggable';

import TableSectors from './components/TableSectors';
import { configurationStore, cwpStore, simulatorStore } from './state';
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
    areaOfIncludedAirspaces, getAreaOfIncludedAirpaces, toggleConfiguration,
  } = configurationStore;
  const sortedList = sortedConfigurationPlan;
  const [savedConfig, setSavedConfig] = React.useState(currentConfigurationId);

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
  let nextConfigStartTime: number | undefined;
  let timeToNextConfig: number = Number.MAX_VALUE;
  if (nextConfigId !== undefined && nextConfigId[0] !== currentConfigurationId) {
    setSavedConfig(String(nextConfigId[0]));
    nextConfigStartTime = (Number(nextConfigId[1]));
    timeToNextConfig = nextConfigStartTime - simulatorTime;
    listOfTimes.push([
      ChangeToLocaleTime(Number(nextConfigId[1])),
      ChangeToLocaleTime(Number(nextConfigId[2])),
    ]);
    sectorsForNext = getAreaOfIncludedAirpaces(String(nextConfigId[0]));
  }
  const sectorsForCurrent = areaOfIncludedAirspaces;
  const sectorArray = [sectorsForCurrent, sectorsForNext];

  if (timeToNextConfig <= 600) {
    cwpStore.showSectorChangeCountdown(true);
  }
  if (timeToNextConfig === 0) {
    cwpStore.showSectorChangeCountdown(false);
  }

  if (timeToNextConfig === 600 || timeToNextConfig === 300) {
    for (let index = 0; index < 3; index += 1) {
      setSavedConfig(toggleConfiguration(String(nextConfigId[0])));
      setTimeout(() => {
        setSavedConfig(toggleConfiguration(String(savedConfig)));
      }, 3000);
    }
  }

  if (timeToNextConfig === 50 || timeToNextConfig === 120) {
    for (let index = 0; index < 5; index += 1) {
      setSavedConfig(toggleConfiguration(String(nextConfigId[0])));
      setTimeout(() => {
        setSavedConfig(toggleConfiguration(String(savedConfig)));
      }, 3000);
    }
  }

  const toggleSectorChange = (): void => {
    setSavedConfig(toggleConfiguration(String(savedConfig)));
  };

  return (
    <>
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
      {cwpStore.sectorChangeCountdown ? <Draggable>
        <div className='toggle-countdown-container'>
          <div className='time-to-change'>
            Sector change countdown:
            {' '}
            {ChangeToLocaleTime(timeToNextConfig)}
          </div>
          <button onClick={toggleSectorChange} className='toggle-sectors-button'>Toggle Sector Change</button>
        </div>
      </Draggable> : null}
    </>
  );
});
