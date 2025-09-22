import type {
	CircleLayerSpecification,
	LineLayerSpecification,
	SymbolLayerSpecification,
} from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import type AircraftModel from "../model/AircraftModel";
import {
	aircraftStore,
	cwpStore,
	simulatorStore,
	trajectoryPredictionStore,
} from "../state";

function buildPredictedTrajectories(
	selectedAircrafts: AircraftModel[],
	mainAircraftId: string | null,
	futureTime: number,
	draggedHandleLat: number,
	draggedHandleLon: number,
): GeoJSON.Feature[] {
	const features: GeoJSON.Feature[] = [];

	// Add dotted line from main aircraft to dragged handle
	if (mainAircraftId) {
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
						[draggedHandleLon, draggedHandleLat],
					],
				},
			});
		}
	}

	for (const aircraft of selectedAircrafts) {
		const currentPosition = [
			aircraft.lastKnownLongitude,
			aircraft.lastKnownLatitude,
		];
		const futurePosition = trajectoryPredictionStore.getAircraftPositionAtTime(
			aircraft.aircraftId,
			futureTime,
		);

		if (!futurePosition) {
			continue;
		}

		// Get the flight route for this aircraft
		const flightRoute = aircraftStore.flightRoutes.get(
			aircraft.assignedFlightId,
		);
		if (flightRoute) {
			// Get trajectory points between current time and future time
			const currentTime = simulatorStore.timestamp;
			const trajectoryPoints = flightRoute.trajectory.filter(
				(t) => t.timestamp >= currentTime && t.timestamp <= futureTime,
			);

			// Build coordinates following the flight route
			const routeCoordinates: number[][] = [currentPosition];

			// Add all intermediate trajectory points
			for (const trajectory of trajectoryPoints) {
				routeCoordinates.push([
					trajectory.trajectoryCoordinate.longitude,
					trajectory.trajectoryCoordinate.latitude,
				]);
			}

			// Add the interpolated future position at the exact future time
			const futureLonLat = [futurePosition.lon, futurePosition.lat];

			// Only add if it's different from the last trajectory point
			const lastPoint = routeCoordinates[routeCoordinates.length - 1];
			if (
				lastPoint[0] !== futureLonLat[0] ||
				lastPoint[1] !== futureLonLat[1]
			) {
				routeCoordinates.push(futureLonLat);
			}

			// Line following the flight route
			if (routeCoordinates.length > 1) {
				features.push({
					type: "Feature",
					properties: {
						isDottedLine: false,
					},
					geometry: {
						type: "LineString",
						coordinates: routeCoordinates,
					},
				});
			}
		} else {
			// Fallback to straight line if no flight route
			const futureLonLat = [futurePosition.lon, futurePosition.lat];
			features.push({
				type: "Feature",
				properties: {
					isDottedLine: false,
				},
				geometry: {
					type: "LineString",
					coordinates: [currentPosition, futureLonLat],
				},
			});
		}

		// Point at future position
		const futureLonLat = [futurePosition.lon, futurePosition.lat];
		features.push({
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: futureLonLat,
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

export default observer(function TrajectoryPredictionLines() {
	// Only render if trajectory prediction is enabled and we have a future time
	if (
		!trajectoryPredictionStore.enabled ||
		!trajectoryPredictionStore.computedFutureTime
	) {
		return null;
	}

	// Get all selected aircraft
	const selectedAircrafts = [...cwpStore.selectedAircraftIds]
		.map((aircraftId) => aircraftStore.aircrafts.get(aircraftId))
		.filter((aircraft): aircraft is AircraftModel => aircraft !== undefined);

	if (selectedAircrafts.length === 0) {
		return null;
	}

	const features = buildPredictedTrajectories(
		selectedAircrafts,
		trajectoryPredictionStore.mainAircraftId,
		trajectoryPredictionStore.computedFutureTime,
		trajectoryPredictionStore.draggedHandleLat,
		trajectoryPredictionStore.draggedHandleLon,
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
				/>
				<Layer
					id="trajectoryprediction_names"
					type="symbol"
					layout={layoutSymbol}
					paint={paintSymbol}
				/>
			</Source>
		</>
	);
});
