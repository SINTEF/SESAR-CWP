import * as React from 'react';
import {
  Button, Dropdown, DropdownButton, Modal,
} from 'react-bootstrap';

import { configurationStore } from './state';

// Need to create a role configuration file for the exercise to access the different roles

export default function ControllerModal(properties) {
  const { onHide, show } = properties;
  const [controllerPlaceholder, setControllerPlaceholder] = React.useState('Select Controller');
  const [controller, setController] = React.useState('OTHER');
  React.useEffect(() => {
    configurationStore.setCurrentCWP(controller);
  }, [controller]);
  const handleSelect = (targetValue) => {
    setController(targetValue);
    setControllerPlaceholder(targetValue);
  };
  return (
    <Modal
      show={show}
      // size="lg"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose Controller
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <DropdownButton onSelect={handleSelect} title={controllerPlaceholder} variant="secondary" id="controller-dropdown">
          <Dropdown.Item eventKey="CWP_NW">CWP_NW</Dropdown.Item>
          <Dropdown.Item eventKey="CWP_NE">CWP_NE</Dropdown.Item>
          <Dropdown.Item eventKey="CWP_SE">CWP_SE</Dropdown.Item>
          <Dropdown.Item eventKey="Master">Master</Dropdown.Item>
        </DropdownButton>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Start
        </Button>
      </Modal.Footer>
    </Modal>

  );
}
