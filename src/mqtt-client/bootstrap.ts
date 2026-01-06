/**
 * Bootstrap module for initializing the MQTT client with proper authentication.
 * This should be called early in the application lifecycle.
 */

import * as Sentry from "@sentry/react";
import { getMqttCredentials } from "./auth";
import { getBrokerUrl, initializeClient, setupMessageHandler } from "./mqtt";

let initialized = false;

/**
 * Initialize the MQTT client with the appropriate credentials.
 * - For admin mode: loads password from encrypted store
 * - For public mode on non-localhost: uses public credentials
 * - For localhost: no authentication
 */
export async function bootstrapMqtt(): Promise<void> {
	if (initialized) {
		return;
	}

	try {
		const brokerUrl = getBrokerUrl();
		const credentials = await getMqttCredentials(brokerUrl);
		initializeClient(credentials);
		setupMessageHandler();
		initialized = true;
	} catch (error) {
		// If getMqttCredentials throws, it's likely redirecting
		if (
			error instanceof Error &&
			error.message.includes("Admin password not found")
		) {
			// This is expected during redirection, no need to report to Sentry
		} else {
			Sentry.captureException(error);
		}
		// biome-ignore lint/suspicious/noConsole: needed for startup errors
		console.error("Failed to initialize MQTT:", error);
	}
}
