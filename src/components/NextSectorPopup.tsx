import { observer } from 'mobx-react-lite';
import React from 'react';

import { handlePublishPromise, tentativeFlight } from '../mqtt/publishers';
import { configurationStore, cwpStore, roleConfigurationStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function NextSectorPopup(properties: {
  aircraft: AircraftModel,
}) {
  const {
    aircraftId,
    assignedFlightId,
    controlledBy,
    setNextSectorController,
  } = properties.aircraft;

  const { listOfAllControllers } = roleConfigurationStore;

  const sortedListOfAllControllers = [...listOfAllControllers];
  const collator = new Intl.Collator([], { numeric: true });
  sortedListOfAllControllers.sort((a, b) => collator.compare(a, b));

  const [controllerPlaceholder, setControllerPlaceholder] = React.useState(controlledBy);
  const shouldShow = cwpStore.aircraftsWithSectorPopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeNextSectorPopupForAircraft(aircraftId);

  const handleSelect = (value: string): void => {
    setControllerPlaceholder(value);
  };
  const submit = (): void => {
    if (controllerPlaceholder === 'OTHER') {
      setNextSectorController('All');
      if (controlledBy === 'OTHER') {
        handlePublishPromise(tentativeFlight('All', 'All', assignedFlightId));
      } else {
        handlePublishPromise(tentativeFlight(controlledBy, 'All', assignedFlightId));
      }
    } else {
      setNextSectorController(controllerPlaceholder);
      if (configurationStore.currentCWP === 'All') {
        handlePublishPromise(
          tentativeFlight('All', controllerPlaceholder, assignedFlightId),
        );
      } else if (controlledBy === 'OTHER') {
        handlePublishPromise(tentativeFlight('All', controllerPlaceholder, assignedFlightId));
      } else {
        handlePublishPromise(
          tentativeFlight(controlledBy, controllerPlaceholder, assignedFlightId),
        );
      }
    }
    close();
  };

  return (
    <div className="bg-gray-700/50 rounded-sm p-1 w-[124px] relative">
      <div>
        <div className="dropdown dropdown-bottom">
          <label tabIndex={0} className="btn btn-xs w-24 h-12 text-xs leading-0 m-0 p-0 bg-white text-black rounded-none">
            {controllerPlaceholder === 'All' ? 'Master' : controllerPlaceholder}
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-60 overflow-y-auto">
            {sortedListOfAllControllers.map(
              (name) => (
                <li key={name}>
                  <a onClick={() => handleSelect(name)}>
                    {name === 'All' ? 'Master' : name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-0.5 mt-1 justify-between">
        <button onClick={close} className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2">Cancel</button>
        <button onClick={submit} className="btn btn-sm btn-outline flex-grow h-8 text-xs px-0 rounded-none border-2">Submit</button>
      </div>
    </div>
  );
});