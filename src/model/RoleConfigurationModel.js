export default class RoleConfigurationModel {
  cwpRoleName = '';

  controlledSector = '';

  constructor({
    cwpRoleName,
    controlledSector,
  }) {
    this.cwpRoleName = cwpRoleName;
    this.controlledSector = controlledSector;
  }

  setControlledSector(sector) {
    this.controlledSector = sector;
  }
}
