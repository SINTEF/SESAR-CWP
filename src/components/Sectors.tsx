

import CurrentSectorPolygon from "./CurrentSectorPolygon";
import SectorEdgesPolygon from "./SectorEdgesPolygon";
import SectorPolygons from "./SectorPolygons";

export default function Sectors() {
	return (
		<>
			<SectorEdgesPolygon />
			<SectorPolygons />
			<CurrentSectorPolygon />
		</>
	);
}
