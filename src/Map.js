
import { useState } from 'react';
import ReactMapGL, { AttributionControl, Popup, NavigationControl, ScaleControl, GeolocateControl, FullscreenControl } from 'react-map-gl';

import Aircrafts from './Aircrafts';
import AircraftPopup from './AircraftPopup';
import SectorPolygon from './SectorPolygons';

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

export default function Map(props) {
  const [viewport, setViewport] = useState({
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  // const data = { //create a store for this data as well, using <Source> and take out in new element to create sectors and not update map all the time
  //   'type': 'Feature',
  //   'geometry': {
  //     'type': 'Polygon',
  //     'coordinates': [
  //       [
  //         [67.13734, 9.13745],
  //         [66.96466, 9.8097],
  //         [68.03252, 10.3252],
  //         [69.06, 11.98],
  //         [68.06, 10.98],
  //         [67.06, 12.98],
  //         [66.06, 9.98],
  //         [67.13734, 9.13745],
  //       ]
  //     ]
  //   }
  // }
  return (<ReactMapGL {...viewport} width="100vw" height="100vh"
    onViewportChange={setViewport}
    attributionControl={false}
    mapStyle="mapbox://styles/opheliaprillard/ckypvi7mb0pfx15pj15t3iqjh" //Black screen style
    mapboxApiAccessToken={MAPBOX_TOKEN}
  >
    <Aircrafts onClick={setPopupInfo} />
    {popupInfo && (<AircraftPopup onClose={setPopupInfo} aircraftId={popupInfo} />)}
    <SectorPolygon />
    <GeolocateControl style={geolocateStyle} />
    <FullscreenControl style={fullscreenControlStyle} />
    <NavigationControl style={navStyle} />
    <ScaleControl style={scaleControlStyle} />
    <AttributionControl compact={true} style={attributionStyle} />
  </ReactMapGL>);
}