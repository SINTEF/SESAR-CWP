import { transaction } from 'mobx';
import mqtt from 'mqtt';
import type { IClientPublishOptions } from 'mqtt';

import router from './router';
import topics from './topics';

function createClient(): mqtt.Client {
  const MQTT_BROKER_URL = import.meta.env.VITE_MQTT_BROKER_URL;

  let brokerUrl: string;
  if (MQTT_BROKER_URL) {
    brokerUrl = MQTT_BROKER_URL;
  } else if (/^(localhost|127(?:\.\d{1,3}){2}.\d{1,3}|\[:{2}1])(:\d+)?$/.test(window.location.host)) {
    brokerUrl = 'ws://localhost:9001/mqtt';
  } else {
    const isHTTPS = window.location.protocol === 'https:';
    brokerUrl = `${isHTTPS ? 'wss' : 'ws'}://${window.location.host}/mqtt`;
  }

  return mqtt.connect(brokerUrl);
}

const client = createClient();

client.addListener('connect', () => {
  client.subscribe(topics, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to subscribe to MQTT topics', error);
    }
  });
});

type MqttOnCallback = () => void;
type MqttOffCallback = () => void;

export function onConnect(callback: MqttOnCallback): MqttOffCallback {
  if (client.connected) {
    callback();
  }
  client.addListener('connect', callback);
  return () => client.removeListener('connect', callback);
}

export function onDisconnect(callback: MqttOffCallback): MqttOffCallback {
  if (!client.connected) {
    callback();
  }
  client.addListener('close', callback);
  return () => client.removeListener('close', callback);
}

export function onPacketReceive(callback: MqttOnCallback): MqttOffCallback {
  client.addListener('packetreceive', callback);
  return () => client.removeListener('packetreceive', callback);
}

export function onPacketSend(callback: MqttOnCallback): MqttOffCallback {
  client.addListener('packetsend', callback);
  return () => client.removeListener('packetsend', callback);
}

let incomingMessagesQueue: { topic: string, message: Buffer }[] = [];
let incomingMessagesBatchId = 0;

function processIncomingMessages(): void {
  transaction(() => {
    incomingMessagesBatchId = 0;
    for (const { topic, message } of incomingMessagesQueue) {
      // Ignore empty messages (they are most likely deletion messages)
      if (message.length > 0) {
        try {
          router(topic, message);
        } catch (error) {
        // eslint-disable-next-line no-console
          console.error('Error while handling MQTT message', error);
        }
      }
    }
  });

  incomingMessagesQueue = [];
}

client.addListener('message', (topic: string, message: Buffer) => {
  incomingMessagesQueue.push({ topic, message });
  if (incomingMessagesBatchId === 0) {
    incomingMessagesBatchId = window.setTimeout(processIncomingMessages, 100);
  }
});

export function publish(
  topic: string,
  message: string | { [key: string]: unknown },
  settings?: IClientPublishOptions,
) : Promise<void> {
  const messageData = typeof message === 'string' ? message : JSON.stringify(message);

  return new Promise((resolve, reject) => {
    client.publish(topic, messageData, {
      qos: 1,
      ...settings,
    }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
