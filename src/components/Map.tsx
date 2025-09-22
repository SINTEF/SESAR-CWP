import type { MapMouseEvent, StyleSpecification } from "maplibre-gl";
import * as maplibregl from "maplibre-gl";
import React from "react";
import type { MapRef, ViewState } from "react-map-gl/maplibre";
import ReactMapGL, {
	FullscreenControl,
	NavigationControl,
} from "react-map-gl/maplibre";
import { cwpStore, distanceLineStore } from "../state";
import { useMapImage } from "../useMapImage";
import Agenda from "./Agenda";
import Aircrafts from "./Aircrafts";
import DistanceMarkers from "./DistanceMarkers";
import DistanceMeasurements from "./DistanceMeasurements";
import FixesPoints from "./FixesPoints";
import FlightRoutes from "./FlightRoutes";
import HighlightedAircraft from "./HighlightedAircraft";
import TrajectoryPredictionLines from "./TrajectoryPredictionLines";
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

const mapStyle: StyleSpecification = {
	version: 8,
	name: "Minimal Country Borders",
	glyphs: "/map-fonts/{fontstack}/{range}.pbf",
	sources: {
		countries: {
			type: "geojson",
			data: "/countries.geojson",
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

const handleMapClick = (event: MapMouseEvent): void => {
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
// const maxBounds: maplibregl.LngLatBoundsLike = [
//   4, 11, 15, 70,
// ];

// biome-ignore lint/suspicious/noShadowRestrictedNames: Should change one day, but not today
export default function Map() {
	const [isMoving, setIsMoving] = React.useState(false);
	const mapRef = React.useRef<MapRef>(null);
	// const { isDragging } = useDragging();
	const onMoveStart = (): void => {
		if (!isMoving) {
			setIsMoving(true);
		}
	};
	const onMoveEnd = (): void => {
		if (isMoving) {
			setIsMoving(false);
		}
	};

	useMapImage({
		mapRef,
		url: "/fixes.png",
		name: "fixes",
		sdf: true,
	});

	return (
		<div
			className={
				isMoving /*|| isDragging*/
					? "radar-map-container map-is-moving"
					: "radar-map-container"
			}
		>
			<ReactMapGL
				ref={mapRef}
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
				onClick={handleMapClick}
				onMoveStart={onMoveStart}
				onMoveEnd={onMoveEnd}
				renderWorldCopies={false}
				// If rotation and pitch should be disabled:
				// maxPitch={0}
				// pitchWithRotate={false}
				// dragRotate={false}
			>
				<DistanceMarkers />
				<DistanceMeasurements />
				<Sectors />
				<FixesPoints />
				<FlightRoutes />
				<TrajectoryPredictionLines />
				<SpeedVectors />
				<Aircrafts />
				<HighlightedAircraft />
				<LimboAircrafts />
				<Agenda />
				<NavigationControl position="bottom-left" visualizePitch={true} />
				<FullscreenControl position="bottom-left" containerId="root" />
			</ReactMapGL>
		</div>
	);
}
