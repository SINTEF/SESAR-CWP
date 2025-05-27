import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';

import {
  changeFlightLevelOfAircraft,
  handlePublishPromise,
  persistACCFlightLevel,
  persistAssignedFlightLevel,
  persistLocalAssignedFlightLevel,
  persistNextSectorFlightLevel,
} from '../mqtt/publishers';
import { configurationStore, cwpStore, roleConfigurationStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

function ListOfLevels(
  properties: {
    value: number,
    onClick: (index: number) => void,
    topFlightLevel: number | undefined,
    bottomFlightLevel: number | undefined,
  },
): JSX.Element {
  const {
    value, onClick, topFlightLevel, bottomFlightLevel,
  } = properties;
  const rows: JSX.Element[] = [];

  const hasLevel = topFlightLevel !== undefined && bottomFlightLevel !== undefined;

  for (let index = 560; index > 200; index -= 10) {
    const isWithinRange = hasLevel && index >= bottomFlightLevel && index <= topFlightLevel;
    rows.push(<Button
        key={index}
        onClick={(): void => onClick(index)}
        className={classnames({
          'flight-level-element': true,
          'flight-level-within-range': isWithinRange,
        })}
        variant="secondary" size="sm"
        data-level={index}
        active={index === value}>
      {index}
    </Button>);
  }

  return (<>{rows}</>);
}

export default observer(function AircraftLevelPopup(properties: { aircraft: AircraftModel }) {
  const {
    aircraftId,
    assignedFlightId,
    lastKnownAltitude: altitude,
    callSign,
    controlledBy,
    setAssignedFlightLevel,
    setLocalAssignedFlightLevel,
    setNextSectorFL,
    setNextACCFL,
  } = properties.aircraft;

  const {
    areaOfIncludedAirspaces,
    currentCWP,
  } = configurationStore;
  const {
    currentControlledSector,
  } = roleConfigurationStore;

  const [flightLevel, setFlightLevel] = React.useState(Math.round(altitude / 10) * 10);
  const listOfLevelsReference = React.createRef<HTMLDivElement>();
  const shouldShow = cwpStore.aircraftsWithLevelPopup.has(aircraftId);

  const airspaceCurrent = areaOfIncludedAirspaces
    .find(({ sectorId }) => sectorId === currentControlledSector);

  const topFlightLevel = airspaceCurrent?.topFlightLevel;
  const bottomFlightLevel = airspaceCurrent?.bottomFlightLevel;

  React.useEffect(() => {
    // Scroll to the level in the list
    const listElement = ([...listOfLevelsReference.current?.children ?? []] as HTMLButtonElement[])
      .find((element) => element.dataset.level === `${flightLevel}`);
    listElement?.scrollIntoView({ block: 'center' });
  }, [flightLevel, shouldShow]);

  const accepted = controlledBy === currentCWP;
  const isMaster = currentCWP === 'All';
  if (!shouldShow) {
    return null;
  }

  const sliderStep = 10;
  const flightLevelMin = 210;
  const flightLevelMax = 560;

  const FlightLevelChange = (direction: 'up' | 'down'): void => {
    const newStepValue = Math.min(flightLevelMax, Math.max(flightLevelMin,
      direction === 'up' ? flightLevel + sliderStep : flightLevel - sliderStep));
    setFlightLevel(newStepValue);
  };

  const close = (): void => cwpStore.closeLevelPopupForAircraft(aircraftId);
  const setFLCP = (): void => {
    const stringFlightLevel = flightLevel.toString();
    if (cwpStore.nextSectorFlActivated) {
      cwpStore.showNSFL(false);
      setNextSectorFL(stringFlightLevel);
      handlePublishPromise(
        persistNextSectorFlightLevel(assignedFlightId, stringFlightLevel),
      );
    } else if (cwpStore.flightLevelNextAccActivated) {
      cwpStore.showFlACC(false);
      setNextACCFL(stringFlightLevel);
      handlePublishPromise(
        persistACCFlightLevel(assignedFlightId, stringFlightLevel),
      );
    } else if (!cwpStore.pseudoPilot && !isMaster) {
      setLocalAssignedFlightLevel(stringFlightLevel);
      handlePublishPromise(
        persistLocalAssignedFlightLevel(assignedFlightId, stringFlightLevel),
      );
    } else {
      setAssignedFlightLevel(stringFlightLevel);
      handlePublishPromise(
        changeFlightLevelOfAircraft(controlledBy, assignedFlightId, stringFlightLevel),
      );
      handlePublishPromise(
        persistAssignedFlightLevel(assignedFlightId, stringFlightLevel),
      );
    }
    close();
  };

  return (
    <div
      className={classnames({
        pending: false,
        accepted,
        other: false,
        'level-popup': true,
      })}
    >
      <div className="level-popup-header">
        {callSign}
      </div>
      <div className="level-popup-main">
        <div className="levels-container" ref={listOfLevelsReference}>
          <ListOfLevels
            value={flightLevel}
            onClick={setFlightLevel}
            topFlightLevel={topFlightLevel}
            bottomFlightLevel={bottomFlightLevel}
            />
        </div>
        <div className="levels-slider">
          <Button onClick={(): void => FlightLevelChange('up')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11165;</Button>
          <input className="level-range" type="range"
                value={flightLevel}
                onChange={(event): void => setFlightLevel(
                  Number.parseInt(event.target.value, 10) || 0)}
                step={sliderStep} min={flightLevelMin} max={flightLevelMax}
              />
          <Button onClick={(): void => FlightLevelChange('down')} size="sm" variant="secondary" className="arrow-button justify-content-center">&#11167;</Button>
        </div>
      </div>
      <div className="submit-cancel-buttons">
        <Button onClick={close} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Cancel</Button>
        <Button onClick={setFLCP} className="btn btn-light submit-cancel-button" size="sm" variant="secondary">Apply</Button>
      </div>
    </div>
  );
});
