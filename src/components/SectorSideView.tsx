import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Area, AreaChart, ReferenceLine,
  ResponsiveContainer,
  XAxis, YAxis,
} from 'recharts';

import {
  configurationStore, cwpStore, roleConfigurationStore, simulatorStore,
} from '../state';

const colorCurrent = '#ffffff';
const colorNext = 'rgba(135,206,235)';

export default observer(function SectorSideView() {
  const simulatorTime = simulatorStore.timestamp;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    areaOfIncludedAirspaces,
    areaOfIncludedAirspacesForNextConfiguration,
    nextConfiguration,
    airspaceStore,
  } = configurationStore;

  const {
    currentControlledSector,
    nextControlledSector,
  } = roleConfigurationStore;
  const { clickedSectorId, showClickedSector } = cwpStore;

  let timeToChange = 15;
  let timeDifferanse = 10_000;

  const airspaceCurrent = clickedSectorId !== '' && showClickedSector ? airspaceStore.getAreaFromId(clickedSectorId) : areaOfIncludedAirspaces
    .find(({ sectorId }) => sectorId === currentControlledSector);
  if (!airspaceCurrent) {
    return null;
  }
  const bottomFLCurrent = airspaceCurrent.bottomFlightLevel;
  const topFLCurrent = airspaceCurrent.topFlightLevel;
  let bottomFLNext = bottomFLCurrent;
  let topFLNext = topFLCurrent;

  if (nextConfiguration) {
    const startTime = nextConfiguration[1];
    timeDifferanse = startTime - simulatorTime;
    const airspaceNext = areaOfIncludedAirspacesForNextConfiguration
      .find(({ sectorId }) => sectorId === nextControlledSector);
    if (airspaceNext !== undefined) {
      bottomFLNext = airspaceNext.bottomFlightLevel;
      topFLNext = airspaceNext.topFlightLevel;
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
          <linearGradient x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor={colorCurrent} />
            <stop offset={`${((Math.ceil(timeToChange) / 15) * 100)}%`} stopColor={colorCurrent} />
            <stop offset={`${((Math.ceil(timeToChange) / 15) * 100)}%`} stopColor={colorNext} />
            <stop offset="100%" stopColor={colorNext} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="flightLevel" stroke={colorCurrent} dot={false} fill="transparent" />
        <Area type="monotone" dataKey="flightLevelNext" stroke={colorNext} dot={false} fill="transparent" />

        <XAxis dataKey="time" />
        <YAxis domain={[0, 1000]} tickCount={1000} />

        <ReferenceLine x={timeDifferanse > 900 ? undefined : Math.ceil(timeToChange)} stroke="rgba(168,101,201)" />
      </AreaChart>
    </ResponsiveContainer>
  );
});
