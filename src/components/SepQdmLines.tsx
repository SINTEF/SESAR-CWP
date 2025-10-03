import type { LineLayerSpecification } from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import { sepQdmStore, trajectoryPredictionStore } from "../state";

export default observer(function SepQdmLines() {
	// Build features for SEP lines from separation instances
	const sepFeatures: GeoJSON.Feature<GeoJSON.LineString>[] = [];
	const sepTrajectoryFeatures: GeoJSON.Feature<GeoJSON.LineString>[] = [];

	for (const separation of sepQdmStore.savedSepLines) {
		const geoJSON = separation.lineGeoJSON;
		if (geoJSON) {
			// Add color property to the feature
			sepFeatures.push({
				...geoJSON,
				properties: {
					...geoJSON.properties,
					color: separation.color,
				},
			});
		}

		// Add trajectory lines from current position to SEP line start
		const cpaResult = separation.cpaResult;
		if (cpaResult && separation.fromAircraft && separation.toAircraft) {
			// Get trajectory for fromAircraft using absolute CPA timestamp
			const fromTrajectory = trajectoryPredictionStore.getPredictedTrajectory(
				separation.fromId,
				cpaResult.time,
			);

			// Get trajectory for toAircraft using absolute CPA timestamp
			const toTrajectory = trajectoryPredictionStore.getPredictedTrajectory(
				separation.toId,
				cpaResult.time,
			);

			// Add trajectory line from fromAircraft current position to SEP line start
			if (fromTrajectory && fromTrajectory.length >= 2) {
				sepTrajectoryFeatures.push({
					type: "Feature",
					geometry: {
						type: "LineString",
						coordinates: fromTrajectory,
					},
					properties: {
						aircraftId: separation.fromId,
						color: separation.color,
					},
				});
			}

			// Add trajectory line from toAircraft current position to SEP line start
			if (toTrajectory && toTrajectory.length >= 2) {
				sepTrajectoryFeatures.push({
					type: "Feature",
					geometry: {
						type: "LineString",
						coordinates: toTrajectory,
					},
					properties: {
						aircraftId: separation.toId,
						color: separation.color,
					},
				});
			}
		}
	}

	// Build features for QDM lines from separation instances
	const qdmFeatures: GeoJSON.Feature<GeoJSON.LineString>[] = [];
	for (const separation of sepQdmStore.savedQdmLines) {
		const geoJSON = separation.lineGeoJSON;
		if (geoJSON) {
			// Add color property to the feature
			qdmFeatures.push({
				...geoJSON,
				properties: {
					...geoJSON.properties,
					color: separation.color,
				},
			});
		}
	}

	// Don't render if no valid features at all
	if (sepFeatures.length === 0 && qdmFeatures.length === 0 && sepTrajectoryFeatures.length === 0) {
		return null;
	}

	const sepGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: sepFeatures,
	};

	const sepTrajectoryGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: sepTrajectoryFeatures,
	};

	const qdmGeoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: qdmFeatures,
	};

	const paintLine: LineLayerSpecification["paint"] = {
		"line-color": ["get", "color"],
		"line-width": 2,
	};

	const paintTrajectoryLine: LineLayerSpecification["paint"] = {
		"line-color": ["get", "color"],
		"line-width": 2,
		"line-dasharray": [1.5, 1.5],
	};

	return (
		<>
			{sepTrajectoryFeatures.length > 0 && (
				<Source id="sep_trajectory_lines_source" type="geojson" data={sepTrajectoryGeoJson}>
					<Layer id="sep_trajectory_lines" type="line" paint={paintTrajectoryLine} />
				</Source>
			)}
			{sepFeatures.length > 0 && (
				<Source id="sep_lines_source" type="geojson" data={sepGeoJson}>
					<Layer id="sep_lines" type="line" paint={paintLine} />
				</Source>
			)}
			{qdmFeatures.length > 0 && (
				<Source id="qdm_lines_source" type="geojson" data={qdmGeoJson}>
					<Layer id="qdm_lines" type="line" paint={paintLine} />
				</Source>
			)}
		</>
	);
});
