import { centroid } from "@turf/centroid";
import type { Feature, Geometry } from "geojson";
import type {
	FillLayerSpecification,
	LineLayerSpecification,
	SymbolLayerSpecification,
} from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import {
	airspaceStore,
	//configurationStore,
	cwpStore,
	sectorStore,
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
	"text-font": ["IBM Plex Mono"],
	"text-size": 9.5,
	"text-offset": [0.25, 0],
	"text-anchor": "left",
	"text-allow-overlap": true,
	"text-ignore-placement": true,
};

// Layout for sector names displayed along the polygon boundary (like road names)
const sectorBoundaryNamesLayout: SymbolLayerSpecification["layout"] = {
	"symbol-placement": "line",
	"text-field": ["get", "key"],
	"text-font": ["IBM Plex Mono"],
	"text-size": 10,
	"text-offset": [0, -0.8], // Offset perpendicular to the line (positive = right side of line direction)
	"text-allow-overlap": false,
	"text-ignore-placement": false,
	"symbol-spacing": 80,
	"text-rotation-alignment": "map",
	"text-pitch-alignment": "viewport",
};

const sectorBoundaryNamesPaint: SymbolLayerSpecification["paint"] = {
	"text-color": ["get", "color"],
	"text-halo-color": "#000",
	"text-halo-width": 2,
};

interface SectorPolygonsProps {
	beforeId?: string;
}

export default observer(function SectorPolygons({
	beforeId,
}: SectorPolygonsProps) {
	const { highestBound, lowestBound } = cwpStore.altitudeFilter;
	const { showSectorLabels, showClickedSector, clickedSectorId } = cwpStore;
	//const configBounds = configurationStore.currentConfigurationFlightLevelBounds;
	const sectorList = sectorStore.sectorList;
	const sectorData = sectorList
		.map((sector) => {
			const volumes = sector.includedAirspaceVolumes;
			const bottomFlightLevel =
				volumes.length > 0
					? Math.min(...volumes.map((v) => v.bottomFlightLevel))
					: 0;
			const topFlightLevel =
				volumes.length > 0
					? Math.max(...volumes.map((v) => v.topFlightLevel))
					: 0;
			return {
				sectorId: sector.sectorId,
				bottomFlightLevel,
				topFlightLevel,
				sectorArea: sector.area,
			};
		})
		.filter((area) => area.sectorArea.length > 0);
	// Filter sectors that intersect with the current configuration's flight level range
	/*.filter((area) => {
			if (!configBounds) {
				return true; // No configuration bounds, show all sectors
			}
			console.log(
				"configBounds",
				configBounds,
				area.bottomFlightLevel,
				area.topFlightLevel,
			);
			// Check if sector flight levels intersect with configuration flight levels
			return (
				area.bottomFlightLevel <= configBounds.maxFlightLevel &&
				area.topFlightLevel >= configBounds.minFlightLevel
			);
		}*/

	// Early return if sectors toggle is off
	if (!showSectorLabels || sectorData.length === 0) {
		return null;
	}

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
	// Line features for sector outlines (dashed lines)
	const sectorOutlines: Feature<Geometry, { color: string; key: string }>[] =
		sectorData.map((area) => {
			const { bottomFlightLevel, topFlightLevel, sectorArea, sectorId } = area;
			const coordinates = sectorArea.map((point) => [
				point.longitude,
				point.latitude,
			]);
			return {
				type: "Feature",
				properties: {
					key: sectorId,
					color: getSectorColor(bottomFlightLevel, topFlightLevel),
				},
				geometry: {
					type: "LineString",
					coordinates: [...coordinates, coordinates[0]],
				},
			};
		});

	const centroidPoints = [];
	for (const feature of sectorOutlines) {
		const centroidPt = centroid<{ title: string }>(feature);
		centroidPt.properties = {
			title: feature.properties.key,
		};
		centroidPoints.push(centroidPt);
	}
	const centroidPointsCollection: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: centroidPoints,
	};

	// FeatureCollection for all sector outlines (used for boundary labels)
	const sectorOutlinesCollection: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: sectorOutlines,
	};

	const sourceAndLayersForSectorOutlines = sectorOutlines.map((sector) => {
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
		? (airspaceStore.getAreaFromId(clickedSectorId) ??
			sectorStore.getSector(clickedSectorId))
		: undefined;
	if (highlightedSectorArea) {
		sectorHighlightJSON.features.push({
			type: "Feature",
			properties: {},
			geometry: {
				type: "Polygon",
				coordinates: [
					("sectorArea" in highlightedSectorArea
						? highlightedSectorArea.sectorArea
						: highlightedSectorArea.area
					).map((point) => [point.longitude, point.latitude]),
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
					beforeId={beforeId}
				/>
			</Source>
			<Source
				id="sector_boundary_names"
				type="geojson"
				data={sectorOutlinesCollection}
			>
				<Layer
					id="sector_boundary_names_layer"
					type="symbol"
					layout={sectorBoundaryNamesLayout}
					paint={sectorBoundaryNamesPaint}
					beforeId={beforeId}
				/>
			</Source>
			{sourceAndLayersForSectorOutlines}
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
						beforeId={beforeId}
					/>
				</Source>
			) : null}
		</>
	);
});
