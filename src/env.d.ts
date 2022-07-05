/* eslint-disable unicorn/prevent-abbreviations */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VOICE_SDK_TOKEN: string | undefined;
  readonly VITE_MAPBOX_ACCESS_TOKEN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
