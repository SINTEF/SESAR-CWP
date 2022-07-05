import './AircraftMarker.css';

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Marker } from 'react-map-gl';

import { configurationStore, cwpStore } from '../state';
import AircraftLevelPopup from './AircraftLevelPopup';
import AircraftPopup from './AircraftPopup';
import AircraftPopupPseudo from './AircraftPopupPseudo';
import ChangeBearingPopup from './ChangeBearingPopup';
import ChangeNextFixPopup from './ChangeNextFixPopup';
import ChangeSpeed from './ChangeSpeed';
import NextSectorPopup from './NextSectorPopup';
import type AircraftModel from '../model/AircraftModel';

// eslint-disable-next-line max-len
const ICON = 'M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z';
const SIZE = 20;

const SVG_ICON_PATH = (<path d={ICON} />);

export default observer(function AircraftMarker(properties: { aircraft: AircraftModel }) {
  const {
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    lastKnownBearing: bearing,
    aircraftId,
    controlledBy,
  } = properties.aircraft;
  const flightColor = controlledBy === configurationStore.currentCWP ? '#78e251' : '#ffffff';
  return (
    <Marker longitude={longitude} latitude={latitude} rotation={bearing}>
      <svg
        height={SIZE}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        style={{
          cursor: 'pointer',
          fill: flightColor, // change depending on limbo or own flights
          stroke: 'black',
          strokeWidth: 2.5,
          paintOrder: 'stroke fill',

        }}
        onClick={(): void => cwpStore.openPopupForAircraft(aircraftId)}
      >
        {SVG_ICON_PATH}
      </svg>
      <AircraftLevelPopup aircraft={properties.aircraft} />
      {configurationStore.currentCWP === 'All' ? <AircraftPopupPseudo aircraft={properties.aircraft} /> : <AircraftPopup aircraft={properties.aircraft} />}
      <ChangeNextFixPopup aircraft={properties.aircraft} />
      <NextSectorPopup aircraft={properties.aircraft} />
      <ChangeSpeed aircraft={properties.aircraft} />
      <ChangeBearingPopup aircraft={properties.aircraft} />
    </Marker>
  );
});
