import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { Popup } from 'react-map-gl';

import { changeNextWaypointOfAircraft } from '../mqtt';
import { configurationStore, cwpStore, fixStore } from '../state';
import type AircraftModel from '../model/AircraftModel';

export default observer(function ChangeNextFixPopup(properties: { aircraft: AircraftModel }) {
  const {
    aircraftId,
    assignedFlightId,
    lastKnownLongitude: longitude,
    lastKnownLatitude: latitude,
    controlledBy,
  } = properties.aircraft;

  // TODO #95: Replace use of Ref/ID by a classic react value/onChange
  const newChangedFixInputReference = React.useRef<HTMLInputElement>(null);

  const shouldShow = cwpStore.aircraftsWithNextFixPopup.has(aircraftId);
  if (!shouldShow) {
    return null;
  }
  const close = (): void => cwpStore.closeChangeNextFixForAircraft(aircraftId);

  const submit = (): void => {
    const arrayOfWaypoints = newChangedFixInputReference.current?.value?.split(',');
    const newNextFix = arrayOfWaypoints?.length === 2 ? arrayOfWaypoints?.[1].toLocaleUpperCase() ?? '' : arrayOfWaypoints?.[0].toLocaleUpperCase() ?? '';
    const nextViaFix = arrayOfWaypoints?.length === 2 ? arrayOfWaypoints?.[0].toLocaleUpperCase() ?? '' : '';
    const latOfFix = fixStore.fixes.get(newNextFix)?.latitude;
    const longOfFix = fixStore.fixes.get(newNextFix)?.longitude;
    const viaLat = fixStore.fixes.get(nextViaFix)?.latitude;
    const viaLong = fixStore.fixes.get(nextViaFix)?.longitude;
    if (latOfFix !== undefined && longOfFix !== undefined
      && viaLat !== undefined && viaLong !== undefined) {
      const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
      changeNextWaypointOfAircraft(
        pilotId, newNextFix, assignedFlightId, latOfFix, longOfFix, viaLat, viaLong, nextViaFix,
      );
    } else if (latOfFix !== undefined && longOfFix !== undefined) {
      const pilotId = configurationStore.currentCWP === 'All' ? 'All' : controlledBy;
      changeNextWaypointOfAircraft(
        pilotId, newNextFix, assignedFlightId, latOfFix, longOfFix, '', '', '',
      );
    }
    close();
  };

  return (
    <Popup
      className="change-bearing"
      anchor="bottom"
      longitude={longitude}
      latitude={latitude}
      offset={[45, 100]}
      closeOnClick={false}
      onClose={close}
      closeButton={false}
    >
      <Container className="choose-next-controller">
        <Row className="submit-cancel-wrapper">
          <Col className="gutter-2">
            <span>
              Next Fix:
              <input ref={newChangedFixInputReference} className="input-filter" />
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-2">
            <Button onClick={close}
              className="btn btn-light submit-cancel-button" size="sm" variant="secondary">
              Cancel
            </Button>
          </Col>
          <Col className="gutter-2">
            <Button onClick={submit}
              className="btn btn-light submit-cancel-button" size="sm" variant="secondary">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Popup>
  );
});
