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
  'line-width': 1,
  'line-dasharray': [2, 2],
};
const sectorNamesPaint: SymbolPaint = {
  'text-color': '#99ff99',
};
const sectorHighlightPaint: FillPaint = {
  'fill-color': '#fff',
  'fill-opacity': 0.4,
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
    visibility: showSectorLabels ? 'visible' : 'none',
    'text-field': ['get', 'title'],
    'text-allow-overlap': true,
    'text-font': [
      'Open Sans Bold',
    ],
    'text-size': 14,
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
  const sectors: Feature<Geometry, { t: string, color: string }>[] = sectorData.map(
    ([key, area]) => {
      const coordinates = area.sectorArea.map((point) => (
        [point.longitude, point.latitude]),
      );
      return {
        type: 'Feature',
        properties: {
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

  const geoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: sectors as GeoJSON.Feature[],
  };

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
      <Source id="sector_polygons_source" type="geojson" data={geoJson}>
        <Layer id="sector_polygons" type="line" paint={sectorOutlinePaint} />
      </Source>
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
