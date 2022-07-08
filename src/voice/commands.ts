import { cwpStore } from '../state';

function convertHumanStringToBoolean(input: string): boolean {
  /** Handle on/off, yes/no, true/false, 1/0, etc... */
  // Use a regex
  const regex = /^(on|yes|true|1)$/i;
  return regex.test(input);
}

export default function HandleCommand(input: string): void {
  /** A command is a set of word separated by spaces. */
  const [command, ...commandArguments] = input.split(/\s+/);
  switch (command.toLowerCase()) {
    case 'flight-labels':
      if (commandArguments.length === 0) {
        cwpStore.toggleFlightLabels();
      } else {
        const onOff = convertHumanStringToBoolean(commandArguments[0]);
        cwpStore.setFlightLabels(onOff);
      }
      break;
    case 'speed-vectors':
      if (commandArguments.length === 0) {
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
    default:
      console.log('command:', command);
  }
}
