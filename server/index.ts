import fastifyBearerAuth from '@fastify/bearer-auth';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import ExpiryMap from 'expiry-map';
import fastify from 'fastify';
import got from 'got';
import { Configuration as OpenAIConfiguration, OpenAIApi } from 'openai';
import pMemoize from 'p-memoize';

dotenv.config();

const {
  AZURE_SPEECH_KEY: speechKey,
  AZURE_SPEECH_REGION: speechRegion,
  BEARER_AUTH_KEYS: bearerAuthKeys,
  OPENAI_API_KEY: openaiApiKey,
} = process.env;

if (!speechKey) {
  throw new Error('AZURE_SPEECH_KEY is not set');
}
if (!speechRegion) {
  throw new Error('AZURE_SPEECH_REGION is not set');
}

if (!openaiApiKey) {
  throw new Error('OPENAI_API_KEY is not set');
}

if (!bearerAuthKeys) {
  throw new Error('BEARER_AUTH_KEYS is not set');
}

const configuration = new OpenAIConfiguration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

const server = fastify();

await server.register(fastifyCors, {
  origin: /^https?:\/\/localhost(:\d+)?$/,
});

// Setup simple authentication
await server.register(fastifyBearerAuth, {
  keys: new Set(bearerAuthKeys.split(',').map((s) => s.trim())),
});

interface SpeechToken {
  token: string;
  region: string;
}

async function getSpeechToken(): Promise<SpeechToken> {
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

async function textToCommand(text: string): Promise<string> {
  let prompt = text.trim();
  // Add a dot at the end of the prompt if it ends with a non punctuation character
  if (prompt.length > 0 && !/[!.?]$/.test(prompt)) {
    prompt += '.';
  }

  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `An air traffic controller can use his computer through voice commands. Convert this text to a programmatic command. A command can take some optional parameters.\n\nThe commands are:\n\n - show-flight: Move the map to a specific flight, the current one the one identified by the optional call sign argument.\n - acknwoledge-flight: Acknowledge the controller responsability on a flight, the current one or the optional call sign argument.\n - speed-vectors: Toggle (on/off) the speed vectors, showing where the flights are going to be in the future based on their current speed and bearing.\n - flight-labels: Toggle (on/off) the flight labels, containing information about the planes on the map radar view.\n - invalid-command: The default command when it is invalid.\n\nExample: Show me the speed vectors.\nOutput: speed-vectors on\n\nExample: Hide the flight labels.\nOutput: flight-labels off\n\nExample: Where is the flight SAS283 ?\nOutput: show-flight SAS283\n\n${prompt}`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  let responseText = response.data.choices?.[0]?.text?.trim() ?? '';

  // Remove the text starting with "Output:"
  responseText = responseText.replace(/^output:\s*/i, '');

  return responseText;
}

const textToCommandCache = new ExpiryMap(/** 120 minutes */ 120 * 60 * 1000);
const textToCommandWithCache = pMemoize(
  textToCommand, { cache: textToCommandCache },
);

server.get('/api-v1/get-speech-token', async (request, reply) => {
  //
  await reply.send(await getSpeechToken());
});

server.post('/api-v1/text-to-command', async (request, reply) => {
  await reply.send(await textToCommandWithCache(request.body as string));
});

server.listen({ port: 3001 }, (error, address) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log(`Server listening at ${address}`);
});
