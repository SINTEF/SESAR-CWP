import { observer } from 'mobx-react-lite';
import React from 'react';

import { cwpStore } from '../state';

export default observer(function HugeNextText({ text }) {
  const { showNextSectorsConfiguration } = cwpStore;

  if (!showNextSectorsConfiguration) {
    return null;
  }

  return (<div className="huge-next-text">
    <span>NEXT SECTORS</span>
  </div>);
});
