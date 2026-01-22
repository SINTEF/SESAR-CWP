import rlite from "rlite-router";

import {
	airspaceAvailability,
	airspaces,
	airTrafficControllerMessage,
	airways,
	currentAirspaceConfiguration,
	flightConflictMessage,
	flightEnteringAirspaceMessage,
	flightRoutes,
	frequencies,
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
	newSector,
	newSimulatorTime,
	notFound,
	pilotRequest,
	pilotRequestJson,
	roleConfiguration,
	simulatorLogs,
	targetReport,
	workloadUpdate,
} from "./subscribers";

const router = rlite<Buffer>(notFound, {
	"ats/:clientId/data/init-completed": ignored,
	"ats/:clientId/data/target-reports/:vehicleId": targetReport,
	"ats/:clientId/data/availability-schedule": newAvailabilitySchedule,
	"ats/:clientId/data/flight-milestone-times/:flightUniqueId": ignored,
	"ats/:clientId/data/flight-milestone-positions/:flightUniqueId":
		newFlightMilestonePositions,
	"ats/:clientId/data/planned-flights/:flightUniqueId": ignored,
	"ats/:clientId/data/aircraft-types/:vehicleTypeId": newAircraftTypeMessage,
	"ats/:clientId/data/aircrafts/:vehicleTypeId": newAircraftMessage,
	"ats/:clientId/data/flights/:flightUniqueId": newFlight,
	"ats/:clientId/data/flight-status/:flightUniqueId": ignored,
	"ats/:clientId/data/routes/:networkId/:objectId": ignored,
	"ats/:clientId/data/flight-routes/:flightUniqueId": flightRoutes,
	"ats/:clientId/data/airspaces/:airspaceId": airspaces,
	"ats/:clientId/data/sectors/:sectorId": newSector,
	"ats/:clientId/data/airblocks/:airblockId": ignored, // no longer needed
	"ats/:clientId/data/airspace-configs/:configurationId":
		newAirspaceConfiguration,
	"ats/:clientId/data/airspace-availability/:airspaceId/:time":
		airspaceAvailability,
	"ats/:clientId/data/segments/:segmentId": ignored,
	"ats/:clientId/data/waypoints/:objectId": ignored,
	"ats/:clientId/data/points/:nodeId": newPointMessage,
	"ats/:clientId/data/airways": airways,
	"ats/:clientId/data/frequencies": frequencies,
	"ats/:clientId/data/role-configs/:roleName": roleConfiguration,
	"ats/:clientId/data/current-config": currentAirspaceConfiguration,
	"ats/:clientId/data/controller-assignments/:objectId/:time":
		airTrafficControllerMessage,
	"ats/:clientId/data/flight-entering-airspace/:flightUniqueId/:time":
		flightEnteringAirspaceMessage,
	"ats/:clientId/data/pilot-request/:flightUniqueId/:requestId": pilotRequest,
	"ats/:clientId/data/tessellated-volumes/:airspaceVolumeId": ignored,
	"ats/:clientId/data/volume-flight-lists/:airspaceVolumeId": ignored,
	"ats/:clientId/data/accepted-flights/:toControllableAirspaceVolume/:flightId":
		ignored,
	"ats/:clientId/data/tentative-flights/:toControllableAirspaceVolume/:flightId":
		ignored,
	"ats/:clientId/status/time": newSimulatorTime,
	"ats/:clientId/status/:status": ignored,
	"ats/:clientId/logs": simulatorLogs,
	"ats/:clientId/data/flight-conflicts/:conflictType/:flightUniqueId1/:flightUniqueId2":
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
	"IIS/PilotRequest": pilotRequestJson,
	"IIS/PilotRequest/:requestId": pilotRequestJson,
	"TAS/:clientId/WorkloadUpdate": workloadUpdate,
});

export default router;
