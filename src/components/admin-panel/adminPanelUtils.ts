export function formatTimestamp(timestamp: number): string {
	const date = new Date(timestamp);
	return date.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

export function formatLocalDateTime(date: Date): string {
	return date.toLocaleString("en-GB", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

export function getLevelColor(level?: string): string {
	if (!level) {
		return "text-gray-300";
	}
	const lowerLevel = level.toLowerCase();
	if (lowerLevel.includes("error") || lowerLevel.includes("fatal")) {
		return "text-error";
	}
	if (lowerLevel.includes("warn")) {
		return "text-warning";
	}
	if (lowerLevel.includes("info")) {
		return "text-info";
	}
	if (lowerLevel.includes("debug") || lowerLevel.includes("trace")) {
		return "text-gray-500";
	}
	return "text-gray-300";
}
