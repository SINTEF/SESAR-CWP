import type { CaptureResult } from "posthog-js";
import { publishAnalyticsEvent } from "./mqtt-client/analyticsPublisher";

/**
 * Intercepts PostHog events and forwards them to MQTT for monitoring/analysis
 * This function is called before events are sent to PostHog
 */
export function interceptPostHogEvent(
	event: CaptureResult | null,
): CaptureResult | null {
	// Skip null events
	if (!event) {
		return event;
	}

	// Skip noisy unnecessary events
	if (event.event === "$snapshot" || event.event === "$$heatmap") {
		return event;
	}

	// Forward to MQTT asynchronously (don't block PostHog)
	publishAnalyticsEvent({
		event: event.event,
		properties: event.properties || {},
		timestamp: event.timestamp || new Date().toISOString(),
		uuid: event.uuid,
	}).catch((error) => {
		// biome-ignore lint/suspicious/noConsole: should be logged
		console.error("[PostHog Interceptor] Failed to publish to MQTT:", error);
	});

	// Return the event to let PostHog continue normally
	return event;
}
