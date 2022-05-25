// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Table from 'react-bootstrap/Table';
import Draggable from 'react-draggable';

import TableSectors from './components/TableSectors';
import { configurationStore, simulatorStore } from './state';

function ChangeToLocaleTime(time) {
  const date = new Date(time * 1000);
  const localeTime = date.toLocaleTimeString('en', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  return localeTime;
}
const fillColors = ['#fff', '#f59', '#0bb', '#94a', '#b00', '#f80', '#f63', '#3c0', '#40f', '#0bb', '#94a', '#b00', '#f80', '#f63'];

export default observer(function SectorConfiguration() {
  const simulatorTime = simulatorStore.timestamp;
  const {
    currentConfigurationId, configurationPlan, sortedConfigurationPlan,
    areaOfIncludedAirspaces, getAreaOfIncludedAirpaces,
  } = configurationStore;
  const sortedList = sortedConfigurationPlan;

  if (sortedList.length === 0) {
    return null;
  }
  const listOfTimes = [];
  const listConfiguration = sortedList.findIndex((p) => p.startTime > simulatorTime);
  const nextConfigId = sortedList[listConfiguration];
  const currentConfigTime = configurationPlan.get(currentConfigurationId);
  listOfTimes.push([ChangeToLocaleTime(currentConfigTime.startTime), ChangeToLocaleTime(currentConfigTime.endTime)]);
  let sectorsForNext = [];
  if (nextConfigId !== undefined && nextConfigId.configurationId !== currentConfigurationId) {
    listOfTimes.push([ChangeToLocaleTime(nextConfigId.startTime), ChangeToLocaleTime(nextConfigId.endTime)]);
    sectorsForNext = getAreaOfIncludedAirpaces(nextConfigId.configurationId);
  }
  const sectorsForCurrent = areaOfIncludedAirspaces;
  const sectorArray = [sectorsForCurrent, sectorsForNext];

  return (
    <Draggable>
      <div className="control-panel">
        <Accordion id="accordion" defaultActiveKey={['0']} alwaysOpen>
          {listOfTimes.sort().map((value, index) => (
            <Accordion.Item key={value[0]} eventKey={index}>
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
