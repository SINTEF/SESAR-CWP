import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { FillExtrusionPaint, FillPaint } from 'mapbox-gl';

import { configurationStore, cwpStore, roleConfigurationStore } from '../state';

const sectorPaint: FillPaint = {
  'fill-color': ['get', 'color'],
  'fill-opacity': 0.4,
};

const sectorFillPaint: FillExtrusionPaint = {
  'fill-extrusion-color': ['get', 'color'],
  'fill-extrusion-height': ['get', 'height'],
  'fill-extrusion-base': ['get', 'base_height'],
  'fill-extrusion-opacity': 0.8,
};

function ConvertFlightLevelToMeters(altitude: number): number {
  const feet = altitude * 100;
  const meters = feet * 0.3048;
  return meters;
}

const setHighlighted3DPolygon = (id: string): string | undefined => {
  if (id === cwpStore.clickedSectorId) {
    return '#fff';
  }
  const color = roleConfigurationStore.getcolorBySectorId(id);
  return color;
};

export default observer(function SectorPolygons(/* properties */) {
  const sectorStore = configurationStore.areaOfAirspacesToDisplay;
  const sectorData = sectorStore
    .filter((area) => area.sectorArea.length > 0);

  sectorData
    .sort((a, b) => b.bottomFlightLevel - a.bottomFlightLevel
      || b.topFlightLevel - a.topFlightLevel);
  // const minBottomLevel = Math.min(...sectorData.map((a) => a.bottomFlightLevel));
  const sectors: GeoJSON.Feature[] = sectorData.map((area) => {
    const title = area.sectorId;
    const coordinates = area.sectorArea.map((point) => (
      [point.longitude, point.latitude]),
    );
    return {
      type: 'Feature',
      properties: {
        t: `${title}-${area.bottomFlightLevel}-${area.topFlightLevel}`,
        color: setHighlighted3DPolygon(title),
        height: ConvertFlightLevelToMeters(area.topFlightLevel - 205 > 415 ? 415 - 205
          : area.topFlightLevel - 205) * 30,
        base_height: ConvertFlightLevelToMeters(area.bottomFlightLevel - 205) * 30,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[...coordinates, coordinates[0]]],
      },
    };
  });

  const geoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: sectors,
  };

  return (
    <>
      <Source id="sector_polygons_source" type="geojson" data={geoJson}>
        <Layer id="sector_polygons_fill" type="fill" paint={sectorPaint} />
        <Layer id="sector_polygons" type="fill-extrusion" paint={sectorFillPaint} />
      </Source>
    </>
  );
});
