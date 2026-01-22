import clientId from "./clientId";

/** Base topics that are always subscribed */
const baseTopics = [
	`ats/${clientId}/data/#`,
	`ats/${clientId}/status/#`,
	`frontend/${clientId}/#`,
	`TAS/${clientId}/WorkloadUpdate`,
	"IIS/PilotRequest/#",
];

/** Admin-only topics */
const adminTopics = [`ats/${clientId}/logs`];

/**
 * Get the list of topics to subscribe to based on admin mode
 * @param isAdmin - Whether admin mode is enabled
 */
export function getTopics(isAdmin: boolean): string[] {
	if (isAdmin) {
		return [...baseTopics, ...adminTopics];
	}
	return baseTopics;
}

// Default export for backwards compatibility (includes all topics)
export default [...baseTopics, ...adminTopics];
