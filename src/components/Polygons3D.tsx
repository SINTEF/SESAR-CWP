import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { FillExtrusionPaint, FillPaint } from 'mapbox-gl';

import { cwpStore, roleConfigurationStore } from '../state';

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

const setHighlighted3DPolygon = (id: string): string => {
  if (id === cwpStore.clickedSectorId) {
    return '#fff';
  }
  return roleConfigurationStore.getcolorBySectorId(id);
};

export default observer(function SectorPolygons(/* properties */) {
  const sectorStore = roleConfigurationStore.areaOfAirspacesToDisplayIn3DView;
  const sectorData = sectorStore
    .filter((sector) => sector.sectorArea.length > 0);

  sectorData
    .sort((a, b) => b.bottomFlightLevel - a.bottomFlightLevel
      || b.topFlightLevel - a.topFlightLevel);

  const minBottomLevel = Math.min(...sectorData.map((a) => a.bottomFlightLevel));

  const setTopFlightLevel = (altitude: number): number => {
    if (minBottomLevel === 0) {
      if (altitude > 450) {
        return ConvertFlightLevelToMeters(450 - minBottomLevel - 250) * 30;
      }

      return ConvertFlightLevelToMeters(altitude - minBottomLevel - 250) * 30;
    }
    if (altitude > 450) {
      return ConvertFlightLevelToMeters(450 - minBottomLevel) * 30;
    }

    return ConvertFlightLevelToMeters(altitude - minBottomLevel) * 30;
  };
  const setBottomFlightLevel = (altitude: number): number => {
    if (minBottomLevel === 0) {
      return ConvertFlightLevelToMeters(altitude - minBottomLevel - 250) * 30;
    }

    return ConvertFlightLevelToMeters(altitude - minBottomLevel) * 30;
  };

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
        height: setTopFlightLevel(area.topFlightLevel),
        base_height: setBottomFlightLevel(area.bottomFlightLevel),
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
