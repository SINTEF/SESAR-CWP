import 'microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle';

import type * as SpeechSDKType from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/microsoft.cognitiveservices.speech.sdk';

import { ProcessingCommandStatus } from '../model/VoiceStore';
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
      ProfanityOption: typeof SpeechSDKType.ProfanityOption;
    };
  }
}

const {
  AudioConfig, OutputFormat, Recognizer, SpeechConfig, SpeechRecognizer, ProfanityOption,
} = window.SpeechSDK;

const VOICE_SERVER_BEARER_TOKEN = import.meta.env.VITE_VOICE_SERVER_BEARER_TOKEN;

function getServerEndPoint(): string {
  const voiceServerEndpointConfig = import.meta.env.VITE_VOICE_SERVER_ENDPOINT;
  if (voiceServerEndpointConfig) {
    return voiceServerEndpointConfig;
  }
  if (/^(localhost|127\.\d+\.\d+.\d+|\[::1])(:\d+)?$/.test(window.location.host)) {
    return 'http://localhost:3001/api-v1/';
  }
  const isHTTPS = window.location.protocol === 'https:';
  return `${isHTTPS ? 'https' : 'http'}://${window.location.host}/api-v1/`;
}

const VOICE_SERVER_ENDPOINT = getServerEndPoint();

interface AuthorizationToken {
  token: string;
  region: string;
}

async function RequestAuthorizationToken(): Promise<AuthorizationToken> {
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
  // Enable swear words
  speechConfiguration.setProfanity(ProfanityOption.Raw);
  // English
  speechConfiguration.speechRecognitionLanguage = 'en-GB';

  const audioConfiguration = AudioConfig.fromDefaultMicrophoneInput();

  const recognizer = new SpeechRecognizer(speechConfiguration, audioConfiguration);

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
      voiceStore.setProcessingCommand(ProcessingCommandStatus.Processing);

      TextToCommand(shortFinalText).then((command) => {
        HandleCommand(command);
      }).then(() => {
        voiceStore.setProcessingCommand(ProcessingCommandStatus.Success);
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('voice error', error);
        voiceStore.setProcessingCommand(ProcessingCommandStatus.Error);
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
