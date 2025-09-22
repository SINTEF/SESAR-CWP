import type CoordinatePair from "./CoordinatePair";

export interface ISectorModel {
	sectorId: string;
	bottomFlightLevel: number;
	topFlightLevel: number;
	sectorArea: CoordinatePair[];
}
