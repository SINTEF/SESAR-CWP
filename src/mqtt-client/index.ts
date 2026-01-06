import { bootstrapMqtt } from "./bootstrap";

// Initialize MQTT client with proper credentials
// This is a top-level await alternative that works in module scope
bootstrapMqtt().catch((error) => {
	// biome-ignore lint/suspicious/noConsole: startup error handling
	console.error("Failed to bootstrap MQTT:", error);
});

export { publish } from "./mqtt";
