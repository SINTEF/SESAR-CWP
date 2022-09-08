import { transaction } from 'mobx';
import mqtt from 'mqtt';
import rlite from 'rlite-router';

import {
  acceptedFlightMessage,
  airspaceAvailability,
  airspaces,
  currentAirspaceConfiguration,
  flightRoutes,
  ignored,
  newAircraftMessage,
  newAircraftTypeMessage,
  newAirspaceConfiguration,
  newAirspaceVolumeFlightList,
  newAvailabilityIntervalsMessage,
  newFlight,
  newFlightMilestonePositions,
  newPointMessage,
  newSimulatorTime,
  notFound,
  roleConfiguration,
  targetReport,
  tentativeFlightMessage,
} from './messageHandlers';

const client = mqtt.connect('ws://localhost:9001/mqtt');

function sanitizeClientId(clientId: string): string {
  return clientId.replace(/[^\dA-Za-z]/g, '');
}

function retrieveClientId() : string {
  // Load from search parameter
  const urlParameters = new URLSearchParams(window.location.search);
  const clientId = urlParameters.get('clientId');
  if (clientId) {
    return sanitizeClientId(clientId);
  }
  return '1';
}

const clientId = retrieveClientId();

client.addListener('connect', () => {
  client.subscribe(`ATM/${clientId}/#`, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to subscribe to MQTT topics', error);
    }
  });
});

type MqttOnCallback = () => void;
type MqttOffCallback = () => void;

export function onConnect(callback: MqttOnCallback): MqttOffCallback {
  if (client.connected) {
    callback();
  }
  client.addListener('connect', callback);
  return () => client.removeListener('connect', callback);
}

export function onDisconnect(callback: MqttOffCallback): MqttOffCallback {
  if (!client.connected) {
    callback();
  }
  client.addListener('close', callback);
  return () => client.removeListener('close', callback);
}

export function onPacketReceive(callback: MqttOnCallback): MqttOffCallback {
  client.addListener('packetreceive', callback);
  return () => client.removeListener('packetreceive', callback);
}

export function onPacketSend(callback: MqttOnCallback): MqttOffCallback {
  client.addListener('packetsend', callback);
  return () => client.removeListener('packetsend', callback);
}

const router = rlite<Buffer>(notFound, {
  'ATM/:clientId/Initialisation/Completed': ignored,
  'ATM/:clientId/TargetReports/:vehicleId': targetReport,
  'ATM/:clientId/AvailabilityIntervalsMessage/:objectId/:time': newAvailabilityIntervalsMessage,
  'ATM/:clientId/AllTargetReports/:time': ignored,
  'ATM/:clientId/FlightMilestoneTimes/:flightUniqueId': ignored,
  'ATM/:clientId/FlightMilestonePositions/:flightUniqueId': newFlightMilestonePositions,
  'ATM/:clientId/PlannedFlights/:flightUniqueId': ignored,
  'ATM/:clientId/AircraftTypes/:vehicleTypeId': newAircraftTypeMessage,
  'ATM/:clientId/Aircrafts/:vehicleTypeId': newAircraftMessage,
  'ATM/:clientId/NewFlights/:flightUniqueId': newFlight,
  'ATM/:clientId/FlightStatusCodes/:flightUniqueId': ignored,
  'ATM/:clientId/Routes/:networkId/:objectId': ignored,
  'ATM/:clientId/FlightRoutes/:flightUniqueId': flightRoutes,
  'ATM/:clientId/StandManoeuvres/:networkId/:objectId': ignored,
  'ATM/:clientId/Airspaces/:airspaceId': airspaces,
  'ATM/:clientId/Sectors/:sectorId': ignored, // no longer needed
  'ATM/:clientId/Airblocks/:airblockId': ignored, // no longer needed
  'ATM/:clientId/AirspaceConfigurations/:configurationId': newAirspaceConfiguration,
  'ATM/:clientId/AirspaceAvailability/:airspaceId/:time': airspaceAvailability,
  'ATM/:clientId/Segments/:segmentId': ignored,
  'ATM/:clientId/Waypoints/:objectId': ignored,
  'ATM/:clientId/Points/:nodeId': newPointMessage,
  'ATM/:clientId/RoleConfiguration/:roleName': roleConfiguration,
  'ATM/:clientId/CurrentAirspaceConfiguration': currentAirspaceConfiguration,
  'ATM/:clientId/TesselatedAirspaceVolume/:airspaceVolumeId': ignored,
  'ATM/:clientId/NewAirspaceVolumeFlightListMessage/:airspaceVolumeId': newAirspaceVolumeFlightList,
  'ATM/:clientId/AddAcceptedFlightMessage/:toControllableAirspaceVolume/:flightId': acceptedFlightMessage,
  'ATM/:clientId/AddTentativeFlightMessage/:toControllableAirspaceVolume/:flightId': tentativeFlightMessage,
  'ATM/:clientId/status/time': newSimulatorTime,
  'ATM/:clientId/status/:status': ignored,
});

let incomingMessagesQueue: { topic: string, message: Buffer }[] = [];
let incomingMessagesBatchId = 0;

function processIncomingMessages(): void {
  transaction(() => {
    incomingMessagesBatchId = 0;
    for (const { topic, message } of incomingMessagesQueue) {
      // Ignore empty messages (they are most likely deletion messages)
      if (message.length > 0) {
        try {
          router(topic, message);
        } catch (error) {
        // eslint-disable-next-line no-console
          console.error('Error while handling MQTT message', error);
        }
      }
    }
  });
  incomingMessagesQueue = [];
}

client.addListener('message', (topic: string, message: Buffer) => {
  incomingMessagesQueue.push({ topic, message });
  if (incomingMessagesBatchId === 0) {
    incomingMessagesBatchId = window.requestAnimationFrame(processIncomingMessages);
  }
  // eslint-disable-next-line eol-last
});

function serializeForSimulator(...parameters: (string | number)[]): string {
  const stringParameters = parameters.map((parameter) => `${parameter}`);

  for (const parameter of stringParameters) {
    // contains could be deprecated
    if (parameter.includes('&')) {
      throw new Error('Invalid parameter, & is not allowed');
    }
  }

  return stringParameters.join('&');
}

export function startSimulator(): void {
  client.publish(`simulator/${clientId}/simCommand`, 'start', { qos: 1 });
}

export function pauseSimulator(): void {
  client.publish(`simulator/${clientId}/simCommand`, 'pause', { qos: 1 });
}

export function resetSimulator(): void {
  client.publish(`simulator/${clientId}/simCommand`, 'reset', { qos: 2 });
}

export function setSpeedFactor(speedFactor: number): void {
  client.publish(`simulator/${clientId}/speedFactor`,
    serializeForSimulator(speedFactor),
    { qos: 1 },
  );
}

export function changeSpeedOfAircraft(pilotId: string, flightId: string, newSpeed: number): void {
  client.publish(`simulator/${clientId}/changeSpeedOfAircraft/`,
    serializeForSimulator(pilotId, flightId, newSpeed),
    { qos: 1 },
  );
}

export function changeFlightLevelOfAircraft(
  pilotId: string, flightId: string, newFlightLevel: string,
): void {
  client.publish(`simulator/${clientId}/changeFlightLevelOfAircraft/`,
    serializeForSimulator(pilotId, flightId, newFlightLevel),
    { qos: 1 },
  );
}

export function changeBearingOfAircraft(
  pilotId: string, flightId: string, newBearing: number,
): void {
  client.publish(`simulator/${clientId}/changeBearingOfAircraft/`,
    serializeForSimulator(pilotId, flightId, newBearing),
    { qos: 1 },
  );
}

export function changeNextWaypointOfAircraft({
  pilotId, waypointId, flightId, latitude, longitude, viaLat, viaLong, viaWaypointId,
}: {
  pilotId: string, waypointId: string, flightId: string, latitude: number,
  longitude: number, viaLat: number | string, viaLong: number | string, viaWaypointId: string,
}): void {
  client.publish(`simulator/${clientId}/changeNextWaypointOfAircraft/`,
    serializeForSimulator(
      pilotId, waypointId, flightId, latitude, longitude, viaLat, viaLong, viaWaypointId,
    ),
    { qos: 1 },
  );
}

export function acceptFlight(
  fromControllableSector: string, toControllableSector: string, flightUniqueId: string,
): void {
  client.publish(`simulator/${clientId}/acceptedFlight/`,
    serializeForSimulator(fromControllableSector, toControllableSector, flightUniqueId),
    { qos: 1 },
  );
}

export function tentativeFlight(
  fromControllableSector: string, toControllableSector: string, flightUniqueId: string,
): void {
  client.publish(`simulator/${clientId}/tentativeFlight/`,
    serializeForSimulator(fromControllableSector, toControllableSector, flightUniqueId),
    { qos: 1 },
  );
}
