import { types } from 'mobx-state-tree';

export default types.model("AircraftModel", {
    aircraftId: types.identifier, // We use the aircraftId as identifier
    assignedFlightId: types.string,
    lastKnownLongitude: types.optional(types.number, undefined),
    lastKnownLatitude: types.optional(types.number, undefined),
    lastKnownAltitude: types.optional(types.number, undefined),
    lastKnownBearing: types.optional(types.number, undefined),
    lastKnownSpeed: types.optional(types.number, undefined),
});