let currentAircraftId: string | undefined;

export function getCurrentAircraftId(): string {
  if (!currentAircraftId) {
    throw new Error('No current aircraft');
  }
  return currentAircraftId;
}

export function setCurrentAircraftId(aircraftId: string | undefined): void {
  currentAircraftId = aircraftId;
}
