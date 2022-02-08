import React from 'react';
import { Marker } from 'react-map-gl';

// eslint-disable-next-line max-len
const ICON = 'M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z';
const SIZE = 20;

export default React.memo((properties) => {
  const {
    bearing, longitude, latitude, onClick,
  } = properties;
  return (
    <Marker longitude={longitude} latitude={latitude} rotation={bearing}>
      <svg
        height={SIZE}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        style={{
          cursor: 'pointer',
          fill: '#fff', // change depending on limbo or own flights
          stroke: 'none',
        }}
        onClick={onClick}
      >
        <path d={ICON} />
      </svg>
    </Marker>
  );
});
