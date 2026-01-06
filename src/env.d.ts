/* eslint-disable unicorn/prevent-abbreviations */
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_VOICE_SERVER_ENDPOINT: string | undefined;
	readonly VITE_VOICE_SERVER_BEARER_TOKEN: string | undefined;
	readonly VITE_MQTT_BROKER_URL: string | undefined;
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
