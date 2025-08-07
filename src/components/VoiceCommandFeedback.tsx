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

  const getBackgroundColor = () => {
    if (processing) { return 'bg-blue-900/50'; }
    if (error) { return 'bg-red-700/50'; }
    if (success) { return 'bg-green-700/50'; }
    return 'bg-black/50';
  };

  return (
    <div className="absolute bottom-12 left-0 right-0 text-center text-2xl leading-relaxed z-[9999]">
      <div className={classNames(
        "inline-block px-4 rounded backdrop-blur-sm text-white",
        getBackgroundColor()
      )}>
        {currentText}
      </div>
    </div>
  );
});
