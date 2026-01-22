import { makeAutoObservable } from "mobx";
import { aircraftStore, simulatorStore } from "../state";

/**
 * BrainStore - Team Assistant Brain
 *
 * Calculates Autonomy Profile (AP) based on multiple data sources:
 * - Task Load (TL): flights, requests, conflicts
 * - Agent Workload (WL): from MQTT
 * - ISA Workload: from MQTT with time decay
 * - Urgency: weather requests (future)
 *
 * Formula: computedAP = alpha * TL + beta * WL + delta * ISA + gamma * urgency
 * Output: AP1 or AP2 (thresholded normalizedAP)
 */
export default class BrainStore {
	// MQTT workload data (from TAS/{clientId}/WorkloadUpdate)
	workloadAgent: number | null = null; // 0 or 1
	workloadISA: number | null = null; // Raw value from MQTT (will be normalized to 0-1)
	reliabilityAgent: number | null = null; // Becomes beta (0-1)
	reliabilityISA: number | null = null;
	timestampAgent: number | null = null; // Unix timestamp in seconds
	timestampISA: number | null = null; // Unix timestamp in seconds

	// Configurable max values for normalization
	maxNumberOfFlights = 100; // Default, should be scenario-specific
	maxNumberOfRequestsPer30s = 10; // Default, should be scenario-specific
	maxNumberOfConflicts = 20; // Default, should be scenario-specific
	swapValue = 0.5; // Threshold for AP1/AP2 decision

	// Manual override for AP (null = use computed, 1 or 2 = manual override)
	manualAP: number | null = null;

	// Constants
	readonly GAMMA = 1.0;

	constructor() {
		makeAutoObservable(this, {
			GAMMA: false, // Don't make constant observable
		});
	}

	// ========== Computed Properties ==========

	/**
	 * Number of requests in the last 30 seconds
	 *
	 * Future: Will be provided by IIS or removed entirely
	 */
	get numberOfRequestsLast30s(): number {
		return 0;
	}

	/**
	 * Get urgency value based on request type
	 * @param requestType - Request type (0=FL, 1=direct, 2=absolute_heading, 3=relative_heading)
	 * @returns Urgency value (0 or 1)
	 */
	private getUrgencyForRequestType(requestType: number): number {
		// Types 2 and 3 are weather/heading requests (urgent)
		return requestType === 2 || requestType === 3 ? 1 : 0;
	}

	/**
	 * Check if we have minimum required data for AP computation
	 * @returns true if all required MQTT data is available
	 */
	private hasRequiredData(): boolean {
		return (
			this.workloadAgent !== null &&
			this.reliabilityAgent !== null &&
			this.timestampAgent !== null &&
			this.workloadISA !== null &&
			this.reliabilityISA !== null &&
			this.timestampISA !== null
		);
	}

	/**
	 * Compute AP for a given urgency value
	 * @param urgency - Urgency value (0 or 1)
	 * @returns AP (1 or 2) based on threshold
	 */
	private computeAPWithUrgency(urgency: number): number {
		const TL = this.taskLoad;
		const WL = this.workloadAgent ?? 0;
		const ISA = this.normalizedISA;

		const computedAP =
			this.alpha * TL +
			this.beta * WL +
			this.delta * ISA +
			this.GAMMA * urgency;

		const normalizedAP = computedAP / (3 + urgency);

		return normalizedAP > this.swapValue ? 2 : 1;
	}

	/**
	 * Task Load (TL) - Normalized to 0-1
	 *
	 * Averages three normalized factors:
	 * - flights / maxFlights
	 * - requests / maxRequests
	 * - conflicts / maxConflicts
	 */
	get taskLoad(): number {
		const flightsFactor = Math.min(
			aircraftStore.aircrafts.size / this.maxNumberOfFlights,
			1,
		);
		const requestsFactor = Math.min(
			this.numberOfRequestsLast30s / this.maxNumberOfRequestsPer30s,
			1,
		);
		const conflictsFactor = Math.min(
			(aircraftStore.stcaConflictIds.size +
				aircraftStore.mtcdConflictIds.size +
				aircraftStore.tctConflictIds.size) /
				this.maxNumberOfConflicts,
			1,
		);

		return (flightsFactor + requestsFactor + conflictsFactor) / 3;
	}

	/**
	 * Beta - Agent Reliability (0-1)
	 *
	 * Comes from Agent MQTT message
	 */
	get beta(): number {
		return this.reliabilityAgent ?? 0;
	}

	/**
	 * Delta - ISA Time Decay (0-1)
	 *
	 * Linear decay: 1.0 when fresh, 0.0 after maxAgeSeconds (5 minutes)
	 */
	get delta(): number {
		if (!this.timestampISA || !simulatorStore.timestamp) {
			return 0;
		}

		const ageInSeconds = simulatorStore.timestamp - this.timestampISA;
		const maxAgeSeconds = 60 * 5;

		// Linear decay: 1.0 at age 0, 0.0 at maxAgeSeconds
		return Math.max(0, 1 - Math.max(1, ageInSeconds / maxAgeSeconds));
	}

	/**
	 * Alpha - Dynamic Weight for Task Load
	 *
	 * Computed as: alpha = 3 - beta - delta
	 * This makes task load weight higher when WL and ISA reliability is low
	 */
	get alpha(): number {
		return 3 - this.beta - this.delta;
	}

	/**
	 * Normalized ISA - ISA workload normalized to 0-1
	 *
	 * Assumes raw ISA values are in range 0-5
	 * Adjust max value based on actual MQTT data
	 */
	get normalizedISA(): number {
		const rawISA = this.workloadISA ?? 0;
		return Math.min(rawISA / 5, 1); // Divide by max expected ISA value
	}

	/**
	 * Computed AP - Before Normalization (for DEBUG DISPLAY ONLY)
	 *
	 * Formula: alpha * TL + beta * WL + delta * ISA + gamma * urgency
	 * Range: 0-3 (urgency=0 for global display)
	 *
	 * NOTE: For actual request handling, use getAPForRequestType()
	 */
	get computedAP(): number {
		const TL = this.taskLoad;
		const WL = this.workloadAgent ?? 0;
		const ISA = this.normalizedISA;
		const urgency = 0; // Global display assumes no urgency

		return (
			this.alpha * TL + this.beta * WL + this.delta * ISA + this.GAMMA * urgency
		);
	}

	/**
	 * Normalized AP - Normalized to 0-1 (for DEBUG DISPLAY ONLY)
	 *
	 * Formula: computedAP / (3 + urgency)
	 *
	 * NOTE: For actual request handling, use getAPForRequestType()
	 */
	get normalizedAP(): number {
		const urgency = 0; // Global display assumes no urgency
		return this.computedAP / (3 + urgency);
	}

	/**
	 * Autonomy Profile - Reported AP (null = error/no data, 1 = AP1, 2 = AP2)
	 *
	 * Returns:
	 * - Manual override value (1 or 2) if set, regardless of data availability
	 * - null if data is missing/incomplete and no manual override
	 * - Computed AP (1 or 2) based on normalizedAP threshold
	 *
	 * NOTE: This is for DEBUG DISPLAY ONLY (assumes urgency=0)
	 * For actual request handling, use getAPForRequestType()
	 */
	get autonomyProfile(): number | null {
		// Manual override always takes precedence
		if (this.manualAP !== null) {
			return this.manualAP;
		}

		// Check if we have minimum required data for computation
		if (!this.hasRequiredData()) {
			return null;
		}

		// Compute AP with urgency=0 for global display
		return this.computeAPWithUrgency(0);
	}

	/**
	 * Get Autonomy Profile for a specific request type
	 *
	 * This method computes AP on-the-fly based on request type to avoid race conditions.
	 * Each request gets its own AP calculation without storing urgency as state.
	 *
	 * @param requestType - Request type (0=FL, 1=direct, 2=absolute_heading, 3=relative_heading)
	 * @returns AP (1 or 2), defaults to 1 if data missing
	 */
	getAPForRequestType(requestType: number): number {
		// Manual override always takes precedence
		if (this.manualAP !== null) {
			return this.manualAP;
		}

		// Check if we have minimum required data for computation
		if (!this.hasRequiredData()) {
			// biome-ignore lint/suspicious/noConsole: error logging for missing data
			console.error(
				"BrainStore: Missing required data for AP computation. Defaulting to AP1.",
				{
					workloadAgent: this.workloadAgent,
					reliabilityAgent: this.reliabilityAgent,
					timestampAgent: this.timestampAgent,
					workloadISA: this.workloadISA,
					reliabilityISA: this.reliabilityISA,
					timestampISA: this.timestampISA,
				},
			);
			return 1; // Default to AP1
		}

		// Get urgency for this specific request type and compute AP
		const urgency = this.getUrgencyForRequestType(requestType);
		return this.computeAPWithUrgency(urgency);
	}

	// ========== Action Methods ==========

	/**
	 * Update Agent workload data from MQTT
	 */
	updateAgentWorkload(
		workload: number,
		reliability: number,
		timestamp: string | number,
	): void {
		this.workloadAgent = workload;
		this.reliabilityAgent = reliability;
		// Convert timestamp to number (Unix seconds) if it's a string
		this.timestampAgent =
			typeof timestamp === "string"
				? new Date(timestamp).getTime() / 1000
				: timestamp;
	}

	/**
	 * Update ISA workload data from MQTT
	 */
	updateISAWorkload(
		workload: number,
		reliability: number,
		timestamp: string | number,
	): void {
		this.workloadISA = workload;
		this.reliabilityISA = reliability;
		// Convert timestamp to number (Unix seconds) if it's a string
		this.timestampISA =
			typeof timestamp === "string"
				? new Date(timestamp).getTime() / 1000
				: timestamp;
	}

	/**
	 * Update configuration parameters (for admin panel)
	 */
	setMaxNumberOfFlights(value: number): void {
		this.maxNumberOfFlights = value;
	}

	setMaxNumberOfRequestsPer30s(value: number): void {
		this.maxNumberOfRequestsPer30s = value;
	}

	setMaxNumberOfConflicts(value: number): void {
		this.maxNumberOfConflicts = value;
	}

	setSwapValue(value: number): void {
		this.swapValue = value;
	}

	setManualAP(value: number | null): void {
		this.manualAP = value;
	}
}
