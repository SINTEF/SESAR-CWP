import { observer } from "mobx-react-lite";
import React from "react";
import { Layer, Source } from "react-map-gl";
import type {
	LinePaint,
	FillPaint,
	SymbolLayout,
	SymbolPaint,
} from "mapbox-gl";
import * as turf from "@turf/turf";

import { configurationStore, roleConfigurationStore } from "../state";

const sectorOutlinePaint: LinePaint = {
	"line-color": "#333333",
	"line-width": 2.5,
};
const sectorFillPaint: FillPaint = {
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
			const polygon = turf.polygon(geometry.coordinates as turf.Position[][]);
			const centroidPt = turf.centroid(polygon);
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

	const sectorNameslayout: SymbolLayout = {
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
	const sectorNamesPaint: SymbolPaint = {
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
