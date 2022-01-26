import AirtrafficMessages from './ProtobufAirTrafficSimulator_pb';

export function notFound(params, message, url) {
  console.warn('MQTT message received but no matching route found', url, message);
}

export function todo(params, message, url) {
  console.info('MQTT message received but event handler is not yet implemented', url, message);
}

export function ignored() {}

export function targetReport({ clientId, vehicleId }, message, url) {
  var proto_message = AirtrafficMessages.TargetReportMessage.deserializeBinary(message)

  // TODO add the data to mobx
  console.log(proto_message);
}