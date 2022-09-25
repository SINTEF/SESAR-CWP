import { area as turfArea, intersect, polygon } from '@turf/turf';
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

function findSectorWithLargestVerticalIntersection(
  sector: ISectorModel, otherSectors: ISectorModel[],
): ISectorModel | undefined {
  // Compute the overlapping height for each sector
  const otherSectorsWithHeight = otherSectors.map((s) => {
    const top = Math.min(sector.topFlightLevel, s.topFlightLevel);
    const bottom = Math.max(sector.bottomFlightLevel, s.bottomFlightLevel);
    return { sector: s, height: top - bottom };
  });

  // Find the sector with the largest height, when it is the same, take the sector with the lowest
  // bottomFlightLevel
  // eslint-disable-next-line unicorn/no-array-reduce
  const largestSector = otherSectorsWithHeight.reduce(
    (previous, current) => (previous.height > current.height ? previous
      : (previous.height < current.height ? current
        // eslint-disable-next-line unicorn/no-nested-ternary
        : previous.sector.bottomFlightLevel < current.sector.bottomFlightLevel ? previous
          : current)));

  if (largestSector.height === 0) {
    return undefined;
  }
  return largestSector.sector;
}

function findWest(sector: ISectorModel, otherSectors: ISectorModel[]): ISectorModel | undefined {
  if (sector.sectorId.includes('W')) {
    throw new Error('Cannot find west of a west sector');
  }
  const westSectors = otherSectors.filter(
    (s) => s.sectorId !== sector.sectorId && s.sectorId.includes('W'));

  return findSectorWithLargestVerticalIntersection(sector, westSectors);
}

function findEast(sector: ISectorModel, otherSectors: ISectorModel[]): ISectorModel | undefined {
  if (!sector.sectorId.includes('W')) {
    throw new Error('Cannot find east of a non-west sector');
  }

  const eastSectors = otherSectors.filter(
    (s) => s.sectorId !== sector.sectorId && !s.sectorId.includes('W'));

  return findSectorWithLargestVerticalIntersection(sector, eastSectors);
}

function findSectorNextTo(
  sectorId: string, position: string, area: ISectorModel[],
): string | undefined {
  const sector = area.find((s) => s.sectorId === sectorId);
  if (!sector) {
    throw new Error(`Sector ${sectorId} not found`);
  }
  switch (position) {
    case 'left':
      return findWest(sector, area)?.sectorId;
    case 'right':
      return findEast(sector, area)?.sectorId;
    case 'above':
      return findAbove(sector, area)?.sectorId;
    case 'below':
      return findBelow(sector, area)?.sectorId;
    default:
      throw new Error(`Invalid position ${position}`);
  }
}

export default function SectorConfigCommand(_arguments: string[]): void {
  const [mode, position] = _arguments;

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

  if (!sectorName) {
    throw new Error('No controlled sector found (yet ?)');
  }

  if (position) {
    const area = mode === 'current'
      ? configurationStore.areaOfIncludedAirspaces
      : configurationStore.areaOfIncludedAirspacesForNextConfiguration;
    sectorName = findSectorNextTo(sectorName, position, area);
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
