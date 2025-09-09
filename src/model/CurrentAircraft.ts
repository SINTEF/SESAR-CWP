let currentAircraftId: string | undefined;

export function getCurrentAircraftId(): string | undefined {
	if (!currentAircraftId) {
		return undefined;
	}
	return currentAircraftId;
}

export function setCurrentAircraftId(aircraftId: string | undefined): void {
	currentAircraftId = aircraftId;
}
