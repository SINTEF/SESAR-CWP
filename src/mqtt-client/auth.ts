import { load as loadPassword } from "../utils/passwordStore.obs";

// Public credentials for non-admin mode (non-localhost only)
const PUBLIC_USERNAME = import.meta.env.VITE_MQTT_PUBLIC_USERNAME;
const PUBLIC_PASSWORD = import.meta.env.VITE_MQTT_PUBLIC_PASSWORD;

// Admin username (password must be entered by user)
export const ADMIN_USERNAME = import.meta.env.VITE_MQTT_ADMIN_USERNAME;

/**
 * Check if the MQTT broker URL points to localhost
 */
export function isBrokerLocalhost(brokerUrl: string): boolean {
	try {
		const url = new URL(brokerUrl);
		return /^(localhost|127(?:\.\d{1,3}){2}\.\d{1,3}|\[::1])$/.test(
			url.hostname,
		);
	} catch {
		return false;
	}
}

/**
 * Check if admin mode is requested via URL parameter
 */
export function isAdminModeRequested(): boolean {
	const urlParameters = new URLSearchParams(window.location.search);
	return urlParameters.get("admin") === "true";
}

/**
 * Generate the salt for password storage
 */
export function getPasswordSalt(brokerUrl: string): string {
	return `sesar-1280e-${ADMIN_USERNAME ?? "admin"}-${brokerUrl}`;
}

/**
 * Redirect to non-admin mode, preserving other URL parameters
 * @param errorCode - Optional error code to store in sessionStorage
 */
export function redirectToNonAdmin(errorCode?: string | number): void {
	if (errorCode !== undefined) {
		sessionStorage.setItem("mqtt-admin-error", String(errorCode));
	}

	const url = new URL(window.location.href);
	url.searchParams.delete("admin");
	window.location.href = url.toString();
}

/**
 * Redirect to admin mode, preserving other URL parameters
 */
export function redirectToAdmin(): void {
	const url = new URL(window.location.href);
	url.searchParams.set("admin", "true");
	window.location.href = url.toString();
}

/**
 * Get and clear any stored admin error
 */
export function getAndClearAdminError(): string | null {
	const error = sessionStorage.getItem("mqtt-admin-error");
	if (error) {
		sessionStorage.removeItem("mqtt-admin-error");
	}
	return error;
}

export interface MqttCredentials {
	username: string;
	password: string;
}

/**
 * Get MQTT credentials based on current mode.
 * For admin mode, loads password from persisted store.
 * For public mode on non-localhost, returns public credentials.
 * For localhost, returns undefined (no auth needed).
 *
 * @param brokerUrl - The MQTT broker URL
 * @returns Promise resolving to credentials, null (no auth needed), or throws if admin password missing
 */
export async function getMqttCredentials(
	brokerUrl: string,
): Promise<MqttCredentials | null> {
	if (isAdminModeRequested()) {
		if (!ADMIN_USERNAME) {
			throw new Error(
				"Admin mode requested but VITE_MQTT_ADMIN_USERNAME is not configured",
			);
		}

		const salt = getPasswordSalt(brokerUrl);
		const password = await loadPassword(salt);

		if (!password) {
			// Password not found, redirect to non-admin mode
			redirectToNonAdmin("no-password");
			// This will cause a page reload, but we throw to stop execution
			throw new Error("Admin password not found, redirecting...");
		}

		return {
			username: ADMIN_USERNAME,
			password,
		};
	}

	// Non-admin mode: skip auth for localhost broker unless explicitly required
	const localhostAuthRequired =
		import.meta.env.VITE_LOCALHOST_AUTH_REQUIRED === "true";
	if (!localhostAuthRequired && isBrokerLocalhost(brokerUrl)) {
		return null;
	}

	// Public credentials for non-localhost broker
	// If not configured, skip authentication (useful for development)
	if (!PUBLIC_USERNAME || !PUBLIC_PASSWORD) {
		return null;
	}

	return {
		username: PUBLIC_USERNAME,
		password: PUBLIC_PASSWORD,
	};
}
