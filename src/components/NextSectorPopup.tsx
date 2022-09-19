import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

import { handlePublishPromise, tentativeFlight } from '../mqtt/publishers';
import { configurationStore, cwpStore, roleConfigurationStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function NextSectorPopup(properties: {
  aircraft: AircraftModel,
}) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    aircraftId,
    assignedFlightId,
    controlledBy,
    setNextSectorController,
  } = properties.aircraft;

  const { listOfAllControllers } = roleConfigurationStore;
  const [controllerPlaceholder, setControllerPlaceholder] = React.useState(controlledBy);
  const shouldShow = cwpStore.aircraftsWithSectorPopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeNextSectorPopupForAircraft(aircraftId);

  const handleSelect = (value: string | null): void => {
    if (value) {
      setControllerPlaceholder(value);
    }
  };
  const submit = (): void => {
    setNextSectorController(controllerPlaceholder);
    if (configurationStore.currentCWP === 'All') {
      handlePublishPromise(
        tentativeFlight('All', controllerPlaceholder, assignedFlightId),
      );
    } else {
      handlePublishPromise(
        tentativeFlight(controlledBy, controllerPlaceholder, assignedFlightId),
      );
    }
    close();
  };

  return (
    <div
      className="next-sector-popup"
    >
      <div>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle className="btn btn-light dropdown-button">
            {controllerPlaceholder}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {listOfAllControllers.map(
              (name) => (<Dropdown.Item eventKey={name} key={name}>{name}</Dropdown.Item>))}

          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="submit-cancel-buttons">
        <Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button>
        <Button onClick={submit} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Submit</Button>
      </div>
    </div>
  );
});
