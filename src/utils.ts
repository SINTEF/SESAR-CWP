export function formatSimulatorTimeHMS(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
		timeZone: "UTC",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

export function formatSimulatorTimeHM(timestamp: number): string {
	return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
		timeZone: "UTC",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function convertMetersToFlightLevel(altitude: number): number {
	const feet = altitude * 3.280_84;
	return Math.round(feet / 100);
}
