import type { ObservableMap } from "mobx";
import { makeObservable, observable } from "mobx";

import SectorToConfiguration from "./SectorToConfiguration";

const flightColors = [
	"#f59",
	"#0bb",
	"#94a",
	"#b00",
	"#f80",
	"#f63",
	"#3c0",
	"#40f",
	"#DDD555",
	"#01539d",
	"#e9b4d0",
	"#8c9441",
	"#c82169",
];
export default class RoleConfigurationModel {
	cwpRoleName = "";

	sectorToConfiguration: ObservableMap<string, SectorToConfiguration> =
		observable.map(undefined, { deep: false });

	sectorToControl: Array<string> = [];

	tentativeAircrafts: Array<string> = [];

	assignedColor = "";

	constructor({
		cwpRoleName,
	}: {
		cwpRoleName: string;
	}) {
		makeObservable(this, {
			cwpRoleName: false,
			sectorToConfiguration: observable,
			sectorToControl: observable,
			tentativeAircrafts: observable,
			assignedColor: observable,
		});
		this.cwpRoleName = cwpRoleName;
	}

	setControlledSector(configurationId: string, sector: string): void {
		this.sectorToConfiguration.set(
			configurationId,
			new SectorToConfiguration({
				configurationId,
				controlledSector: sector,
			}),
		);
	}

	setAssignedColor(): void {
		const id = this.cwpRoleName.replace(/\D/g, "");
		if (id !== "") {
			this.assignedColor = flightColors[Number(id)];
		}
	}

	replaceSectorsToControl(sectors: string[]): void {
		this.sectorToControl = sectors;
	}

	addTentativeAircraft(aircraftIds: string[]): void {
		this.tentativeAircrafts = [...aircraftIds];
	}

	removeTentativeAircraft(aircraftId: string): void {
		this.tentativeAircrafts = this.tentativeAircrafts.filter(
			(id) => id !== aircraftId,
		);
	}

	get assignedColorById(): string {
		return this.assignedColor;
	}

	inSectorToControl(sector: string): boolean {
		if (this.sectorToControl.includes(sector)) {
			return true;
		}
		return false;
	}
}
