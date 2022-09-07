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
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return localeTime;
}

export default observer(function SectorConfiguration() {
  const simulatorTime = simulatorStore.timestamp;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    currentConfigurationId, listOfIntervals,
    getAreaOfIncludedAirpaces, toggleConfiguration, currentCWP,
  } = configurationStore;
  let sectorsForNext: [string, SectorModel][] = [];
  let sectorsForCurrent: [string, SectorModel][] = [];
  let nextConfigStartTime: number | undefined;
  let timeToNextConfig: number = Number.MAX_VALUE;

  const listOfTimes: [string, string][] = [];
  const [currentIntervalTime, setCurrentIntervalTime] = React.useState<[number, number]>([0, 0]);

  const accordionBodyReference = React.useRef<HTMLDivElement>(null);

  // const nextConfigId = listOfIntervals?.[1];
  // const currentConfigTime = listOfIntervals?.[0];

  const toggleSectorInterval = (number_: number): void => {
    let index = 0;
    const interval = setInterval(() => {
      if (index === number_) {
        clearInterval(interval);
      } else {
        toggleConfiguration(listOfIntervals?.[1][0]);
        index += 1;
        setTimeout(() => {
          toggleConfiguration(listOfIntervals?.[0][0]);
        }, 2000);
      }
    }, 3000);
  };

  React.useEffect(() => {
    if (listOfIntervals?.[1]) {
      configurationStore.setNextConfigurationId(listOfIntervals?.[1][0]);
    }
    if (listOfIntervals?.[0]) {
      setCurrentIntervalTime([listOfIntervals?.[0][1], listOfIntervals?.[0][2]]);
    }
  }, [listOfIntervals?.[1], listOfIntervals?.[0]]);

  const toggleSectorChange = (): void => {
    const setConfig = currentConfigurationId === listOfIntervals?.[0][0]
      ? listOfIntervals?.[1][0] : listOfIntervals?.[0][0];
    toggleConfiguration(setConfig);
  };

  React.useEffect(() => {
    if ((timeToNextConfig === 603 || timeToNextConfig === 303)) {
      toggleSectorInterval(3);
      toggleConfiguration(listOfIntervals?.[0][0]);
    }
    if (timeToNextConfig === 20 || timeToNextConfig === 123) {
      toggleSectorInterval(5);
      toggleConfiguration(listOfIntervals?.[0][0]);
    }
    if (timeToNextConfig === 0) {
      toggleSectorChange();
    }
  }, [simulatorTime]);

  // Getting current configuration information
  if (listOfIntervals?.[0] !== undefined) {
    sectorsForCurrent = getAreaOfIncludedAirpaces(listOfIntervals?.[0][0]); // bad state?
    listOfTimes.push([
      ChangeToLocaleTime(listOfIntervals?.[0][1]),
      ChangeToLocaleTime(listOfIntervals?.[0][2]),
    ]);
  }

  // Getting next configuration information
  if (listOfIntervals?.[1] !== undefined) {
    nextConfigStartTime = listOfIntervals?.[1][1];
    timeToNextConfig = Math.floor(nextConfigStartTime - simulatorTime);
    listOfTimes.push([
      ChangeToLocaleTime(listOfIntervals?.[1][1]),
      ChangeToLocaleTime(listOfIntervals?.[1][2]),
    ]);
    sectorsForNext = getAreaOfIncludedAirpaces(listOfIntervals?.[1][0]);
  }
  // Sort list of times on the two first strings of the list inside the list
  // using toLocaleCompare

  // Why sorting listOfTimes her?
  listOfTimes.sort((a, b) => {
    if (a[0].localeCompare(b[0]) === 0) {
      return a[1].localeCompare(b[1]);
    }
    return a[0].localeCompare(b[0]);
  });

  const sectorArray = [sectorsForCurrent, sectorsForNext];

  const sectorChangeCountdown = timeToNextConfig <= 601;
  const timelineRectangleHeight = document.querySelectorAll('.accordion-body')[0]?.clientHeight; // Ref is not working (often undefined) as I want it for some reason, so need to keep the querySelector here
  const timeToChange = currentIntervalTime[1] - simulatorTime;
  const bottomValueTimeline = currentIntervalTime && timelineRectangleHeight
    ? (((currentIntervalTime[0] - simulatorTime)
    / (currentIntervalTime[0] - currentIntervalTime[1]))
     * Number(timelineRectangleHeight)) : 0;

  const sectorsForHighlight = (configId: [string, number, number]) : string => {
    if (configId) {
      return roleConfigurationStore.getControlledSector(currentCWP, configId[0]);
    }
    return '';
  };
  return (
    <>
      <Draggable>
        <div className="control-panel">
          <Accordion className="sector-configuration-accordion" defaultActiveKey={['0']} alwaysOpen>
            {listOfTimes.map((value, index) => (
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
                <Accordion.Body className="accordion-body" ref={accordionBodyReference}>
                  <TableSectors sectorsOfArray={sectorArray[index]}
                  currentSectorControlled={sectorsForHighlight(listOfIntervals?.[0])}
                  nextSectorControlled={sectorsForHighlight(listOfIntervals?.[1])} />
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
