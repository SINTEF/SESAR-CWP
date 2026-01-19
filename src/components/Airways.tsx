import type { LineLayerSpecification } from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";

import { airwaysStore, cwpStore } from "../state";

const AIRWAYS_LINE_COLOR = "#777777";

const airwaysLinePaint: LineLayerSpecification["paint"] = {
	"line-color": AIRWAYS_LINE_COLOR,
	"line-width": 0.5,
};

interface AirwaysProps {
	beforeId?: string;
}

/**
 * Renders airway segments as thin gray lines on the map.
 * Airways are displayed when the user enables the "Airways" toggle.
 */
export default observer(function Airways({ beforeId }: AirwaysProps) {
	const { segments } = airwaysStore;

	if (!cwpStore.showAirways || segments.length === 0) {
		return null;
	}

	// Build GeoJSON FeatureCollection with LineString features for each segment
	const features: GeoJSON.Feature[] = segments.map(
		({ fromLon, fromLat, toLon, toLat }) => ({
			type: "Feature",
			geometry: {
				type: "LineString",
				coordinates: [
					[fromLon, fromLat],
					[toLon, toLat],
				],
			},
			properties: {},
		}),
	);

	const airwaysGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features,
	};

	return (
		<Source id="airwaysSource" type="geojson" data={airwaysGeoJson}>
			<Layer
				id="airwaysLines"
				type="line"
				paint={airwaysLinePaint}
				beforeId={beforeId}
			/>
		</Source>
	);
});
