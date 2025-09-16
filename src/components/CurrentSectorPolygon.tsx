import { centroid } from "@turf/centroid";
import { polygon } from "@turf/helpers";
import type { Position } from "geojson";
import type {
	FillLayerSpecification,
	LineLayerSpecification,
	SymbolLayerSpecification,
} from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";

import { configurationStore, roleConfigurationStore } from "../state";

const sectorOutlinePaint: LineLayerSpecification["paint"] = {
	"line-color": "#333333",
	"line-width": 2.5,
};
const sectorFillPaint: FillLayerSpecification["paint"] = {
	"fill-color": "#3d3d3d",
	"fill-opacity": 0.6,
};

export default observer(function SectorPolygons(/* properties */) {
	const { areaOfCurrentControlledSector, currentControlledSectorByCWP } =
		roleConfigurationStore;
	const { currentCWP, areaOfIncludedAirspaces } = configurationStore;

	if (!areaOfCurrentControlledSector || configurationStore.currentCWP === "") {
		return null;
	}
	const coordinates = areaOfCurrentControlledSector.map((point) => [
		point.longitude,
		point.latitude,
	]);
	const sectors: GeoJSON.Feature = {
		type: "Feature",
		properties: {},
		geometry: {
			type: "Polygon",
			coordinates: [coordinates],
		},
	};

	const geoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: [sectors],
	};
	const currentSectorId = currentControlledSectorByCWP(currentCWP);
	const sectorConfiguration = areaOfIncludedAirspaces.find(
		({ sectorId }) => sectorId === currentSectorId,
	);
	const setSectorName = (bottomFL: number, topFL: number): string => {
		return `FL${bottomFL}/FL${topFL}`;
	};
	const setCentroidPoint = (
		sector: GeoJSON.FeatureCollection,
	): GeoJSON.Feature[] | undefined => {
		const centroidPoint = [];
		const geometry = sector.features[0].geometry;
		if (geometry.type === "Polygon") {
			const polygonFeature = polygon(geometry.coordinates as Position[][]);
			const centroidPt = centroid(polygonFeature);
			if (centroidPt && centroidPt.properties) {
				centroidPt.properties.title = setSectorName(
					sectorConfiguration?.bottomFlightLevel ?? 0,
					sectorConfiguration?.topFlightLevel ?? 0,
				);
			}
			centroidPoint.push(centroidPt);

			return centroidPoint;
		}
	};
	const centroidPointsCollection: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: setCentroidPoint(geoJson) ?? [],
	};

	const sectorNameslayout: SymbolLayerSpecification["layout"] = {
		"text-field": ["get", "title"],
		"text-allow-overlap": true,
		"text-radial-offset": 0.3,
		"text-variable-anchor": [
			"center",
			"left",
			"right",
			"top",
			"bottom",
			"top-left",
			"top-right",
			"bottom-left",
			"bottom-right",
		],
		"text-font": ["IBM Plex Mono Bold"],
		"text-size": 40,
	};
	const sectorNamesPaint: SymbolLayerSpecification["paint"] = {
		"text-color": "#fff",
	};

	return (
		<>
			<Source id="current_sector_polygons_source" type="geojson" data={geoJson}>
				<Layer
					id="current_sector_polygons"
					type="line"
					paint={sectorOutlinePaint}
				/>
				<Layer
					id="current_sector_polygons_fill"
					type="fill"
					paint={sectorFillPaint}
				/>
			</Source>
			<Source
				id="current_sector_centroid_source"
				type="geojson"
				data={centroidPointsCollection}
			>
				<Layer
					id="current_sector_name_layer"
					type="symbol"
					layout={sectorNameslayout}
					paint={sectorNamesPaint}
					beforeId="current_sector_polygons"
				/>
			</Source>
		</>
	);
});
