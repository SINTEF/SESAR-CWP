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
	 * Urgency - Placeholder
	 *
	 * Future: Check for weather request type in teamAssistantRequest
	 * Currently returns 0 (will be 1 when weather requests are implemented)
	 */
	get urgency(): number {
		// TODO: Check for weather request type when Team Assistant supports it
		return 0;
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
	 * Linear decay: 1.0 when fresh, 0.0 after 60 seconds
	 */
	get delta(): number {
		if (!this.timestampISA || !simulatorStore.timestamp) {
			return 0;
		}

		const ageInSeconds = simulatorStore.timestamp - this.timestampISA;
		const maxAgeSeconds = 60;

		// Linear decay: 1.0 at age 0, 0.0 at age 60s
		return Math.max(0, 1 - ageInSeconds / maxAgeSeconds);
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
	 * Computed AP - Before Normalization
	 *
	 * Formula: alpha * TL + beta * WL + delta * ISA + gamma * urgency
	 * Range: 0-4
	 */
	get computedAP(): number {
		const TL = this.taskLoad;
		const WL = this.workloadAgent ?? 0;
		const ISA = this.normalizedISA;

		return (
			this.alpha * TL +
			this.beta * WL +
			this.delta * ISA +
			this.GAMMA * this.urgency
		);
	}

	/**
	 * Normalized AP - Normalized to 0-1
	 *
	 * Formula: computedAP / (3 + urgency)
	 */
	get normalizedAP(): number {
		return this.computedAP / (3 + this.urgency);
	}

	/**
	 * Autonomy Profile - Reported AP (1 or 2)
	 *
	 * Thresholds normalizedAP to determine AP1 or AP2
	 */
	get autonomyProfile(): number {
		return this.normalizedAP > this.swapValue ? 2 : 1;
	}

	/**
	 * Has Error State - Indicates if data is missing or stale
	 *
	 * Returns true if:
	 * - No Agent workload data received yet
	 * - No ISA workload data received yet
	 * - ISA data is completely stale (delta = 0)
	 */
	get hasError(): boolean {
		// No Agent data received yet
		if (
			this.workloadAgent === null ||
			this.reliabilityAgent === null ||
			this.timestampAgent === null
		) {
			return true;
		}

		// No ISA data received yet
		if (
			this.workloadISA === null ||
			this.reliabilityISA === null ||
			this.timestampISA === null
		) {
			return true;
		}

		return false;
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
}
