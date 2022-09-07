import { observer } from 'mobx-react-lite';
import React from 'react';

import { configurationStore } from '../state';

export default observer(function HugeNextText() {
  const { shouldShowNextConfiguration } = configurationStore;

  if (!shouldShowNextConfiguration) {
    return null;
  }

  return (<div className="huge-next-text">
    <span>NEXT SECTORS</span>
  </div>);
});
