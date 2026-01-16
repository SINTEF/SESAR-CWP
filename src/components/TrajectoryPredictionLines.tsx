import type {
	CircleLayerSpecification,
	LineLayerSpecification,
	SymbolLayerSpecification,
} from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import { useDragging } from "../contexts/DraggingContext";
import type AircraftModel from "../model/AircraftModel";
import { aircraftStore, cwpStore, trajectoryPredictionStore } from "../state";

function buildPredictedTrajectories(
	selectedAircrafts: AircraftModel[],
	mainAircraftId: string | null,
	futureTime: number,
	mouseLat: number,
	mouseLon: number,
	showReferenceLine: boolean,
): GeoJSON.Feature[] {
	const features: GeoJSON.Feature[] = [];

	// Add dotted line from main aircraft to mouse position (only for map drag, not timeline)
	if (showReferenceLine && mainAircraftId) {
		const mainAircraft = selectedAircrafts.find(
			(a) => a.aircraftId === mainAircraftId,
		);
		if (mainAircraft) {
			features.push({
				type: "Feature",
				properties: {
					isDottedLine: true,
				},
				geometry: {
					type: "LineString",
					coordinates: [
						[mainAircraft.lastKnownLongitude, mainAircraft.lastKnownLatitude],
						[mouseLon, mouseLat],
					],
				},
			});
		}
	}

	// Build trajectory lines for each aircraft
	for (const aircraft of selectedAircrafts) {
		const trajectory = trajectoryPredictionStore.getPredictedTrajectory(
			aircraft.aircraftId,
			futureTime,
		);

		if (!trajectory || trajectory.length < 2) {
			continue;
		}

		// Add the trajectory line
		features.push({
			type: "Feature",
			properties: {
				isDottedLine: false,
			},
			geometry: {
				type: "LineString",
				coordinates: trajectory,
			},
		});

		// Add point at future position (last point of trajectory)
		const futurePosition = trajectory[trajectory.length - 1];
		features.push({
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: futurePosition,
			},
			properties: {
				title: aircraft.callSign,
			},
		});
	}

	return features;
}

// Solid white line for prediction
const paintSolidLine: LineLayerSpecification["paint"] = {
	"line-color": "#FFFFFF",
	"line-width": 2,
};

// Dotted white line for distance reference
const paintDottedLine: LineLayerSpecification["paint"] = {
	"line-color": "#00FFFF",
	"line-width": 2,
	"line-dasharray": [1.5, 1.5],
};

// White dot at end
const paintCircle: CircleLayerSpecification["paint"] = {
	"circle-color": "#FFFFFF",
	"circle-radius": 4,
	"circle-stroke-color": "#000000",
	"circle-stroke-width": 1,
};

// Aircraft name/title
const paintSymbol: SymbolLayerSpecification["paint"] = {
	"text-color": "#FFFFFF",
	"text-halo-color": "#000",
	"text-halo-width": 1,
};

const layoutSymbol: SymbolLayerSpecification["layout"] = {
	"text-field": ["get", "title"],
	"text-allow-overlap": true,
	"text-font": ["IBM Plex Mono Bold"],
	"text-size": 10,
	"text-offset": [0, -0.8],
	"text-anchor": "bottom",
};

interface TrajectoryPredictionLinesProps {
	beforeId?: string;
}

export default observer(function TrajectoryPredictionLines({
	beforeId,
}: TrajectoryPredictionLinesProps) {
	const { isDragging } = useDragging();

	// Only render if trajectory prediction is enabled and we have a future time
	if (
		!trajectoryPredictionStore.enabled ||
		!trajectoryPredictionStore.computedFutureTime
	) {
		return null;
	}

	// Check if this is a timeline drag (overrideTime is set) or a map drag
	const isTimelineDrag = trajectoryPredictionStore.overrideTime !== null;

	// Get aircraft for trajectory prediction:
	// - For timeline drag: merge timelineDragAircraftIds with selectedAircraftIds
	//   (shows both the card's aircraft and any already-selected aircraft)
	// - For map drag: use cwpStore.selectedAircraftIds only
	const aircraftIds = isTimelineDrag
		? [
				...new Set([
					...trajectoryPredictionStore.timelineDragAircraftIds,
					...cwpStore.selectedAircraftIds,
				]),
			]
		: [...cwpStore.selectedAircraftIds];

	const selectedAircrafts = aircraftIds
		.map((aircraftId) => aircraftStore.aircrafts.get(aircraftId))
		.filter((aircraft): aircraft is AircraftModel => aircraft !== undefined);

	if (selectedAircrafts.length === 0) {
		return null;
	}

	// For map drag, require isDragging from DraggingContext
	// For timeline drag, we rely on the store's enabled state
	if (!isTimelineDrag && !isDragging) {
		return null;
	}

	// Show reference line only for map drag (we don't have mouse position for timeline drag)
	const showReferenceLine = !isTimelineDrag;

	const features = buildPredictedTrajectories(
		selectedAircrafts,
		trajectoryPredictionStore.mainAircraftId,
		trajectoryPredictionStore.computedFutureTime,
		trajectoryPredictionStore.mouseLat,
		trajectoryPredictionStore.mouseLon,
		showReferenceLine,
	);

	// Separate features into dotted and solid lines
	const dottedLineFeatures = features.filter(
		(f) => f.properties?.isDottedLine === true,
	);
	const solidLineFeatures = features.filter(
		(f) =>
			f.geometry?.type === "LineString" && f.properties?.isDottedLine === false,
	);
	const pointFeatures = features.filter((f) => f.geometry?.type === "Point");

	const dottedGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: dottedLineFeatures,
	};

	const solidGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: solidLineFeatures,
	};

	const pointGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: pointFeatures,
	};

	return (
		<>
			<Source
				id="trajectoryprediction_dotted"
				type="geojson"
				data={dottedGeoJson}
			>
				<Layer
					id="trajectoryprediction_dotted_line"
					type="line"
					paint={paintDottedLine}
					beforeId={beforeId}
				/>
			</Source>
			<Source
				id="trajectoryprediction_solid"
				type="geojson"
				data={solidGeoJson}
			>
				<Layer
					id="trajectoryprediction_solid_line"
					type="line"
					paint={paintSolidLine}
					beforeId="trajectoryprediction_dotted_line"
				/>
			</Source>
			<Source
				id="trajectoryprediction_points"
				type="geojson"
				data={pointGeoJson}
			>
				<Layer
					id="trajectoryprediction_point"
					type="circle"
					paint={paintCircle}
					beforeId="trajectoryprediction_solid_line"
				/>
				<Layer
					id="trajectoryprediction_names"
					type="symbol"
					layout={layoutSymbol}
					paint={paintSymbol}
					beforeId="trajectoryprediction_point"
				/>
			</Source>
		</>
	);
});
