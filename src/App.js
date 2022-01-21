
import './App.css';
import * as React from 'react';
import {useRef, useEffect, useState} from 'react';
// import mapboxgl from '!mapbox-gl';  // eslint-disable-line import/no-webpack-loader-syntax
import ReactMapGL, {AttributionControl,Marker,Popup, NavigationControl,ScaleControl,GeolocateControl, FullscreenControl} from 'react-map-gl';
import SectorConfiguration from './SectorConfiguration';
import Aircrafts from './Aircrafts';
import { render } from '@testing-library/react';
import { useAircrafts } from './store';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


const attributionStyle = {
  right:0,
  top:0
}
const geolocateStyle = {
  top:0,
  left:0,
  padding: '10px'
};
const fullscreenControlStyle = {
  top:36,
  left:0,
  padding:'10px'
};
const navStyle = {
  top:72,
  left:0,
  padding: '10px'
};
const scaleControlStyle = {
  bottom:36,
  left:0,
  padding:'10px'
};


export default function App(props) {
  // const aircraftStore= useAircrafts()

const data = [
  {
    uniqueFlightID: 22435356,
    longitude: 64.12345,
    latitude: 9.35321
  },
  {
    uniqueFlightID: 21245643,
    longitude: 62.12345,
    latitude: 9.35321
  },
]

const [viewport,setViewport] = useState({
      longitude: 64.12345,
      latitude: 9.35321,
      zoom: 10
});
const [popupInfo,setPopupInfo] = useState(null);

// useEffect(()=> {
//   aircraftStore.fetchAircrafts()
// },[aircraftStore]); //new store, lets re-run

  return (
    <>
      {/* <div ref={mapContainer} className="map-container" attributionControl={false}/> */}
      <ReactMapGL {...viewport} width="100vw" height ="100vh" 
        onViewportChange={setViewport} 
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        >
        <Aircrafts data={data} onClick={setPopupInfo}/>
        {popupInfo && (
          <Popup
          tipSize={5}
          anchor="bottom"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={setPopupInfo}> Callsign: {popupInfo.uniqueFlightID} {popupInfo.longitude} and {popupInfo.latitude}
          </Popup>
        )}
        <GeolocateControl style={geolocateStyle}/>
        <FullscreenControl style={fullscreenControlStyle}/>
        <NavigationControl style={navStyle}/>
        <ScaleControl style={scaleControlStyle}/>
      <AttributionControl compact={true} style={attributionStyle}/>
      </ReactMapGL>
      {/* <div className='control-panel'>
        <h1>Aircrafts</h1>
        <ul>
          {aircraftStore.aircrafts.map((aircraft) =>(
            <li key={aircraft.aircraftId}>
              <a href="#" onClick={() => undefined}>
                {aircraft.assignedFlightId}
              </a>
            </li>
          ))}
        </ul>
      </div> */}
      <SectorConfiguration/>
    </>
  )
}

export function renderToDom(container){
  render(<App/>, container);
}
// export default App;
