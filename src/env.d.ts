/* eslint-disable unicorn/prevent-abbreviations */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_ACCESS_TOKEN: string | undefined;
  readonly VITE_VOICE_SERVER_ENDPOINT: string | undefined;
  readonly VITE_VOICE_SERVER_BEARER_TOKEN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
