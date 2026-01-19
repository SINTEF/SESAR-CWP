import type {
	LineLayerSpecification,
	SymbolLayerSpecification,
} from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import { sepQdmStore } from "../state";

const ACTIVE_COLOR = "#FFFF00"; // Yellow for active drawing line

const paintLine: LineLayerSpecification["paint"] = {
	"line-color": ACTIVE_COLOR,
	"line-width": 2,
};

const layoutText: SymbolLayerSpecification["layout"] = {
	"text-field": ["get", "title"],
	"text-allow-overlap": true,
	"text-font": ["IBM Plex Mono Bold"],
	"text-size": 10,
	"text-offset": [0, 2.25],
	"text-anchor": "bottom",
};

const paintText: SymbolLayerSpecification["paint"] = {
	"text-color": ACTIVE_COLOR,
};

interface SepQdmCurrentLineProps {
	beforeId?: string;
}

export default observer(function SepQdmCurrentLine({
	beforeId,
}: SepQdmCurrentLineProps) {
	// Only render if currently drawing
	if (!sepQdmStore.isDrawing) {
		return null;
	}

	const { startPosition, endPosition, mode } = sepQdmStore;

	// Only render if we have both start and end positions
	if (!startPosition || !endPosition) {
		return null;
	}

	const lineGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: {
					type: "LineString",
					coordinates: [startPosition, endPosition],
				},
				properties: {},
			},
		],
	};

	// Determine label based on current mode
	const label = mode === "SEP" ? "SEP ?" : mode === "QDM" ? "QDM ?" : "?";

	const textGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: endPosition,
				},
				properties: {
					title: label,
				},
			},
		],
	};

	return (
		<>
			<Source
				id="sep_qdm_current_line_source"
				type="geojson"
				data={lineGeoJson}
			>
				<Layer
					id="sep_qdm_current_line"
					type="line"
					paint={paintLine}
					beforeId={beforeId}
				/>
			</Source>
			<Source
				id="sep_qdm_current_text_source"
				type="geojson"
				data={textGeoJson}
			>
				<Layer
					id="sep_qdm_current_text"
					type="symbol"
					layout={layoutText}
					paint={paintText}
					beforeId="sep_qdm_current_line"
				/>
			</Source>
		</>
	);
});
