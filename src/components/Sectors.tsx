import CurrentSectorPolygon from "./CurrentSectorPolygon";
import SectorEdgesPolygon from "./SectorEdgesPolygon";
import SectorPolygons from "./SectorPolygons";

interface SectorsProps {
	beforeId?: string;
}

export default function Sectors({ beforeId }: SectorsProps) {
	return (
		<>
			<SectorEdgesPolygon beforeId={beforeId} />
			<SectorPolygons beforeId={beforeId} />
			<CurrentSectorPolygon beforeId={beforeId} />
		</>
	);
}
