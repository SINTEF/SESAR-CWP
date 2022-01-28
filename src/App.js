
import './App.css';
import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl';  // eslint-disable-line import/no-webpack-loader-syntax
import ReactMapGL, { AttributionControl, Source, Layer, Popup, NavigationControl, ScaleControl, GeolocateControl, FullscreenControl } from 'react-map-gl';
import SectorConfiguration from './SectorConfiguration';
import Aircrafts from './Aircrafts';
import { render } from '@testing-library/react';
import { aircraftStore } from './state';
import { ListGroup } from 'react-bootstrap';
import AircraftListElement from './AircraftListElement';
import { observer } from 'mobx-react';

import { sectorLayer } from './sector-layer';
import { outlineLayer } from './outline-style';
import { useAircrafts } from './model/AircraftStore';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const attributionStyle = {
  right: 0,
  bottom: 0
}
const geolocateStyle = {
  bottom: 150,
  left: 0,
  padding: '10px'
};
const fullscreenControlStyle = {
  bottom: 185,
  left: 0,
  padding: '10px'
};
const navStyle = {
  bottom: 60,
  left: 0,

  padding: '10px'
};
const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px'
};


export default function App(props) {
  const [viewport, setViewport] = useState({
    longitude: 64.12345,
    latitude: 9.35321,
    zoom: 7
  });
  const [popupInfo, setPopupInfo] = useState(null);

  const data = { //create a store for this data as well
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [67.13734, 9.13745],
          [66.96466, 9.8097],
          [68.03252, 10.3252],
          [69.06, 11.98],
          [68.06, 10.98],
          [67.06, 12.98],
          [66.06, 9.98],
          [67.13734, 9.13745],
        ]
      ]
    }
  }
  // useEffect(()=> {
//   aircraftStore.fetchAircrafts()
// },[aircraftStore]); //new store, lets re-run

  return (
    <>
      <ReactMapGL {...viewport} width="100vw" height="100vh"
        onViewportChange={setViewport}
        attributionControl={false}
        mapStyle="mapbox://styles/opheliaprillard/ckypvi7mb0pfx15pj15t3iqjh" //Black screen style
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Aircrafts data={aircraftStore.aircraftsWithPosition} onClick={setPopupInfo} />
        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="bottom"
            longitude={popupInfo.lastKnownLongitude}
            latitude={popupInfo.lastKnownLatitude}
            closeOnClick={true}
            onClose={setPopupInfo}> Callsign: {popupInfo.assignedFlightId} {popupInfo.lastKnownLongitude} and {popupInfo.lastKnownLatitude}
          </Popup>
        )}
        <Source type="geojson" data={data}>
          <Layer {...sectorLayer} />
          <Layer {...outlineLayer} />
        </Source>
        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
        <AttributionControl compact={true} style={attributionStyle} />
      </ReactMapGL>
      <div className='aircraft-list'>
        <h3 style={{ color: '#ffffff' }}>Flights</h3>
        <ListGroup as="ul">
          <AircraftListElement data={aircraftStore.aircraftsWithPosition} />
        </ListGroup>
      </div>
      <SectorConfiguration />

    </>
  )
}

export function renderToDom(container) {
  render(<App />, container);
}
// export default App;
