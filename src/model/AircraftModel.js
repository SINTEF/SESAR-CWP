import { types } from 'mobx-state-tree';

function convertToFlightMeters(alt) {
  const feet = alt * 3.280_84;
  return feet / 100;
}

export default types.model('AircraftModel', {
  aircraftId: types.identifier, // We use the aircraftId as identifier
  assignedFlightId: types.string,
  lastKnownLongitude: types.optional(types.number, 0),
  lastKnownLatitude: types.optional(types.number, 0),
  lastKnownAltitude: types.optional(types.number, 0),
  lastKnownBearing: types.optional(types.number, 0),
  lastKnownSpeed: types.optional(types.number, 0),
}).volatile((/* self */) => ({
  lastTargetReportTime: 0,
})).actions((self) => ({
  handleTargetReport(targetReport) {
    // Ignore target reports that are older than the previous one
    // This is because MQTT doesn't guarantie the order of the received messages
    // We could use a MQTT broker that is a message queue with an order, like RabbitMQ
    const time = targetReport.getTime();
    const timestamp = time.getSeconds() + time.getNanos() * 1e-9;
    if (timestamp < self.lastTargetReportTime) {
      return;
    }
    self.lastTargetReportTime = timestamp;
    self.lastKnownAltitude = convertToFlightMeters(targetReport.getAltitude());
    self.lastKnownLatitude = targetReport.getLatitude();
    self.lastKnownLongitude = targetReport.getLongitude();
    self.lastKnownBearing = targetReport.getBearing();
    self.lastKnownSpeed = targetReport.getSpeed();
  },
}));
