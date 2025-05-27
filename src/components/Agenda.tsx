import { observer } from 'mobx-react-lite';
import React from 'react';

import { simulatorStore } from '../state';
import VerticalSectorTimeline from './VerticalSectorTimeline';

export default observer(function Agenda() {
  const { timestamp } = simulatorStore;

  return (<div>
    <VerticalSectorTimeline id={`${1}`} start={1} end={1} current={timestamp} />

  </div >);
});
