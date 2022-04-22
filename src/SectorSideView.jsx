// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  Area, AreaChart, ReferenceLine,
  ResponsiveContainer,
  XAxis, YAxis,
} from 'recharts';

import { configurationStore, currentRoleConfiguration } from './state';

export default observer(function Sectors3DView() {
  const colorCurrent = '#ffffff';
  const colorNext = 'rgba(135,206,235)';
  const controllingCWP = configurationStore.currentCWP;
  const controllingSector = currentRoleConfiguration.roleConfigurations
    .get(controllingCWP);
  if (!controllingSector) {
    return null;
  }
  const timeToChange = 5;
  const flightLevels = configurationStore.areaOfIncludedAirspaces;
  const airspace = [...flightLevels.values()]
    .find(([key]) => key === controllingSector.controlledSector);
  if (!airspace) {
    return null;
  }
  const bottomFL = airspace[1].bottomFlightLevel;
  const topFL = airspace[1].topFlightLevel;

  const flightData = [];
  for (let index = 0; index < timeToChange + 1; index += 1) {
    const time = index;
    const flightLevel = [topFL,
      bottomFL];
    const d = {
      time,
      flightLevel,
    };
    flightData.push(d);
  }
  for (let next = timeToChange; next < 16; next += 1) {
    const time = next;
    // A bug within Recharts when using LinearGradient and Area - can't be a completly straight line
    // Can consider using Lines instead, but then dots appeared when using responsive Container
    const flightLevel = [topFL + 0.001, bottomFL + 0.001];
    const d = {
      time,
      flightLevel,
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
            <stop offset={`${(timeToChange / 16) * 100}%`} stopColor={colorCurrent} />
            <stop offset={`${(timeToChange / 16) * 100}%`} stopColor={colorNext} />
            <stop offset="100%" stopColor={colorNext} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="flightLevel" stroke="url(#gradient)" dot={false} fill="transparent" />
        <XAxis dataKey="time" />
        <YAxis domain={[200, 560]} tickCount="20" />
        <ReferenceLine x={timeToChange} stroke="rgba(168,101,201)" />
      </AreaChart>
      {/* <Line type="monotone" dataKey="bottomflightLevel" stroke="#ffffff" /> */}

    </ResponsiveContainer>
  );
});
