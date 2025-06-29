import * as maplibregl from "maplibre-gl";
import type React from "react";
import ReactMapGL, { FullscreenControl, NavigationControl } from "react-map-gl";
import type { MapLayerMouseEvent, Style } from "mapbox-gl";
import type { ViewState } from "react-map-gl";

import { cwpStore, distanceLineStore } from "../state";
import Aircrafts from "./Aircrafts";
// import ControllerLabel from "./ControllerLabel";
import DistanceMarkers from "./DistanceMarkers";
import DistanceMeasurements from "./DistanceMeasurements";
import FixesPoint from "./FixesPoint";
import FlightRoutes from "./FlightRoutes";
import HighlightedAircraft from "./HighlightedAircraft";
import LimboAircrafts from "./LimboAircrafts";
import Sectors from "./Sectors";
import SpeedVectors from "./SpeedVectors";

// Do not load the RTL plugin because it is unecessary
try {
	// @ts-expect-error invalid type
	maplibregl.setRTLTextPlugin("", () => {}, true);
} catch {
	/* ignore error */
}

const mapStyle: Style = {
	version: 8,
	name: "Minimal Country Borders",
	glyphs: "/map-fonts/{fontstack}/{range}.pbf",
	sources: {
		countries: {
			type: "geojson",
			data: "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
		},
	},
	layers: [
		{
			id: "background",
			type: "background",
			paint: {
				"background-color": "#464646",
			},
		},
		{
			id: "country-borders",
			type: "line",
			// filter: ["==", "$type", "Polygon"],
			source: "countries",
			paint: {
				"line-color": "#565656",
				"line-width": 1,
			},
		},
	],
};

const style: React.CSSProperties = {
	width: "100%",
	height: "calc(100vh - 1.9rem)",
	background: "grey",
};

const handleMapClick = (event: MapLayerMouseEvent): void => {
	const { currentDistanceColor, setCurrentDistanceColor } = cwpStore;
	if (currentDistanceColor !== "") {
		const coordinates = event.lngLat;
		const { newMarker, getNumberOfMarkersForColour } = distanceLineStore;
		newMarker({
			lat: coordinates.lat,
			lng: coordinates.lng,
			colour: currentDistanceColor,
		});
		const numberOfMarkersForColor =
			getNumberOfMarkersForColour(currentDistanceColor);
		if (numberOfMarkersForColor >= 2) {
			setCurrentDistanceColor("");
		}
	}
};

const initialViewState: Partial<ViewState> = {
	longitude: 9.27,
	latitude: 45.11,
	zoom: 6.3,
};

// Rough bounds of the area
// const maxBounds: mapboxgl.LngLatBoundsLike = [
//   4, 11, 15, 70,
// ];

// biome-ignore lint/suspicious/noShadowRestrictedNames: Should change one day, but not today
export default function Map(): JSX.Element {
	return (
		<ReactMapGL
			id="radar-map"
			style={style}
			initialViewState={initialViewState}
			// maxBounds={maxBounds}
			// mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json"
			// mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
			// mapStyle="https://maps.geoapify.com/v1/styles/dark-matter-dark-grey/style.json?apiKey=332569cc796d4788a11275c2fdefb5b1"
			mapStyle={mapStyle}
			attributionControl={false}
			mapLib={maplibregl}
			antialias
			onClick={handleMapClick}
			renderWorldCopies={false}
			// If rotation and pitch should be disabled:
			// maxPitch={0}
			// pitchWithRotate={false}
			// dragRotate={false}
		>
			<DistanceMarkers />
			<DistanceMeasurements />
			<Sectors />
			<FixesPoint />
			<FlightRoutes />
			<SpeedVectors />
			{/* <ControllerLabel /> */}
			<Aircrafts />
			<HighlightedAircraft />
			<LimboAircrafts />
			<NavigationControl position="bottom-left" visualizePitch={true} />
			<FullscreenControl position="bottom-left" containerId="root" />
		</ReactMapGL>
	);
}
