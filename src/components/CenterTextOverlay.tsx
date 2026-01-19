import type { SymbolLayerSpecification } from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import { configurationStore } from "../state";

const textPaint: SymbolLayerSpecification["paint"] = {
	"text-color": "#666",
};

const textLayout: SymbolLayerSpecification["layout"] = {
	"text-field": ["get", "label"],
	"text-allow-overlap": true,
	"text-anchor": "center",
	"text-justify": "center",
	"text-font": ["IBM Plex Mono Bold"],
	"text-size": 20,
};

interface CenterTextOverlayProps {
	beforeId?: string;
}

const CenterTextOverlay = observer(function CenterTextOverlay({
	beforeId,
}: CenterTextOverlayProps) {
	const currentConfiguration = configurationStore.configurations.get(
		configurationStore.currentConfigurationId,
	);

	const { volumeIdsLabel, minFlightLevel, maxFlightLevel } =
		currentConfiguration ?? {};

	// Memoize the GeoJSON to avoid unnecessary layer updates
	const geojson = useMemo((): GeoJSON.FeatureCollection | null => {
		// Don't render if there are no volumes
		if (!volumeIdsLabel) {
			return null;
		}

		const label = `${volumeIdsLabel}\n‾‾‾‾‾‾‾‾‾‾‾‾‾\nFL${maxFlightLevel}\n―――――――――――――\nFL${minFlightLevel}`;

		return {
			type: "FeatureCollection",
			features: [
				{
					type: "Feature",
					geometry: { type: "Point", coordinates: [6.85, 44] },
					properties: { label },
				},
			],
		};
	}, [volumeIdsLabel, minFlightLevel, maxFlightLevel]);

	if (!geojson) {
		return null;
	}

	return (
		<Source id="center_text_overlay" type="geojson" data={geojson}>
			<Layer
				id="center_text_overlay_layer"
				type="symbol"
				layout={textLayout}
				paint={textPaint}
				beforeId={beforeId}
			/>
		</Source>
	);
});

export default CenterTextOverlay;
