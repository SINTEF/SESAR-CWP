import {
  area as turfArea, centerOfMass, intersect, polygon,
} from '@turf/turf';
import { transaction } from 'mobx';
import type { Feature, Polygon, Position } from '@turf/turf';

import { configurationStore, cwpStore, roleConfigurationStore } from '../state';
import type { ISectorModel } from '../model/ISectorModel';

function convertISectorModelToTurfPolygon(sector: ISectorModel): Feature<Polygon> {
  const coordinates = sector.sectorArea.map((coord): Position => [
    coord.longitude, coord.latitude,
  ]);
  return polygon([coordinates]);
}

function computeCenterOfMass(sector: ISectorModel): Position {
  const turfPolygon = convertISectorModelToTurfPolygon(sector);
  return centerOfMass(turfPolygon).geometry.coordinates;
}

function findSectorWithLargestIntersection(
  sector: ISectorModel, otherSectors: ISectorModel[],
): ISectorModel | undefined {
  const sectorPolygon = convertISectorModelToTurfPolygon(sector);
  // Compute the area of the intersection of sectorPolygon and above for each sector in above
  const areas = otherSectors.map((s) => {
    const aboveSectorPolygon = convertISectorModelToTurfPolygon(s);
    const intersection = intersect(sectorPolygon, aboveSectorPolygon);
    if (intersection === null) {
      return { sector: s, area: 0 };
    }
    return { sector: s, area: turfArea(intersection) };
  });

  if (areas.length === 0) {
    return undefined;
  }

  // Find the sector with the largest area
  // eslint-disable-next-line unicorn/no-array-reduce
  const largestSector = areas.reduce(
    (previous, current) => (previous.area > current.area ? previous : current));
  if (largestSector.area === 0) {
    return undefined;
  }
  return largestSector.sector;
}

function findAbove(sector: ISectorModel, otherSectors: ISectorModel[]): ISectorModel | undefined {
  // Find all sectors where bottomFlightLevel >= sector.topFlightLevel
  const above = otherSectors.filter((s) => s.bottomFlightLevel === sector.topFlightLevel);
  return findSectorWithLargestIntersection(sector, above);
}

function findBelow(sector: ISectorModel, otherSectors: ISectorModel[]): ISectorModel | undefined {
  // Find all sectors where topFlightLevel <= sector.bottomFlightLevel
  const below = otherSectors.filter((s) => s.topFlightLevel === sector.bottomFlightLevel);
  return findSectorWithLargestIntersection(sector, below);
}

function findCloseSectorWithVerticalOverlap(
  sector: ISectorModel, otherSectors: ISectorModel[], direction: 'above' | 'below' | 'west' | 'east',
): ISectorModel | undefined {
  const sectorCenterOfMass = computeCenterOfMass(sector);

  // GeoJSON is longitude (west/east) first, latitude (north/south) second
  const indexToCompare = direction === 'above' || direction === 'below' ? 1 : 0;
  const reverse = direction === 'above' || direction === 'east';

  const otherSectorsWithHeight = otherSectors
    // Remove the current selected sector itself
    .filter((s) => s.sectorId !== sector.sectorId)
    // Compute the vertical overlap
    .map((s) => {
      const top = Math.min(sector.topFlightLevel, s.topFlightLevel);
      const bottom = Math.max(sector.bottomFlightLevel, s.bottomFlightLevel);
      const verticalOverlap = top - bottom;
      return { sector: s, verticalOverlap };
    })
    // Only keep sectors with a vertical overlap
    .filter((s) => s.verticalOverlap > 0)
    // Compute the center of mass of the sector and the distance
    .map((s) => {
      const center = computeCenterOfMass(s.sector);
      const distance = Math.sqrt(
        (sectorCenterOfMass[0] - center[0]) ** 2 + (sectorCenterOfMass[1] - center[1]) ** 2,
      );
      return { ...s, center, distance };
    })
    // Only keep sectors with a center of mass to the west of the current sector
    .filter((s) => s.center[indexToCompare] > sectorCenterOfMass[indexToCompare] === reverse);

  if (otherSectorsWithHeight.length === 0) {
    return undefined;
  }

  // Find the best by the distance and then largest overlap first, then lower bottomFlightLevel.
  // eslint-disable-next-line unicorn/no-array-reduce
  const bestSector = otherSectorsWithHeight.reduce((previous, current) => {
    if (previous.distance < current.distance) {
      return previous;
    }
    if (previous.distance > current.distance) {
      return current;
    }
    if (previous.verticalOverlap > current.verticalOverlap) {
      return previous;
    }
    if (previous.verticalOverlap < current.verticalOverlap) {
      return current;
    }
    if (previous.sector.bottomFlightLevel < current.sector.bottomFlightLevel) {
      return previous;
    }
    return current;
  });

  return bestSector.sector;
}

function findWest(sector: ISectorModel, otherSectors: ISectorModel[]): ISectorModel | undefined {
  return findCloseSectorWithVerticalOverlap(sector, otherSectors, 'west');
}

function findEast(sector: ISectorModel, otherSectors: ISectorModel[]): ISectorModel | undefined {
  return findCloseSectorWithVerticalOverlap(sector, otherSectors, 'east');
}

function findSectorNextTo(
  sector: ISectorModel, position: string, area: ISectorModel[],
): string | undefined {
  switch (position.toLocaleLowerCase()) {
    case 'west':
    case 'left':
      return findWest(sector, area)?.sectorId;
    case 'east':
    case 'right':
      return findEast(sector, area)?.sectorId;
    case 'above':
    case 'up':
    case 'upper':
    case 'higher':
    case 'top':
      return findAbove(sector, area)?.sectorId;
    case 'below':
    case 'down':
    case 'lower':
    case 'bottom':
      return findBelow(sector, area)?.sectorId;
    default:
      throw new Error(`Invalid position ${position}`);
  }
}

function findSectorWithCWPNumber(
  cwpNumber: number, area: ISectorModel[],
): string | undefined {
  // Find CWP for all sectors
  const sectorsWithCWP = area.map((s) => {
    const cwp = roleConfigurationStore.getCWPBySectorId(s.sectorId);
    return { sector: s, cwp };
  });

  // Find the sector with the same CWP number
  const matchingSector = sectorsWithCWP.find((s) => s.cwp === `CWP${cwpNumber}`);
  return matchingSector?.sector.sectorId;
}

function findSectorForPosition(
  sectorId: string | undefined, position: string, area: ISectorModel[],
): string | undefined {
  const potentialNumber = Number.parseInt(position, 10);
  if (!Number.isNaN(potentialNumber)) {
    return findSectorWithCWPNumber(potentialNumber, area);
  }

  if (sectorId === undefined) {
    throw new Error('Cannot find sector next to undefined sector');
  }

  const sector = area.find((s) => s.sectorId === sectorId);
  if (!sector) {
    throw new Error(`Sector ${sectorId} not found`);
  }

  return findSectorNextTo(sector, position, area);
}

export default function SectorConfigCommand(_arguments: string[]): void {
  const [mode, position] = _arguments;

  if (mode === 'off' || mode === 'clear' || position === 'off') {
    transaction(() => {
      cwpStore.setClickedSectorId('');
      cwpStore.setShowClickedSector(false);
      cwpStore.setShowNextSectorsConfiguration(false);
    });
    return;
  }

  let sectorName: string | undefined;
  let showNextConfiguration: boolean;
  if (mode === 'current') {
    sectorName = roleConfigurationStore.currentControlledSector;
    showNextConfiguration = false;
  } else if (mode === 'next') {
    sectorName = roleConfigurationStore.nextControlledSector;
    showNextConfiguration = true;
  } else {
    throw new Error(`Invalid sector-config mode: ${mode}`);
  }

  if (!sectorName && !/^\d+$/.test(position)) {
    throw new Error('No controlled sector found (yet ?)');
  }

  if (position) {
    const area = mode === 'current'
      ? configurationStore.areaOfIncludedAirspaces
      : configurationStore.areaOfIncludedAirspacesForNextConfiguration;
    sectorName = findSectorForPosition(sectorName, position, area);
  }
  if (!sectorName) {
    throw new Error('No sector found');
  }

  transaction(() => {
    cwpStore.setClickedSectorId(sectorName ?? '');
    cwpStore.setShowNextSectorsConfiguration(showNextConfiguration);
    cwpStore.setShowClickedSector(true);
  });
}
