import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { aircraftStore } from './state';
import AircraftMarker from './AircraftMarker';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default observer(function Aircrafts(props) {
    const { onClick } = props;
    const data = aircraftStore.aircraftsWithPosition;
    // Convert the map to an array and remove the aircrafts containing undefined values
    // as we have not received a target report for them yet
    /*const geojson = {
        type: 'FeatureCollection',
        features: data.map(({ lastKnownLongitude, lastKnownLatitude }) => (
            { type: 'Feature', geometry: { type: 'Point', coordinates: [lastKnownLongitude, lastKnownLatitude] } }
        )),
    };

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };

    return (<Source id="aircrafts" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
    </Source>);
    */
    return data.map((aircraft_data) => {
        const aircraftId = aircraft_data.aircraftId;
        const bearing = aircraft_data.lastKnownBearing;
        const longitude = aircraft_data.lastKnownLongitude;
        const latitude = aircraft_data.lastKnownLatitude;
        const flightId = aircraft_data.assignedFlightId;
        return <AircraftMarker key={flightId} flightId={flightId} bearing={bearing} longitude={longitude} latitude={latitude} onClick={() => onClick(aircraftId)} />;
    });
})