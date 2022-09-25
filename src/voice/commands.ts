import { getCurrentAircraftId } from '../model/CurrentAircraft';
import { cwpStore } from '../state';
import SectorConfigCommand from './SectorConfigCommand';
import ThreeDViewCommand from './ThreeDViewCommand';

function convertHumanStringToBoolean(input: string): boolean {
  /** Handle on/off, yes/no, true/false, 1/0, etc... */
  // Use a regex
  const regex = /^(on|yes|true|1)$/i;
  return regex.test(input);
}

function isToggleMode(commandArguments: string[]): boolean {
  return commandArguments.length === 0 || commandArguments[0] === 'toggle';
}

export default function HandleCommand(input: string): void {
  // eslint-disable-next-line no-console
  console.log('Command:', input);
  /** A command is a set of word separated by spaces. */
  const [command, ...commandArguments] = input.split(/\s+/);
  switch (true) {
    case /^sectors?-configs?$/i.test(command):
      SectorConfigCommand(commandArguments);
      break;
    case /^flights?-labels?$/i.test(command):
      if (isToggleMode(commandArguments)) {
        cwpStore.toggleFlightLabels();
      } else {
        cwpStore.setFlightLabels(convertHumanStringToBoolean(commandArguments[0]));
      }
      break;
    case /^flights?-(handed|limbo)$/i.test(command):
      if (isToggleMode(commandArguments)) {
        cwpStore.toggleLimboFlights();
      } else {
        cwpStore.setLimboFlight(convertHumanStringToBoolean(commandArguments[0]));
      }
      break;
    case /^speeds?-vectors?$/i.test(command):
      if (isToggleMode(commandArguments)) {
        const currentSpeedVectorMinutes = cwpStore.speedVectorMinutes;
        cwpStore.setSpeedVectorMinutes(currentSpeedVectorMinutes === 0 ? 3 : 0);
      } else {
        const length = Number.parseInt(commandArguments[0], 10);
        if (Number.isNaN(length)) {
          const onOff = convertHumanStringToBoolean(commandArguments[0]);
          cwpStore.setSpeedVectorMinutes(onOff ? 3 : 0);
          return;
        }
        cwpStore.setSpeedVectorMinutes(Math.max(0, Math.min(15, length)));
      }
      break;
    case /^3d-view$/i.test(command):
      ThreeDViewCommand(commandArguments);
      break;
    case /^fixes?$/i.test(command):
      if (isToggleMode(commandArguments)) {
        cwpStore.toggleFixes();
      } else {
        cwpStore.setFixes(convertHumanStringToBoolean(commandArguments[0]));
      }
      break;
    case /^sectors?-labels?$/i.test(command):
      if (isToggleMode(commandArguments)) {
        cwpStore.toggleSectorLabels();
      } else {
        cwpStore.setSectorLabels(convertHumanStringToBoolean(commandArguments[0]));
      }
      break;
    case /^current-speeds?-vectors?$/i.test(command):
      if (isToggleMode(commandArguments)) {
        cwpStore.toggleSpeedVectorForAircraft(
          getCurrentAircraftId(),
        );
      } else {
        cwpStore.setSpeedVectorForAircraft(
          getCurrentAircraftId(),
          convertHumanStringToBoolean(commandArguments[0]),
        );
      }
      break;
    case /^(current-)?trajectory$/i.test(command):
      if (isToggleMode(commandArguments)) {
        cwpStore.toggleFlightRouteForAircraft(
          getCurrentAircraftId(),
        );
      } else {
        cwpStore.setFlightRouteForAircraft(
          getCurrentAircraftId(),
          convertHumanStringToBoolean(commandArguments[0]),
        );
      }

      break;
    default:
      throw new Error(`Unknown command: ${command}`);
      break;
  }
}

// @ts-expect-error - Debug utility
window.debugHandleCommand = HandleCommand;
