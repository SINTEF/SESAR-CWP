import React from 'react';

import SectorEdgesPolygon from './SectorEdgesPolygon';
import SectorPolygons from './SectorPolygons';

export default function Sectors() {
  return [
    <SectorPolygons key="sector-polygons" />,
    <SectorEdgesPolygon key="sector-edges-polygon" />,
  ];
}
