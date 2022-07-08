import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  ButtonGroup, Dropdown, DropdownButton,
} from 'react-bootstrap';

import { cwpStore, distanceLineStore } from '../state';

export default observer(function DistanceMeasurementDropdown() {
  /* eslint-disable @typescript-eslint/unbound-method */
  const {
    currentDistanceColor, setCurrentDistanceColor,
  } = cwpStore;
  const {
    removeColor,
  } = distanceLineStore;
  /* eslint-enable @typescript-eslint/unbound-method */

  const removeDistance = (): void => {
    if (currentDistanceColor !== '') {
      removeColor(currentDistanceColor);
    }
    setCurrentDistanceColor('');
  };

  return (<DropdownButton
    as={ButtonGroup}
    key="distance-measurement-drop-down"
    id="distance-measurement-drop-down"
    drop="up"
    variant="secondary"
    title="R&amp;B"
    style={{
      backgroundColor: (currentDistanceColor || '#aaaaaa'),
      color: (currentDistanceColor ? 'black' : 'white'),
    }}
  >
    <Dropdown.Item eventKey="1" style={{ color: '#ffff00' }} onClick={(): void => setCurrentDistanceColor('#ffff00')}>R&amp;B1</Dropdown.Item>
    <Dropdown.Item eventKey="2" style={{ color: '#b7fa2e' }} onClick={(): void => setCurrentDistanceColor('#b7fa2e')}>R&amp;B2</Dropdown.Item>
    <Dropdown.Item eventKey="3" style={{ color: '#ed70d1' }} onClick={(): void => setCurrentDistanceColor('#ed70d1')}>R&amp;B3</Dropdown.Item>
    <Dropdown.Item eventKey="4" style={{ color: '#fdcb09' }} onClick={(): void => setCurrentDistanceColor('#fdcb09')}>R&amp;B4</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item
      eventKey="5"
      onClick={(): void => removeDistance()}
      disabled={currentDistanceColor === ''}
    >CNL</Dropdown.Item>
  </DropdownButton>);
});
