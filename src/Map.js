
import { useState } from 'react';
import ReactMapGL, { NavigationControl, ScaleControl, FullscreenControl } from 'react-map-gl';
import * as maplibregl from 'maplibre-gl';

import Aircrafts from './Aircrafts';
import AircraftPopup from './AircraftPopup';
import SectorPolygon from './SectorPolygons';

const mapStyle = {
  "version": 8,
  "name": "Black",
  "metadata": {},
  "sources": {},
  "layers": [{
    "id": "background",
    "type": "background", "paint": {}
  }],
};

const style = {
  width: '100vw',
  height: '100vh'
};

export default function Map(props) {
  let initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  };

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

  const onAircraftClick = (aircraftId) => {
    setPopupInfo(aircraftId);
  };
  const onPopupClose = () => {
    setPopupInfo(null);
  };

  return (<ReactMapGL
    style={style}
    initialViewState={initialViewState}
    mapStyle={mapStyle}
    attributionControl={false}
    mapLib={maplibregl}
  >
    <Aircrafts onClick={onAircraftClick} />
    {popupInfo && (<AircraftPopup onClose={onPopupClose} aircraftId={popupInfo} />)}
    <SectorPolygon />
    <ScaleControl position="bottom-left" />
    <NavigationControl position="bottom-left" />
    <FullscreenControl position="bottom-left" containerId="root" />
  </ReactMapGL>);
}