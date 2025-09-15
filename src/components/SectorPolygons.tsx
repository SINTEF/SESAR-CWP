import { centroid } from "@turf/centroid";
import type { Feature, Geometry } from "geojson";
import type {
	FillLayerSpecification,
	LineLayerSpecification,
	SymbolLayerSpecification,
} from "maplibre-gl";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import {
	airspaceStore,
	configurationStore,
	cwpStore,
	roleConfigurationStore,
} from "../state";

const sectorOutlinePaint: LineLayerSpecification["paint"] = {
	"line-color": ["get", "color"],
	"line-width": 1.5,
	"line-dasharray": [2, 2],
};
const sectorOutlineBackgroundPaint: LineLayerSpecification["paint"] = {
	"line-color": "#000",
	"line-width": 3,
};
const sectorNamesPaint: SymbolLayerSpecification["paint"] = {
	"text-color": "#99ff99",
	"text-halo-color": "#000",
	"text-halo-width": 2,
};
const sectorHighlightPaint: FillLayerSpecification["paint"] = {
	"fill-color": "#fff",
	"fill-opacity": 0.2,
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
	"text-size": 14,
};

export default observer(function SectorPolygons(/* properties */) {
	const { highestBound, lowestBound } = cwpStore.altitudeFilter;
	const { showSectorLabels, showClickedSector, clickedSectorId } = cwpStore;
	const { areaOfAirspacesToDisplay, currentConfigurationId } =
		configurationStore;
	const sectorData = areaOfAirspacesToDisplay.filter(
		(area) =>
			((area.bottomFlightLevel >= lowestBound &&
				area.bottomFlightLevel <= highestBound) ||
				(area.topFlightLevel <= highestBound &&
					area.topFlightLevel >= lowestBound)) &&
			area.sectorArea.length > 0,
	);

	const sectorNamesText: SymbolLayerSpecification["layout"] = {
		...sectorNameslayout,
		visibility: showSectorLabels ? "visible" : "none",
	};
	const getSectorColor = (bottom: number, top: number): string => {
		if (top > highestBound) {
			return "#ff4f00";
		}
		if (bottom < lowestBound) {
			return "#48A14D";
		}
		return "#fff";
	};
	const setSectorName = (
		bottomFL: number,
		topFL: number,
		sectorId: string,
	): string =>
		computed(() => {
			for (const key of roleConfigurationStore.roleConfigurations.keys()) {
				const sector = roleConfigurationStore.findCurrentSectorByCWP(
					key,
					currentConfigurationId,
				);
				if (sector === sectorId) {
					return `${key}-${bottomFL}-${topFL}`;
				}
			}
			return "";
		}).get();
	const sectors: Feature<
		Geometry,
		{ t: string; color: string; key: string }
	>[] = sectorData.map((area) => {
		const { bottomFlightLevel, topFlightLevel, sectorArea, sectorId } = area;
		const coordinates = sectorArea.map((point) => [
			point.longitude,
			point.latitude,
		]);
		return {
			type: "Feature",
			properties: {
				key: sectorId,
				t: setSectorName(bottomFlightLevel, topFlightLevel, sectorId),
				color: getSectorColor(bottomFlightLevel, topFlightLevel),
			},
			geometry: {
				type: "LineString",
				coordinates: [...coordinates, coordinates[0]],
			},
		};
	});
	const centroidPoints = [];
	const coeff = 0.001;
	const sectorsLength = sectors.length;
	for (const feature of sectors) {
		const centroidPt = centroid<{ title: string }>(feature);
		const index = centroidPoints.length;
		// Add some little offset to avoid overlapping
		centroidPt.geometry.coordinates[0] +=
			(index * sectorsLength - sectorsLength / 2) * coeff;
		centroidPt.geometry.coordinates[1] +=
			(index * sectorsLength - sectorsLength / 2) * coeff;
		centroidPt.properties.title = feature.properties.t;
		centroidPoints.push(centroidPt);
	}
	const centroidPointsCollection: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: centroidPoints,
	};

	const sourceAndALayersForSectors = sectors.map((sector) => {
		const data = {
			type: "FeatureCollection",
			features: [sector],
		} as GeoJSON.FeatureCollection;

		const id = sector.properties.key;
		const idSource = `sector_polygons_${id}_source`;
		const idOutline = `sector_polygons_${id}_outline`;
		const idBackground = `sector_polygons_${id}_background`;

		return (
			<Source id={idSource} type="geojson" data={data} key={id}>
				<Layer
					id={idOutline}
					type="line"
					paint={sectorOutlinePaint}
					beforeId="sector_polygon_names_layer"
				/>
				<Layer
					id={idBackground}
					type="line"
					paint={sectorOutlineBackgroundPaint}
					beforeId={idOutline}
				/>
			</Source>
		);
	});

	const sectorHighlightJSON: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: [],
	};

	const highlightedSectorArea = showClickedSector
		? airspaceStore.getAreaFromId(clickedSectorId)
		: undefined;
	if (highlightedSectorArea) {
		sectorHighlightJSON.features.push({
			type: "Feature",
			properties: {},
			geometry: {
				type: "Polygon",
				coordinates: [
					highlightedSectorArea.sectorArea.map((point) => [
						point.longitude,
						point.latitude,
					]),
				],
			},
		});
	}

	return (
		<>
			<Source
				id="sector_polygon_names"
				type="geojson"
				data={centroidPointsCollection}
			>
				<Layer
					id="sector_polygon_names_layer"
					type="symbol"
					layout={sectorNamesText}
					paint={sectorNamesPaint}
					beforeId="sector_edges_polygon"
				/>
			</Source>
			{sourceAndALayersForSectors}
			{showClickedSector ? (
				<Source
					id="sector_polygons_highlight"
					type="geojson"
					data={sectorHighlightJSON}
				>
					<Layer
						id="sector_highlight"
						type="fill"
						paint={sectorHighlightPaint}
					/>
				</Source>
			) : null}
		</>
	);
});
