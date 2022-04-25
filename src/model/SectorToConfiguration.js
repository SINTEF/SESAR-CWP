export default class SectorToConfiguration {
  configurationId = '';

  controlledSector = '';

  constructor({
    configurationId,
    controlledSector,
  }) {
    this.controlledSector = controlledSector;
    this.configurationId = configurationId;
  }
}
