import type { ObservableMap } from "mobx";
import { computed, makeAutoObservable, observable } from "mobx";

/**
 * A custom datablock created by the user to group aircraft together.
 * These are local-only (no persistence or backend storage).
 */
export interface Datablock {
	id: string;
	/** Aircraft IDs included in this datablock (always sorted for consistency) */
	aircraftIds: string[];
	/** Normalized pair key for fast lookup (sorted IDs joined with `:`) */
	pairKey: string;
	/** Time in minutes from now (positive = future) - set to closest separation time */
	startMin: number;
	/** Closest separation between the two aircraft in nautical miles */
	closestSeparationNM: number | null;
	/** Creation timestamp (for ID generation) */
	createdAt: number;
}

/**
 * Create a normalized pair key from two aircraft IDs.
 * Sorted alphabetically to ensure consistent lookup regardless of order.
 */
export function createPairKey(id1: string, id2: string): string {
	return id1 < id2 ? `${id1}:${id2}` : `${id2}:${id1}`;
}

/** CPA info passed when creating a datablock */
export interface CpaInfo {
	/** Closest separation in nautical miles */
	distanceNM: number;
	/** Time of closest approach in minutes from now */
	timeMin: number;
}

/**
 * Store for managing custom datablocks.
 * Datablocks are local-only visual groupings of aircraft displayed on the Agenda timeline.
 */
export default class DatablockStore {
	datablocks: ObservableMap<string, Datablock> = observable.map(undefined, {
		deep: false,
	});

	/** Fast lookup set for existing pair keys */
	private pairKeyIndex: ObservableMap<string, string> = observable.map(
		undefined,
		{ deep: false },
	);

	constructor() {
		makeAutoObservable(
			this,
			{
				existingPairKeys: computed,
			},
			{ autoBind: true },
		);
	}

	/**
	 * Check if a pair of aircraft already has a datablock.
	 */
	hasPair(id1: string, id2: string): boolean {
		const pairKey = createPairKey(id1, id2);
		return this.pairKeyIndex.has(pairKey);
	}

	/**
	 * Create a new datablock with the given aircraft IDs.
	 * Returns null if a datablock with this pair already exists.
	 * @param aircraftIds The aircraft IDs to include in the datablock (must be exactly 2)
	 * @param cpaInfo Optional CPA info - if provided, uses closest approach time and distance
	 * @returns The created datablock, or null if pair already exists
	 */
	createDatablock(aircraftIds: string[], cpaInfo?: CpaInfo): Datablock | null {
		if (aircraftIds.length !== 2) {
			return null;
		}

		const [id1, id2] = aircraftIds;
		const pairKey = createPairKey(id1, id2);

		// Check uniqueness
		if (this.pairKeyIndex.has(pairKey)) {
			return null;
		}

		const id = `db-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
		const sortedIds = id1 < id2 ? [id1, id2] : [id2, id1];

		// Use CPA time if available, otherwise default to 15 minutes
		const startMin = cpaInfo?.timeMin ?? 15;
		const closestSeparationNM = cpaInfo?.distanceNM ?? null;

		const datablock: Datablock = {
			id,
			aircraftIds: sortedIds,
			pairKey,
			startMin,
			closestSeparationNM,
			createdAt: Date.now(),
		};

		this.datablocks.set(id, datablock);
		this.pairKeyIndex.set(pairKey, id);
		return datablock;
	}

	/**
	 * Remove a datablock by its pair key (used when MTCD overrides).
	 */
	removeByPairKey(pairKey: string): void {
		const datablockId = this.pairKeyIndex.get(pairKey);
		if (datablockId) {
			this.datablocks.delete(datablockId);
			this.pairKeyIndex.delete(pairKey);
		}
	}

	/**
	 * Remove a datablock by ID.
	 */
	removeDatablock(id: string): void {
		const datablock = this.datablocks.get(id);
		if (datablock) {
			this.pairKeyIndex.delete(datablock.pairKey);
			this.datablocks.delete(id);
		}
	}

	/**
	 * Update the time offset for a datablock.
	 */
	updateDatablockTime(id: string, startMin: number): void {
		const datablock = this.datablocks.get(id);
		if (datablock) {
			this.datablocks.set(id, { ...datablock, startMin });
		}
	}

	/**
	 * Clear all datablocks.
	 */
	clearAll(): void {
		this.datablocks.clear();
		this.pairKeyIndex.clear();
	}

	/**
	 * Get all datablocks as an array.
	 */
	get allDatablocks(): Datablock[] {
		return [...this.datablocks.values()];
	}

	/**
	 * Get all existing pair keys (for checking against MTCD conflicts).
	 */
	get existingPairKeys(): Set<string> {
		return new Set(this.pairKeyIndex.keys());
	}
}
