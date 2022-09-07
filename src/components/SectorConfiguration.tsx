import { observer } from 'mobx-react-lite';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Draggable from 'react-draggable';

import {
  configurationStore, cwpStore, simulatorStore,
} from '../state';
import TableSectors from './TableSectors';
import VerticalSectorTimeline from './VerticalSectorTimeline';

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

export default observer(function SectorConfiguration() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    listOfIntervals,
    areaOfIncludedAirspaces,
    areaOfIncludedAirspacesForNextConfiguration,
  } = configurationStore;

  const {
    showClickedSector,
    clickedSectorId,
  } = cwpStore;

  const { timestamp } = simulatorStore;
  // let sectorsForNext: [string, SectorModel][] = [];
  // let sectorsForCurrent: [string, SectorModel][] = [];
  // let nextConfigStartTime: number | undefined;
  // const timeToNextConfig: number = Number.MAX_VALUE;

  // const listOfTimes: [string, string][] = [];
  // const [currentIntervalTime, setCurrentIntervalTime] = React.useState<[number, number]>([0, 0]);

  // const nextConfigId = listOfIntervals?.[1];
  // const currentConfigTime = listOfIntervals?.[0];

  const configurationsToDisplay = listOfIntervals.slice(0, 2)
    .map(([id, start, end], index) => ({
      id,
      start,
      end,
      startText: ChangeToLocaleTime(start),
      endText: ChangeToLocaleTime(end),
      index,
      area: index === 0 ? areaOfIncludedAirspaces : areaOfIncludedAirspacesForNextConfiguration,
      controlledSector: showClickedSector ? clickedSectorId : undefined,
    }));

  // console.log('nextControlledSector', nextControlledSector, nextControlledSector?.length);

  /* const currentConfiguration = listOfIntervals[0];
  const nextConfiguration = listOfIntervals[1];

  if (currentConfiguration) {
    const [, start, end] = currentConfiguration;
    listOfTimes.push([
      ChangeToLocaleTime(start),
      ChangeToLocaleTime(end),
    ]);
  }

  if (nextConfiguration) {
    const [, start, end] = nextConfiguration;
    listOfTimes.push([
      ChangeToLocaleTime(start),
      ChangeToLocaleTime(end),
    ]);
  } */

  /* const toggleSectorInterval = (number_: number): void => {
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
  }, [simulatorTime]); */

  // Getting current configuration information

  /* const sectorsForNext = configurationStore.areaOfIncludedAirspacesForNextConfiguration;

  if (currentConfigTime !== undefined) {
    const sectorsForCurrent = configurationStore.areaOfIncludedAirspaces;
    listOfTimes.push([
      ChangeToLocaleTime(sectorsForCurrent[1]),
      ChangeToLocaleTime(sectorsForCurrent[2]),
    ]);
  }

  // Getting next configuration information
  if (nextConfigId !== undefined) {
    nextConfigStartTime = nextConfigId[1];
    timeToNextConfig = Math.floor(nextConfigStartTime - simulatorTime);
    listOfTimes.push([
      ChangeToLocaleTime(nextConfigId[1]),
      ChangeToLocaleTime(nextConfigId[2]),
    ]);
    sectorsForNext = getAreaOfIncludedAirpaces(nextConfigId[0]);
  } */
  // Sort list of times on the two first strings of the list inside the list
  // using toLocaleCompare
  /* listOfTimes.sort((a, b) => {
    if (a[0].localeCompare(b[0]) === 0) {
      return a[1].localeCompare(b[1]);
    }
    return a[0].localeCompare(b[0]);
  }); */

  // const sectorArray = [sectorsForCurrent, sectorsForNext];

  return (<Draggable bounds="parent">
    <div className="control-panel">
      <Accordion className="sector-configuration-accordion" defaultActiveKey={['0']} alwaysOpen>
        {configurationsToDisplay.map(({
          id, start, end, startText, endText, area, controlledSector,
        }, index) => (
          <Accordion.Item key={`${index}:${id}`} eventKey={`${index}`}>
            <Accordion.Header className="accordion-header">
              From {startText} to {endText}
            </Accordion.Header>
            <Accordion.Body className="accordion-body sector-configuration-body">
              <TableSectors sectorsOfArray={area} controlledSector={controlledSector}/>
              {index === 0 ? <VerticalSectorTimeline
                id={`${index}`} start={start} end={end} current={timestamp}/>
                : null}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  </Draggable>);
});
