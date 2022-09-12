
import dotenv from 'dotenv';
import got from 'got';

dotenv.config();

const {
  AZURE_SPEECH_KEY: speechKey,
  AZURE_SPEECH_REGION: speechRegion,
} = process.env;

if (!speechKey) {
  throw new Error('AZURE_SPEECH_KEY is not set');
}
if (!speechRegion) {
  throw new Error('AZURE_SPEECH_REGION is not set');
}


export interface SpeechToken {
  token: string;
  region: string;
}

export default async function getSpeechToken(): Promise<SpeechToken> {
  const region = speechRegion as string;

  const tokenResponse = await got({
    method: 'POST',
    url: `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
    headers: {
      'Ocp-Apim-Subscription-Key': speechKey,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).text();

  return {
    token: tokenResponse,
    region,
  };
}
