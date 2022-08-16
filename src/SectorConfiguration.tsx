import { observer } from 'mobx-react-lite';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Draggable from 'react-draggable';

import TableSectors from './components/TableSectors';
import { configurationStore, cwpStore, simulatorStore } from './state';
import type SectorModel from './model/SectorModel';

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

function ChangeCountdownTime(time: number): string {
  const date = new Date(time * 1000);
  const localeTime = date.toLocaleTimeString('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  });
  return localeTime;
}
export default observer(function SectorConfiguration() {
  const simulatorTime = simulatorStore.timestamp;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    currentConfigurationId, sortedConfigurationPlan, getAreaOfIncludedAirpaces, toggleConfiguration,
  } = configurationStore;
  const sortedList = sortedConfigurationPlan;
  let sectorsForNext: [string, SectorModel][] = [];
  let sectorsForCurrent: [string, SectorModel][] = [];
  let nextConfigStartTime: number | undefined;
  let timeToNextConfig: number = Number.MAX_VALUE;

  const listOfTimes: [string, string][] = [];
  // const listConfiguration: [string, number, number][] = [];
  const [listConfiguration, setListConfiguration] = React.useState<[string, number, number][]>([]);

  const nextConfigId = listConfiguration?.[1];
  const currentConfigTime = listConfiguration?.[0];

  React.useEffect(() => {
    if (sortedList.length > 0) {
      const listOfIntervals: [string, number, number][] = [];
      for (const element of sortedList) {
        for (const intervals of element.timeIntervals) {
          const startTimeInterval = intervals.startTime;
          const endTimeInterval = intervals.endTime;
          if ((startTimeInterval >= simulatorTime || endTimeInterval >= simulatorTime)
            && !listConfiguration
              .includes([element.configurationId, startTimeInterval, endTimeInterval])) {
            listOfIntervals.push([element.configurationId, startTimeInterval, endTimeInterval]);
          }
        }
      }
      setListConfiguration(listOfIntervals);
    }
  }, [simulatorTime]);

  // console.log(timeToNextConfig);
  React.useEffect(() => {
    if ((timeToNextConfig === 600 || timeToNextConfig === 300)) {
      let counter = 0;
      while (counter < 2) {
        toggleConfiguration(nextConfigId[0]);
        setTimeout(() => {
          toggleConfiguration(currentConfigTime[0]);
        }, 3000);
        counter += 1;
      }
    }
    if (timeToNextConfig === 50 || timeToNextConfig === 200) {
      for (let index = 0; index < 5; index += 1) {
        toggleConfiguration(nextConfigId[0]);
        setTimeout(() => {
          toggleConfiguration(currentConfigTime[0]);
        }, 5000);
      }
    }
  }, [simulatorTime]);

  // Getting current configuration information

  if (currentConfigTime !== undefined) {
    sectorsForCurrent = getAreaOfIncludedAirpaces(currentConfigTime[0]); // bad state?

    listOfTimes.push([
      ChangeToLocaleTime(currentConfigTime[1]),
      ChangeToLocaleTime(currentConfigTime[2]),
    ]);
  }

  // Getting next configuration information
  if (nextConfigId !== undefined) {
    nextConfigStartTime = nextConfigId[1];
    timeToNextConfig = Math.floor(nextConfigStartTime - simulatorTime);
    // console.log(timeToNextConfig);
    listOfTimes.push([
      ChangeToLocaleTime(nextConfigId[1]),
      ChangeToLocaleTime(nextConfigId[2]),
    ]);
    sectorsForNext = getAreaOfIncludedAirpaces(nextConfigId[0]);
  }
  const sectorArray = [sectorsForCurrent, sectorsForNext];

  if (timeToNextConfig > 601 && cwpStore.sectorChangeCountdown) {
    cwpStore.showSectorChangeCountdown(false);
  }
  if (timeToNextConfig <= 601 && !cwpStore.sectorChangeCountdown) {
    cwpStore.showSectorChangeCountdown(true);
  }

  const toggleSectorChange = (): void => {
    const setConfig = currentConfigurationId === currentConfigTime[0]
      ? nextConfigId[0] : currentConfigTime[0];
    toggleConfiguration(setConfig);
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
            {ChangeCountdownTime(timeToNextConfig)}
          </div>
          <button onClick={toggleSectorChange} className='toggle-sectors-button'>Toggle Sector Change</button>
        </div>
      </Draggable> : null}
    </>
  );
});
