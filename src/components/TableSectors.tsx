import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { isDragging } from '../draggableState';
import { cwpStore, roleConfigurationStore } from '../state';
import type { ISectorModel } from '../model/ISectorModel';

const findGridPositionColumn = (sectorName: string): number | string => {
  if (sectorName.includes('W')) {
    return -1;
  }
  return 'none';
};

export default function TableSectors({
  sectorsOfArray,
  controlledSector,
  nextSectorsConfiguration,
}: {
  sectorsOfArray: ISectorModel[];
  controlledSector: string | undefined;
  nextSectorsConfiguration: boolean;
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    setClickedSectorId, clickedSectorId, setShowClickedSector, setShowNextSectorsConfiguration,
  } = cwpStore;
  const clickedSectorButton = (value: string): void => {
    if (clickedSectorId === value) {
      setClickedSectorId(''); // Too remove the selected border line
      setShowClickedSector(false);
      setShowNextSectorsConfiguration(false);
    } else {
      setClickedSectorId(value);
      setShowClickedSector(true);
      setShowNextSectorsConfiguration(nextSectorsConfiguration);
    }
  };
  const ascendingSectors = [...sectorsOfArray];
  ascendingSectors.sort(
    (element1, element2) => element1.bottomFlightLevel - element2.bottomFlightLevel
      || element1.topFlightLevel - element2.topFlightLevel);
  const toplayers = ascendingSectors.map((sector) => sector.topFlightLevel);
  const toplayerList = new Set(toplayers);
  const numberOfLayers = toplayerList.size;
  const layerToKey = new Map<number, number>();
  for (let index = 0; index < numberOfLayers; index += 1) {
    layerToKey.set(index, toplayerList[index]);
  }
  const bottomLayers = ascendingSectors.map((sector) => sector.bottomFlightLevel);
  const bottomLayerList = new Set(bottomLayers);
  const bottomLayerToKey = new Map<number, number>();
  for (let index = 0; index < numberOfLayers; index += 1) {
    bottomLayerToKey.set(index, bottomLayerList[index]);
  }
  console.log(layerToKey);

  const topLevel = Math.max(...sectorsOfArray.map((area) => area.topFlightLevel));
  const topLayer = new Set(sectorsOfArray.filter((area) => area.topFlightLevel === topLevel)
    .map((area) => area.bottomFlightLevel));
  const bottomLevel = Math.min(...sectorsOfArray.map((area) => area.bottomFlightLevel));
  const bottomLayer = new Set(sectorsOfArray
    .filter((area) => area.bottomFlightLevel === bottomLevel)
    .map((area) => area.topFlightLevel));
  const middelLayer = new Set(sectorsOfArray
    .filter((area) => area.bottomFlightLevel !== bottomLevel
    && area.topFlightLevel !== topLevel)
    .map((area) => area.topFlightLevel));
  const multicells = new Map<number, number>();
  let setSpan = 1;
  let temporaryHighestSpan = 1;
  let spanCounter = 1;
  let topSpanCounter = 1;
  const countAbove = new Map<number, number>();
  const countBelow = new Map<number, number>();

  for (let index = 0; index < ascendingSectors.length - 1; index += 1) {
    const element = ascendingSectors[index];
    const nextElement = ascendingSectors[index + 1];
    let counterAbove = 0;
    let counterBelow = 0;
    if (element.topFlightLevel === nextElement.topFlightLevel) {
      topSpanCounter += 1;
    } else {
      topSpanCounter = 1; // why does this keep on getting removed?
    }
    for (const value of ascendingSectors) {
      if (value.bottomFlightLevel === element.topFlightLevel) {
        counterAbove += 1;
        countAbove.set(element.topFlightLevel, counterAbove);
      }
      if (value.topFlightLevel === element.bottomFlightLevel) {
        counterBelow += 1;
        countBelow.set(element.bottomFlightLevel, counterBelow);
      }
    }
    // }
    if (element.bottomFlightLevel === nextElement.bottomFlightLevel) {
      spanCounter += 1;
    } else {
      spanCounter = 1; // why does this keep on getting removed?
    }
    const maxSpan = Math.max(topSpanCounter, spanCounter);
    if (spanCounter > 1) {
      multicells.set(element.bottomFlightLevel, maxSpan);
    }
    temporaryHighestSpan = maxSpan > temporaryHighestSpan ? maxSpan : temporaryHighestSpan;
  }
  setSpan = temporaryHighestSpan;
  const width = `${(450 / setSpan) / 2}`;

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
    return Math.floor(value * 2);
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

  // const setHeightOfButton = (topFL:number, bottomFL: number): string => {
  //   const gridPosition = findGridPositionRow(topFL, bottomFL);
  //   if (topFL === topLevel && bottomLayer.has(bottomFL) && !middelLayer.has(bottomFL)) {
  //     return '1 / -2';
  //   }
  //   if (bottomFL === bottomLevel && topFL === topLevel) {
  //     return `span 4 / ${gridPosition}`;
  //   }
  //   if (bottomLayer.has(bottomFL) && topLayer.has(topFL)) {
  //     return '2 /  -2';
  //   }
  //   return `span 1 / ${gridPosition}`;
  // };
  const setHeightOfButton = (topFL:number, bottomFL: number): string => {
    // const gridPosition = findGridPositionRow(topFL, bottomFL);
    let bottomKey = 1;
    let topKey = 1;
    for (const [key, value] of layerToKey) {
      if (value === topFL) {
        topKey = key;
      }
    }
    for (const [key, value] of bottomLayerToKey) {
      if (value === bottomFL) {
        bottomKey = key;
      }
    }
    return `${topKey} / ${bottomKey}`;
  };
  const isSectorForCWP = (sectorId: string): boolean => sectorId === controlledSector;
  const buttons = [...sectorsOfArray].reverse().map((sectors) => {
    const {
      bottomFlightLevel, sectorId,
      topFlightLevel,
    } = sectors;
    return (<Button
          className={`table-button 
          ${isSectorForCWP(sectorId) ? 'highlight-sector' : ''}
          ${clickedSectorId === sectorId ? 'clicked-sector' : ''}`}
          key={sectorId}
          style={{
            order: `${findGridPositionColumn(sectorId)}`,
            gridRow: `${setHeightOfButton(topFlightLevel, bottomFlightLevel)}`,
            gridColumn: `span ${setWidthOfButton(bottomFlightLevel)} / auto `,
            backgroundColor: roleConfigurationStore.getcolorBySectorId(sectorId),
          }}
          onClick={(): void => {
            if (isDragging()) return;
            clickedSectorButton(sectorId);
          }}
        >
      <Card.Body>
        <Card.Title className="sector-title">
          {`${roleConfigurationStore.getCWPBySectorId(sectorId)}-${sectorId}` }
        </Card.Title>
        <Card.Text className="sector-body">
          {`FL ${bottomFlightLevel}-${topFlightLevel}`}
        </Card.Text>
      </Card.Body>
    </Button>);
  });
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
