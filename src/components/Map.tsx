import type { MapMouseEvent, StyleSpecification } from "maplibre-gl";
import * as maplibregl from "maplibre-gl";
import { usePostHog } from "posthog-js/react";
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
import LimboAircrafts from "./LimboAircrafts";
import Sectors from "./Sectors";
import SpeedVectors from "./SpeedVectors";
import TrajectoryPredictionLines from "./TrajectoryPredictionLines";

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

const CANVAS_CONTEXT_ATTRIBUTES: WebGLContextAttributes = {
	// preserveDrawingBuffer is required to make map screenshots work with PostHog
	// But it has a performance impact, so we only enable it when PostHog is enabled
	preserveDrawingBuffer: !!import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
};

const createMapClickHandler =
	(posthog: ReturnType<typeof usePostHog>) =>
	(event: MapMouseEvent): void => {
		const { currentDistanceColor, setCurrentDistanceColor } = cwpStore;
		const coordinates = event.lngLat;

		if (currentDistanceColor !== "") {
			const { newMarker, getNumberOfMarkersForColour } = distanceLineStore;
			newMarker({
				lat: coordinates.lat,
				lng: coordinates.lng,
				colour: currentDistanceColor,
			});
			const numberOfMarkersForColor =
				getNumberOfMarkersForColour(currentDistanceColor);

			posthog?.capture("distance_marker_placed", {
				marker_color: currentDistanceColor,
				marker_number: numberOfMarkersForColor,
				position: { lat: coordinates.lat, lng: coordinates.lng },
				is_second_marker: numberOfMarkersForColor >= 2,
			});

			if (numberOfMarkersForColor >= 2) {
				setCurrentDistanceColor("");
			}
		} else {
			posthog?.capture("map_clicked", {
				position: { lat: coordinates.lat, lng: coordinates.lng },
				context: "general_map_click",
			});
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
	const posthog = usePostHog();
	const [isMoving, setIsMoving] = React.useState(false);
	const mapRef = React.useRef<MapRef>(null);
	// const { isDragging } = useDragging();
	const onMoveStart = (): void => {
		if (!isMoving) {
			setIsMoving(true);
			posthog?.capture("map_move_start", {
				zoom: mapRef.current?.getZoom(),
				center: mapRef.current?.getCenter(),
			});
		}
	};
	const onMoveEnd = (): void => {
		if (isMoving) {
			setIsMoving(false);
			const zoom = mapRef.current?.getZoom();
			const center = mapRef.current?.getCenter();
			posthog?.capture("map_move_end", {
				zoom: zoom,
				center: center ? { lat: center.lat, lng: center.lng } : null,
			});
		}
	};

	const onZoom = (): void => {
		const zoom = mapRef.current?.getZoom();
		posthog?.capture("map_zoom", {
			zoom_level: zoom,
		});
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
				onClick={createMapClickHandler(posthog)}
				onMoveStart={onMoveStart}
				onMoveEnd={onMoveEnd}
				onZoomEnd={onZoom}
				renderWorldCopies={false}
				// If rotation and pitch should be disabled:
				// maxPitch={0}
				// pitchWithRotate={false}
				// dragRotate={false}
				canvasContextAttributes={CANVAS_CONTEXT_ATTRIBUTES}
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
