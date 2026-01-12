/* eslint-disable unicorn/prevent-abbreviations */
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_VOICE_SERVER_ENDPOINT: string | undefined;
	readonly VITE_VOICE_SERVER_BEARER_TOKEN: string | undefined;
	readonly VITE_MQTT_BROKER_URL: string | undefined;
	/** Public MQTT username for non-admin users on non-localhost */
	readonly VITE_MQTT_PUBLIC_USERNAME: string | undefined;
	/** Public MQTT password for non-admin users on non-localhost */
	readonly VITE_MQTT_PUBLIC_PASSWORD: string | undefined;
	/** Admin MQTT username (password entered by user at runtime) */
	readonly VITE_MQTT_ADMIN_USERNAME: string | undefined;
	readonly VITE_SENTRY_DSN: string | undefined;
	readonly VITE_BUILDTIME: string | undefined;
	readonly VITE_VERSION: string | undefined;
	readonly VITE_REVISION: string | undefined;
	readonly VITE_PUBLIC_POSTHOG_KEY: string | undefined;
	readonly VITE_PUBLIC_POSTHOG_HOST: string | undefined;
	/** When "true", localhost requires MQTT authentication (default: disabled) */
	readonly VITE_LOCALHOST_AUTH_REQUIRED: string | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
