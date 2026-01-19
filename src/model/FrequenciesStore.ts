import { makeAutoObservable, observable } from "mobx";
import type { FrequenciesMessage } from "../proto/ProtobufAirTrafficSimulator";
import type AircraftModel from "./AircraftModel";
import type SectorStore from "./SectorStore";

/** Represents a sector frequency mapping */
export interface SectorFrequency {
	sectorId: string;
	frequency: number; // Radio frequency in MHz
}

/**
 * Store for sector frequencies received from the simulator.
 * Maps sector identifiers to their radio frequencies.
 */
export default class FrequenciesStore {
	/** All sector frequencies */
	frequencies: SectorFrequency[] = [];

	constructor() {
		makeAutoObservable(
			this,
			{
				frequencies: observable.shallow,
			},
			{ autoBind: true },
		);
	}

	/** Handle incoming frequencies message from MQTT */
	handleFrequenciesMessage(message: FrequenciesMessage): void {
		this.frequencies = message.frequencies.map((entry) => ({
			sectorId: entry.sectorId,
			frequency: entry.frequency,
		}));
	}

	/** Get frequency for a specific sector */
	getFrequencyForSector(sectorId: string): number | undefined {
		return this.frequencies.find((f) => f.sectorId === sectorId)?.frequency;
	}

	/**
	 * Get the frequency for the current sector an aircraft is in.
	 * @param aircraft The aircraft model
	 * @param sectorStore The sector store to look up current sector
	 * @returns The frequency in MHz, or undefined if not available
	 */
	getFrequencyForAircraftCurrentSector(
		aircraft: AircraftModel,
		sectorStore: SectorStore,
	): number | undefined {
		const currentSector = sectorStore.findSector(
			aircraft.lastKnownLongitude,
			aircraft.lastKnownLatitude,
		);
		if (!currentSector) {
			return undefined;
		}
		return this.getFrequencyForSector(currentSector.sectorId);
	}

	/**
	 * Format a frequency for display (e.g., 134.850)
	 * @param frequency The frequency in MHz
	 * @returns Formatted string with 3 decimal places
	 */
	formatFrequency(frequency: number): string {
		return frequency.toFixed(3);
	}

	/** Check if there are any frequencies available */
	get hasFrequencies(): boolean {
		return this.frequencies.length > 0;
	}
}
