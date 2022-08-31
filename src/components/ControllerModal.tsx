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
  'Master',
];

export default observer(function ControllerModal() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { showControllerSelection, toggleControllerSelection, setPseudoPilot } = cwpStore;
  const [pseudoPilots, setPseudoPilotsList] = React.useState<string[]>([]);
  const [selectedCWP, setSelectedCWP] = React.useState<string>('');
  const controller = configurationStore.currentCWP;
  const handleSelect = (targetValue: string): void => {
    const valueSplit = targetValue.split(' ');
    const cwp = valueSplit[0];
    setSelectedCWP(targetValue);
    const pseudo = valueSplit[1];
    if (pseudo === 'PseudoPilot') {
      setPseudoPilot(true);
    } else {
      setPseudoPilot(false);
    }
    configurationStore.setCurrentCWP(cwp);
    toggleControllerSelection();
  };
  React.useEffect(() => {
    const listPseudoPilots = controllers.filter((control) => control !== 'Master').map((control) => `${control} PseudoPilot`);
    setPseudoPilotsList(listPseudoPilots);
  }, [controllers]); // Temporary controllers, before we get the names

  // True if the controller has already been selected
  const secondSelection = controllers.includes(controller) || controller === 'All';

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

        <ToggleButtonGroup onChange={handleSelect} name="controllers-radio" value={selectedCWP}>
          {controllers.map(
            (name) => (<ToggleButton value={name === 'Master' ? 'All' : name} id={name === 'Master' ? 'All' : name} key={name === 'Master' ? 'All' : name}>{name}</ToggleButton>))}
        </ToggleButtonGroup>
        <br/>
        <br/>
        <ToggleButtonGroup onChange={handleSelect} name="pseudo-pilot-radio" value={selectedCWP}>
          {pseudoPilots.map(
            (name) => (<ToggleButton value={name} id={name} key={name}>{name}</ToggleButton>))}
        </ToggleButtonGroup>
      </Modal.Body>
    </Modal>

  );
});
