import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Area, AreaChart, ReferenceLine,
  ResponsiveContainer,
  XAxis, YAxis,
} from 'recharts';

import { configurationStore, roleConfigurationStore, simulatorStore } from '../state';

export default observer(function SectorSideView() {
  const colorCurrent = '#ffffff';
  const colorNext = 'rgba(135,206,235)';
  const simulatorTime = simulatorStore.timestamp;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    currentConfigurationId, currentCWP, sortedConfigurationPlan,
    areaOfIncludedAirspaces, getAreaOfIncludedAirpaces,
  } = configurationStore;

  const sortedList = sortedConfigurationPlan;
  if (sortedList.length === 0) {
    return null;
  }
  const listConfiguration = sortedList.findIndex((p) => p.startTime > simulatorTime);

  let timeToChange = 15;
  let timeDifferanse = 0;

  const cwpCurrentSector = roleConfigurationStore
    .getControlledSector(currentCWP, currentConfigurationId);
  if (cwpCurrentSector === '') {
    return null;
  }

  const airspaceCurrent = [...areaOfIncludedAirspaces.values()]
    .find(([key]) => key === cwpCurrentSector);
  if (!airspaceCurrent) {
    return null;
  }
  const bottomFLCurrent = airspaceCurrent[1].bottomFlightLevel;
  const topFLCurrent = airspaceCurrent[1].topFlightLevel;
  let bottomFLNext = bottomFLCurrent;
  let topFLNext = topFLCurrent;
  if (listConfiguration !== -1
    && sortedList[listConfiguration].configurationId !== currentConfigurationId) {
    timeDifferanse = sortedList[listConfiguration].startTime - simulatorTime;
    const cwpNextSector = roleConfigurationStore
      .getControlledSector(currentCWP, sortedList[listConfiguration].configurationId);
    const nextflightLevels = getAreaOfIncludedAirpaces(sortedList[listConfiguration]
      .configurationId);
    const airspaceNext = [...nextflightLevels.values()]
      .find(([key]) => key === cwpNextSector);
    if (airspaceNext !== undefined) {
      bottomFLNext = airspaceNext[1].bottomFlightLevel;
      topFLNext = airspaceNext[1].topFlightLevel;
    }
  }
  if (timeDifferanse <= 900 && timeDifferanse > 0) {
    timeToChange = timeDifferanse / 60;
  }

  const flightData = [];
  for (let index = 0; index < Math.ceil(timeToChange); index += 1) {
    const time = index;
    const flightLevel = [topFLCurrent,
      bottomFLCurrent];
    const d = {
      time,
      flightLevel,
      flightLevelNext: null,
    };
    flightData.push(d);
  }

  const transitionData = {

    time: Math.ceil(timeToChange),
    flightLevel: [topFLCurrent,
      bottomFLCurrent],
    flightLevelNext: [topFLNext + 0.001, bottomFLNext + 0.001],

  };
  flightData.push(transitionData);
  for (let next = Math.ceil(timeToChange) + 1; next < 16; next += 1) {
    const time = next;
    // A bug within Recharts when using LinearGradient and Area - can't be a completly straight line
    // Can consider using Lines instead, but then dots appeared when using responsive Container
    const flightLevelNext = [topFLNext + 0.001, bottomFLNext + 0.001];
    const d = {
      time,
      flightLevelNext,
      flightLevel: null,
    };
    flightData.push(d);
  }
  return (
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart
        data={flightData}
        width={600}
        height={600}
        margin={{
          top: 30, right: 20, bottom: 5, left: 0,
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor={colorCurrent} />
            <stop offset={`${((Math.ceil(timeToChange) / 15) * 100)}%`} stopColor={colorCurrent} />
            <stop offset={`${((Math.ceil(timeToChange) / 15) * 100)}%`} stopColor={colorNext} />
            <stop offset="100%" stopColor={colorNext} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="flightLevel" stroke={colorCurrent} dot={false} fill="transparent" />
        <Area type="monotone" dataKey="flightLevelNext" stroke={colorNext} dot={false} fill="transparent" />

        <XAxis dataKey="time" />
        <YAxis domain={[200, 560]} tickCount={20} />

        <ReferenceLine x={timeDifferanse === 0 ? undefined : Math.ceil(timeToChange)} stroke="rgba(168,101,201)" />
      </AreaChart>
    </ResponsiveContainer>
  );
});
