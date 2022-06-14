import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { cwpStore } from '../state';

const fillColors = ['#fff', '#f59', '#0bb', '#94a', '#b00', '#f80', '#f63', '#3c0', '#40f', '#0bb', '#94a', '#b00', '#f80', '#f63'];
export default function TableSectors({ sectorsOfArray }) {
  const { setClickedSectorId, toggleClickedSector } = cwpStore;

  const clickedSectorButton = (value) => {
    setClickedSectorId(value);
    toggleClickedSector();
  };
  const buttons = [];
  for (let index = 1; index < sectorsOfArray.length + 1; index += 1) {
    buttons.push(
      <div key={sectorsOfArray[sectorsOfArray.length - index][0]} className="span3">
        <Button
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: fillColors[index + 1],
          }}
          onClick={() => clickedSectorButton(sectorsOfArray[sectorsOfArray.length - index][0])}
        >
          <Card.Body>
            <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - index][0].slice(-14)}</Card.Title>
            <Card.Text className="sector-body">
              {`FL ${sectorsOfArray[sectorsOfArray.length - index][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - index][1].topFlightLevel}`}
            </Card.Text>
          </Card.Body>
        </Button>
      </div>,
    );
  }
  return (
    <div>
      {buttons}
    </div>
  );
}
TableSectors.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sectorsOfArray: PropTypes.array.isRequired,
};
