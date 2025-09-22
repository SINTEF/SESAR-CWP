import { useRef, useState } from "react";
import type { DraggableEvent } from "react-draggable";
import { DraggableCore } from "react-draggable";
import { Popup } from "react-map-gl/maplibre";
import { useDragging } from "../contexts/DraggingContext";

interface DraggableMarkerProps {
	longitude: number;
	latitude: number;
	children: React.ReactNode;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onClick?: () => void;
}

const DEFAULT_OFFSET_X = -12;
const DEFAULT_OFFSET_Y = -12;

export default function DraggableMarker({
	longitude,
	latitude,
	children,
	onMouseEnter,
	onMouseLeave,
	onClick,
}: DraggableMarkerProps) {
	const nodeRef = useRef<HTMLDivElement>(null);

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
		// uncomment if hover effect should disappear immediately when starting drag
		// onMouseLeave?.();
	};

	const handleDrag = (event: DraggableEvent): void => {
		if (!("clientX" in event && "clientY" in event)) {
			return;
		}
		const { clientX, clientY } = event;
		setOffsetX(clientX - dragStart.x);
		setOffsetY(clientY - dragStart.y);
	};

	const handleDragStop = (): void => {
		setIsDragging(false);
		setOffsetX(DEFAULT_OFFSET_X);
		setOffsetY(DEFAULT_OFFSET_Y);
		stopDragging();

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
