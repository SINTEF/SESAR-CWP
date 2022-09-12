import fastifyBearerAuth from '@fastify/bearer-auth';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import fastify from 'fastify';
import pino from 'pino';

import getSpeechToken from './getSpeechToken.js';
import textToCommandWithCache from './textToCommand.js';

dotenv.config();

const {
  BEARER_AUTH_KEYS: bearerAuthKeys,
  LOG_FILE_PATH: logFilePath,
  CORS_REGEX: corsRegex,
} = process.env;


if (!bearerAuthKeys) {
  throw new Error('BEARER_AUTH_KEYS is not set');
}

const server = fastify({
  logger: {
    stream: pino.multistream([
      { stream: process.stdout },
      { stream: pino.destination(logFilePath ?? './error.log') },
    ]),
  }, 
});

await server.register(fastifyCors, {
  origin: new RegExp(corsRegex ?? '^https?:\\/\\/localhost(:\\d+)?$'),
});

// Setup simple authentication
await server.register(fastifyBearerAuth, {
  keys: new Set(bearerAuthKeys.split(',').map((s) => s.trim())),
});


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

server.listen({ port: 3001 }, (error) => {
  if (error) {
    throw error;
  }
});
