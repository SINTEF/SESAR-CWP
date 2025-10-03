import type { LineLayerSpecification } from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import { sepQdmStore } from "../state";

const SEP_COLOR = "#0000FF"; // Blue for saved SEP lines
const QDM_COLOR = "#FF8C00"; // Orange for saved QDM lines

const paintSepLine: LineLayerSpecification["paint"] = {
	"line-color": SEP_COLOR,
	"line-width": 2,
};

const paintQdmLine: LineLayerSpecification["paint"] = {
	"line-color": QDM_COLOR,
	"line-width": 2,
};

export default observer(function SepQdmLines() {
	// Build features for SEP lines from separation instances
	const sepFeatures: GeoJSON.Feature<GeoJSON.LineString>[] = [];
	for (const separation of sepQdmStore.savedSepLines) {
		const geoJSON = separation.lineGeoJSON;
		if (geoJSON) {
			sepFeatures.push(geoJSON);
		}
	}

	// Build features for QDM lines from separation instances
	const qdmFeatures: GeoJSON.Feature<GeoJSON.LineString>[] = [];
	for (const separation of sepQdmStore.savedQdmLines) {
		const geoJSON = separation.lineGeoJSON;
		if (geoJSON) {
			qdmFeatures.push(geoJSON);
		}
	}

	// Don't render if no valid features at all
	if (sepFeatures.length === 0 && qdmFeatures.length === 0) {
		return null;
	}

	const sepGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: sepFeatures,
	};

	const qdmGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: qdmFeatures,
	};

	return (
		<>
			{sepFeatures.length > 0 && (
				<Source id="sep_lines_source" type="geojson" data={sepGeoJson}>
					<Layer id="sep_lines" type="line" paint={paintSepLine} />
				</Source>
			)}
			{qdmFeatures.length > 0 && (
				<Source id="qdm_lines_source" type="geojson" data={qdmGeoJson}>
					<Layer id="qdm_lines" type="line" paint={paintQdmLine} />
				</Source>
			)}
		</>
	);
});
