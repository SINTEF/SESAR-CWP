import { observer } from 'mobx-react-lite';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Draggable from 'react-draggable';

import TableSectors from './components/TableSectors';
import {
  configurationStore, roleConfigurationStore, simulatorStore,
} from './state';
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
    currentConfigurationId,
    sortedConfigurationPlan, getAreaOfIncludedAirpaces, toggleConfiguration, currentCWP,
  } = configurationStore;
  const sortedList = sortedConfigurationPlan;
  let sectorsForNext: [string, SectorModel][] = [];
  let sectorsForCurrent: [string, SectorModel][] = [];
  let nextConfigStartTime: number | undefined;
  let timeToNextConfig: number = Number.MAX_VALUE;

  const listOfTimes: [string, string][] = [];
  // const listConfiguration: [string, number, number][] = [];
  const [listConfiguration, setListConfiguration] = React.useState<[string, number, number][]>([]);
  const [currentIntervalTime, setCurrentIntervalTime] = React.useState<[number, number]>([0, 0]);

  const nextConfigId = listConfiguration?.[1];
  const currentConfigTime = listConfiguration?.[0];

  const toggleSectorInterval = (number_: number): void => {
    let index = 0;
    const interval = setInterval(() => {
      if (index === number_) {
        clearInterval(interval);
      } else {
        toggleConfiguration(nextConfigId[0]);
        index += 1;
        setTimeout(() => {
          toggleConfiguration(currentConfigTime[0]);
        }, 2000);
      }
    }, 3000);
  };

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
    if (currentConfigTime !== undefined) {
      setCurrentIntervalTime([currentConfigTime[1], currentConfigTime[2]]);
    }
  }, [simulatorTime]);

  const toggleSectorChange = (): void => {
    const setConfig = currentConfigurationId === currentConfigTime[0]
      ? nextConfigId[0] : currentConfigTime[0];
    toggleConfiguration(setConfig);
  };

  React.useEffect(() => {
    if ((timeToNextConfig === 603 || timeToNextConfig === 303)) {
      toggleSectorInterval(3);
      toggleConfiguration(currentConfigTime[0]);
    }
    if (timeToNextConfig === 20 || timeToNextConfig === 123) {
      toggleSectorInterval(5);
      toggleConfiguration(currentConfigTime[0]);
    }
    if (timeToNextConfig === 0) {
      toggleSectorChange();
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

  const sectorChangeCountdown = timeToNextConfig <= 601;
  const timelineRectangleHeight = document.querySelector('.timeline-rectangle0')?.clientHeight;
  const timeToChange = currentIntervalTime[1] - simulatorTime;
  const bottomValueTimeline = currentIntervalTime && timelineRectangleHeight
    ? (((currentIntervalTime[0] - simulatorTime)
    / (currentIntervalTime[0] - currentIntervalTime[1]))
     * timelineRectangleHeight) : 0;
  return (
    <>
      <Draggable>
        <div className="control-panel">
          <Accordion className="sector-configuration-accordion" defaultActiveKey={['0']} alwaysOpen>
            {listOfTimes.sort().map((value, index) => (
              <Accordion.Item key={`${index}:${value[0]}`} eventKey={`${index}`}>
                <Accordion.Header className="accordion-header">
                  From
                  {' '}
                  {value[0]}
                  {' '}
                  to
                  {' '}
                  {value[1]}
                </Accordion.Header>
                <Accordion.Body className="accordion-body">
                  <TableSectors sectorsOfArray={sectorArray[index]}
                  currentSectorControlled={roleConfigurationStore
                    .getControlledSector(currentCWP, currentConfigTime[0])}
                  nextSectorControlled={roleConfigurationStore
                    .getControlledSector(currentCWP, nextConfigId[0])} />
                  {index === 0 ? <span style={{ top: `${bottomValueTimeline}px` }} className='moveable-timeline-rectangle'>{ChangeCountdownTime(timeToChange)}</span> : null}
                  <div className={`timeline-rectangle${index}`}></div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Draggable>
      {sectorChangeCountdown ? <Draggable>
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
