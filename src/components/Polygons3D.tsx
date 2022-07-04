import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';
import type { FillExtrusionPaint, FillPaint } from 'mapbox-gl';

import { configurationStore } from '../state';

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
const fillColors = ['#fff', '#f59', '#0bb', '#94a', '#b00', '#f80', '#f63', '#3c0', '#40f', '#0bb', '#94a', '#b00', '#f80', '#f63'];

function ConvertFlightLevelToMeters(altitude: number): number {
  const feet = altitude * 100;
  const meters = feet * 0.3048;
  return meters;
}

export default observer(function SectorPolygons(/* properties */) {
  const sectorStore = configurationStore.areaOfIncludedAirspaces;
  const sectorData = [...sectorStore.values()]
    .filter(([, area]) => area.sectorArea?.length > 0);

  let counter = 0;
  const sectors: GeoJSON.Feature[] = sectorData.map(([title, area]) => {
    const coordinates = area.sectorArea.map((point) => (
      [point.longitude, point.latitude]),
    );
    counter += 1;
    return {
      type: 'Feature',
      properties: {
        t: `${title}-${area.bottomFlightLevel}-${area.topFlightLevel}`,
        color: fillColors[counter],
        height: ConvertFlightLevelToMeters(area.topFlightLevel - 205) * 20,
        base_height: ConvertFlightLevelToMeters(area.bottomFlightLevel - 205) * 20,
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
