/**
 * This component consists of 3 small lights that indicate the state of the MQTT connection.
 *
 * This component does not use mobx, to make things as lightweight as possible.
 */

import './MqttIndicators.css';

import React, { Component } from 'react';

import {
  onConnect, onDisconnect, onPacketReceive, onPacketSend,
} from '../mqtt/mqtt';

const DEBOUNCE_DELAY = 128;

export default class MqttIndicators extends Component<unknown, {
  connected: boolean,
  sending: boolean,
  receiving: boolean,
}> {
  blinkingDelay: number;

  receiveStartTimeoutId: number;

  receiveEndTimeoutId: number;

  sendStartTimeoutId: number;

  sendEndTimeoutId: number;

  connectDisconnectTimeoutId: number;

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

    this.receiveStartTimeoutId = 0;
    this.receiveEndTimeoutId = 0;
    this.sendStartTimeoutId = 0;
    this.sendEndTimeoutId = 0;

    this.connectDisconnectTimeoutId = 0;

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

  private onConnectDisconnect(connected: boolean): void {
    if (this.connectDisconnectTimeoutId !== 0) {
      window.clearTimeout(this.connectDisconnectTimeoutId);
    }
    this.connectDisconnectTimeoutId = window.setTimeout(() => {
      this.setState({ connected });
      this.connectDisconnectTimeoutId = 0;
    }, DEBOUNCE_DELAY);
  }

  onConnect(): void {
    this.onConnectDisconnect(true);
  }

  onDisconnect(): void {
    this.onConnectDisconnect(false);
  }

  onPacketReceive(): void {
    if (this.receiveStartTimeoutId === 0) {
      if (this.receiveEndTimeoutId !== 0) {
        window.clearTimeout(this.receiveEndTimeoutId);
        this.receiveEndTimeoutId = 0;
      }
      this.receiveStartTimeoutId = window.setTimeout(() => {
        this.receiveStartTimeoutId = 0;
        this.setState({ receiving: true });
        this.receiveEndTimeoutId = window.setTimeout(() => {
          this.setState({ receiving: false });
        }, this.blinkingDelay);
      }, DEBOUNCE_DELAY);
    }
  }

  onPacketSend(): void {
    if (this.sendStartTimeoutId === 0) {
      if (this.sendEndTimeoutId !== 0) {
        window.clearTimeout(this.sendEndTimeoutId);
        this.sendEndTimeoutId = 0;
      }
      this.sendStartTimeoutId = window.setTimeout(() => {
        this.sendStartTimeoutId = 0;
        this.setState({ sending: true });
        this.sendEndTimeoutId = window.setTimeout(() => {
          this.setState({ sending: false });
        }, this.blinkingDelay);
      }, DEBOUNCE_DELAY);
    }
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
