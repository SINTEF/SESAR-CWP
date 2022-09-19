/* eslint-disable unicorn/prevent-abbreviations */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VOICE_SERVER_ENDPOINT: string | undefined;
  readonly VITE_VOICE_SERVER_BEARER_TOKEN: string | undefined;
  readonly VITE_MQTT_BROKER_URL: string | undefined;
  readonly VITE_BUILDTIME: string | undefined;
  readonly VITE_VERSION: string | undefined;
  readonly VITE_REVISION: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
