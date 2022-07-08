import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  ButtonGroup, Dropdown, DropdownButton,
} from 'react-bootstrap';

import { cwpStore, distanceLineStore } from '../state';

export default observer(function DistanceMeasurementDropdown() {
  const [currentlyActive, setCurrentlyActive] = React.useState('');

  /* eslint-disable @typescript-eslint/unbound-method */
  const {
    activeMeasurements, setCurrentActiveMeasuring, addDistanceMeasurement,
  } = cwpStore;
  const {
    features, removeFeature, markerElements, removeMarker,
  } = distanceLineStore;
  /* eslint-enable @typescript-eslint/unbound-method */

  const AddNewDistance = (color: string): void => {
    if (!activeMeasurements.has(color)) {
      setCurrentActiveMeasuring(color);
    }
    setCurrentlyActive(color);
    addDistanceMeasurement(color);
  };

  const removeDistance = (): void => {
    // Remove the feature from the features array where the feature.properties.color
    // equals currentlyActive
    const featureIndexToRemove = features.findIndex(
      (feature) => feature.properties?.color === currentlyActive,
    );
    if (featureIndexToRemove !== -1) {
      removeFeature(featureIndexToRemove);
    }

    const markerIndexToRemove = markerElements.findIndex(
      (marker) => marker.color === currentlyActive,
    );

    if (markerIndexToRemove !== -1) {
      removeMarker(markerIndexToRemove);
    }
  };

  return (<DropdownButton
    as={ButtonGroup}
    key="distance-measurement-drop-down"
    id="distance-measurement-drop-down"
    drop="up"
    variant="secondary"
    title="R&amp;B"
  >
    <Dropdown.Item eventKey="1" style={{ color: '#ffff00' }} onClick={(): void => AddNewDistance('#ffff00')}>R&amp;B1</Dropdown.Item>
    <Dropdown.Item eventKey="2" style={{ color: '#b7fa2e' }} onClick={(): void => AddNewDistance('#b7fa2e')}>R&amp;B2</Dropdown.Item>
    <Dropdown.Item eventKey="3" style={{ color: '#ed70d1' }} onClick={(): void => AddNewDistance('#ed70d1')}>R&amp;B3</Dropdown.Item>
    <Dropdown.Item eventKey="4" style={{ color: '#fdcb09' }} onClick={(): void => AddNewDistance('#fdcb09')}>R&amp;B4</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item eventKey="5" onClick={(): void => removeDistance()}>CNL</Dropdown.Item>
  </DropdownButton>);
});
