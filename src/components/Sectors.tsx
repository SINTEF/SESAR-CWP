import React from 'react';

// import SectorConfiguration from '../SectorConfiguration';
import CurrentSectorPolygon from './CurrentSectorPolygon';
import SectorEdgesPolygon from './SectorEdgesPolygon';
import SectorPolygons from './SectorPolygons';

export default function Sectors(): JSX.Element {
  return <>
    <SectorEdgesPolygon key="sector-edges-polygon" />,
    <SectorPolygons key="sector-polygons" />,
    <CurrentSectorPolygon key="current-sector-polygon" />,
    {/* <SectorConfiguration key="sector-configuration" /> */}
  </>;
}
