export function formatSimulatorTimeHMS(
	timestamp: number,
	utc = true,
): string {
	return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
		timeZone: "UTC",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

export function formatSimulatorTimeHM(
	timestamp: number,
	utc = true,
): string {
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

/**
 * Convert nautical miles to feet.
 * 1 NM = 6076.12 feet
 */
export function convertNMToFeet(nm: number): number {
	return nm * 6076.12;
}

/**
 * Format feet distance for compact display (max 3 characters).
 * - Under 1000: show as integer (e.g., "500", "999")
 * - 1000-9999: show as single digit k (e.g., "1k", "9k")
 * - 10000-99499: show as double digit k (e.g., "10k", "99k")
 * - 99500+: show as "∞" (capped, very far separation)
 */
export function formatFeetCompact(feet: number): string {
	const rounded = Math.round(feet);
	if (rounded < 1000) {
		return rounded.toString();
	}
	const inK = Math.round(rounded / 1000);
	if (inK < 100) {
		return `${inK}k`;
	}
	// Cap at 99k for display (100k+ feet = ~16+ NM, very far)
	return "∞";
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
