import clientId from "./clientId";
import { publish } from "./mqtt";

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
	const topic = `analytics/${clientId}/posthog/events`;

	// Prepare the event payload
	const payload = {
		clientId,
		event: event.event,
		properties: event.properties,
		timestamp:
			typeof event.timestamp === "string"
				? event.timestamp
				: event.timestamp.toISOString(),
		uuid: event.uuid,
		source: "posthog-interceptor",
		interceptedAt: new Date().toISOString(),
	};

	await publish(topic, payload, {
		qos: 1, // At least once delivery
		retain: false, // Don't retain analytics events
	});
}
