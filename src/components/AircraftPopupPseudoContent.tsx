import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';

import { isDragging } from '../draggableState';
import { acceptFlight, handlePublishPromise } from '../mqtt/publishers';
import { aircraftStore, configurationStore, cwpStore } from '../state';
import {
  Altitude, LocalAssignedFlightLevel, NextACCFlightLevel, NextSectorController, NextSectorFL,
} from './AircraftPopupContent';
import type AircraftModel from '../model/AircraftModel';

type SubContentProperties = {
  aircraft: AircraftModel;
  colSpan?: number;
  flightColor?: string;
};

const CallSign = observer(({ aircraft, colSpan }: SubContentProperties): JSX.Element => {
  const { callSign } = aircraft;
  const setController = (): void => {
    if (isDragging()) return;
    const { aircraftId, controlledBy, assignedFlightId } = aircraft;
    aircraftStore.aircrafts.get(aircraftId)?.setController(configurationStore.currentCWP);
    handlePublishPromise(
      acceptFlight(controlledBy, configurationStore.currentCWP, assignedFlightId),
    );
  };
  return (<td onClick={setController} colSpan={colSpan}>{callSign}</td>);
});

const Bearing = observer(({ aircraft }: SubContentProperties): JSX.Element => {
  const onClick = (): void => {
    if (isDragging()) return;
    cwpStore.openChangeBearingForAircraft(aircraft.aircraftId);
  };

  return (<td onClick={onClick}>
    {Math.round(aircraft.lastKnownBearing)}
  </td>);
});

const SpeedAndWakeTurbulenceLabel = observer(({ aircraft }: SubContentProperties): JSX.Element => {
  const handleSpeedClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.button === 1) {
      cwpStore.openChangeSpeedForAircraft(aircraft.aircraftId);
    }
  };
  const onClick = (): void => {
    if (isDragging()) return;
    cwpStore.toggleSpeedVectorForAircraft(aircraft.aircraftId);
  };

  return (
    <td onMouseDown={handleSpeedClick} onClick={onClick}>
      {aircraft.speedAndWakeTurbulenceLabel}
    </td>
  );
});

const NextFix = observer(({ aircraft }: SubContentProperties): JSX.Element => {
  const middleClickNextWaypoint = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.button === 1) {
      cwpStore.toggleFlightRouteForAircraft(aircraft.aircraftId);
    }
  };

  const onClick = (): void => {
    if (isDragging()) return;
    cwpStore.openChangeNextFixForAircraft(aircraft.aircraftId);
  };
  const { nextFix, assignedBearing } = aircraft;
  const showNextFix = assignedBearing === -1 || assignedBearing === undefined;

  return (
    <td onMouseDown={middleClickNextWaypoint} onClick={onClick}>
      {showNextFix ? nextFix : '--'}
    </td>);
});

const AssignedBearing = observer(({ aircraft }: SubContentProperties): JSX.Element => (
  <td>
    { aircraft.assignedBearing === -1 || aircraft.assignedBearing === undefined
      ? 'BEG.S' : `${aircraft.assignedBearing}` }
  </td>
));

const AssignedFlightLevel = observer(({ aircraft }: SubContentProperties): JSX.Element => {
  const onClick = (): void => {
    if (isDragging()) return;
    cwpStore.openLevelPopupForAircraft(aircraft.aircraftId);
  };

  return (<td onClick={onClick}>
    {aircraft.assignedFlightLevel}
  </td>);
});

const AssignedSpeed = observer(({ aircraft }: SubContentProperties): JSX.Element => (
  <td>{
    aircraft.assignedSpeed === -1 || aircraft.assignedSpeed === undefined
      ? 'S.S' : aircraft.assignedSpeed
      }
  </td>
));

export default observer(function AircraftPopupPseudoContent(
  { aircraft, flightColor }: SubContentProperties,
): JSX.Element {
  return (
    <table className="flight-popup-container flight-popup-pseudo-container">
      <tbody style={{ color: flightColor }}>
        <tr>
          <CallSign aircraft={aircraft} colSpan={2} />
        </tr>
        <tr>
          <Bearing aircraft={aircraft}/>
          <td></td>
          <AssignedBearing aircraft={aircraft}/>
        </tr>
        <tr>
          <Altitude aircraft={aircraft}/>
          <NextFix aircraft={aircraft}/>
          <AssignedFlightLevel aircraft={aircraft}/>
        </tr>
        <tr>
          <SpeedAndWakeTurbulenceLabel aircraft={aircraft}/>
          <NextSectorFL aircraft={aircraft}/>
          <AssignedSpeed aircraft={aircraft}/>
        </tr>
        <tr>
          <NextSectorController aircraft={aircraft}/>
          <LocalAssignedFlightLevel aircraft={aircraft}/>
          <NextACCFlightLevel aircraft={aircraft}/>
        </tr>
      </tbody>
    </table>
  );
});
