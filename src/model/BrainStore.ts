import { makeAutoObservable, runInAction } from "mobx";
import { PilotRequestType } from "../schemas/pilotRequestSchema";
import { aircraftStore, configurationStore } from "../state";
import { createPairKey } from "./DatablockStore";

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
	// MQTT data (from TAS/{clientId}/WorkloadUpdate and TAS/{clientId}/ISAUpdate)
	workloadAgent: number | null = null; // 0 or 1
	ISA: number | null = null; // ISA value 1-5
	accuracy: number | null = null; // Accuracy from WorkloadUpdate, becomes beta (0-1)
	timestampWorkload: number | null = null; // Unix timestamp in seconds
	timestampISA: number | null = null; // Unix timestamp in seconds

	// Configurable max values for normalization
	maxNumberOfFlights = 15;
	maxNumberOfRequests = 3;
	maxNumberOfConflicts = 5;
	swapValue = 0.5; // Threshold for AP1/AP2 decision

	// Manual override for AP (null = use computed, 1 or 2 = manual override)
	manualAP: number | null = null;

	// Observable timer for delta decay (updates every second)
	private _nowSeconds: number = Date.now() / 1000;
	private _timerInterval: ReturnType<typeof setInterval> | null = null;

	// Rolling window of request arrival times (epoch ms) for "last 5 min" count
	requestArrivalTimes: number[] = [];

	// Configurable gamma weight for urgency
	gamma = 1;

	constructor() {
		makeAutoObservable<this, "_timerInterval">(this, {
			_timerInterval: false, // Don't make interval observable
		});
		this.startTimer();
	}

	/**
	 * Start the 1-second timer for delta decay updates
	 */
	startTimer(): void {
		if (this._timerInterval) {
			return;
		}
		this._timerInterval = setInterval(() => {
			runInAction(() => {
				this._nowSeconds = Date.now() / 1000;
			});
		}, 1000);
	}

	/**
	 * Stop the timer (for cleanup)
	 */
	stopTimer(): void {
		if (this._timerInterval) {
			clearInterval(this._timerInterval);
			this._timerInterval = null;
		}
	}

	// ========== Computed Properties ==========

	get numberOfAssumedFlights(): number {
		let currentCWP = configurationStore.currentCWP;

		if (!currentCWP) {
			return 0;
		}

		if (currentCWP === "All") {
			currentCWP = "CWP1"; // Default to CWP1 if "All" is selected, since AP is per-CWP
		}

		return [...aircraftStore.aircrafts.values()].filter(
			(ac) => ac.controlledBy === currentCWP,
		).length;
	}

	/** Total requests received in the last 5 minutes (including accepted/dismissed) */
	get numberOfRequests(): number {
		const fiveMinutesAgo = this._nowSeconds * 1000 - 5 * 60 * 1000;
		return this.requestArrivalTimes.filter((t) => t >= fiveMinutesAgo).length;
	}

	get numberOfConflicts(): number {
		// Do not include STCA (From Yannick). Count unique visible conflict pairs across TCT+MTCD.
		const pairKeys = new Set<string>();
		const radarVisibleAircraftIds = configurationStore.radarVisibleAircraftIds;

		for (const conflict of aircraftStore.tctConflictIds.values()) {
			if (!conflict.flightId || !conflict.conflictingFlightId) {
				continue;
			}

			if (
				!radarVisibleAircraftIds.has(conflict.flightId) ||
				!radarVisibleAircraftIds.has(conflict.conflictingFlightId)
			) {
				continue;
			}

			pairKeys.add(
				createPairKey(conflict.flightId, conflict.conflictingFlightId),
			);
		}

		for (const conflict of aircraftStore.mtcdConflictIds.values()) {
			if (!conflict.flightId || !conflict.conflictingFlightId) {
				continue;
			}

			if (
				!radarVisibleAircraftIds.has(conflict.flightId) ||
				!radarVisibleAircraftIds.has(conflict.conflictingFlightId)
			) {
				continue;
			}

			pairKeys.add(
				createPairKey(conflict.flightId, conflict.conflictingFlightId),
			);
		}

		return pairKeys.size;
	}

	get normalizedFlights(): number {
		return Math.min(this.numberOfAssumedFlights / this.maxNumberOfFlights, 1);
	}

	get normalizedRequests(): number {
		return Math.min(this.numberOfRequests / this.maxNumberOfRequests, 1);
	}

	get normalizedConflicts(): number {
		return Math.min(this.numberOfConflicts / this.maxNumberOfConflicts, 1);
	}

	/**
	 * Get urgency value based on request type.
	 * Heading requests are considered urgent (weather avoidance).
	 * @param requestType - Pilot request type
	 * @returns Urgency value (0 or 1)
	 */
	private getUrgencyForRequestType(requestType: PilotRequestType): number {
		// Heading requests are weather/urgent
		return requestType === PilotRequestType.AbsoluteHeading ||
			requestType === PilotRequestType.RelativeHeading
			? 1
			: 0;
	}

	/**
	 * Check if we have minimum required data for AP computation
	 * @returns true if all required MQTT data is available
	 */
	private hasRequiredData(): boolean {
		return (
			this.workloadAgent !== null &&
			this.accuracy !== null &&
			this.timestampWorkload !== null &&
			this.ISA !== null &&
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
			this.gamma * urgency;

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
		return (
			(this.normalizedFlights +
				this.normalizedRequests +
				this.normalizedConflicts) /
			3
		);
	}

	/**
	 * Beta - Accuracy (0-1)
	 *
	 * Comes from WorkloadUpdate MQTT message
	 */
	get beta(): number {
		return this.accuracy ?? 0;
	}

	/**
	 * Delta - ISA Time Decay (0-1)
	 *
	 * Exponential decay: 1.0 when fresh, approaches 0 after maxAgeSeconds (5 minutes)
	 * Formula: e^(-5 * age/maxAge) gives ~0.67% at 5 minutes
	 */
	get delta(): number {
		if (!this.timestampISA) {
			return 0;
		}
		const ageInSeconds = this._nowSeconds - this.timestampISA;
		const maxAgeSeconds = 60 * 5;

		// Exponential decay: 1.0 at age 0, ~0.007 at maxAgeSeconds, never reaches 0
		return Math.exp((-5 * ageInSeconds) / maxAgeSeconds);
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
	 * ISA values are in range 1-5 (from TAS/{clientId}/ISAUpdate)
	 * Normalized: ISA 1 → 0.2, ISA 5 → 1.0
	 */
	get normalizedISA(): number {
		return Math.min((this.ISA ?? 0) / 5, 1);
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
			this.alpha * TL + this.beta * WL + this.delta * ISA + this.gamma * urgency
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
	 * Get Autonomy Profile for a specific request type.
	 *
	 * This method computes AP on-the-fly based on request type to avoid race conditions.
	 * Each request gets its own AP calculation without storing urgency as state.
	 *
	 * @param requestType - Pilot request type
	 * @returns AP (1 or 2), defaults to 1 if data missing
	 */
	getAPForRequestType(requestType: PilotRequestType): number {
		// Manual override always takes precedence
		if (this.manualAP !== null) {
			return this.manualAP;
		}

		// Check if we have minimum required data for computation
		if (!this.hasRequiredData()) {
			// biome-ignore lint/suspicious/noConsole: error logging for missing data
			console.error("[Brain AP] Missing required data → defaulting to AP1", {
				workloadAgent: this.workloadAgent,
				accuracy: this.accuracy,
				timestampWorkload: this.timestampWorkload,
				ISA: this.ISA,
				timestampISA: this.timestampISA,
			});
			return 1; // Default to AP1
		}

		// Get urgency for this specific request type and compute AP
		const urgency = this.getUrgencyForRequestType(requestType);
		const TL = this.taskLoad;
		const WL = this.workloadAgent ?? 0;
		const ISA = this.normalizedISA;
		const computedAP =
			this.alpha * TL +
			this.beta * WL +
			this.delta * ISA +
			this.gamma * urgency;
		const normalizedAP = computedAP / (3 + urgency);
		const resultAP = normalizedAP > this.swapValue ? 2 : 1;

		// biome-ignore lint/suspicious/noConsole: debug logging for AP calculation
		console.log(
			`[Brain AP] requestType=${requestType} urgency=${urgency}\n` +
				`  Flights: ${this.numberOfAssumedFlights}/${this.maxNumberOfFlights} (norm=${this.normalizedFlights.toFixed(3)})\n` +
				`  Requests: ${this.numberOfRequests}/${this.maxNumberOfRequests} (norm=${this.normalizedRequests.toFixed(3)})\n` +
				`  Conflicts: ${this.numberOfConflicts}/${this.maxNumberOfConflicts} (norm=${this.normalizedConflicts.toFixed(3)})\n` +
				`  TaskLoad(TL)=${TL.toFixed(3)}\n` +
				`  alpha=${this.alpha.toFixed(3)} beta=${this.beta.toFixed(3)} delta=${this.delta.toFixed(3)} gamma=${this.gamma.toFixed(3)}\n` +
				`  WL=${WL} ISA=${this.ISA} normalizedISA=${ISA.toFixed(3)}\n` +
				`  Formula: ${this.alpha.toFixed(3)}*${TL.toFixed(3)} + ${this.beta.toFixed(3)}*${WL} + ${this.delta.toFixed(3)}*${ISA.toFixed(3)} + ${this.gamma.toFixed(3)}*${urgency}\n` +
				`  computedAP=${computedAP.toFixed(3)} / (3+${urgency}) = normalizedAP=${normalizedAP.toFixed(3)}\n` +
				`  ${normalizedAP.toFixed(3)} ${normalizedAP > this.swapValue ? ">" : "<="} ${this.swapValue} → AP ${resultAP}`,
		);

		return resultAP;
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
		this.accuracy = reliability;
		// Convert timestamp to number (Unix seconds) if it's a string
		this.timestampWorkload =
			typeof timestamp === "string"
				? new Date(timestamp).getTime() / 1000
				: timestamp;
	}

	/**
	 * Update ISA workload data from MQTT (TAS/{clientId}/ISAUpdate)
	 * @param isa - ISA value (1-5)
	 * @param timestamp - Timestamp string or Unix seconds
	 */
	updateISAWorkload(isa: number, timestamp: string | number): void {
		this.ISA = isa;
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

	setMaxNumberOfRequests(value: number): void {
		this.maxNumberOfRequests = value;
	}

	setMaxNumberOfConflicts(value: number): void {
		this.maxNumberOfConflicts = value;
	}

	setGamma(value: number): void {
		this.gamma = value;
	}

	setSwapValue(value: number): void {
		this.swapValue = value;
	}

	setManualAP(value: number | null): void {
		this.manualAP = value;
	}

	/** Record that a new request arrived (called from AircraftStore) */
	recordRequestArrival(): void {
		this.requestArrivalTimes.push(Date.now());
		// Prune entries older than 5 minutes
		const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
		this.requestArrivalTimes = this.requestArrivalTimes.filter(
			(t) => t >= fiveMinutesAgo,
		);
	}
}
