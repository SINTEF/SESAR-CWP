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

  return (<button
    type="button" onClick={handleClick}
    className={classNames({
      'microphone-button': true,
      'microphone-button-is-listening': listening,
      'microphone-button-is-processing': processing,
      'microphone-button-is-error': error,
      'microphone-button-is-success': success,
    })}
  >
    {text}
  </button>);
});
