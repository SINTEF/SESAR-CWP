import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import type { MarkerDragEvent, MarkerEvent } from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import type DistanceMarker from "../model/DistanceMarker";
import { distanceLineStore } from "../state";

const MapDistanceMarker = observer((properties: { marker: DistanceMarker }) => {
	const posthog = usePostHog();
	const { marker } = properties;

	const { colour, lat: latitude, lng: longitude, key } = marker;

	function onDrag(event: MarkerDragEvent): void {
		const previousLat = marker.lat;
		const previousLng = marker.lng;
		marker.setLatLng(event.lngLat.lat, event.lngLat.lng);

		posthog?.capture("distance_marker_dragged", {
			marker_color: colour,
			previous_position: { lat: previousLat, lng: previousLng },
			new_position: { lat: event.lngLat.lat, lng: event.lngLat.lng },
		});
	}

	function onClick(event: MarkerEvent<MouseEvent>): void {
		posthog?.capture("distance_marker_deleted", {
			marker_color: colour,
			position: { lat: latitude, lng: longitude },
		});

		distanceLineStore.removeMarker(key);
		if (event.originalEvent && "stopPropagation" in event.originalEvent) {
			event.originalEvent.stopPropagation();
		}
	}

	return (
		<Marker
			latitude={latitude}
			longitude={longitude}
			draggable={true}
			onDrag={onDrag}
			onClick={onClick}
		>
			<svg height="10" width="10">
				<circle
					cx="5"
					cy="5"
					r="5"
					stroke="black"
					strokeWidth="3"
					fill={colour}
				/>
			</svg>
		</Marker>
	);
});

export default observer(function DistanceMarkers() {
	const { markers } = distanceLineStore;

	return (
		<>
			{[...markers.entries()].map(([key, marker]) => (
				<MapDistanceMarker key={key} marker={marker} />
			))}
		</>
	);
});
