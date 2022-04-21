import React from 'react';

import CurrentSectorPolygon from './CurrentSectorPolygon';
import SectorEdgesPolygon from './SectorEdgesPolygon';
import SectorPolygons from './SectorPolygons';

export default function Sectors() {
  return [
    <SectorPolygons key="sector-polygons" />,
    <SectorEdgesPolygon key="sector-edges-polygon" />,
    <CurrentSectorPolygon key="current-sector-polygon" />,
  ];
}
