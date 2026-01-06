import { makeAutoObservable } from "mobx";

interface LogEntry {
	timestamp: number;
	message: string;
	level?: string;
}

const MAX_LOG_ENTRIES = 500;

export default class AdminStore {
	adminModeEnabled = false;

	showAdminPanel = false;

	isMinimized = false;

	logs: LogEntry[] = [];

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
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

	addLog(message: string, level?: string): void {
		const entry: LogEntry = {
			timestamp: Date.now(),
			message,
			level,
		};
		this.logs.push(entry);

		// Keep logs under the limit
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
				this.addLog(message, level);
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
