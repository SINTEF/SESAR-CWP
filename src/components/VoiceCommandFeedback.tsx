import './VoiceCommandFeedback.css';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { voiceStore } from '../state';

export default observer(function VoiceCommandFeedback() {
  const { currentText, processingCommand } = voiceStore;

  if (currentText === '') {
    return null;
  }

  return (<div className={classNames({
    'voice-command-feedback': true,
    'voice-command-feedback-processing': processingCommand,
  })}>
    <div className="voice-command-feedback-text">
      {currentText}
    </div>
  </div>);
});
