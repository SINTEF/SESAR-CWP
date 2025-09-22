import { useRef, useState } from "react";
import type { DraggableEvent } from "react-draggable";
import { DraggableCore } from "react-draggable";
import { Popup, useMap } from "react-map-gl/maplibre";
import { useDragging } from "../contexts/DraggingContext";

interface DraggableMarkerProps {
	longitude: number;
	latitude: number;
	children: React.ReactNode;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onClick?: () => void;
	onDragStart?: (offsetX: number, offsetY: number, lng: number, lat: number) => void;
	onDrag?: (offsetX: number, offsetY: number, lng: number, lat: number) => void;
	onDragStop?: (offsetX: number, offsetY: number, lng: number, lat: number) => void;
	trackMousePosition?: boolean; // When true, lat/lng represents mouse cursor position
}

const DEFAULT_OFFSET_X = -12;
const DEFAULT_OFFSET_Y = -12;
const ELEMENT_HALF_WIDTH = 12; // Half of the 24x24px draggable element
const ELEMENT_HALF_HEIGHT = 12;

export default function DraggableMarker({
	longitude,
	latitude,
	children,
	onMouseEnter,
	onMouseLeave,
	onClick,
	onDragStart,
	onDrag,
	onDragStop,
	trackMousePosition = false,
}: DraggableMarkerProps) {
	const nodeRef = useRef<HTMLDivElement>(null);
	const { current: map } = useMap();

	// Initialize with 0 offset, but preserve across re-renders
	const [offsetX, setOffsetX] = useState(DEFAULT_OFFSET_X);
	const [offsetY, setOffsetY] = useState(DEFAULT_OFFSET_Y);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const {
		isDragging: isAnyDragging,
		startDragging,
		stopDragging,
	} = useDragging();

	// Utility function to calculate new longitude/latitude from pixel offset
	const calculateNewPosition = (pixelOffsetX: number, pixelOffsetY: number) => {
		if (!map) {
			return null;
		}

		const basePixel = map.project([longitude, latitude]);
		// Add half element size to offsets to get the center of the draggable element
		// The offsets represent the top-left corner position, but we want GPS coords for the center
		const centerOffsetX = pixelOffsetX + ELEMENT_HALF_WIDTH;
		const centerOffsetY = pixelOffsetY + ELEMENT_HALF_HEIGHT;
		const newPixel: [number, number] = [basePixel.x + centerOffsetX, basePixel.y + centerOffsetY];
		const newLngLat = map.unproject(newPixel);

		return { lng: newLngLat.lng, lat: newLngLat.lat };
	};

	// Utility function to calculate longitude/latitude from mouse position
	const calculateMousePosition = (clientX: number, clientY: number) => {
		if (!map) {
			return null;
		}

		// Get the map container element and its position on screen
		const canvas = map.getCanvas();
		const rect = canvas.getBoundingClientRect();

		// Convert client coordinates to map container coordinates
		const x = clientX - rect.left;
		const y = clientY - rect.top;

		// Unproject to get lat/lng at mouse position
		const newLngLat = map.unproject([x, y]);

		return { lng: newLngLat.lng, lat: newLngLat.lat };
	};

	const handleDragStart = (event: DraggableEvent): void => {
		if (!("clientX" in event && "clientY" in event)) {
			return;
		}
		const { clientX, clientY } = event;
		setDragStart({
			x: clientX - offsetX,
			y: clientY - offsetY,
		});
		setIsDragging(true);
		startDragging();

		// Calculate new position if callback exists
		if (onDragStart) {
			const newPosition = trackMousePosition
				? calculateMousePosition(clientX, clientY)
				: calculateNewPosition(offsetX, offsetY);
			if (newPosition) {
				onDragStart(offsetX, offsetY, newPosition.lng, newPosition.lat);
			}
		}

		// uncomment if hover effect should disappear immediately when starting drag
		// onMouseLeave?.();
	};

	const handleDrag = (event: DraggableEvent): void => {
		if (!("clientX" in event && "clientY" in event)) {
			return;
		}
		const { clientX, clientY } = event;
		const newOffsetX = clientX - dragStart.x;
		const newOffsetY = clientY - dragStart.y;
		setOffsetX(newOffsetX);
		setOffsetY(newOffsetY);

		// Calculate new position if callback exists
		if (onDrag) {
			const newPosition = trackMousePosition
				? calculateMousePosition(clientX, clientY)
				: calculateNewPosition(newOffsetX, newOffsetY);
			if (newPosition) {
				onDrag(newOffsetX, newOffsetY, newPosition.lng, newPosition.lat);
			}
		}
	};

	const handleDragStop = (event: DraggableEvent): void => {
		// Store final offsets before resetting
		const finalOffsetX = offsetX;
		const finalOffsetY = offsetY;

		setIsDragging(false);
		setOffsetX(DEFAULT_OFFSET_X);
		setOffsetY(DEFAULT_OFFSET_Y);
		stopDragging();

		// Calculate final position if callback exists
		if (onDragStop) {
			let newPosition;
			if (trackMousePosition && "clientX" in event && "clientY" in event) {
				// Use mouse position if tracking is enabled and event has coordinates
				newPosition = calculateMousePosition(event.clientX, event.clientY);
			} else {
				// Fallback to element center position
				newPosition = calculateNewPosition(finalOffsetX, finalOffsetY);
			}

			if (newPosition) {
				onDragStop(finalOffsetX, finalOffsetY, newPosition.lng, newPosition.lat);
			}
		}

		requestAnimationFrame(() => {
			if (!nodeRef.current?.matches(":hover")) {
				onMouseLeave?.();
			}
		});
	};

	const localOnMouseEnter = (): void => {
		if (onMouseEnter && !isDragging && !isAnyDragging) {
			onMouseEnter();
		}
	};
	const localOnMouseLeave = (): void => {
		if (onMouseLeave && !isDragging && !isAnyDragging) {
			onMouseLeave();
		}
	};

	const handleClick = (): void => {
		if (onClick && !isDragging && !isAnyDragging) {
			onClick();
		}
	};

	return (
		<Popup
			longitude={longitude}
			latitude={latitude}
			closeOnClick={false}
			closeButton={false}
			focusAfterOpen={false}
			anchor="bottom"
			className="max-w-none z-1000"
		>
			<div
				className={`absolute ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${
					isDragging
						? "disable-animation-marker z-1000"
						: isAnyDragging
							? "z-10"
							: "z-10"
				}`}
				style={{
					top: `${offsetY}px`,
					left: `${offsetX}px`,
				}}
				onMouseEnter={localOnMouseEnter}
				onMouseLeave={localOnMouseLeave}
				onClick={handleClick}
			>
				<DraggableCore
					nodeRef={nodeRef}
					onStart={handleDragStart}
					onDrag={handleDrag}
					onStop={handleDragStop}
				>
					<div ref={nodeRef}>{children}</div>
				</DraggableCore>
			</div>
		</Popup>
	);
}
