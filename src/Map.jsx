import * as maplibregl from 'maplibre-gl';
import React, { useState } from 'react';
import ReactMapGL, { FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl';

import AircraftPopup from './AircraftPopup';
import Aircrafts from './Aircrafts';
import SectorPolygon from './SectorPolygons';
import { targetReport } from './message-handlers';
import { Overlay, Card, Accordion, useAccordionButton } from 'react-bootstrap';

const mapStyle = {
  version: 8,
  name: 'Black',
  metadata: {},
  sources: {},
  layers: [{
    id: 'background',
    type: 'background',
    paint: {},
  }],
};

const style = {
  width: '100vw',
  height: '100vh',
  background: 'black',
};

export default function Map() {
  const initialViewState = {
    longitude: 9.27,
    latitude: 45.11,
    zoom: 6.3,
  };

  const [popupInfo, setPopupInfo] = useState(undefined);

  // const data = { //create a store for this data as well, using <Source> and take out
  // in new element to create sectors and not update map all the time
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
  function CustomToggle({ children, eventkey }) {
    const smallerButton = useAccordionButton(eventkey)
    return (
      <button
        type="button"
        style={{ backgroundColor: 'rgb(34, 34, 34)' }}
        onClick={smallerButton}
      ></button>
    )
  }

  const onAircraftClick = (aircraftId) => {
    setPopupInfo(aircraftId);
  };
  const onPopupClose = () => {
    setPopupInfo(undefined);
  };

  return (<ReactMapGL
    style={style}
    initialViewState={initialViewState}
    mapStyle={mapStyle}
    attributionControl={false}
    mapLib={maplibregl}
    antialias={true}
  >
    <Aircrafts onClick={onAircraftClick} />
    {popupInfo && (<AircraftPopup onClose={onPopupClose} aircraftId={popupInfo} />)}
    <SectorPolygon />
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <CustomToggle eventKey="0">Click me!</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    {/* <Button ref={target}
    onClick={() => setShow(!show)}>
    FILT
    </Button>
    <Overlay target = {target.current} show={show} placement="top">
      {({placement, arrowPropes, show:_show, popper, ...props}) => (
        <div
        {...props}
            style={{
              // backgroundColor: 'rgba(0,0,0)',
              // padding: '2px 10px',
              color: 'white',
              // borderRadius: 3,
              ...props.style,
            }}
        >
        Filtering
        </div>
      )}
    </Overlay> */}
    <ScaleControl position="bottom-left" />
    <NavigationControl position="bottom-left" />
    <FullscreenControl position="bottom-left" containerId="root" />
  </ReactMapGL>
  );
}
