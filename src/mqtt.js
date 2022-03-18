import { transaction } from 'mobx';
import mqtt from 'mqtt';
import rlite from 'rlite-router';

import {
  airspaceAvailability,
  airspaces,
  currentAirspaceConfiguration,
  flightRoutes,
  ignored,
  newAircraftMessage,
  newAirspaceConfiguration,
  newAirspaceVolumeFlightList,
  newFlight,
  newPointMessage,
  newSimulatorTime,
  notFound,
  roleConfiguration,
  targetReport,
  todo,
} from './messageHandlers';

const client = mqtt.connect('ws://localhost:9001/mqtt');

function sanitizeClientId(clientId) {
  return clientId.replace(/[^\dA-Za-z]/g, '');
}

// TODO harcoded for now
const clientId = sanitizeClientId('1');

client.on('connect', () => {
  // console.debug('Connected to MQTT broker');
  client.subscribe(`ATM/${clientId}/#`, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to subscribe to MQTT topics', error);
    }
  });
});

const router = rlite(notFound, {
  'ATM/:clientId/Initialisation/Completed': todo,
  'ATM/:clientId/TargetReports/:vehicleId': targetReport,
  'ATM/:clientId/AllTargetReports/:time': ignored,
  'ATM/:clientId/FlightMilestoneTimes/:flightUniqueId': todo,
  'ATM/:clientId/FlightMilestonePositions/:flightUniqueId': todo,
  'ATM/:clientId/PlannedFlights/:flightUniqueId': todo,
  'ATM/:clientId/AircraftTypes/:vehicleTypeId': todo,
  'ATM/:clientId/Aircrafts/:vehicleTypeId': newAircraftMessage,
  'ATM/:clientId/NewFlights/:flightUniqueId': newFlight,
  'ATM/:clientId/FlightStatusCodes/:flightUniqueId': todo,
  'ATM/:clientId/Routes/:networkId/:objectId': todo,
  'ATM/:clientId/FlightRoutes/:flightUniqueId': flightRoutes,
  'ATM/:clientId/StandManoeuvres/:networkId/:objectId': todo,
  'ATM/:clientId/Airspaces/:airspaceId': airspaces,
  'ATM/:clientId/Sectors/:sectorId': todo,
  'ATM/:clientId/Airblocks/:airblockId': todo,
  'ATM/:clientId/AirspaceConfigurations/:configurationId': newAirspaceConfiguration,
  'ATM/:clientId/AirspaceAvailability/:airspaceId/:time': airspaceAvailability,
  'ATM/:clientId/Segments/:segmentId': todo,
  'ATM/:clientId/Waypoints/:objectId': todo,
  'ATM/:clientId/Points/:nodeId': newPointMessage,
  'ATM/:clientId/RoleConfiguration/:roleName': roleConfiguration,
  'ATM/:clientId/CurrentAirspaceConfiguration': currentAirspaceConfiguration,
  'ATM/:clientId/TesselatedAirspaceVolume/:airspaceVolumeId': todo,
  'ATM/:clientId/NewAirspaceVolumeFlightListMessage/:airspaceVolumeId': newAirspaceVolumeFlightList,
  'ATM/:clientId/AddAcceptedFlightMessage/:toControllableAirspaceVolume/:flightId': todo,
  'ATM/:clientId/AddTentativeFlightMessage/:toControllableAirspaceVolume/:flightId': todo,
  'ATM/:clientId/status/time': newSimulatorTime,
  'ATM/:clientId/status/:status': todo,
});

let incomingMessagesQueue = [];
let incomingMessagesBatchId = 0;

function processIncomingMessages() {
  transaction(() => {
    incomingMessagesBatchId = 0;
    for (const { topic, message }
      of incomingMessagesQueue) {
      try {
        router(topic, message);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error while handling MQTT message', error);
      }
    }
  });
  incomingMessagesQueue = [];
}

client.on('message', (topic, message) => {
  incomingMessagesQueue.push({ topic, message });
  if (incomingMessagesBatchId === 0) {
    incomingMessagesBatchId = window.requestAnimationFrame(processIncomingMessages);
  }
  // eslint-disable-next-line eol-last
});

function serializeForSimulator(...parameters) {
  const stringParameters = parameters.map((parameter) => `${parameter}`);

  for (const parameter of stringParameters) {
    if (parameter.contains('&')) {
      throw new Error('Invalid parameter, & is not allowed');
    }
  }

  return stringParameters.join('&');
}

export function startSimulator() {
  client.publish(`simulator/${clientId}/simCommand`, 'start', { qos: 1 });
}

export function pauseSimulator() {
  client.publish(`simulator/${clientId}/simCommand`, 'pause', { qos: 1 });
}

export function resetSimulator() {
  client.publish(`simulator/${clientId}/simCommand`, 'reset', { qos: 2 });
}

export function setSpeedFactor(speedFactor) {
  client.publish(`simulator/${clientId}/speedFactor`,
    serializeForSimulator(speedFactor),
    { qos: 1 },
  );
}

export function changeSpeedOfAircraft(pilotId, flightId, newSpeed) {
  client.publish(`simulator/${clientId}/changeSpeedOfAircraft`,
    serializeForSimulator(pilotId, flightId, newSpeed),
    { qos: 1 },
  );
}

export function changeFlightLevelOfAircraft(pilotId, flightId, newFlightLevel) {
  client.publish(`simulator/${clientId}/changeFlightLevelOfAircraft`,
    serializeForSimulator(pilotId, flightId, newFlightLevel),
    { qos: 1 },
  );
}

export function changeBearingOfAircraft(pilotId, flightId, newBearing) {
  client.publish(`simulator/${clientId}/changeBearingOfAircraft`,
    serializeForSimulator(pilotId, flightId, newBearing),
    { qos: 1 },
  );
}

export function changeNextWaypointOfAircraft(pilotId, waypointId, flightId, latitude, longitude) {
  client.publish(`simulator/${clientId}/changeNextWaypointOfAircraft`,
    serializeForSimulator(pilotId, waypointId, flightId, latitude, longitude),
    { qos: 1 },
  );
}

export function acceptFlight(fromControllableSector, toControllableSector, flightUniqueId) {
  client.publish(`simulator/${clientId}/acceptedFlight`,
    serializeForSimulator(fromControllableSector, toControllableSector, flightUniqueId),
    { qos: 1 },
  );
}

export function tentativeFlight(fromControllableSector, toControllableSector, flightUniqueId) {
  client.publish(`simulator/${clientId}/tentativeFlight`,
    serializeForSimulator(fromControllableSector, toControllableSector, flightUniqueId),
    { qos: 1 },
  );
}
