import { usePostHog } from "posthog-js/react";
import { useCallback, useRef, useState } from "react";
import type { DraggableEvent } from "react-draggable";
import { DraggableCore } from "react-draggable";
import type { PopupProps } from "react-map-gl/maplibre";
import { Popup } from "react-map-gl/maplibre";

import { useDragging } from "../contexts/DraggingContext";

export type DraggablePopupProperties = {
	offset: {
		x: number;
		y: number;
	};
	size: {
		width: number;
		height: number;
	};
	borderRadius?: number;
	color?: string;
	cancel?: string;
	// Optional tracking props for PostHog events
	trackingId?: string; // e.g., aircraft ID
	trackingName?: string; // e.g., callsign
	trackingType?: string; // e.g., "aircraft", "level", "speed"
} & PopupProps;

// Global z-index management - needs to be outside component for proper stacking
let globalHighestZIndex = 42;
function getNextZIndex(): number {
	globalHighestZIndex += 1;
	return globalHighestZIndex;
}

export default function DraggablePopup(props: DraggablePopupProperties) {
	const {
		className,
		children,
		color,
		size,
		cancel,
		borderRadius,
		offset: initialOffset,
		trackingId,
		trackingName,
		trackingType,
		...popupProps
	} = props;

	const posthog = usePostHog();
	const nodeRef = useRef<HTMLDivElement>(null);
	const { startDragging, stopDragging } = useDragging();

	// State management
	const [offsetX, setOffsetX] = useState(initialOffset.x);
	const [offsetY, setOffsetY] = useState(initialOffset.y);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [zIndex, setZIndex] = useState(() => getNextZIndex());
	const [isDragging, setIsDragging] = useState(false);
	const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });

	// Handle drag start
	const handleDragStart = useCallback(
		(event: DraggableEvent): void => {
			if (!("clientX" in event && "clientY" in event)) {
				return;
			}
			const { clientX, clientY } = event;
			setDragStart({
				x: clientX - offsetX,
				y: clientY - offsetY,
			});
			setDragStartPosition({ x: offsetX, y: offsetY });
			setIsDragging(true);
			startDragging();

			// Track drag start if tracking props are provided
			if (trackingId && posthog) {
				posthog.capture(`${trackingType || "popup"}_drag_started`, {
					id: trackingId,
					name: trackingName,
					start_position: { x: offsetX, y: offsetY },
				});
			}
		},
		[
			offsetX,
			offsetY,
			startDragging,
			trackingId,
			trackingName,
			trackingType,
			posthog,
		],
	);

	// Handle dragging
	const handleDrag = useCallback(
		(event: DraggableEvent): void => {
			if (!("clientX" in event && "clientY" in event)) {
				return;
			}
			const { clientX, clientY } = event;
			setOffsetX(clientX - dragStart.x);
			setOffsetY(clientY - dragStart.y);
		},
		[dragStart.x, dragStart.y],
	);

	// Handle drag stop
	const handleDragStop = useCallback((): void => {
		setIsDragging(false);
		stopDragging();

		// Track drag end if tracking props are provided
		if (trackingId && posthog) {
			posthog.capture(`${trackingType || "popup"}_drag_completed`, {
				id: trackingId,
				name: trackingName,
				start_position: dragStartPosition,
				end_position: { x: offsetX, y: offsetY },
				distance_moved: Math.sqrt(
					(offsetX - dragStartPosition.x) ** 2 +
						(offsetY - dragStartPosition.y) ** 2,
				),
			});
		}
	}, [
		stopDragging,
		trackingId,
		trackingName,
		trackingType,
		posthog,
		dragStartPosition,
		offsetX,
		offsetY,
	]);

	// Handle click to bring popup to front
	const handleClick = useCallback((): void => {
		if (zIndex < globalHighestZIndex) {
			setZIndex(getNextZIndex());
		}
	}, [zIndex]);

	// Calculate line geometry
	const planeIconIntersectRadius = 15;
	const LINE_START_OFFSET_PX = 6; // distance from (0,0) to start drawing the line
	const coreWidth = size.width;
	const coreHeight = size.height;
	const popupIsLower = offsetY > -coreHeight / 2;
	const popupIsOnLeft = offsetX < -coreWidth / 2;

	let adjustedLineX = offsetX;
	let adjustedLineY = offsetY;

	// Apply borderRadius adjustments based on which corner the line connects to
	const radiusAdjustment = borderRadius || 0;

	if (!popupIsLower) {
		// Line connects to bottom edge
		adjustedLineY += coreHeight;

		// Adjust for bottom corners
		if (popupIsOnLeft) {
			// Bottom-right corner
			adjustedLineX -= radiusAdjustment;
			adjustedLineY -= radiusAdjustment;
		} else {
			// Bottom-left corner
			adjustedLineX += radiusAdjustment;
			adjustedLineY -= radiusAdjustment;
		}
	} else if (popupIsOnLeft) {
		// Line connects to top edge
		// Top-right corner
		adjustedLineX -= radiusAdjustment;
		adjustedLineY += radiusAdjustment;
	} else {
		// Line connects to top edge
		// Top-left corner
		adjustedLineX += radiusAdjustment;
		adjustedLineY += radiusAdjustment;
	}

	if (popupIsOnLeft) {
		adjustedLineX += coreWidth;
	}

	const lineLength = Math.sqrt(
		adjustedLineX * adjustedLineX + adjustedLineY * adjustedLineY,
	);
	const lineAngle = Math.atan2(adjustedLineY, adjustedLineX);

	// Compute start offset along the line direction
	const lineStartX = Math.cos(lineAngle) * LINE_START_OFFSET_PX;
	const lineStartY = Math.sin(lineAngle) * LINE_START_OFFSET_PX;
	const adjustedLineLength = Math.max(lineLength - LINE_START_OFFSET_PX, 0);

	// Check if plane icon and popup intersect
	const planeIconBounds = {
		left: -planeIconIntersectRadius,
		top: -planeIconIntersectRadius,
		right: planeIconIntersectRadius,
		bottom: planeIconIntersectRadius,
	};

	const popupBounds = {
		left: offsetX,
		top: offsetY,
		right: offsetX + coreWidth,
		bottom: offsetY + coreHeight,
	};

	const intersects =
		planeIconBounds.left < popupBounds.right &&
		planeIconBounds.right > popupBounds.left &&
		planeIconBounds.top < popupBounds.bottom &&
		planeIconBounds.bottom > popupBounds.top;

	const displayLine = !intersects;

	return (
		<Popup
			{...popupProps}
			style={{
				zIndex,
				maxWidth: "inherit",
			}}
			className="max-w-none"
		>
			<div
				className={`absolute z-[2] ${isDragging ? "cursor-grabbing" : ""} ${className ?? ""}`}
				onMouseDown={handleClick}
				style={{
					top: `${offsetY}px`,
					left: `${offsetX}px`,
				}}
			>
				<DraggableCore
					nodeRef={nodeRef}
					onStart={handleDragStart}
					onDrag={handleDrag}
					onStop={handleDragStop}
					cancel={cancel}
				>
					<div ref={nodeRef}>{children}</div>
				</DraggableCore>
			</div>
			<div
				className="absolute z-[1] h-[1.5px] bg-white/50 origin-left pointer-events-none"
				style={{
					display: displayLine ? "block" : "none",
					top: `${lineStartY}px`,
					left: `${lineStartX}px`,
					width: `${adjustedLineLength}px`,
					transform: `rotate(${lineAngle}rad)`,
					background: color || "rgba(255,255,255,0.5)",
				}}
			/>
		</Popup>
	);
}
