import './BottomNavbar.css';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import { Navbar } from 'react-bootstrap';

import { configurationStore, cwpStore } from '../state';
import DistanceMeasurementDropdown from './DistanceMeasurementDropdown';
import MicrophoneButton from './MicrophoneButton';
import MqttIndicators from './MqttIndicators';
import SpeedVectorNavbarControl from './SpeedVectorNavbarControl';

const ControllerButton = observer(function ControllerButton() {
  const { currentCWP } = configurationStore;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { toggleControllerSelection } = cwpStore;
  return (
    <button type="button" onClick={(): void => toggleControllerSelection()}>
      {currentCWP || 'Controller'}
    </button>
  );
});

function GenericButton(
  { children, onClick, active }: {
    children: React.ReactNode;
    onClick: () => void;
    active: boolean;
  }) : JSX.Element {
  return (
    <button type="button" onClick={onClick}
    className={classNames({ active })}>
      {children}
    </button>
  );
}

const FLButton = observer(function FLButton() {
  return (<GenericButton
      onClick={(): void => cwpStore.toggleFL()}
      active={cwpStore.showFL}
        >
    FL
  </GenericButton>
  );
});

const SFLButton = observer(function SFLButton() {
  return (<GenericButton
      onClick={(): void => cwpStore.toggleSFL()}
      active={cwpStore.showSFL}
        >
    SFL
  </GenericButton>
  );
});

const SectorLabelsButton = observer(function SectorLabelsButton() {
  return (<GenericButton
      onClick={(): void => cwpStore.toggleSectorLabels()}
      active={cwpStore.showSectorLabels}
        >
    Sector Labels
  </GenericButton>
  );
});

const FlightLabelsButton = observer(function FlightLabelsButton() {
  return (<GenericButton
      onClick={(): void => cwpStore.toggleFlightLabels()}
      active={cwpStore.showFlightLabels}
        >
    Flight Labels
  </GenericButton>
  );
});

const FixesButton = observer(function FixesButton() {
  return (<GenericButton
      onClick={(): void => cwpStore.toggleFixes()}
      active={cwpStore.showFixes}
        >
    Fixes
  </GenericButton>
  );
});

const LimboFlightsButton = observer(function LimboFlightsButton() {
  return (<GenericButton
      onClick={(): void => cwpStore.toggleLimboFlights()}
      active={cwpStore.showLimboFlight}
        >
    Affected Flights
  </GenericButton>
  );
});

const FilterButton = observer(function FilterButton() {
  return (<GenericButton
      onClick={(): void => cwpStore.toggleFILT()}
      active={cwpStore.showFILT}
        >
    FILT
  </GenericButton>
  );
});

const CurrentSectorFlightLabelsButton = observer(function CurrentSectorFlightLabelsButton() {
  const { currentCWP } = configurationStore;
  if (!currentCWP || currentCWP === 'All') {
    return null;
  }
  return (<GenericButton
      onClick={(): void => cwpStore.toggleFlightLabelsForCurrentSector()}
      active={cwpStore.showFlightLabelsForCurrentSector}
      >
    {currentCWP } FL
  </GenericButton>
  );
});

const OtherSectorsFlightLabelsButton = observer(function OtherSectorsFlightLabelsButton() {
  const { currentCWP } = configurationStore;
  if (!currentCWP || currentCWP === 'All') {
    return null;
  }
  return (<GenericButton
      onClick={(): void => cwpStore.toggleFlightLabelsForOtherSectors()}
      active={cwpStore.showFlightLabelsForOtherSectors}
        >
    Other FL
  </GenericButton>
  );
});

export default function BottomNavBar(): JSX.Element {
  return (
    <Navbar className="navbar button-navbar">
      <MicrophoneButton />
      <FLButton />
      <SFLButton />
      <SectorLabelsButton />
      <FlightLabelsButton />
      <CurrentSectorFlightLabelsButton />
      <OtherSectorsFlightLabelsButton />
      <FixesButton />
      <LimboFlightsButton />
      <FilterButton />
      <SpeedVectorNavbarControl />
      <DistanceMeasurementDropdown />
      <ControllerButton />
      <MqttIndicators />
    </Navbar>
  );
}
