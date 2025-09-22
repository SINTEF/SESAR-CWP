export default class SectorToConfiguration {
	configurationId = "";

	controlledSector = "";

	constructor({
		configurationId,
		controlledSector,
	}: {
		configurationId: string;
		controlledSector: string;
	}) {
		this.controlledSector = controlledSector;
		this.configurationId = configurationId;
	}
}
