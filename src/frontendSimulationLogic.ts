/**
 * This is a quick and dirty implementation of the frontend simulation logic.
 *
 * Sometimes we want the frontend to change a few things on its model. For example, when a flight
 * reach the flight altitude required by the frontend.
 *
 * Ideally, this should be done somewhere in the backend, but this would take too much development
 * efforts for now.
 *
 * Instead, each client will run a periodic check, at random intervals, and update the model
 * accordingly, and publish the changes to the other frontends. The randomness is important to avoid
 * having conflicting changes.
 */

import { autorun } from 'mobx';

import {
  handlePublishPromise,
  persistACCBearing, persistACCFlightLevel, persistAssignedFlightLevel,
  persistNextSectorFlightLevel, persistSpeedAircraft,
} from './mqtt-client/publishers';
import { aircraftStore } from './state';
import type AircraftModel from './model/AircraftModel';

function timeBeforeNextRunInMs(): number {
  // Return a random number between 0 and 1.5s
  return Math.round(Math.random() * 1500);
}

function runSimulationLogic(aircraft: AircraftModel): void {
  const {
    assignedBearing,
    assignedFlightId,
    assignedFlightLevel,
    assignedSpeed,
    lastKnownAltitude,
    lastKnownBearing,
    lastKnownSpeed,
    localAssignedFlightLevel,
    nextACCFL,
    nextSectorFL,
    nextSectorController,
    controlledBy,
    setNextSectorController,
    setAssignedBearing,
    setAssignedFlightLevel,
    setAssignedSpeed,
    setLocalAssignedFlightLevel,
    setNextACCFL,
    setNextSectorFL,
  } = aircraft;

  const stringAltitude = lastKnownAltitude.toFixed(0);
  if (assignedFlightLevel === stringAltitude) {
    setAssignedFlightLevel('FL.S');
    handlePublishPromise(
      persistAssignedFlightLevel(assignedFlightId, 'FL.S'),
    );
  }
  if (localAssignedFlightLevel === stringAltitude) {
    setLocalAssignedFlightLevel('FL.S');
    handlePublishPromise(
      persistAssignedFlightLevel(assignedFlightId, 'FL.S'),
    );
  }
  if (nextSectorFL === stringAltitude) {
    setNextSectorFL('NSFL');
    handlePublishPromise(
      persistNextSectorFlightLevel(assignedFlightId, 'NSFL'),
    );
  }
  if (nextACCFL === stringAltitude) {
    setNextACCFL('COO');
    handlePublishPromise(
      persistACCFlightLevel(assignedFlightId, 'COO'),
    );
  }
  if (assignedBearing === Math.round(lastKnownBearing)) {
    setAssignedBearing(-1);
    handlePublishPromise(
      persistACCBearing(assignedFlightId, -1),
    );
  }
  if (assignedSpeed === Math.round(lastKnownSpeed)) {
    setAssignedSpeed(-1);
    handlePublishPromise(
      persistSpeedAircraft(assignedFlightId, -1),
    );
  }
  if (nextSectorController === controlledBy) {
    setNextSectorController('NS');
  }
}

autorun(() => {
  const aircrafts = aircraftStore.aircraftsWithPosition;
  for (const aircraft of aircrafts) {
    const {
      assignedBearing,
      assignedFlightLevel,
      assignedSpeed,
      lastKnownAltitude,
      lastKnownBearing,
      lastKnownSpeed,
      localAssignedFlightLevel,
      nextACCFL,
      nextSectorFL,
    } = aircraft;

    // If the plane has something to be updated in its model
    const stringAltitude = lastKnownAltitude.toFixed(0);
    if (assignedFlightLevel === stringAltitude
      || localAssignedFlightLevel === stringAltitude
      || nextSectorFL === stringAltitude
      || nextACCFL === stringAltitude
      || assignedBearing === Math.round(lastKnownBearing)
      || assignedSpeed === Math.round(lastKnownSpeed)) {
      // Do the update in a random delay
      window.setTimeout(
        () => runSimulationLogic(aircraft),
        timeBeforeNextRunInMs(),
      );
    }
  }
});
