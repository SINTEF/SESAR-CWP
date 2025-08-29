import { lineString, radiansToLength } from "@turf/helpers";
import { length as turfLength } from "@turf/length";
import type { ObservableMap } from "mobx";
import { makeAutoObservable, observable } from "mobx";

import DistanceMarker from "./DistanceMarker";

export function getLength(coordinates: number[][]): string {
	if (coordinates.length < 2) {
		return "";
	}
	const line = lineString(coordinates);
	const lineLength = turfLength(line, { units: "radians" });
	const lengthToNautical = radiansToLength(lineLength, "nauticalmiles");
	return `${lengthToNautical.toFixed(3)} NM`;
}

export default class DistanceLine {
	markersCounter = 0;

	markers: ObservableMap<number, DistanceMarker> = observable.map(undefined, {
		deep: false,
	});

	constructor() {
		makeAutoObservable(
			this,
			{
				markersCounter: false,
			},
			{ autoBind: true },
		);
	}

	newMarker({
		lat,
		lng,
		colour,
	}: {
		lat: number;
		lng: number;
		colour: string;
	}): void {
		this.markers.set(
			this.markersCounter,
			new DistanceMarker({
				lat,
				lng,
				colour,
				key: this.markersCounter,
			}),
		);
		this.markersCounter += 1;
	}

	getNumberOfMarkersForColour(colour: string): number {
		return [...this.markers.values()].filter(
			(marker) => marker.colour === colour,
		).length;
	}

	removeMarker(key: number): void {
		this.markers.delete(key);
	}

	removeColor(colour: string): void {
		for (const marker of this.markers.values()) {
			if (marker.colour === colour) {
				this.markers.delete(marker.key);
			}
		}
	}

	get measureLines(): GeoJSON.FeatureCollection<
		GeoJSON.LineString,
		{
			color: string;
			length: string;
		}
	> {
		const markers = [...this.markers.values()];

		const markersByColors = new Map<string, DistanceMarker[]>();
		for (const marker of markers) {
			const { colour } = marker;
			const markersForColor = markersByColors.get(colour);
			if (!markersForColor) {
				markersByColors.set(colour, [marker]);
			} else {
				markersForColor.push(marker);
			}
		}

		return {
			type: "FeatureCollection",
			features: [...markersByColors.entries()].map(
				([color, markersForColor]) => {
					const lines = markersForColor.map((marker) => [
						marker.lng,
						marker.lat,
					]);
					return {
						type: "Feature",
						properties: {
							color,
							length: getLength(lines),
						},
						geometry: {
							type: "LineString",
							coordinates: lines,
						},
					};
				},
			),
		};
	}

	// Return the last marker of each color
	get measurePoints(): GeoJSON.FeatureCollection<
		GeoJSON.Point,
		{
			color: string;
			length: string;
		}
	> {
		const lines = this.measureLines;
		return {
			type: "FeatureCollection",
			features: lines.features.map((line) => {
				const { color, length } = line.properties;
				const lastCoordinates =
					line.geometry.coordinates[line.geometry.coordinates.length - 1];
				return {
					type: "Feature",
					properties: {
						color,
						length,
					},
					geometry: {
						type: "Point",
						coordinates: lastCoordinates,
					},
				};
			}),
		};
	}
}
