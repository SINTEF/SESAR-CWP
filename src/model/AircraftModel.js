import { action, makeObservable, observable } from 'mobx';

function convertToFlightMeters(alt) {
  const feet = alt * 3.280_84;
  return feet / 100;
}

export default class AircraftModel {
  aircraftId = undefined;

  assignedFlightId = undefined;

  callSign = undefined;

  lastKnownLongitude = 0;

  lastKnownLatitude = 0;

  lastKnownAltitude = 0;

  lastKnownBearing = 0;

  lastKnownSpeed = 0;

  wakeTurbulence = undefined;

  arrivalAirport = undefined;

  departureAirport = undefined;

  lastTargetReportTime = 0;

  constructor({
    aircraftId,
    assignedFlightId,
    callSign,
    wakeTurbulence,
    arrivalAirport,
    departureAirport,
  }) {
    makeObservable(this, {
      aircraftId: false,
      assignedFlightId: false,
      callSign: false,
      lastKnownLongitude: observable,
      lastKnownLatitude: observable,
      lastKnownAltitude: observable,
      lastKnownBearing: observable,
      lastKnownSpeed: observable,
      wakeTurbulence: observable,
      arrivalAirport: observable,
      departureAirport: observable,

      handleTargetReport: action.bound,
    });

    this.aircraftId = aircraftId;
    this.assignedFlightId = assignedFlightId;
    this.callSign = callSign;
    this.wakeTurbulence = wakeTurbulence;
    this.arrivalAirport = arrivalAirport;
    this.departureAirport = departureAirport;
  }

  handleTargetReport(targetReport) {
    // Ignore target reports that are older than the previous one
    // This is because MQTT doesn't guarantie the order of the received messages
    // We could use a MQTT broker that is a message queue with an order, like RabbitMQ
    const time = targetReport.getTime();
    const timestamp = time.getSeconds() + time.getNanos() * 1e-9;
    if (timestamp < this.lastTargetReportTime) {
      return;
    }
    this.lastTargetReportTime = timestamp;
    this.lastKnownAltitude = convertToFlightMeters(targetReport.getAltitude());
    this.lastKnownLatitude = targetReport.getLatitude();
    this.lastKnownLongitude = targetReport.getLongitude();
    this.lastKnownBearing = targetReport.getBearing();
    this.lastKnownSpeed = targetReport.getSpeed();
  }
}
