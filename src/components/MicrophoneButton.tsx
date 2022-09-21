import { observer } from 'mobx-react-lite';
import React from 'react';

import { voiceStore } from '../state';
import { ToggleListening } from '../voice/voice';

export default observer(function MicrophoneButton() {
  const [hasErrorState, setHasErrorState] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { listening } = voiceStore;

  const handleClick = (): void => {
    setLoading(true);
    ToggleListening().catch((error): void => {
      setHasErrorState(true);
      // eslint-disable-next-line no-console
      console.error(error);
    }).finally((): void => {
      setLoading(false);
    });
  };

  let text;
  if (loading) {
    text = '⏳ Loading';
  } else if (hasErrorState) {
    text = '❌ Error';
  } else if (listening) {
    text = '🔴 Stop Speech';
  } else {
    text = '🎙 Start Speech';
  }

  return (<button type="button" onClick={handleClick}>
    {text}
  </button>);
});
