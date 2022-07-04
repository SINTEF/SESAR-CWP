import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { cwpStore } from '../state';
import type SectorModel from '../model/SectorModel';

const fillColors = ['#fff', '#f59', '#0bb', '#94a', '#b00', '#f80', '#f63', '#3c0', '#40f', '#0bb', '#94a', '#b00', '#f80', '#f63'];
export default function TableSectors({ sectorsOfArray }: {
  sectorsOfArray: [string, SectorModel][];
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { setClickedSectorId, toggleClickedSector } = cwpStore;

  const clickedSectorButton = (value: string): void => {
    setClickedSectorId(value);
    toggleClickedSector();
  };

  const ascendingSectors = sectorsOfArray
    .sort((element1, element2) => element1[1].bottomFlightLevel - element2[1].bottomFlightLevel
      || element1[1].topFlightLevel - element2[1].topFlightLevel);

  const multicells = new Map<number, number>();
  let setSpan = 1;
  let temporaryHighestSpan = 1;
  let spanCounter = 1;
  const countAbove = new Map<number, number>();
  for (let index = 0; index < ascendingSectors.length - 1; index += 1) {
    const element = ascendingSectors[index][1];
    const nextElement = ascendingSectors[index + 1][1];
    let counter = 1;
    let counterAbove = 0;
    if (element.topFlightLevel === nextElement.topFlightLevel) {
      counter += 1;
    }
    if (counter > 1) {
      multicells.set(element.topFlightLevel, counter);
      for (const value of ascendingSectors) {
        if (value[1].bottomFlightLevel === element.topFlightLevel) {
          counterAbove += 1;
          countAbove.set(element.topFlightLevel, counterAbove);
        }
      }
    }
    if (element.bottomFlightLevel === nextElement.bottomFlightLevel) {
      spanCounter += 1;
    } else {
      spanCounter = 1;
    }
    // if
    temporaryHighestSpan = spanCounter > temporaryHighestSpan ? spanCounter : temporaryHighestSpan;
  }
  setSpan = temporaryHighestSpan;
  const width = `${100 / setSpan - 1}%`;

  const buttons = [];

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const setWidthOfButton = (sectorFL: number): string => {
    if (countAbove.has(sectorFL)) {
      const countOverTop = countAbove.get(sectorFL) ?? 1;
      const countTop = multicells.get(sectorFL) ?? 1;
      return `${(countTop * 100) / countOverTop}px`;
    }
    return '100px';
  };

  for (let index = 1; index < sectorsOfArray.length + 1; index += 1) {
    buttons.push(
      <div key={sectorsOfArray[sectorsOfArray.length - index][0]} style={{ width }} className="span3">
        <Button
          style={{
            height: '50%',
            width: setWidthOfButton(
              sectorsOfArray[sectorsOfArray.length - index][1].bottomFlightLevel,
            ),
            backgroundColor: fillColors[index + 1],
          }}
          onClick={(): void => clickedSectorButton(
            sectorsOfArray[sectorsOfArray.length - index][0],
          )}
        >
          <Card.Body>
            <Card.Title className="sector-title">
              {sectorsOfArray[sectorsOfArray.length - index][0].slice(-14)}
            </Card.Title>
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
  sectorsOfArray: PropTypes.array.isRequired,
};
