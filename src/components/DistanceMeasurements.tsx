import type {
	LineLayerSpecification,
	SymbolLayerSpecification,
} from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";

import { distanceLineStore } from "../state";

const linePaint: LineLayerSpecification["paint"] = {
	"line-color": ["get", "color"],
	"line-width": 2.5,
};

const lineLayout: LineLayerSpecification["layout"] = {
	"line-join": "round",
};
const measureNamePaint: SymbolLayerSpecification["paint"] = {
	"text-color": ["get", "color"],
	"text-halo-color": "#000",
	"text-halo-width": 2,
};

const measureLinesLayout: SymbolLayerSpecification["layout"] = {
	"symbol-placement": "line",
	"text-field": ["get", "length"],
	"text-allow-overlap": false,
	"text-max-angle": 90,
	"text-font": ["IBM Plex Mono Bold"],
	"text-size": 9,
	"text-offset": [0, -1],
	"text-anchor": "center",
};

const measurePointsLayout: SymbolLayerSpecification["layout"] = {
	"symbol-placement": "point",
	"text-field": ["get", "length"],
	"text-allow-overlap": true,
	"text-max-angle": 90,
	"text-font": ["IBM Plex Mono Bold"],
	"text-size": 12,
	"text-offset": [0, -1],
	"text-anchor": "center",
};

export default observer(function DistanceMeasurements() {
	const { measureLines, measurePoints } = distanceLineStore;

	return (
		<>
			<Source
				id="distance-measurement-lines-source"
				type="geojson"
				data={measureLines}
			>
				<Layer
					id="measure-lines"
					type="line"
					paint={linePaint}
					layout={lineLayout}
				/>
				<Layer
					id="measure-length"
					type="symbol"
					paint={measureNamePaint}
					layout={measureLinesLayout}
				/>
			</Source>
			<Source
				id="distance-measurement-points-source"
				type="geojson"
				data={measurePoints}
			>
				<Layer
					id="measure-length-last"
					type="symbol"
					paint={measureNamePaint}
					layout={measurePointsLayout}
				/>
			</Source>
		</>
	);
});
