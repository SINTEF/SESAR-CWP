import * as React from 'react';
import { Marker } from 'react-map-gl';

const ICON = `M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z`;
const SIZE = 20;

export default React.memo((props) => {
  const { bearing, longitude, latitude, flightId, onClick } = props;
  return <Marker longitude={longitude} latitude={latitude}>
    <svg
      height={SIZE}
      viewBox='0 0 24 24'
      preserveAspectRatio='xMidYMid meet'
      style={{
        cursor: 'pointer',
        fill: '#fff', //change depending on limbo or own flights
        stroke: 'none',
        transform: `translate(${-SIZE / 2}px, ${SIZE}px) rotate(${bearing}deg)`
      }}
      onClick={onClick} >
      <path d={ICON} /></svg>
  </Marker>;
});