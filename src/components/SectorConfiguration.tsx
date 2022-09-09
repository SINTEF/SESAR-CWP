import { observer } from 'mobx-react-lite';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Draggable from 'react-draggable';

import {
  configurationStore, cwpStore, roleConfigurationStore, simulatorStore,
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
    currentCWP,
  } = configurationStore;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { getControlledSector } = roleConfigurationStore;

  const {
    showClickedSector,
    clickedSectorId,
  } = cwpStore;

  const { timestamp } = simulatorStore;

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
  return (<Draggable bounds="parent" cancel="input">
    <div className="control-panel">
      <Accordion className="sector-configuration-accordion" defaultActiveKey={['0']} alwaysOpen>
        {configurationsToDisplay.map(({
          id, start, end, startText, endText, area,
        }, index) => (
          <Accordion.Item key={`${index}:${id}`} eventKey={`${index}`}>
            <Accordion.Header className="accordion-header">
              From {startText} to {endText}
            </Accordion.Header>
            <Accordion.Body className="accordion-body sector-configuration-body">
              <TableSectors sectorsOfArray={area}
              controlledSector={getControlledSector(currentCWP, id)}/>
              <VerticalSectorTimeline id={`${index}`} start={start} end={end} current={timestamp}/>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  </Draggable>);
});
