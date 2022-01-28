import { types } from 'mobx-state-tree';

export default types.model("AircraftModel", {
    aircraftId: types.identifier, // We use the aircraftId as identifier
    assignedFlightId: types.string,
    lastKnownLongitude: types.optional(types.number, 0),
    lastKnownLatitude: types.optional(types.number, 0),
    lastKnownAltitude: types.optional(types.number, 0),
    lastKnownBearing: types.optional(types.number, 0),
    lastKnownSpeed: types.optional(types.number, 0),
}).volatile(self => ({
    lastTargetReportTime: 0,
})).actions(self => ({
    handleTargetReport(targetReport) {
        // Ignore target reports that are older than the latest one
        // This is because MQTT doesn't guarantie the order of the received messages
        // We could use a better message queue like RabbitMQ but it would have more overhead
        const time = targetReport.getTime();
        const timestamp = time.getSeconds() + time.getNanos() * 1e-9;
        if (timestamp < self.lastTargetReportTime) {
            return;
        }
        self.lastTargetReportTime = timestamp;
        self.lastKnownAltitude = targetReport.getAltitude();
        self.lastKnownLatitude = targetReport.getLatitude();
        self.lastKnownLongitude = targetReport.getLongitude();
        self.lastKnownBearing = targetReport.getBearing();
        self.lastKnownSpeed = targetReport.getSpeed();
    },
}));