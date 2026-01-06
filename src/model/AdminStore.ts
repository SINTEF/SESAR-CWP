import { makeAutoObservable } from "mobx";
import { getAndClearAdminError } from "../mqtt-client/auth";

interface LogEntry {
	timestamp: number;
	message: string;
	level?: string;
}

const MAX_LOG_ENTRIES = 500;

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
	if (logs.length === 0 || entry.timestamp >= logs[logs.length - 1].timestamp) {
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

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });

		// Check for any admin error from previous session
		this.adminError = getAndClearAdminError();
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
			const parsed = JSON.parse(jsonString);
			// Handle different log formats - could be an object with message/level or just a string
			if (typeof parsed === "object" && parsed !== null) {
				const message = parsed.message ?? parsed.msg ?? JSON.stringify(parsed);
				const level = parsed.level ?? parsed.severity ?? undefined;
				// Try to extract timestamp from common log fields
				const timestamp = parseTimestamp(
					parsed.timestamp ?? parsed.time ?? parsed.ts ?? parsed.date,
				);
				this.addLog(message, level, timestamp);
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
}
