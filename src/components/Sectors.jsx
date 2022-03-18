import React from 'react';

import SectorEdgesPolygon from './SectorEdgesPolygon';
import SectorPolygons from './SectorPolygons';

export default function Sectors() {
  return [
    <SectorEdgesPolygon />,
    <SectorPolygons />,
  ];
}
