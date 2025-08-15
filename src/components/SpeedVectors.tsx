import { observer } from "mobx-react-lite";
import React from "react";
import { Layer, Source } from "react-map-gl/maplibre";
// @ts-expect-error - ESM/CJS interop issue with @mapbox/sphericalmercator
import { SphericalMercator } from "@mapbox/sphericalmercator";

import {
	aircraftStore,
	configurationStore,
	cwpStore,
	roleConfigurationStore,
} from "../state";
import type AircraftModel from "../model/AircraftModel";

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

export default observer(function SpeedVectors() {
	const _aircraftIds = cwpStore.aircraftsWithSpeedVectors;
	// const { lowestBound, highestBound } = cwpStore.altitudeFilter;
	const { speedVectorMinutes, showSpeedVectors } = cwpStore;

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
			<Layer id="speedvectorsline" type="line" paint={paintLine} />
			<Layer id="speedvectorspoint" type="circle" paint={paintCircle} />
		</Source>
	);
});
