export default class AircraftType {
  vehicleTypeId = undefined;

  preferredGroundSpeed = undefined;

  maximumGroundSpeed = undefined;

  minimumTakeOffDistance = undefined;

  wingSpan = undefined;

  length = undefined;

  wakeTurbulenceCategory = undefined;

  minStartupTime = undefined;

  aircraftClass = undefined;

  height = undefined;

  vehicleCategory = undefined;

  constructor({
    vehicleTypeId,
    preferredGroundSpeed,
    maximumGroundSpeed,
    minimumTakeOffDistance,
    wingSpan,
    length,
    wakeTurbulenceCategory,
    minStartupTime,
    aircraftClass,
    height,
    vehicleCategory,
  }) {
    this.vehicleTypeId = vehicleTypeId;
    this.preferredGroundSpeed = preferredGroundSpeed;
    this.maximumGroundSpeed = maximumGroundSpeed;
    this.minimumTakeOffDistance = minimumTakeOffDistance;
    this.wingSpan = wingSpan;
    this.length = length;
    this.wakeTurbulenceCategory = wakeTurbulenceCategory;
    this.minStartupTime = minStartupTime;
    this.aircraftClass = aircraftClass;
    this.height = height;
    this.vehicleCategory = vehicleCategory;
  }

  static fromProto(newAircraftTypeMessage) {
    return new AircraftType({
      vehicleTypeId: newAircraftTypeMessage.getVehicletypeid(),
      preferredGroundSpeed: newAircraftTypeMessage.getPreferredgroundspeed(),
      maximumGroundSpeed: newAircraftTypeMessage.getMaximumgroundspeed(),
      minimumTakeOffDistance: newAircraftTypeMessage.getMinimumtakeoffdistance(),
      wingSpan: newAircraftTypeMessage.getWingspan(),
      length: newAircraftTypeMessage.getLength(),
      wakeTurbulenceCategory: newAircraftTypeMessage.getWaketurbulencecategory(),
      minStartupTime: newAircraftTypeMessage.getMinstartuptime(),
      aircraftClass: newAircraftTypeMessage.getAircraftclass(),
      height: newAircraftTypeMessage.getHeight(),
      vehicleCategory: newAircraftTypeMessage.getVehiclecategory(),
    });
  }
}
