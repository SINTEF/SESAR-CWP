import { useState } from "react";
import { Marker, MarkerDragEvent } from "react-map-gl/maplibre";
import { useDragging } from "../contexts/DraggingContext";
import { cwpStore } from "../state";

interface DraggableMarkerProps {
	longitude: number;
	latitude: number;
	aircraftId: string;
	children: React.ReactNode;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onClick?: () => void;
}

export default function DraggableMarker({
	longitude,
	latitude,
	aircraftId,
	children,
	onMouseEnter,
	onMouseLeave,
	onClick,
}: DraggableMarkerProps) {
	const [dragOffset, setDragOffset] = useState({ lng: 0, lat: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const {
		isDragging: isAnyDragging,
		startDragging,
		stopDragging,
	} = useDragging();

	const onDragStart = (): void => {
		setIsDragging(true);
		startDragging();
	};

	const onDrag = (event: MarkerDragEvent): void => {
		const { lngLat } = event;
		const offset = {
			lng: lngLat.lng - longitude,
			lat: lngLat.lat - latitude,
		};
		setDragOffset(offset);
	};

	const onDragEnd = (): void => {
		setIsDragging(false);
		setDragOffset({ lng: 0, lat: 0 });
		stopDragging();
		if (!cwpStore.selectedAircraftIds.has(aircraftId)) {
			cwpStore.setFlightRouteForAircraft(aircraftId, false);
		}
		cwpStore.removeHoveredMarkerAircraftId();
	};

	return (
		<Marker
			longitude={longitude + dragOffset.lng}
			latitude={latitude + dragOffset.lat}
			draggable={true}
			className={
				isDragging
					? "disable-animation-marker z-1000"
					: isAnyDragging
						? "z-10"
						: "z-10"
			}
			onDragStart={onDragStart}
			onDrag={onDrag}
			onDragEnd={onDragEnd}
		>
			<div
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
			>
				{children}
			</div>
		</Marker>
	);
}
