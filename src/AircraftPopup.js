import { observer } from 'mobx-react-lite';
import { Popup } from 'react-map-gl';
import { aircraftStore } from './state';

export default observer(function AircraftPopup(props) {

  const { onClose, aircraftId } = props;
  const info = aircraftStore.aircrafts.get(aircraftId);

  return (<Popup
    tipSize={5}
    offsetTop={-5}
    anchor="bottom"
    longitude={info.lastKnownLongitude}
    latitude={info.lastKnownLatitude}
    closeOnClick={true}
    onClose={onClose}> FlightId: {info.assignedFlightId} <br></br> Longitude: {parseFloat((info.lastKnownLongitude).toFixed(5))} <br></br> Latitude: {parseFloat((info.lastKnownLatitude).toFixed(5))}
  </Popup>);
});