import {
  AddAcceptedFlightMessage,
  AddTentativeFlightMessage,
  AirspaceAvailabilityMessage,
  AvailabilityIntervalsMessage,
  CurrentAirspaceConfigurationMessage,
  FlightMilestonePositionMessage,
  FlightRouteMessage,
  NewAircraftMessage,
  NewAircraftTypeMessage,
  NewAirspaceConfigurationMessage,
  NewAirspaceMessage,
  NewAirspaceVolumeFlightListMessage,
  NewFlightMessage,
  NewPointMessage,
  RoleConfigurationMessage,
  SimulatorTime,
  TargetReportMessage,
} from '../proto/ProtobufAirTrafficSimulator';
import {
  aircraftStore,
  airspaceStore,
  configurationStore,
  fixStore,
  roleConfigurationStore,
  simulatorStore,
} from '../state';

export function notFound(parameters: unknown, message: Buffer, url: string): void {
  // eslint-disable-next-line no-console
  console.warn('MQTT message received but no matching route found', url, message);
}

export function ignored(): void { }

export function targetReport(parameters: unknown, message: Buffer): void {
  const protoMessage = TargetReportMessage.fromBinary(message);
  aircraftStore.handleTargetReport(protoMessage);
}

export function newFlight(parameters: unknown, message: Buffer): void {
  const protoMessage = NewFlightMessage.fromBinary(message);
  aircraftStore.handleNewFlight(protoMessage);
}

export function newAirspaceConfiguration(parameters: unknown, message: Buffer): void {
  const protoMessage = NewAirspaceConfigurationMessage
    .fromBinary(message);
  configurationStore.handleNewAirspaceConfiguration(protoMessage);
}
export function airspaces(parameters: unknown, message: Buffer): void {
  const protoMessage = NewAirspaceMessage.fromBinary(message);
  airspaceStore.handleNewAirspace(protoMessage);
}
export function newPointMessage(parameters: unknown, message: Buffer): void {
  const protoMessage = NewPointMessage.fromBinary(message);
  fixStore.handleNewPointMessage(protoMessage);
}
export function newAircraftMessage(parameters: unknown, message: Buffer): void {
  const protoMessage = NewAircraftMessage.fromBinary(message);
  aircraftStore.handleNewAircraftMessage(protoMessage);
}
export function newAircraftTypeMessage(parameters: unknown, message: Buffer): void {
  const protoMessage = NewAircraftTypeMessage.fromBinary(message);
  aircraftStore.handleNewAircraftTypeMessage(protoMessage);
}
export function currentAirspaceConfiguration(parameters: unknown, message: Buffer): void {
  const protoMessage = CurrentAirspaceConfigurationMessage
    .fromBinary(message);
  configurationStore.setCurrentConfiguration(protoMessage);
}
export function flightRoutes(parameters: unknown, message: Buffer): void {
  const protoMessage = FlightRouteMessage.fromBinary(message);
  aircraftStore.handleNewFlightRoute(protoMessage);
}
export function newAirspaceVolumeFlightList(parameters: unknown, message: Buffer): void {
  const protoMessage = NewAirspaceVolumeFlightListMessage
    .fromBinary(message);
  // eslint-disable-next-line no-console
  console.warn('TODO', protoMessage);
}
export function airspaceAvailability(parameters: unknown, message: Buffer): void {
  const protoMessage = AirspaceAvailabilityMessage.fromBinary(message);
  configurationStore.handleAvailabilityMessage(protoMessage);
}

export function newSimulatorTime(parameters: unknown, message: Buffer): void {
  const protoMessage = SimulatorTime.fromBinary(message);
  simulatorStore.handleNewSimulatorTime(protoMessage);
}

export function newFlightMilestonePositions(parameters: unknown, message: Buffer): void {
  const protoMessage = FlightMilestonePositionMessage.fromBinary(message);
  // fixStore.handleNewMilestoneMessage(protoMessage);
  aircraftStore.handleFlightNewMilestonePositions(protoMessage);
}
export function newAvailabilityIntervalsMessage(parameters: unknown, message: Buffer): void {
  const protoMessage = AvailabilityIntervalsMessage.fromBinary(message);
  configurationStore.handleAvailabilityIntervalsMessage(protoMessage);
}
export function acceptedFlightMessage(parameters: unknown, message: Buffer): void {
  const protoMessage = AddAcceptedFlightMessage.fromBinary(message);
  // eslint-disable-next-line no-console
  console.log(protoMessage);
  // aircraftStore.handleAcceptedFlightMessage(protoMessage);
}
export function tentativeFlightMessage(parameters: unknown, message: Buffer): void {
  const protoMessage = AddTentativeFlightMessage.fromBinary(message);
  // eslint-disable-next-line no-console
  console.log(protoMessage);
  // aircraftStore.handleTentativeFlightMessage(protoMessage);
}
export function roleConfiguration(parameters: unknown, message: Buffer): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const protoMessage = RoleConfigurationMessage.fromBinary(message);
  roleConfigurationStore.handleNewRoleConfigutationMessage(protoMessage);
}

export function frontendFlightController(
  { flightId }: { [key: string]: string },
  message: Buffer,
): void {
  const controller = message.toString();
  aircraftStore.handleFrontendFlightController(flightId, controller);
}

export function frontendACCFlightLevel(
  { flightId }: { [key: string]: string },
  message: Buffer,
): void {
  const level = message.toString();
  aircraftStore.handleFrontendACCFlightLevel(flightId, level);
}

export function frontendNextSectorFlightLevel(
  { flightId }: { [key: string]: string },
  message: Buffer,
): void {
  const level = message.toString();
  aircraftStore.handleFrontendNextSectorFlightLevel(flightId, level);
}
