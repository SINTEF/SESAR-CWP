import { observer } from 'mobx-react';
import { Popup } from 'react-map-gl';
import { aircraftStore } from './state';

export default observer(function AircraftPopup(props) {

  const { onClose, aircraftId } = props;
  const info = aircraftStore.aircrafts.get(aircraftId);

  return (<Popup
    tipSize={5}
    anchor="bottom"
    longitude={info.lastKnownLongitude}
    latitude={info.lastKnownLatitude}
    closeOnClick={true}
    onClose={onClose}> Callsign: {info.assignedFlightId} {info.lastKnownLongitude} and {info.lastKnownLongitude}
  </Popup>);
});