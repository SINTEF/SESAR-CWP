import type { SymbolLayerSpecification } from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";

import { cwpStore, fixStore } from "../state";

const FIXES_POINT_COLOR = "#aaa";

const fixNamePaint: SymbolLayerSpecification["paint"] = {
	"text-color": FIXES_POINT_COLOR,
	"icon-color": FIXES_POINT_COLOR,
};

const fixNameLayout: SymbolLayerSpecification["layout"] = {
	"text-field": ["get", "title"],
	"text-font": ["IBM Plex Mono"],
	"text-size": 9.5,
	"text-offset": [0.25, 0],
	"text-anchor": "left",
	"icon-image": "fixes",
	"text-allow-overlap": true,
	"icon-allow-overlap": true,
};
//Removed for now, as it is not used in DSNA version
export default observer(function FixesPoints(/* properties */) {
	// Load required data
	const fixData = fixStore.fixes;
	// const bounds = configurationStore.extendedEdgesBounds; // TODO: Change bounds

	if (!cwpStore.showFixes) {
		return null;
	}

	// Build the GeoJSON
	const features: GeoJSON.Feature[] = [...fixData.values()].map(
		({ latitude, longitude, pointId }) => ({
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [longitude, latitude],
			},
			properties: {
				title: `\u25AA ${pointId}`,
			},
		}),
	);

	const fixJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features,
	};

	return (
		<Source id="fixesSource" type="geojson" data={fixJson}>
			<Layer
				id="fixesPoints"
				type="symbol"
				layout={fixNameLayout}
				paint={fixNamePaint}
			/>
		</Source>
	);
});
