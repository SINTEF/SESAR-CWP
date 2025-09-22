import { action, makeObservable, observable } from "mobx";

export default class DistanceMarker {
	key: number;

	colour: string;

	lat: number;

	lng: number;

	constructor({
		key,
		colour,
		lat,
		lng,
	}: {
		key: number;
		colour: string;
		lat: number;
		lng: number;
	}) {
		makeObservable(this, {
			lat: observable,
			lng: observable,
			setLatLng: action,
		});
		this.key = key;
		this.colour = colour;
		this.lat = lat;
		this.lng = lng;
	}

	setLatLng(lat: number, lng: number): void {
		this.lat = lat;
		this.lng = lng;
	}
}
export interface MarkerElement {
	coordinates: [number, number];
	color: string;
	key: number;
}
