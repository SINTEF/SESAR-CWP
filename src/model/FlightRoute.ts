import { makeObservable, observable } from "mobx";

import type Trajectory from "./Trajectory";

export default class FlightRoute {
	flightId: string;

	trajectory: Trajectory[] = [];

	constructor({
		flightId,
		trajectory,
	}: {
		flightId: string;
		trajectory: Trajectory[];
	}) {
		makeObservable(this, {
			flightId: false,
			trajectory: observable,
		});
		this.flightId = flightId;
		this.trajectory = trajectory;
	}
}
