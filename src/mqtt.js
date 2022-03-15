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
    notFound,
    roleConfiguration,
    targetReport,
    todo,
} from './messageHandlers';

const client = mqtt.connect('ws://localhost:9001/mqtt');

client.on('connect', () => {
    // console.debug('Connected to MQTT broker');
    client.subscribe('ATM/#', (error) => {
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
    'ATM/:clientId/status/time': todo,
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