import { observer } from 'mobx-react';
import * as React from 'react';
import { Marker } from 'react-map-gl';


const ICON = `M22 16.21v-1.895L14 8V4a2 2 0 0 0-4 0v4.105L2 14.42v1.789l8-2.81V18l-3 2v2l5-2 5 2v-2l-3-2v-4.685l8 2.895z`;

const size = 20;
// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer( function Aircrafts(props) {
    const { data, onClick } = props;
    // Convert the map to an array and remove the aircrafts containing undefined values
    // as we have not received a target report for them yet
    return data.map((aircraft_data) => (
        <Marker key={aircraft_data.assignedFlightId} longitude={aircraft_data.lastKnownLongitude} latitude={aircraft_data.lastKnownLatitude}>
            <svg
                height={size}
                viewBox='0 0 24 24'
                preserveAspectRatio='xMidYMid meet'
                style={{
                    cursor: 'pointer',
                    fill: '#fff', //change depending on limbo or own flights
                    stroke: 'none',
                    transform: `translate(${-size / 2}px, ${size}px)`
                }}
                onClick={() => onClick(aircraft_data)} >
                <path d={ICON} /></svg>
        </Marker>
    ));
})

// export default React.memo(Aircrafts);
// export default Aircrafts;