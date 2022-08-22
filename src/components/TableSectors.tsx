import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { cwpStore } from '../state';
import type SectorModel from '../model/SectorModel';

const fillColors = ['#fff', '#f59', '#0bb', '#94a', '#b00', '#f80', '#f63', '#3c0', '#40f', '#DDD555', '#01539d', '#e9b4d0', '#8c9441', '#c82169'];

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
  const topLevel = Math.max(...sectorsOfArray.map(([, area]) => area.topFlightLevel));
  const topLayer = new Set(sectorsOfArray.filter(([, area]) => area.topFlightLevel === topLevel)
    .map(([,area]) => area.bottomFlightLevel));
  const bottomLevel = Math.min(...sectorsOfArray.map(([, area]) => area.bottomFlightLevel));
  const bottomLayer = new Set(sectorsOfArray
    .filter(([, area]) => area.bottomFlightLevel === bottomLevel)
    .map(([,area]) => area.topFlightLevel));
  const middelLayer = new Set(sectorsOfArray
    .filter(([, area]) => area.bottomFlightLevel !== bottomLevel
    && area.topFlightLevel !== topLevel)
    .map(([,area]) => area.topFlightLevel));
  const multicells = new Map<number, number>();
  let setSpan = 1;
  let temporaryHighestSpan = 1;
  let spanCounter = 1;
  let topSpanCounter = 1;
  const countAbove = new Map<number, number>();
  const countBelow = new Map<number, number>();

  for (let index = 0; index < ascendingSectors.length - 1; index += 1) {
    const element = ascendingSectors[index][1];
    const nextElement = ascendingSectors[index + 1][1];
    let counterAbove = 0;
    let counterBelow = 0;
    if (element.topFlightLevel === nextElement.topFlightLevel) {
      topSpanCounter += 1;
    } else {
      topSpanCounter = 1;
    }
    for (const value of ascendingSectors) {
      if (value[1].bottomFlightLevel === element.topFlightLevel) {
        counterAbove += 1;
        countAbove.set(element.topFlightLevel, counterAbove);
      }
      if (value[1].topFlightLevel === element.bottomFlightLevel) {
        counterBelow += 1;
        countBelow.set(element.bottomFlightLevel, counterBelow);
      }
    }
    // }
    if (element.bottomFlightLevel === nextElement.bottomFlightLevel) {
      spanCounter += 1;
    } else {
      spanCounter = 1;
    }
    const maxSpan = Math.max(topSpanCounter, spanCounter);
    if (spanCounter > 1) {
      multicells.set(element.bottomFlightLevel, maxSpan);
    }
    temporaryHighestSpan = maxSpan > temporaryHighestSpan ? maxSpan : temporaryHighestSpan;
  }
  setSpan = temporaryHighestSpan;
  const width = `${(450 / setSpan) / 2}`;

  const buttons = [];

  const setWidthOfButton = (bottomFL: number): number => {
    const valueFL = bottomFL;
    if (bottomFL === bottomLevel) {
      const numberSameRow = multicells.get(bottomFL) || 1;
      const widthDifference = numberSameRow - setSpan === 0 ? 2
        : Math.abs(numberSameRow - setSpan) + 1;
      return widthDifference;
    }
    const countOverTop = countAbove.get(valueFL) ?? 1;
    const countTop = countBelow.get(valueFL) ?? 1;
    const value = countTop / countOverTop;
    return Math.ceil(value * 2);
  };

  const findGridPositionRow = (topFL : number, bottomFL : number): number | string => {
    if (topFL === topLevel) {
      return '[rowstart]';
    }
    if (bottomLayer.has(bottomFL) && !topLayer.has(topFL)) {
      return -3 + 1; // Pluss one is for grid css
    }
    if (bottomFL === bottomLevel) {
      return -2 + 1;
    }
    return 2 + 1;
  };

  const setHeightOfButton = (topFL:number, bottomFL: number): string => {
    const gridPosition = findGridPositionRow(topFL, bottomFL);
    if (topFL === topLevel && bottomLayer.has(bottomFL) && !middelLayer.has(bottomFL)) {
      return '1 / -2';
    }
    if (bottomFL === bottomLevel && topFL === topLevel) {
      return `span 4 / ${gridPosition}`;
    }
    if (bottomLayer.has(bottomFL) && topLayer.has(topFL)) {
      return '2 /  -2';
    }
    return `span 1 / ${gridPosition}`;
  };

  for (let index = 1; index < sectorsOfArray.length + 1; index += 1) {
    const { topFlightLevel } = sectorsOfArray[sectorsOfArray.length - index][1];
    const { bottomFlightLevel } = sectorsOfArray[sectorsOfArray.length - index][1];
    buttons.push(
      <Button className='table-button' key={sectorsOfArray[sectorsOfArray.length - index][0]}
          style={{
            gridRow: `${setHeightOfButton(topFlightLevel, bottomFlightLevel)}`,
            gridColumn: `span ${setWidthOfButton(bottomFlightLevel)} / auto `,
            backgroundColor: fillColors[index],
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
            {`FL ${bottomFlightLevel}-${topFlightLevel}`}
          </Card.Text>
        </Card.Body>
      </Button>,
    );
  }
  return (
    <div className='sector-box'
    style = {{
      gridTemplateColumns: `repeat(${setSpan * 2}, ${width}px)`,

    }}
    >
      {buttons}
    </div>
  );
}
