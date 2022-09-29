import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { isDragging } from '../draggableState';
import { airspaceStore, cwpStore, roleConfigurationStore } from '../state';
import type { ISectorModel } from '../model/ISectorModel';

const findGridPositionColumn = (sectorName: string): number | string => {
  if (sectorName.includes('W')) {
    return -1;
  }
  return 'none';
};

const mouseDownSector = (event: React.MouseEvent, sectorId: string): void => {
  if (event.button !== 1 && event.button !== 2) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  const cwp = roleConfigurationStore.getCWPBySectorId(sectorId);
  cwpStore.toggleCWPIn3DView(cwp);
};

const noContextMenu = (event: React.MouseEvent): void => {
  event.preventDefault();
  event.stopPropagation();
};

export default observer(function TableSectors({
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
  const toplayers = ascendingSectors.map((sector) => sector.topFlightLevel)
    .sort((a, b) => b - a);
  const toplayerList = new Set(toplayers);
  const layerToKey = new Map<number, number>(
    [...toplayerList].map((value, index) => [index + 1, value]),
  );
  const bottomLayers = ascendingSectors.map((sector) => sector.bottomFlightLevel)
    .sort((a, b) => b - a);
  const bottomLayerList = new Set(bottomLayers);
  const bottomLayerToKey = new Map<number, number>(
    [...bottomLayerList].map((value, index) => [index + 1, value]),
  );

  const bottomLevel = Math.min(...sectorsOfArray.map((area) => area.bottomFlightLevel));

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
    return Math.ceil(value * 2);
  };

  const setHeightOfButton = (topFL:number, bottomFL: number): string => {
    let bottomKey = 1;
    let topKey = 1;
    for (const [key, value] of layerToKey.entries()) {
      if (value === topFL) {
        topKey = key;
      }
    }
    for (const [key, value] of bottomLayerToKey.entries()) {
      if (value === bottomFL) {
        bottomKey = key;
      }
    }
    return `${topKey} / ${bottomKey + 1}`;
  };
  const isSectorForCWP = (sectorId: string): boolean => sectorId === controlledSector;
  const buttons = [...sectorsOfArray].reverse().map((sectors) => {
    const {
      bottomFlightLevel, sectorId,
      topFlightLevel,
    } = sectors;
    const cwp = roleConfigurationStore.getCWPBySectorId(sectorId);
    return (<Button
          className={classNames({
            'table-button': true,
            'highlight-sector': isSectorForCWP(sectorId),
            'clicked-sector': clickedSectorId === sectorId,
            'disabled-sector': cwpStore.isCWPDisabledIn3DView(cwp),
          })}
          key={sectorId}
          style={{
            order: `${findGridPositionColumn(sectorId)}`,
            gridRow: `${setHeightOfButton(topFlightLevel, bottomFlightLevel)}`,
            gridColumn: `auto /span ${setWidthOfButton(bottomFlightLevel)}`,
            backgroundColor: roleConfigurationStore.getcolorBySectorId(sectorId),
          }}
          onClick={(): void => {
            if (isDragging()) return;
            clickedSectorButton(sectorId);
          }}
          onMouseDown={(event: React.MouseEvent): void => {
            if (isDragging()) return;
            mouseDownSector(event, sectorId);
          }}
          onContextMenu={noContextMenu}
        >
      <Card.Body>
        <Card.Title className="sector-title">
          {`${cwp}-${sectorId}` }
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
      gridTemplateRows: `repeat(${toplayerList.size}, calc(250px / ${toplayerList.size}))`,
      gridAutoFlow: 'dense',
    }}
    >
      {buttons}
    </div>
  );
});
