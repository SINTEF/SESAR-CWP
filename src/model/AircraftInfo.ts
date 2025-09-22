import { action, makeObservable, observable } from "mobx";

import type { WakeTurbulenceCategory } from "../proto/ProtobufAirTrafficSimulator";

export default class AircraftInfo {
	aircraftId: string;

	aircraftType: string;

	wakeTurbulenceCategory: WakeTurbulenceCategory;

	constructor({
		aircraftId,
		aircraftType,
		wakeTurbulenceCategory,
	}: {
		aircraftId: string;
		aircraftType: string;
		wakeTurbulenceCategory: WakeTurbulenceCategory;
	}) {
		makeObservable(this, {
			aircraftId: false,
			aircraftType: false,
			wakeTurbulenceCategory: observable,
			setWakeTurbulenceCategory: action,
		});

		this.aircraftId = aircraftId;
		this.aircraftType = aircraftType;
		this.wakeTurbulenceCategory = wakeTurbulenceCategory;
	}

	setWakeTurbulenceCategory(
		wakeTurbulenceCategory: WakeTurbulenceCategory,
	): void {
		this.wakeTurbulenceCategory = wakeTurbulenceCategory;
	}
}
