import fastifyBearerAuth from '@fastify/bearer-auth';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import ExpiryMap from 'expiry-map';
import fastify from 'fastify';
import got from 'got';
import { Configuration as OpenAIConfiguration, OpenAIApi } from 'openai';
import pMemoize from 'p-memoize';
import pino from 'pino';

import promptText from './prompt.js';

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

const server = fastify({
  logger: {
    stream: pino.multistream([
      { stream: process.stdout },
      { stream: pino.destination('./error.log') },
    ]),
  }, 
});

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
    prompt: `${promptText}\n\n${prompt}`,
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
  const body = request.body as string;
  if (typeof body !== 'string') {
    reply.statusCode = 400;
    await reply.send({ error: 'Invalid body' });
  }
  const command = await textToCommandWithCache(body);
  request.log.info({
    type: 'text-to-command', body, command, 
  });
  await reply.send(command);
});

server.listen({ port: 3001 }, (error, address) => {
  if (error) {
    throw error;
  }
});
