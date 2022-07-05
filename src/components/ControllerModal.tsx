import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  Modal, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';

import { configurationStore, cwpStore } from '../state';

// Need to create a role configuration file for the exercise to access the different roles
const controllers = [
  'CWP_NW',
  'CWP_NE',
  'CWP_S',
  'All',
];

export default observer(function ControllerModal() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { showControllerSelection, toggleControllerSelection } = cwpStore;

  const controller = configurationStore.currentCWP;
  const handleSelect = (targetValue: string): void => {
    configurationStore.setCurrentCWP(targetValue);
    toggleControllerSelection();
  };

  // True if the controller has already been selected
  const secondSelection = controllers.includes(controller);

  return (
    <Modal
      show={showControllerSelection}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="controller-modal"
      centered
      onHide={(): void => toggleControllerSelection()}
      keyboard={secondSelection}
      backdrop={secondSelection ? true : 'static'}
    >
      <Modal.Header closeButton={secondSelection}>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose Controller
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <ToggleButtonGroup onChange={handleSelect} name="controllers-radio" value={controller}>
          {controllers.map(
            (name) => (<ToggleButton value={name} id={name} key={name}>{name}</ToggleButton>))}
        </ToggleButtonGroup>
      </Modal.Body>
    </Modal>

  );
});
