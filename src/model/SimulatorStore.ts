import { makeAutoObservable } from "mobx";
import type { SimulatorTime } from "../proto/ProtobufAirTrafficSimulator";
import convertTimestamp from "./convertTimestamp";

export default class SimulatorStore {
	timestamp = 0;

	speedFactor = 1;

	timeIntervalId = 0;

	constructor() {
		makeAutoObservable(
			this,
			{
				timeIntervalId: false,
			},
			{ autoBind: true },
		);
	}

	handleNewSimulatorTime(simulatorTime: SimulatorTime): void {
		const { time, speedFactor } = simulatorTime;
		if (!time) {
			throw new Error("Simulator time is missing");
		}

		this.timestamp = convertTimestamp(time);

		if (speedFactor) {
			this.speedFactor = speedFactor;
			window.clearInterval(this.timeIntervalId);
			this.timeIntervalId = window.setInterval(() => {
				this.setTimestamp(this.timestamp + 1 / this.speedFactor);
			}, 1000 / this.speedFactor);
		}
	}

	setTimestamp(timestamp: number): void {
		this.timestamp = timestamp;
	}

	get minuteRoundedTimestamp(): number {
		return Math.floor(this.timestamp / 60) * 60;
	}
}
