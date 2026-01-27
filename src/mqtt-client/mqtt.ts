import * as Sentry from "@sentry/react";
import { transaction } from "mobx";
import type { IClientPublishOptions, MqttClient } from "mqtt";
import mqtt from "mqtt";

import {
	isAdminModeRequested,
	type MqttCredentials,
	redirectToNonAdmin,
} from "./auth";
import router from "./router";
import { getTopics } from "./topics";

/** Connection error state for UI display */
export type ConnectionErrorState = {
	hasError: boolean;
	errorCode?: string | number;
	isAdminMode: boolean;
};

let connectionErrorState: ConnectionErrorState = {
	hasError: false,
	isAdminMode: false,
};

const connectionErrorListeners: Set<(state: ConnectionErrorState) => void> =
	new Set();

export function getConnectionErrorState(): ConnectionErrorState {
	return connectionErrorState;
}

export function onConnectionError(
	callback: (state: ConnectionErrorState) => void,
): () => void {
	connectionErrorListeners.add(callback);
	return () => connectionErrorListeners.delete(callback);
}

function setConnectionError(errorCode?: string | number): void {
	connectionErrorState = {
		hasError: true,
		errorCode,
		isAdminMode: isAdminModeRequested(),
	};
	for (const listener of connectionErrorListeners) {
		listener(connectionErrorState);
	}
}

function clearConnectionError(): void {
	connectionErrorState = {
		hasError: false,
		isAdminMode: isAdminModeRequested(),
	};
	for (const listener of connectionErrorListeners) {
		listener(connectionErrorState);
	}
}

function getBrokerUrl(): string {
	const MQTT_BROKER_URL = import.meta.env.VITE_MQTT_BROKER_URL;

	if (MQTT_BROKER_URL && MQTT_BROKER_URL !== "default") {
		return MQTT_BROKER_URL;
	}

	if (
		/^(localhost|127(?:\.\d{1,3}){2}.\d{1,3}|\[::1])(:\d+)?$/.test(
			window.location.host,
		)
	) {
		return "ws://localhost:9001/mqtt";
	}

	const isHTTPS = window.location.protocol === "https:";
	return `${isHTTPS ? "wss" : "ws"}://${window.location.host}/mqtt`;
}

export function createClient(credentials: MqttCredentials | null): MqttClient {
	const brokerUrl = getBrokerUrl();

	return mqtt.connect(brokerUrl, {
		protocolVersion: 5,
		// Short keepalive to detect offline clients faster (e.g. cable unplug)
		keepalive: 10,
		...(credentials && {
			username: credentials.username,
			password: credentials.password,
		}),
	});
}

// Placeholder client that will be replaced once credentials are loaded
let client: MqttClient | null = null;

// Pending listeners that were registered before client was initialized
const pendingConnectListeners: Set<() => void> = new Set();
const pendingDisconnectListeners: Set<() => void> = new Set();
const pendingPacketReceiveListeners: Set<() => void> = new Set();
const pendingPacketSendListeners: Set<() => void> = new Set();

/**
 * Check if the MQTT client is initialized and ready to publish
 */
export function isClientReady(): boolean {
	return client !== null;
}

export function initializeClient(credentials: MqttCredentials | null): void {
	const isAdmin = isAdminModeRequested();
	client = createClient(credentials);

	// Attach any listeners that were registered before client was initialized
	for (const listener of pendingConnectListeners) {
		client.on("connect", listener);
	}
	for (const listener of pendingDisconnectListeners) {
		client.on("close", listener);
	}
	for (const listener of pendingPacketReceiveListeners) {
		client.on("packetreceive", listener);
	}
	for (const listener of pendingPacketSendListeners) {
		client.on("packetsend", listener);
	}
	// Clear the pending sets
	pendingConnectListeners.clear();
	pendingDisconnectListeners.clear();
	pendingPacketReceiveListeners.clear();
	pendingPacketSendListeners.clear();

	// Track reconnection attempts for detecting auth failures
	let reconnectCount = 0;
	let hasConnectedAtLeastOnce = false;

	client.on("connect", () => {
		hasConnectedAtLeastOnce = true;
		reconnectCount = 0;
		clearConnectionError();

		const topics = getTopics(isAdmin);
		client?.subscribe(topics, (error) => {
			if (error) {
				// biome-ignore lint/suspicious/noConsole: needed for now
				console.error("Failed to subscribe to MQTT topics", error);
				Sentry.captureException(error);
			}
		});
	});

	client.on("error", (error) => {
		// biome-ignore lint/suspicious/noConsole: needed for now
		console.error("MQTT error", error);
		Sentry.captureException(error);

		// Check for authentication errors (codes 4 and 5 are auth-related in MQTT)
		const errorCode = (error as { code?: number }).code;
		if (errorCode === 4 || errorCode === 5) {
			if (isAdmin) {
				// Admin auth failed, redirect to non-admin mode
				redirectToNonAdmin(errorCode);
			} else {
				// Public auth failed, set error once
				setConnectionError(errorCode);
			}
		}
	});

	client.on("reconnect", () => {
		reconnectCount += 1;
		// Some brokers (like RabbitMQ) don't send proper MQTT auth errors,
		// they just close the connection. Detect repeated reconnects without success.
		if (reconnectCount >= 3 && !hasConnectedAtLeastOnce) {
			if (isAdmin) {
				redirectToNonAdmin("reconnect");
			} else if (!connectionErrorState.hasError) {
				// Only set error once to avoid repeated error notifications
				setConnectionError("reconnect");
				Sentry.captureMessage(
					"MQTT connection failed after multiple attempts",
					"error",
				);
			}
		}
	});
}

export { getBrokerUrl };

type MqttOnCallback = () => void;
type MqttOffCallback = () => void;

export function onConnect(callback: MqttOnCallback): MqttOffCallback {
	if (!client) {
		// Client not initialized yet, store for later
		pendingConnectListeners.add(callback);
		return () => pendingConnectListeners.delete(callback);
	}
	if (client.connected) {
		callback();
	}
	client.on("connect", callback);
	const currentClient = client;
	return () => currentClient.off("connect", callback);
}

export function onDisconnect(callback: MqttOffCallback): MqttOffCallback {
	if (!client) {
		// Client not initialized yet, store for later
		// Also call callback immediately since we're "disconnected" (not connected yet)
		callback();
		pendingDisconnectListeners.add(callback);
		return () => pendingDisconnectListeners.delete(callback);
	}
	if (!client.connected) {
		callback();
	}
	client.on("close", callback);
	client.on("offline", callback);
	client.on("reconnect", callback);
	const currentClient = client;
	return () => {
		currentClient.off("close", callback);
		currentClient.off("offline", callback);
		currentClient.off("reconnect", callback);
	};
}

export function onPacketReceive(callback: MqttOnCallback): MqttOffCallback {
	if (!client) {
		// Client not initialized yet, store for later
		pendingPacketReceiveListeners.add(callback);
		return () => pendingPacketReceiveListeners.delete(callback);
	}
	client.on("packetreceive", callback);
	const currentClient = client;
	return () => currentClient.off("packetreceive", callback);
}

export function onPacketSend(callback: MqttOnCallback): MqttOffCallback {
	if (!client) {
		// Client not initialized yet, store for later
		pendingPacketSendListeners.add(callback);
		return () => pendingPacketSendListeners.delete(callback);
	}
	client.on("packetsend", callback);
	const currentClient = client;
	return () => currentClient.off("packetsend", callback);
}

let incomingMessagesQueue: { topic: string; message: Buffer }[] = [];
let incomingMessagesBatchId = 0;

function processIncomingMessages(): void {
	transaction(() => {
		incomingMessagesBatchId = 0;
		for (const { topic, message } of incomingMessagesQueue) {
			// Ignore empty messages (they are most likely deletion messages)
			if (message.length > 0) {
				try {
					router(topic, message);
				} catch (error) {
					// biome-ignore lint/suspicious/noConsole: needed for now
					console.error("Error while handling MQTT message", error);
					Sentry.captureException(error);
				}
			}
		}
	});

	incomingMessagesQueue = [];
}

/** Setup message handler - called after client is initialized */
export function setupMessageHandler(): void {
	if (!client) {
		return;
	}
	client.on("message", (topic: string, message: Buffer) => {
		incomingMessagesQueue.push({ topic, message });
		if (incomingMessagesBatchId === 0) {
			incomingMessagesBatchId = window.setTimeout(processIncomingMessages, 100);
		}
	});
}

export function publish(
	topic: string,
	message: string | Uint8Array | { [key: string]: unknown },
	settings?: IClientPublishOptions,
): Promise<void> {
	const messageData =
		typeof message === "string"
			? message
			: message instanceof Uint8Array
				? message
				: JSON.stringify(message);

	return new Promise((resolve, reject) => {
		if (!client) {
			reject(new Error("MQTT client not initialized"));
			return;
		}
		client.publish(
			topic,
			// Type assertion needed because MQTT.js types expect Buffer,
			// but Uint8Array works fine at runtime in browsers
			messageData as string | Buffer,
			{
				qos: 1,
				...settings,
			},
			(error) => {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			},
		);
	});
}
