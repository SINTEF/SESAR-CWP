import 'microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle';

import type * as SpeechSDKType from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/microsoft.cognitiveservices.speech.sdk';

declare global {
  interface Window {
    SpeechSDK: {
      AudioConfig: typeof SpeechSDKType.AudioConfig;
      OutputFormat: typeof SpeechSDKType.OutputFormat;
      Recognizer: typeof SpeechSDKType.Recognizer;
      SpeechConfig: typeof SpeechSDKType.SpeechConfig;
      SpeechRecognizer: typeof SpeechSDKType.SpeechRecognizer;
    };
  }
}

const {
  AudioConfig, OutputFormat, Recognizer, SpeechConfig, SpeechRecognizer,
} = window.SpeechSDK;

const AUTHORIZATION_ENDPOINT = import.meta.env.VITE_VOICE_SDK_TOKEN ?? 'http://localhost:3001/api/get-speech-token';

interface AuthorizationToken {
  token: string;
  region: string;
}

async function RequestAuthorizationToken(): Promise<AuthorizationToken> {
  // HTTP Get on the authorization endpoint
  // using the Fetch API, it returns a JSON
  const response = await fetch(AUTHORIZATION_ENDPOINT);
  return await response.json() as AuthorizationToken;
}

Recognizer.enableTelemetry(false);

async function StartUp(): Promise<SpeechSDKType.SpeechRecognizer> {
  const { token, region } = await RequestAuthorizationToken();
  const speechConfiguration = SpeechConfig.fromAuthorizationToken(
    token, region,
  );
  // Enable detailed output
  speechConfiguration.outputFormat = OutputFormat.Detailed;
  // English
  speechConfiguration.speechRecognitionLanguage = 'en-GB';

  const audioConfiguration = AudioConfig.fromDefaultMicrophoneInput();

  const recognizer = new SpeechRecognizer(speechConfiguration, audioConfiguration);

  recognizer.recognizing = (
    sender: SpeechSDKType.Recognizer, event: SpeechSDKType.SpeechRecognitionEventArgs,
  ): void => {
    const { result: { text } } = event;
    console.log(text);
  };

  return recognizer;
}

let startupPromise: Promise<SpeechSDKType.SpeechRecognizer> | undefined;

export default async function VoiceExample(): Promise<void> {
  if (!startupPromise) {
    startupPromise = StartUp();
  }
  const recognizer = await startupPromise;

  const result = await new Promise<SpeechSDKType.SpeechRecognitionResult>((resolve, reject) => {
    recognizer.recognizeOnceAsync(resolve, reject);
  });

  console.log(result);
}
