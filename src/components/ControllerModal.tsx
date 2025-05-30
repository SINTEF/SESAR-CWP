import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  Modal, Spinner, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';

import { configurationStore, cwpStore, roleConfigurationStore } from '../state';

export default observer(function ControllerModal() {
  const { showControllerSelection, toggleControllerSelection, setPseudoPilot } = cwpStore;
  const [selectedCWP, setSelectedCWP] = React.useState<string>('');
  const listOfControllers = roleConfigurationStore.listOfAllControllers;
  const pseudoPilots = roleConfigurationStore.listOfAllPseudoControllers;
  const controller = configurationStore.currentCWP;
  const controllersWithoutAll = listOfControllers.filter((cwp) => cwp !== 'All');
  const listOfAll = [...controllersWithoutAll, ...pseudoPilots, 'All'];

  const collator = new Intl.Collator([], { numeric: true });
  pseudoPilots.sort((a, b) => collator.compare(a, b));
  controllersWithoutAll.sort((a, b) => collator.compare(a, b));

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

  // True if the controller has already been selected
  const secondSelection = listOfAll.includes(controller);

  const isLoading = listOfAll.length === 1;

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
        <Modal.Title>
          Choose Controller
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { isLoading ? (
          <div>
            <Spinner animation="border" variant="light" />
            <br/>
            <br/>
          </div>
        ) : null}
        <ToggleButtonGroup onChange={handleSelect} name="controllers-radio" value={selectedCWP}>
          {controllersWithoutAll.map(
            (name) => (<ToggleButton value={name} id={name} key={name}>{name}</ToggleButton>))}
        </ToggleButtonGroup>
        <br/>
        <br/>
        <ToggleButtonGroup onChange={handleSelect} name="pseudo-pilot-radio" value={selectedCWP}>
          {pseudoPilots.map(
            (name) => (<ToggleButton value={name} id={name} key={name}>{name}</ToggleButton>))}
        </ToggleButtonGroup>
        <br/>
        <br/>
        <ToggleButtonGroup onChange={handleSelect} name="controllers-radio" value={selectedCWP}>
          <ToggleButton value="All" id="All" key="All">Master</ToggleButton>
        </ToggleButtonGroup>
      </Modal.Body>
    </Modal>

  );
});
