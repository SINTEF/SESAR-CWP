import mqtt from 'mqtt';
import rlite from 'rlite-router';

import {notFound, todo, ignored, targetReport} from './message-handlers';

const client = mqtt.connect('ws://localhost:9001/mqtt');

// var message = new airtrafficMessages.Position4D(); //creating a new message

client.on('connect', function() {
    console.log("Connected to MQTT broker");
    client.subscribe('ATM/#', function(err) {
        console.log("Subscribed to all topics");
        if (!err) {
            client.publish('hello', 'Hello world')
        }
    })
});

const router = rlite(notFound, {
    'ATM/:clientId/Initialisation/Completed': todo,
    'ATM/:clientId/TargetReports/:vehicleId': targetReport,
    'ATM/:clientId/AllTargetReports/:time': ignored,
    'ATM/:clientId/FlightMilestoneTimes/:flightUniqueId': todo,
    'ATM/:clientId/FlightMilestonePositions/:flightUniqueId': todo,
    'ATM/:clientId/PlannedFlights/:flightUniqueId': todo,
    'ATM/:clientId/AircraftTypes/:vehicleTypeId': todo,
    'ATM/:clientId/NewFlights/:flightUniqueId': todo,
    'ATM/:clientId/FlightStatusCodes/:flightUniqueId': todo,
    'ATM/:clientId/Routes/:networkId/:objectId': todo,
    'ATM/:clientId/FlightRoutes/:flightUniqueId': todo,
    'ATM/:clientId/StandManoeuvres/:networkId/:objectId': todo,
    'ATM/:clientId/Airspaces/:airspaceId': todo,
    'ATM/:clientId/Sectors/:sectorId': todo,
    'ATM/:clientId/Airblocks/:airblockId': todo,
    'ATM/:clientId/AirspaceConfigurations/:configurationId': todo,
    'ATM/:clientId/AirspaceAvailability/:airspaceId/:time': todo,
    'ATM/:clientId/Segments/:segmentId': todo,
    'ATM/:clientId/Waypoints/:objectId': todo,
    'ATM/:clientId/Points/:nodeId': todo,
    'ATM/:clientId/RoleConfiguration/:roleName': todo,
    'ATM/:clientId/CurrentAirspaceConfiguration': todo,
    'ATM/:clientId/TesselatedAirspaceVolume/:airspaceVolumeId': todo,
    'ATM/:clientId/NewAirspaceVolumeFlightListMessage/:airspaceVolumeId': todo,
    'ATM/:clientId/AddAcceptedFlightMessage/:toControllableAirspaceVolume/:flightId': todo,
    'ATM/:clientId/AddTentativeFlightMessage/:toControllableAirspaceVolume/:flightId': todo,
});

client.on('message', function(topic, message) {
    try {
        router(topic, message);
    } catch (error) {
        console.error("Error while handling MQTT message", error);
    }
});