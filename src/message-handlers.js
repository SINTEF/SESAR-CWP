import AirtrafficMessages from './ProtobufAirTrafficSimulator_pb';
import { aircraftStore, sectorStore } from './state';

export function notFound(params, message, url) {
  console.warn('MQTT message received but no matching route found', url, message);
}

export function todo(params, message, url) {
  // console.info('MQTT message received but event handler is not yet implemented', url, message);
}

export function ignored() { }

export function targetReport({ clientId, vehicleId }, message, url) {
  var protoMessage = AirtrafficMessages.TargetReportMessage.deserializeBinary(message);
  aircraftStore.handleTargetReport(protoMessage);
}

export function newFlight({clientId, flightUniqueId}, message, url) {
  var protoMessage = AirtrafficMessages.NewFlightMessage.deserializeBinary(message);
  aircraftStore.handleNewFlight(protoMessage);
}

export function newAirspaceConfiguration({configurationId}, message, url){
  var protoMessage = AirtrafficMessages.NewAirspaceConfigurationMessage.deserializeBinary(message);
  sectorStore.handleNewAirspaceConfiguration(protoMessage);
  
}
export function airspaces({airspaceId}, message, url){
  var protoMessage = AirtrafficMessages.NewAirspaceMessage.deserializeBinary(message);
}