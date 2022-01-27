import { types } from 'mobx-state-tree';

export default types.model("AircraftModel", {
    aircraftId: types.identifier, // We use the aircraftId as identifier
    assignedFlightId: types.string,
    lastKnownLongitude: types.optional(types.number, 0),
    lastKnownLatitude: types.optional(types.number, 0),
    lastKnownAltitude: types.optional(types.number, 0),
    lastKnownBearing: types.optional(types.number, 0),
    lastKnownSpeed: types.optional(types.number, 0),
});