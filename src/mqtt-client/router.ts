import rlite from "rlite-router";

import {
	airspaceAvailability,
	airspaces,
	airTrafficControllerMessage,
	bearingPilotRequest,
	currentAirspaceConfiguration,
	flightConflictMessage,
	flightEnteringAirspaceMessage,
	flightLevelPilotRequest,
	flightRoutes,
	frontendACCBearing,
	frontendACCFlightLevel,
	frontendAssignedFlightLevel,
	frontendFlightController,
	frontendFlightHidden,
	frontendLocalAssignedFlightLevel,
	frontendNextSectorFlightLevel,
	frontendSpeed,
	ignored,
	newAircraftMessage,
	newAircraftTypeMessage,
	newAirspaceConfiguration,
	newAvailabilitySchedule,
	newFlight,
	newFlightMilestonePositions,
	newPointMessage,
	newSimulatorTime,
	notFound,
	roleConfiguration,
	targetReport,
} from "./subscribers";

const router = rlite<Buffer>(notFound, {
	"ATM/:clientId/Initialisation/Completed": ignored,
	"ATM/:clientId/TargetReports/:vehicleId": targetReport,
	// 'ATM/:clientId/AvailabilityIntervalsMessage/:objectId/:time': newAvailabilityIntervalsMessage,
	"ATM/:clientId/AvailabilitySchedule": newAvailabilitySchedule,
	"ATM/:clientId/AllTargetReports/:time": ignored,
	"ATM/:clientId/FlightMilestoneTimes/:flightUniqueId": ignored,
	"ATM/:clientId/FlightMilestonePositions/:flightUniqueId":
		newFlightMilestonePositions,
	"ATM/:clientId/PlannedFlights/:flightUniqueId": ignored,
	"ATM/:clientId/AircraftTypes/:vehicleTypeId": newAircraftTypeMessage,
	"ATM/:clientId/Aircrafts/:vehicleTypeId": newAircraftMessage,
	"ATM/:clientId/NewFlights/:flightUniqueId": newFlight,
	"ATM/:clientId/FlightStatusCodes/:flightUniqueId": ignored,
	"ATM/:clientId/Routes/:networkId/:objectId": ignored,
	"ATM/:clientId/FlightRoutes/:flightUniqueId": flightRoutes,
	"ATM/:clientId/StandManoeuvres/:networkId/:objectId": ignored,
	"ATM/:clientId/Airspaces/:airspaceId": airspaces,
	"ATM/:clientId/Sectors/:sectorId": ignored, // no longer needed
	"ATM/:clientId/Airblocks/:airblockId": ignored, // no longer needed
	"ATM/:clientId/AirspaceConfigurations/:configurationId":
		newAirspaceConfiguration,
	"ATM/:clientId/AirspaceAvailability/:airspaceId/:time": airspaceAvailability,
	"ATM/:clientId/Segments/:segmentId": ignored,
	"ATM/:clientId/Waypoints/:objectId": ignored,
	"ATM/:clientId/Points/:nodeId": newPointMessage,
	"ATM/:clientId/RoleConfiguration/:roleName": roleConfiguration,
	"ATM/:clientId/CurrentAirspaceConfiguration": currentAirspaceConfiguration,
	"ATM/:clientId/AirTrafficControllerAssignmentMessage/:objectId/:time":
		airTrafficControllerMessage,
	"ATM/:clientId/FlightEnteringAirspaceMessage/:flightUniqueId/:time":
		flightEnteringAirspaceMessage,
	"ATM/:clientId/FlightLevelPilotRequest/:flightUniqueId":
		flightLevelPilotRequest,
	"ATM/:clientId/BearingPilotRequest/:flightUniqueId": bearingPilotRequest,
	"ATM/:clientId/TesselatedAirspaceVolume/:airspaceVolumeId": ignored,
	"ATM/:clientId/NewAirspaceVolumeFlightListMessage/:airspaceVolumeId": ignored,
	"ATM/:clientId/AddAcceptedFlightMessage/:toControllableAirspaceVolume/:flightId":
		ignored,
	"ATM/:clientId/AddTentativeFlightMessage/:toControllableAirspaceVolume/:flightId":
		ignored,
	"ATM/:clientId/status/time": newSimulatorTime,
	"ATM/:clientId/status/:status": ignored,
	"ATM/:clientId/FlightConflictUpdates/:flightUniqueId1/:flightUniqueId2":
		flightConflictMessage,
	"frontend/:clientId/flight/:flightId/controller": frontendFlightController,
	"frontend/:clientId/flight/:flightId/ACCFL": frontendACCFlightLevel,
	"frontend/:clientId/flight/:flightId/NSFL": frontendNextSectorFlightLevel,
	"frontend/:clientId/flight/:flightId/ACCBearing": frontendACCBearing,
	"frontend/:clientId/flight/:flightId/assignedFL": frontendAssignedFlightLevel,
	"frontend/:clientId/flight/:flightId/speed": frontendSpeed,
	"frontend/:clientId/flight/:flightId/localAssignedFL":
		frontendLocalAssignedFlightLevel,
	"frontend/:clientId/flight/:flightId/hidden": frontendFlightHidden,
});

export default router;
