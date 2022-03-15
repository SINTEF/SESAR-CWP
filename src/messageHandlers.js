/* eslint-disable no-unused-vars */
import AirtrafficMessages from './ProtobufAirTrafficSimulator_pb';
import {
    aircraftStore, airspaceStore, configurationStore, fixStore,
} from './state';

export function notFound(parameters, message, url) {
    // eslint-disable-next-line no-console
    console.warn('MQTT message received but no matching route found', url, message);
}

export function todo(parameters, message, url) {
    // console.info('MQTT message received but event handler is not yet implemented', url, message);
}

export function ignored() {}

export function targetReport({ clientId, vehicleId }, message, url) {
    const protoMessage = AirtrafficMessages.TargetReportMessage.deserializeBinary(message);
    aircraftStore.handleTargetReport(protoMessage);
}

export function newFlight({ clientId, flightUniqueId }, message, url) {
    const protoMessage = AirtrafficMessages.NewFlightMessage.deserializeBinary(message);
    aircraftStore.handleNewFlight(protoMessage);
}

export function newAirspaceConfiguration({ configurationId }, message, url) {
    const protoMessage = AirtrafficMessages.NewAirspaceConfigurationMessage
        .deserializeBinary(message);
    // console.log(protoMessage);
    configurationStore.handleNewAirspaceConfiguration(protoMessage);
}
export function airspaces({ airspaceId }, message, url) {
    const protoMessage = AirtrafficMessages.NewAirspaceMessage.deserializeBinary(message);
    airspaceStore.handleNewAirspace(protoMessage);
}
export function newPointMessage({ pointId }, message, url) {
    const protoMessage = AirtrafficMessages.NewPointMessage.deserializeBinary(message);
    fixStore.handleNewPointMessage(protoMessage);
}
export function newAircraftMessage(parameters, message, url) {
    const protoMessage = AirtrafficMessages.NewAircraftMessage.deserializeBinary(message);
    aircraftStore.handleNewAircraftMessage(protoMessage);
}
export function currentAirspaceConfiguration(parameters, message) {
    const protoMessage = AirtrafficMessages.CurrentAirspaceConfigurationMessage
        .deserializeBinary(message);
    configurationStore.setCurrentConfiguration(protoMessage);
}
export function flightRoutes(parameters, message) {
    const protoMessage = AirtrafficMessages.FlightRouteMessage.deserializeBinary(message);
    aircraftStore.handleNewFlightRoute(protoMessage);
}
export function newAirspaceVolumeFlightList(parameters, message) {
    const protoMessage = AirtrafficMessages.NewAirspaceVolumeFlightListMessage
    .deserializeBinary(message);
    console.log(message);
    console.log(protoMessage);
}
export function airspaceAvailability(parameters, message) {
    const protoMessage = AirtrafficMessages.AirspaceAvailabilityMessage.deserializeBinary(message);
    console.log(protoMessage);
}
// A message sent when there is a status update w.r.t a role, this can be either a controller or a (pseudo) pilot.
// This can be in the event that a flight has been set to tentative, or been accepted by a controller.
export function roleConfiguration(parameters, message) {
    // const protoMessage = AirtrafficMessages.RoleConfigurationMessage.deserializeBinary(message);
    // console.log(protoMessage.getAcceptedflightsList());
}
// eslint-disable-next-line eol-last
/* eslint-enable no-unused-vars */