/** Normalize bearing to 5-360 range (wrapping at 360) */
export function normalizeBearing(bearing: number): number {
	// First normalize to 0-359 range, then shift to 5-360
	const mod = ((bearing % 360) + 360) % 360;
	return mod === 0 ? 360 : mod;
}
