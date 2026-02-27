import { makeAutoObservable } from "mobx";
import { getAndClearAdminError } from "../mqtt-client/auth";
import { AdminLogJsonSchema } from "../schemas/storeJsonSchemas";

interface LogEntry {
	timestamp: number;
	message: string;
	level?: string;
}

interface LatestPresenceEntry {
	sessionUuid: string;
	sequence: string;
	utcIso8601: string;
	receivedAt: string;
	isDisconnected: boolean;
}

const MAX_LOG_ENTRIES = 500;
const ADMIN_MINIMIZED_KEY = "adminPanelMinimized";
const PRESENCE_SWITCH_WARNING_WINDOW_MS = 5000;
const PRESENCE_SWITCH_WARNING_THRESHOLD = 2;

/**
 * Parse a timestamp from various formats commonly found in log messages.
 * Returns the epoch timestamp in milliseconds, or undefined if not parseable.
 */
function parseTimestamp(value: unknown): number | undefined {
	if (value === undefined || value === null) {
		return undefined;
	}
	if (typeof value === "number") {
		// If it looks like seconds (before year 2100 in seconds), convert to ms
		return value < 4_102_444_800 ? value * 1000 : value;
	}
	if (typeof value === "string") {
		const parsed = Date.parse(value);
		if (!Number.isNaN(parsed)) {
			return parsed;
		}
	}
	return undefined;
}

/**
 * Insert a log entry in sorted order by timestamp.
 * Uses insertion sort logic - O(n) worst case but O(1) for already-sorted data.
 * Since logs typically arrive in order, this is very efficient.
 */
function insertLogSorted(logs: LogEntry[], entry: LogEntry): void {
	// Fast path: if empty or new entry is >= last entry, just append
	if (logs.length === 0 || entry.timestamp >= (logs.at(-1)?.timestamp ?? 0)) {
		logs.push(entry);
		return;
	}

	// Linear scan from the end to find insertion point
	let insertIndex = logs.length - 1;
	while (insertIndex > 0 && logs[insertIndex - 1].timestamp > entry.timestamp) {
		insertIndex--;
	}
	logs.splice(insertIndex, 0, entry);
}

export default class AdminStore {
	adminModeEnabled = false;

	showAdminPanel = false;

	isMinimized = false;

	logs: LogEntry[] = [];

	/** Error from previous admin login attempt (stored in sessionStorage) */
	adminError: string | null = null;

	/** Locally selected startup scenario (UI state only) */
	selectedStartupScenario: string | null = null;

	/** Effective startup scenario reported by simulator status topic */
	simulatorStartupScenario: string | null = null;

	/** Local time of the last successful initialisation-completed event */
	lastInitialisationCompletedAt: Date | null = null;

	/** Latest simulator presence message received on status/presence */
	latestPresence: LatestPresenceEntry | null = null;

	/** Session UUID currently observed from presence topic */
	currentPresenceSessionUuid: string | null = null;

	/** Epoch timestamps when session UUID switched */
	presenceSessionSwitchTimestamps: number[] = [];

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });

		// Check for any admin error from previous session
		this.adminError = getAndClearAdminError();

		// Restore minimized state from session storage
		this.isMinimized = sessionStorage.getItem(ADMIN_MINIMIZED_KEY) === "true";
	}

	clearAdminError(): void {
		this.adminError = null;
	}

	toggleAdminMode(): void {
		this.adminModeEnabled = !this.adminModeEnabled;
		if (!this.adminModeEnabled) {
			this.showAdminPanel = false;
		}
	}

	setAdminMode(enabled: boolean): void {
		this.adminModeEnabled = enabled;
		if (!enabled) {
			this.showAdminPanel = false;
		}
	}

	toggleAdminPanel(): void {
		if (this.adminModeEnabled) {
			this.showAdminPanel = !this.showAdminPanel;
		}
	}

	setAdminPanel(show: boolean): void {
		if (this.adminModeEnabled) {
			this.showAdminPanel = show;
		}
	}

	toggleMinimized(): void {
		this.isMinimized = !this.isMinimized;
		sessionStorage.setItem(ADMIN_MINIMIZED_KEY, String(this.isMinimized));
	}

	addLog(message: string, level?: string, timestamp?: number): void {
		const entry: LogEntry = {
			timestamp: timestamp ?? Date.now(),
			message,
			level,
		};

		insertLogSorted(this.logs, entry);

		// Keep logs under the limit by removing oldest entries
		if (this.logs.length > MAX_LOG_ENTRIES) {
			this.logs.splice(0, this.logs.length - MAX_LOG_ENTRIES);
		}
	}

	handleLogMessage(jsonString: string): void {
		try {
			const parsed: unknown = JSON.parse(jsonString);
			const parsedLog = AdminLogJsonSchema.safeParse(parsed);
			// Handle different log formats - could be an object with message/level or just a string
			if (parsedLog.success) {
				const logMessage =
					parsedLog.data.message ??
					parsedLog.data.msg ??
					JSON.stringify(parsedLog.data);
				const level = parsedLog.data.level ?? parsedLog.data.severity;
				// Try to extract timestamp from common log fields
				const timestamp = parseTimestamp(
					parsedLog.data.timestamp ??
						parsedLog.data.time ??
						parsedLog.data.ts ??
						parsedLog.data.date,
				);
				this.addLog(logMessage, level, timestamp);
			} else if (typeof parsed === "object" && parsed !== null) {
				this.addLog(JSON.stringify(parsed));
			} else {
				this.addLog(String(parsed));
			}
		} catch {
			// If not valid JSON, just add as plain text
			this.addLog(jsonString);
		}
	}

	clearLogs(): void {
		this.logs = [];
	}

	setSelectedStartupScenario(value: string | null): void {
		this.selectedStartupScenario = value;
	}

	setSimulatorStartupScenario(value: string | null): void {
		this.simulatorStartupScenario = value;
		if (this.selectedStartupScenario === null) {
			this.selectedStartupScenario = value;
		}
	}

	handleInitialisationCompleted(completedAt: Date): void {
		this.lastInitialisationCompletedAt = completedAt;
	}

	handleInitialisationNotCompleted(): void {
		this.lastInitialisationCompletedAt = null;
	}

	handlePresenceMessage(sessionUuid: string, payload: string): void {
		const now = Date.now();

		if (
			this.currentPresenceSessionUuid &&
			this.currentPresenceSessionUuid !== sessionUuid
		) {
			this.presenceSessionSwitchTimestamps = [
				...this.presenceSessionSwitchTimestamps.filter(
					(timestamp) => now - timestamp <= PRESENCE_SWITCH_WARNING_WINDOW_MS,
				),
				now,
			];
		}

		this.currentPresenceSessionUuid = sessionUuid;

		if (payload.length === 0) {
			this.latestPresence = {
				sessionUuid,
				sequence: "",
				utcIso8601: "",
				receivedAt: new Date(now).toISOString(),
				isDisconnected: true,
			};
			return;
		}

		const [sequence = "", utcIso8601 = ""] = payload.split("|", 2);
		this.latestPresence = {
			sessionUuid,
			sequence,
			utcIso8601,
			receivedAt: new Date(now).toISOString(),
			isDisconnected: false,
		};
	}

	get hasRapidPresenceSessionSwitching(): boolean {
		const now = Date.now();
		const recentSwitchCount = this.presenceSessionSwitchTimestamps.filter(
			(timestamp) => now - timestamp <= PRESENCE_SWITCH_WARNING_WINDOW_MS,
		).length;
		return recentSwitchCount >= PRESENCE_SWITCH_WARNING_THRESHOLD;
	}
}
