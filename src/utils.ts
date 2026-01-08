export function formatSimulatorTimeHMS(
	timestamp: number,
	utc?: boolean,
): string {
	return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
		timeZone: utc ? "UTC" : undefined,
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

export function formatSimulatorTimeHM(
	timestamp: number,
	utc?: boolean,
): string {
	return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
		timeZone: utc ? "UTC" : undefined,
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function convertMetersToFlightLevel(altitude: number): number {
	const feet = altitude * 3.280_84;
	return Math.round(feet / 100);
}

/**
 * Format aircraft speed for display.
 * Converts from m/s to knots / 10.
 */
export function formatSpeed(speed: number): string {
	const lowImperialishSpeed = speed * 0.194384;
	return Math.round(lowImperialishSpeed).toString();
}

/**
 * Format vertical speed for display.
 * Converts from m/s to ft/min and divides by 100.
 */
export function formatVerticalSpeed(verticalSpeed: number): string {
	const verticalSpeedFpm = Math.round(verticalSpeed * 1.96850394);
	if (verticalSpeedFpm === 0) {
		return "00";
	}
	const speedString = Math.abs(verticalSpeedFpm).toString().padStart(2, "0");
	return verticalSpeedFpm > 0 ? `+${speedString}` : `-${speedString}`;
}
