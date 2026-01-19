// @ts-expect-error - ESM/CJS interop issue with @mapbox/sphericalmercator
import { SphericalMercator } from "@mapbox/sphericalmercator";
import type { MapLayerMouseEvent } from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { Layer, Source, useMap } from "react-map-gl/maplibre";
import type AircraftModel from "../model/AircraftModel";
import { configurationStore, cwpStore, roleConfigurationStore } from "../state";

const degreesToRad = Math.PI / 180;
const sphericalMercator = new SphericalMercator();

function buildSpeedVectorLocations(
	aircraft: AircraftModel,
	minutesInTheFuture: number,
): [number, number][] {
	// Make an array the size of minutesInTheFuture
	return Array.from({ length: minutesInTheFuture + 1 }, (_, index) => {
		const lon = aircraft.lastKnownLongitude;
		const lat = aircraft.lastKnownLatitude;

		if (index === 0) {
			return [lon, lat];
		}

		const nbSeconds = index * 60;

		// m/s speed
		const currentSpeedMS = aircraft.lastKnownSpeed;
		// degrees
		const currentBearing = aircraft.lastKnownBearing;

		// Compute the change in meters
		const addX =
			Math.sin(currentBearing * degreesToRad) * currentSpeedMS * nbSeconds;
		const addY =
			Math.cos(currentBearing * degreesToRad) * currentSpeedMS * nbSeconds;

		// Convert lat/lon to meters
		let [x, y] = sphericalMercator.forward([lon, lat]);

		// Add the new position
		x += addX;
		y += addY;

		// Convert back to lat/lon
		return sphericalMercator.inverse([x, y]);
	});
}

function buildGeoJsonSpeedVector(
	aircraft: AircraftModel,
	minutesInTheFuture: number,
): GeoJSON.Feature[] {
	const locations = buildSpeedVectorLocations(aircraft, minutesInTheFuture);
	const vectorColor = roleConfigurationStore.getOriginalColorOfAircraft(
		aircraft.aircraftId,
	);
	return [
		{
			type: "Feature",
			properties: {
				aircraftId: aircraft.aircraftId,
				color: vectorColor,
			},
			geometry: {
				type: "LineString",
				coordinates: locations,
			},
		},
		{
			type: "Feature",
			properties: {
				aircraftId: aircraft.aircraftId,
				color: vectorColor,
			},
			geometry: {
				type: "MultiPoint",
				coordinates: locations.slice(1),
			},
		},
	];
}

const paintLine = {
	"line-color": [
		"case",
		["has", "color"],
		["get", "color"],
		"#ffffff",
	] as unknown as string,
	"line-width": 1,
};

const paintCircle = {
	"circle-color": [
		"case",
		["has", "color"],
		["get", "color"],
		"#ffffff",
	] as unknown as string,
	"circle-radius": 1.5,
};

const SPEED_VECTOR_LINE_LAYER_ID = "speedvectorsline";
const SPEED_VECTOR_POINT_LAYER_ID = "speedvectorspoint";
const SPEED_VECTOR_LAYER_IDS = [
	SPEED_VECTOR_LINE_LAYER_ID,
	SPEED_VECTOR_POINT_LAYER_ID,
];

interface SpeedVectorsProps {
	beforeId?: string;
}

export default observer(function SpeedVectors({ beforeId }: SpeedVectorsProps) {
	const _aircraftIds = cwpStore.aircraftsWithSpeedVectors;
	// const { lowestBound, highestBound } = cwpStore.altitudeFilter;
	const { speedVectorMinutes, showSpeedVectors } = cwpStore;
	const { current: map } = useMap();

	// Handle right-click (contextmenu) to reset warning level
	const handleContextMenu = useCallback((event: MapLayerMouseEvent) => {
		const features = event.features;
		if (features && features.length > 0) {
			const aircraftId = features[0].properties?.aircraftId;
			if (aircraftId) {
				event.originalEvent.preventDefault();
				cwpStore.resetWarningLevel(aircraftId);
			}
		}
	}, []);

	// Set up event listeners for the speed vector layers
	useEffect(() => {
		if (!map || !showSpeedVectors) {
			return;
		}

		// Add mouseenter/mouseleave for cursor change
		const handleMouseEnter = (): void => {
			map.getCanvas().style.cursor = "pointer";
		};
		const handleMouseLeave = (): void => {
			map.getCanvas().style.cursor = "";
		};

		// Handle middle-click via canvas auxclick event (not available on layer events)
		const handleAuxClick = (event: MouseEvent): void => {
			// button 1 is the middle mouse button
			if (event.button !== 1) {
				return;
			}

			// Query features at the click point
			const rect = map.getCanvas().getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			// Check if layers exist before querying
			const existingLayers = SPEED_VECTOR_LAYER_IDS.filter((id) =>
				map.getLayer(id),
			);
			if (existingLayers.length === 0) {
				return;
			}

			const features = map.queryRenderedFeatures([x, y], {
				layers: existingLayers,
			});

			if (features && features.length > 0) {
				const aircraftId = features[0].properties?.aircraftId;
				if (aircraftId) {
					event.preventDefault();
					cwpStore.cycleWarningLevel(aircraftId);
				}
			}
		};

		const canvas = map.getCanvas();
		canvas.addEventListener("auxclick", handleAuxClick);

		for (const layerId of SPEED_VECTOR_LAYER_IDS) {
			// Check if layer exists before adding listeners
			if (map.getLayer(layerId)) {
				map.on("mouseenter", layerId, handleMouseEnter);
				map.on("mouseleave", layerId, handleMouseLeave);
				map.on("contextmenu", layerId, handleContextMenu);
			}
		}

		return () => {
			canvas.removeEventListener("auxclick", handleAuxClick);
			for (const layerId of SPEED_VECTOR_LAYER_IDS) {
				if (map.getLayer(layerId)) {
					map.off("mouseenter", layerId, handleMouseEnter);
					map.off("mouseleave", layerId, handleMouseLeave);
					map.off("contextmenu", layerId, handleContextMenu);
				}
			}
		};
	}, [map, showSpeedVectors, handleContextMenu]);

	if (!showSpeedVectors) {
		return null;
	}

	const aircrafts = configurationStore.aircraftsWithinExtendedEdges;
	// .map((aircraftId) => aircraftStore.aircrafts.get(aircraftId))
	// .filter(
	// 	(aircraft): aircraft is AircraftModel =>
	// 		aircraft !== undefined &&
	// 		aircraft.lastKnownAltitude > lowestBound &&
	// 		aircraft.lastKnownAltitude < highestBound,
	// );

	const speedVectors = aircrafts.flatMap((aircraft) =>
		buildGeoJsonSpeedVector(aircraft, speedVectorMinutes),
	);

	const geoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: speedVectors,
	};

	return (
		<Source id="speedvectors_source" type="geojson" data={geoJson}>
			<Layer
				id="speedvectorsline"
				type="line"
				paint={paintLine}
				beforeId={beforeId}
			/>
			<Layer
				id="speedvectorspoint"
				type="circle"
				paint={paintCircle}
				beforeId="speedvectorsline"
			/>
		</Source>
	);
});
