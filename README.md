# SESAR Controller Working Position

A great user interface to control planes in the sky.

## Adding env values

  1. Add the VITE_MQTT_BROKER_URL (either local VITE_MQTT_BROKER_URL=ws://localhost:9001/mqtt or connected to the running server)


## Getting started

```bash
npm install
npm start
```

## Starting the Voice Server
```
cd server
npm install
npm start
```

## Updating the protobuf files

```bash
npm run protoc
```

## Biome linting
https://biomejs.dev/ migrated from unicorn lint

run `npx @biomejs/biome lint` to check linting

To ignore a rule: `biome-ignore lint/suspicious/noDebugger: <explanation>`

Recommend `biomejs.biome` extension