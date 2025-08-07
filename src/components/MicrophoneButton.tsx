import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { ProcessingCommandStatus } from '../model/VoiceStore';
import { voiceStore } from '../state';
import { ToggleListening } from '../voice/voice';

export default observer(function MicrophoneButton() {
  const [hasErrorState, setHasErrorState] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { listening, processingCommandStatus, currentText } = voiceStore;

  const handleClick = (): void => {
    setLoading(true);
    ToggleListening().catch((error): void => {
      setHasErrorState(true);
      // biome-ignore lint/suspicious/noConsole: needed for now
      console.error(error);
    }).finally((): void => {
      setLoading(false);
    });
  };

  React.useEffect(() => {
    const keyDownEventListener = (event: KeyboardEvent): void => {
      if (event.key === '.' || event.key === ',') {
        event.preventDefault();
      }
      if (event.key === '.' && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey && !event.repeat) {
        handleClick();
      }
    };

    document.addEventListener('keydown', keyDownEventListener);
    return (): void => {
      document.removeEventListener('keydown', keyDownEventListener);
    };
  }, []);

  const hasCurrentText = !!currentText;

  const processing = hasCurrentText
    && processingCommandStatus === ProcessingCommandStatus.Processing;
  const error = hasCurrentText
    && processingCommandStatus === ProcessingCommandStatus.Error;
  const success = hasCurrentText
    && processingCommandStatus === ProcessingCommandStatus.Success;

  let text;
  if (listening) {
    text = '🔴 Stop';
  } else if (loading) {
    text = '⏳ Loading';
  } else if (hasErrorState) {
    text = '❌ Error';
  } else {
    text = '🎙 Speak';
  }

  const getButtonClass = () => {
    const baseClass = "h-full text-white text-xs rounded-none border overflow-hidden whitespace-nowrap shrink focus:outline-none focus:shadow-none";
    
    if (listening) {
      return `${baseClass} bg-[#dc3545] border-[#dc3545]`;
    } else if (processing) {
      return `${baseClass} bg-blue-900/50 border-blue-900/50`;
    } else if (error) {
      return `${baseClass} bg-red-800/50 border-red-800/50`;
    } else if (success) {
      return `${baseClass} bg-green-800/50 border-green-800/50`;
    }
    return `${baseClass} bg-[#1e3a5f] border-[#2a5d8f] hover:bg-[#2a5d8f] hover:border-[#4b90db] active:bg-[#366fa3] active:border-[#5aa1e6] focus:border-[#3f77b2]`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={getButtonClass()}
    >
      {text}
    </button>
  );
});
