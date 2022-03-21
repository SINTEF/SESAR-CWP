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

export default class MqttIndicators extends Component {
  constructor() {
    super();

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

  componentDidMount() {
    this.removeOnConnect = onConnect(this.onConnect);
    this.removeOnDisconnect = onDisconnect(this.onDisconnect);
    this.removeOnPacketReceive = onPacketReceive(this.onPacketReceive);
    this.removeOnPacketSend = onPacketSend(this.onPacketSend);
  }

  componentWillUnmount() {
    this.removeOnConnect();
    this.removeOnDisconnect();
    this.removeOnPacketReceive();
    this.removeOnPacketSend();
  }

  onConnect() {
    this.setState({ connected: true });
  }

  onDisconnect() {
    this.setState({ connected: false });
  }

  onPacketReceive() {
    this.setState({ receiving: true });
    clearTimeout(this.receiveTimeoutId);
    this.receiveTimeoutId = setTimeout(() => {
      this.setState({ receiving: false });
    }, this.blinkingDelay);
  }

  onPacketSend() {
    this.setState({ sending: true });
    clearTimeout(this.sendTimeoutId);
    this.sendTimeoutId = setTimeout(() => {
      this.setState({ sending: false });
    }, this.blinkingDelay);
  }

  render() {
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
