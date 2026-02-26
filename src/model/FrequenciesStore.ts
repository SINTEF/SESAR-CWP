import { makeAutoObservable, observable } from "mobx";
import type { FrequenciesMessage } from "../proto/ProtobufAirTrafficSimulator";
import type AircraftModel from "./AircraftModel";
import type SectorStore from "./SectorStore";

/**
 * Store for sector frequencies received from the simulator.
 * Maps sector identifiers to their radio frequencies.
 */
export default class FrequenciesStore {
	/** All sector frequencies */
	frequencies: Map<string, number> = new Map();

	constructor() {
		makeAutoObservable(
			this,
			{
				frequencies: observable.ref,
			},
			{ autoBind: true },
		);
	}

	/** Handle incoming frequencies message from MQTT */
	handleFrequenciesMessage(message: FrequenciesMessage): void {
		const frequencies = new Map<string, number>();

		for (const entry of message.frequencies) {
			frequencies.set(entry.sectorId, entry.frequency);

			if (/^[A-Z][0-9]$/.test(entry.sectorId)) {
				const mirroredSectorId = `${entry.sectorId[1]}${entry.sectorId[0]}`;
				frequencies.set(mirroredSectorId, entry.frequency);
			}
		}

		this.frequencies = frequencies;
	}

	/** Get frequency for a specific sector */
	getFrequencyForSector(sectorId: string): number | undefined {
		return this.frequencies.get(sectorId);
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
			aircraft.lastKnownAltitude,
		);
		if (!currentSector) {
			return undefined;
		}
		const bestSectorFrequency = this.getFrequencyForSector(
			currentSector.sectorId,
		);
		if (bestSectorFrequency !== undefined) {
			return bestSectorFrequency;
		}
		// fallback, just try all sectors until we find one with a frequency
		const allSectors = sectorStore.findSectors(
			aircraft.lastKnownLongitude,
			aircraft.lastKnownLatitude,
			aircraft.lastKnownAltitude,
		);
		if (!allSectors) {
			return undefined;
		}
		for (const sector of allSectors) {
			const frequency = this.getFrequencyForSector(sector.sectorId);
			if (frequency !== undefined) {
				return frequency;
			}
		}
		return undefined;
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
		return this.frequencies.size > 0;
	}
}
