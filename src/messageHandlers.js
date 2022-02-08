/* eslint-disable no-unused-vars */
import AirtrafficMessages from './ProtobufAirTrafficSimulator_pb';
import { aircraftStore, airspaceStore, sectorStore } from './state';

export function notFound(parameters, message, url) {
  // eslint-disable-next-line no-console
  console.warn('MQTT message received but no matching route found', url, message);
}

export function todo(parameters, message, url) {
  // console.info('MQTT message received but event handler is not yet implemented', url, message);
}

export function ignored() { }

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
  sectorStore.handleNewAirspaceConfiguration(protoMessage);
}
export function airspaces({ airspaceId }, message, url) {
  const protoMessage = AirtrafficMessages.NewAirspaceMessage.deserializeBinary(message);
  airspaceStore.handleNewAirspace(protoMessage);
}
/* eslint-enable no-unused-vars */
