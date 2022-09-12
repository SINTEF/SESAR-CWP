import './VoiceCommandFeedback.css';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { ProcessingCommandStatus } from '../model/VoiceStore';
import { voiceStore } from '../state';

export default observer(function VoiceCommandFeedback() {
  const { currentText, processingCommandStatus: processingCommand } = voiceStore;

  if (currentText === '') {
    return null;
  }

  const processing = processingCommand === ProcessingCommandStatus.Processing;
  const error = processingCommand === ProcessingCommandStatus.Error;
  const success = processingCommand === ProcessingCommandStatus.Success;

  return (<div className={classNames({
    'voice-command-feedback': true,
    'voice-command-feedback-processing': processing,
    'voice-command-feedback-error': error,
    'voice-command-feedback-success': success,
  })}>
    <div className="voice-command-feedback-text">
      {currentText}
    </div>
  </div>);
});
