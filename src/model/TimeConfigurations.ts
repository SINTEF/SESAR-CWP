export default class TimeConfigurations {
	startTime: number;

	endTime: number;

	constructor({
		startTime,
		endTime,
	}: {
		startTime: number;
		endTime: number;
	}) {
		this.startTime = startTime;
		this.endTime = endTime;
	}
}
