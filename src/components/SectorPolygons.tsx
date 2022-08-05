import * as turf from '@turf/turf';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { Feature, Geometry } from '@turf/turf';
import type {
  FillPaint, LinePaint, SymbolLayout, SymbolPaint,
} from 'mapbox-gl';

import {
  airspaceStore, configurationStore, cwpStore, roleConfigurationStore,
} from '../state';

const sectorOutlinePaint: LinePaint = {
  'line-color': ['get', 'color'],
  'line-width': 1.5,
  'line-dasharray': [2, 2],
};
const sectorOutlineBackgroundPaint: LinePaint = {
  'line-color': '#000',
  'line-width': 3,
};
const sectorNamesPaint: SymbolPaint = {
  'text-color': '#99ff99',
};
const sectorHighlightPaint: FillPaint = {
  'fill-color': '#fff',
  'fill-opacity': 0.4,
};

const sectorNameslayout: SymbolLayout = {
  'text-field': ['get', 'title'],
  'text-allow-overlap': true,
  'text-radial-offset': 0.3,
  'text-variable-anchor': ['center', 'left', 'right', 'top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
  'text-font': [
    'Open Sans Bold',
  ],
  'text-size': 14,
};

export default observer(function SectorPolygons(/* properties */) {
  const { highestBound, lowestBound } = cwpStore.altitudeFilter;
  const { showSectorLabels, showClickedSector, clickedSectorId } = cwpStore;
  const { areaOfIncludedAirspaces, currentConfigurationId } = configurationStore;
  const sectorStore = areaOfIncludedAirspaces;
  const sectorData = [...sectorStore.values()]
    .filter(([, area]) => ((
      area.bottomFlightLevel >= lowestBound && area.bottomFlightLevel <= highestBound)
      || (area.topFlightLevel <= highestBound && area.topFlightLevel >= lowestBound))
      && area.sectorArea?.length > 0,
    );
  const sectorNamesText: SymbolLayout = {
    ...sectorNameslayout,
    visibility: showSectorLabels ? 'visible' : 'none',
  };
  const getSectorColor = (bottom: number, top: number): string => {
    if (top > highestBound) {
      return '#ff4f00';
    } if (bottom < lowestBound) {
      return '#48A14D';
    }
    return '#fff';
  };
  const setSectorName = (bottomFL: number, topFL: number, sectorId: string): string => {
    for (const key of roleConfigurationStore.roleConfigurations.keys()) {
      const sector = roleConfigurationStore
        .getControlledSector(key, currentConfigurationId);
      if (sector === sectorId) {
        return `${key}-${bottomFL}-${topFL}`;
      }
    }
    return `S-${bottomFL}-${topFL}`;
  };
  const sectors: Feature<Geometry, { t: string, color: string, key: string }>[] = sectorData.map(
    ([key, area]) => {
      const coordinates = area.sectorArea.map((point) => (
        [point.longitude, point.latitude]),
      );
      return {
        type: 'Feature',
        properties: {
          key,
          t: setSectorName(area.bottomFlightLevel, area.topFlightLevel, key),
          color: getSectorColor(area.bottomFlightLevel, area.topFlightLevel),
        },
        geometry: {
          type: 'LineString',
          coordinates: [...coordinates, coordinates[0]],
        },
      };
    });
  const centroidPoints = [];
  for (const feature of sectors) {
    const centroidPt = turf.centroid<{ title: string }>(feature);
    centroidPt.properties.title = feature.properties.t;
    centroidPoints.push(centroidPt);
  }
  const centroidPointsCollection: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: centroidPoints,
  };

  const sourceAndALayersForSectors = sectors.map((sector) => {
    const data = {
      type: 'FeatureCollection',
      features: [sector],
    } as GeoJSON.FeatureCollection;

    const id = sector.properties.key;
    const idSource = `sector_polygons_${id}_source`;
    const idOutline = `sector_polygons_${id}_outline`;
    const idBackground = `sector_polygons_${id}_background`;

    return (
      <Source id={idSource} type="geojson" data={data} key={id} >
        <Layer id={idOutline} type="line" paint={sectorOutlinePaint} beforeId="sector_edges_polygon" />
        <Layer id={idBackground} type="line" paint={sectorOutlineBackgroundPaint} beforeId={idOutline} />
      </Source>
    );
  });

  const sectorHighlightJSON: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  const highlightedSectorArea = airspaceStore.getAreaFromId(clickedSectorId);
  if (highlightedSectorArea) {
    sectorHighlightJSON.features.push({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [highlightedSectorArea.airspaceArea.map((point) => (
          [point.longitude, point.latitude]))],
      },
    });
  }

  return (
    <>
      {sourceAndALayersForSectors}
      <Source id="sector_polygon_names" type="geojson" data={centroidPointsCollection}>
        <Layer id="name-style" type="symbol" layout={sectorNamesText} paint={sectorNamesPaint} />
      </Source>
      {showClickedSector ? (
        <Source id="sector_polygons_highlight" type="geojson" data={sectorHighlightJSON}>
          <Layer id="sector_highlight" type="fill" paint={sectorHighlightPaint} />
        </Source>
      ) : null}
    </>
  );
});
