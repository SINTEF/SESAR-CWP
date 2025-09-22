import type { ObservableMap } from "mobx";
import { makeObservable, observable } from "mobx";

export default class FixModel {
	pointId: string;

	latitude = 0;

	longitude = 0;

	sectorFlightList: ObservableMap<string, unknown> = observable.map(undefined, {
		deep: false,
	});

	constructor({
		pointId,
		latitude,
		longitude,
	}: {
		pointId: string;
		latitude: number;
		longitude: number;
	}) {
		makeObservable(this, {
			pointId: false,
			latitude: false,
			longitude: false,
			sectorFlightList: observable,
		});
		this.pointId = pointId;
		this.latitude = latitude;
		this.longitude = longitude;
	}
}
