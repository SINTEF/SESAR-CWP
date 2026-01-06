import clientId from "./clientId";
import { isClientReady, publish } from "./mqtt";

export interface AnalyticsEvent {
	event: string;
	properties: Record<string, unknown>;
	timestamp: string | Date;
	uuid?: string;
}

/**
 * Publishes analytics events to MQTT for monitoring and analysis
 * Topic pattern: analytics/{clientId}/posthog/events
 */
export async function publishAnalyticsEvent(
	event: AnalyticsEvent,
): Promise<void> {
	// Skip publishing if MQTT client isn't ready yet (e.g., during async bootstrap)
	if (!isClientReady()) {
		return;
	}

	const eventName = event.event ?? "unknown";

	const topic = `analytics/${encodeURIComponent(clientId)}/events/${encodeURIComponent(eventName)}`;

	const properties = event.properties ?? {};

	const our_properties = Object.fromEntries(
		Object.entries(properties).filter(
			([key]) => !key.startsWith("$") && key !== "distinct_id",
		),
	);

	// Prepare the event payload
	const payload = {
		event: event.event,
		timestamp:
			typeof event.timestamp === "string"
				? event.timestamp
				: event.timestamp.toISOString(),
		uuid: event.uuid,
		context: {
			clientId,
			device_id: properties.$device_id,
			session_id: properties.$session_id,
			os: properties.$os,
			os_version: properties.$os_version,
			browser: properties.$browser,
			browser_version: properties.$browser_version,
			browser_language: properties.$browser_language,
			device_type: properties.$device_type,
			timezone: properties.$timezone,
			timezone_offset: properties.$timezone_offset,
			current_url: properties.$current_url,
			screen_width: properties.$screen_width,
			screen_height: properties.$screen_height,
			viewport_width: properties.$viewport_width,
			viewport_height: properties.$viewport_height,
			map_viewport: properties.$map_viewport,
		},
		properties: our_properties,
	};

	await publish(topic, payload, {
		qos: 1, // At least once delivery
		retain: false, // Don't retain analytics events
	});
}
