import { observer } from 'mobx-react-lite';
import React from 'react';

import { configurationStore } from '../state';

export default observer(function HugeNextText() {
  const { shouldShowNextConfiguration } = configurationStore;

  if (!shouldShowNextConfiguration) {
    return null;
  }

  return (<div className="absolute bottom-2 right-2 text-[2.5rem] text-white/50 z-[100] select-none text-right">
    <span>NEXT SECTORS</span>
  </div>);
});
