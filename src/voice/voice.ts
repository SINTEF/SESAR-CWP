import 'microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle';

import type * as SpeechSDKType from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/microsoft.cognitiveservices.speech.sdk';

import { voiceStore } from '../state';
import HandleCommand from './commands';

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

const VOICE_SERVER_ENDPOINT = import.meta.env.VITE_VOICE_SERVER_ENDPOINT ?? 'http://localhost:3001/api-v1/';
const VOICE_SERVER_BEARER_TOKEN = import.meta.env.VITE_VOICE_SERVER_BEARER_TOKEN;

interface AuthorizationToken {
  token: string;
  region: string;
}

async function RequestAuthorizationToken(): Promise<AuthorizationToken> {
  if (!VOICE_SERVER_ENDPOINT) {
    throw new Error('VITE_VOICE_SERVER_ENDPOINT is not set');
  }
  if (!VOICE_SERVER_BEARER_TOKEN) {
    throw new Error('VITE_VOICE_SERVER_BEARER_TOKEN is not set');
  }
  // HTTP Get on the authorization endpoint
  // using the Fetch API, it returns a JSON
  const response = await fetch(`${VOICE_SERVER_ENDPOINT}get-speech-token`, {
    headers: {
      Authorization: `Bearer ${VOICE_SERVER_BEARER_TOKEN}`,
    },
  });
  return await response.json() as AuthorizationToken;
}

async function TextToCommand(text: string): Promise<string> {
  if (!VOICE_SERVER_ENDPOINT) {
    throw new Error('VITE_VOICE_SERVER_ENDPOINT is not set');
  }
  if (!VOICE_SERVER_BEARER_TOKEN) {
    throw new Error('VITE_VOICE_SERVER_BEARER_TOKEN is not set');
  }
  const response = await fetch(`${VOICE_SERVER_ENDPOINT}text-to-command`, {
    headers: {
      Authorization: `Bearer ${VOICE_SERVER_BEARER_TOKEN}`,
      'Content-Type': 'text/plain',
    },
    method: 'POST',
    body: text,
  });
  return await response.text();
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

  // recognizer.sessionStarted = onSessionStarted;

  // The 'sessionStopped' event signals that the current interaction with the speech
  // service has ended and audio has stopped flowing.
  // recognizer.sessionStopped = onSessionStopped;

  recognizer.recognizing = (
    sender: SpeechSDKType.Recognizer, event: SpeechSDKType.SpeechRecognitionEventArgs,
  ): void => {
    const { result: { text } } = event;
    voiceStore.setCurrentText(text);
  };

  recognizer.recognized = (
    sender: SpeechSDKType.Recognizer, event: SpeechSDKType.SpeechRecognitionEventArgs,
  ): void => {
    const { result: { text } } = event;
    const shortFinalText = text?.trim() ?? '';
    if (shortFinalText !== '') {
      voiceStore.setProcessingCommand(true);
      TextToCommand(shortFinalText).then((command) => {
        HandleCommand(command);
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('voice error', error);
      }).finally(() => {
        voiceStore.setProcessingCommand(false);
      });
    }
  };

  return recognizer;
}

let startupPromise: Promise<SpeechSDKType.SpeechRecognizer> | undefined;
let stoppingPromise: Promise<void> | undefined;

export async function StartContinousListening(): Promise<void> {
  try {
    if (stoppingPromise) {
      await stoppingPromise;
    }

    if (!startupPromise) {
      startupPromise = StartUp();
    }
    const recognizer = await startupPromise;

    /*
    const result = await new Promise<SpeechSDKType.SpeechRecognitionResult>(
      (resolve, reject) => {
      recognizer.recognizeOnceAsync(resolve, reject);
    });
    console.log(result);
    */

    await new Promise<void>((resolve, reject) => {
      recognizer.startContinuousRecognitionAsync(resolve, reject);
    });

    voiceStore.setListening(true);
  } catch (error) {
    voiceStore.setListening(false);
    throw error;
  }
}

export async function StopContinuousListening(): Promise<void> {
  // If we haven't started we are fine
  if (!startupPromise) {
    return;
  }

  const recognizer = await startupPromise;

  stoppingPromise = new Promise<void>((resolve, reject) => {
    recognizer.stopContinuousRecognitionAsync(resolve, reject);
  });

  await stoppingPromise;

  voiceStore.setListening(false);
}

export async function ToggleListening(): Promise<void> {
  await (voiceStore.listening ? StopContinuousListening() : StartContinousListening());
}
