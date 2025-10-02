import type { CaptureResult } from "posthog-js";
import { publishAnalyticsEvent } from "./mqtt-client/analyticsPublisher";
import { mapViewportStore } from "./state";

/**
 * Intercepts PostHog events and forwards them to MQTT for monitoring/analysis
 * Automatically enriches all events with viewport information
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

	// Auto-enrich with viewport information from mapViewportStore
	if (event.properties) {
		// Add viewport state to all events (prefixed with $ to mark as system property)
		event.properties.$map_viewport = mapViewportStore.viewportState;
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
