/**
 * This component consists of 3 small lights that indicate the state of the MQTT connection.
 *
 * This component does not use mobx, to make things as lightweight as possible.
 */

import './MqttIndicators.css';

import React, { Component } from 'react';

import {
  onConnect, onDisconnect, onPacketReceive, onPacketSend,
} from '../mqtt';

export default class MqttIndicators extends Component<never, {
  connected: boolean,
  sending: boolean,
  receiving: boolean,
}> {
  blinkingDelay: number;

  receiveTimeoutId: number;

  sendTimeoutId: number;

  removeOnConnect?: () => void;

  removeOnDisconnect?: () => void;

  removeOnPacketReceive?: () => void;

  removeOnPacketSend?: () => void;

  constructor(properties: never) {
    super(properties);

    this.state = {
      connected: false,
      receiving: false,
      sending: false,
    };

    this.blinkingDelay = 100;

    this.receiveTimeoutId = 0;
    this.sendTimeoutId = 0;

    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onPacketReceive = this.onPacketReceive.bind(this);
    this.onPacketSend = this.onPacketSend.bind(this);
  }

  componentDidMount(): void {
    /* eslint-disable @typescript-eslint/unbound-method */
    this.removeOnConnect = onConnect(this.onConnect);
    this.removeOnDisconnect = onDisconnect(this.onDisconnect);
    this.removeOnPacketReceive = onPacketReceive(this.onPacketReceive);
    this.removeOnPacketSend = onPacketSend(this.onPacketSend);
    /* eslint-enable @typescript-eslint/unbound-method */
  }

  componentWillUnmount(): void {
    this.removeOnConnect?.();
    this.removeOnDisconnect?.();
    this.removeOnPacketReceive?.();
    this.removeOnPacketSend?.();
  }

  onConnect(): void {
    this.setState({ connected: true });
  }

  onDisconnect(): void {
    this.setState({ connected: false });
  }

  onPacketReceive(): void {
    this.setState({ receiving: true });
    clearTimeout(this.receiveTimeoutId);
    this.receiveTimeoutId = window.setTimeout(() => {
      this.setState({ receiving: false });
    }, this.blinkingDelay);
  }

  onPacketSend(): void {
    this.setState({ sending: true });
    clearTimeout(this.sendTimeoutId);
    this.sendTimeoutId = window.setTimeout(() => {
      this.setState({ sending: false });
    }, this.blinkingDelay);
  }

  render(): JSX.Element {
    const { connected, receiving, sending } = this.state;
    return (
      <div className="mqtt-indicators">
        <div className={connected ? 'connected' : ''} />
        <div className={receiving ? 'receiving' : ''} />
        <div className={sending ? 'sending' : ''} />
      </div>
    );
  }
}
