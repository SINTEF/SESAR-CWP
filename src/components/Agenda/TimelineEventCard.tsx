import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import type { DraggableEvent } from "react-draggable";
import { DraggableCore } from "react-draggable";
import { setCurrentAircraftId } from "../../model/CurrentAircraft";
import {
	aircraftStore,
	cwpStore,
	roleConfigurationStore,
	simulatorStore,
	trajectoryPredictionStore,
} from "../../state";
import { WarningIconById } from "../AircraftLabelParts";
import {
	BOTTOM_PADDING_PX,
	EVENT_HEIGHT_PX,
	type PositionedEvent,
} from "./types";

type EventCardProps = {
	event: PositionedEvent;
	/** Current time offset for this event in minutes (positive = moved up/into future) */
	timeOffsetMin: number;
	/** Pixels per minute for converting drag distance to time */
	pxPerMinute: number;
	/** Callback when drag ends with new time offset */
	onTimeOffsetChange: (eventId: string, offsetMin: number) => void;
	/** Whether to animate position changes (disable during/after drag) */
	animatePosition: boolean;
	/** Whether any card in the timeline is being dragged */
	isDraggingAny: boolean;
	/** Callback to set the global dragging state */
	setIsDraggingAny: (isDragging: boolean) => void;
};

/**
 * A draggable timeline event card.
 * Renders a ghost during drag with a vertical connecting line to the original position.
 */
/** Minimum movement in pixels before we consider it a drag (prevents ghost on click) */
const DRAG_THRESHOLD_PX = 3;

const TimelineEventCard = observer(function TimelineEventCard({
	event,
	timeOffsetMin,
	pxPerMinute,
	onTimeOffsetChange,
	animatePosition,
	isDraggingAny,
	setIsDraggingAny,
}: EventCardProps) {
	const nodeRef = useRef<HTMLDivElement>(null);
	// Whether mouse is pressed (DraggableCore active)
	const [isPressed, setIsPressed] = useState(false);
	// Whether actual dragging has started (movement threshold exceeded)
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffsetY, setDragOffsetY] = useState(0);
	const [dragStartY, setDragStartY] = useState(0);
	// Track if a drag just occurred to prevent click events firing after drag
	const wasDraggingRef = useRef(false);

	// Get the aircraft ID for a given label index (if available)
	const getAircraftId = (index: number): string | undefined => {
		return event.aircraftIds?.[index];
	};

	const handleMouseEnter = (index: number) => {
		if (isDraggingAny) {
			return;
		}
		const aircraftId = getAircraftId(index);
		if (aircraftId) {
			cwpStore.setHoveredMarkerAircraftId(aircraftId);
			cwpStore.setFlightRouteForAircraft(aircraftId, true);
		}
	};

	const handleMouseLeave = (index: number) => {
		if (isDraggingAny) {
			return;
		}
		const aircraftId = getAircraftId(index);
		if (aircraftId) {
			cwpStore.removeHoveredMarkerAircraftId();
			if (!cwpStore.selectedAircraftIds.has(aircraftId)) {
				cwpStore.setFlightRouteForAircraft(aircraftId, false);
			}
		}
	};

	const handleClick = (index: number) => {
		if (isDraggingAny || wasDraggingRef.current) {
			return;
		}
		const aircraftId = getAircraftId(index);
		if (aircraftId) {
			const wasSelected = cwpStore.selectedAircraftIds.has(aircraftId);
			cwpStore.toggleSelectedAircraftId(aircraftId);
			setCurrentAircraftId(aircraftId);
			cwpStore.removeHoveredMarkerAircraftId();
			cwpStore.setFlightRouteForAircraft(aircraftId, !wasSelected);
		}
	};

	// Hover handlers for the badge - shows both flight routes
	const handleBadgeMouseEnter = () => {
		if (isDraggingAny) {
			return;
		}
		const ids = event.aircraftIds;
		if (ids && ids.length > 0) {
			cwpStore.setHoveredMarkerAircraftId(ids[0]);
			for (const id of ids) {
				cwpStore.setFlightRouteForAircraft(id, true);
			}
		}
	};

	const handleBadgeMouseLeave = () => {
		if (isDraggingAny) {
			return;
		}
		const ids = event.aircraftIds;
		if (ids && ids.length > 0) {
			cwpStore.removeHoveredMarkerAircraftId();
			for (const id of ids) {
				if (!cwpStore.selectedAircraftIds.has(id)) {
					cwpStore.setFlightRouteForAircraft(id, false);
				}
			}
		}
	};

	const handleBadgeClick = () => {
		if (isDraggingAny || wasDraggingRef.current) {
			return;
		}
		const ids = event.aircraftIds;
		if (ids && ids.length > 0) {
			const allSelected = ids.every((id) =>
				cwpStore.selectedAircraftIds.has(id),
			);
			for (const id of ids) {
				if (allSelected) {
					cwpStore.selectedAircraftIds.delete(id);
					cwpStore.setFlightRouteForAircraft(id, false);
				} else {
					cwpStore.selectedAircraftIds.add(id);
					cwpStore.setFlightRouteForAircraft(id, true);
				}
			}
			setCurrentAircraftId(ids[0]);
			cwpStore.removeHoveredMarkerAircraftId();
		}
	};

	// Drag handlers - vertical only
	const handleDragStart = (e: DraggableEvent): void => {
		if (!("clientY" in e)) {
			return;
		}
		// Mark as pressed, but don't show ghost yet (wait for movement)
		setIsPressed(true);
		setDragStartY(e.clientY);
		setDragOffsetY(0);
	};

	const handleDrag = (e: DraggableEvent): void => {
		if (!("clientY" in e)) {
			return;
		}
		// Only update Y position (vertical drag)
		const deltaY = dragStartY - e.clientY; // Inverted because bottom-based positioning

		// Only start visual dragging after exceeding threshold
		if (!isDragging && Math.abs(deltaY) >= DRAG_THRESHOLD_PX) {
			setIsDragging(true);
			setIsDraggingAny(true);
			wasDraggingRef.current = true;

			// Enable trajectory prediction for all aircraft in the event
			const aircraftIds = event.aircraftIds;
			if (aircraftIds && aircraftIds.length > 0) {
				trajectoryPredictionStore.setEnabled(true);
				trajectoryPredictionStore.setMainAircraft(aircraftIds[0]);
				trajectoryPredictionStore.setTimelineDragAircraftIds(aircraftIds);
			}
		}

		setDragOffsetY(deltaY);

		// Update trajectory prediction time while dragging
		if (isDragging && event.aircraftIds && event.aircraftIds.length > 0) {
			// Calculate the future time based on drag position
			const ghostBottomPx = displayBottomPx + deltaY;
			const dropTimeMin = (ghostBottomPx - BOTTOM_PADDING_PX) / pxPerMinute;
			const futureTimestamp = simulatorStore.timestamp + dropTimeMin * 60;
			trajectoryPredictionStore.setOverrideTime(futureTimestamp);
		}
	};

	const handleDragStop = (): void => {
		setIsPressed(false);
		setIsDragging(false);
		setIsDraggingAny(false);

		// Clear wasDraggingRef after the current event loop to ignore the click that fires on mouseup
		requestAnimationFrame(() => {
			wasDraggingRef.current = false;
		});

		// Disable trajectory prediction
		trajectoryPredictionStore.setEnabled(false);

		// Check if ghost overlaps with original (small movement threshold)
		const movementThreshold = EVENT_HEIGHT_PX / 2;
		if (Math.abs(dragOffsetY) < movementThreshold) {
			// Reset - no change
			setDragOffsetY(0);
			return;
		}

		// Calculate the time at the ghost's drop position
		const ghostBottomPx = displayBottomPx + dragOffsetY;
		const dropTimeMin = (ghostBottomPx - BOTTOM_PADDING_PX) / pxPerMinute;

		// The original startMin (without any offset) = event.startMin - timeOffsetMin
		// since event.startMin already has the current offset applied
		const originalStartMin = event.startMin - timeOffsetMin;

		// New offset = difference between drop time and original time
		const newOffset = dropTimeMin - originalStartMin;

		onTimeOffsetChange(event.id, newOffset);
		setDragOffsetY(0);
	};

	// Calculate positions
	// displayBottomPx is the stacked position (for visual display)
	// event.originalBottomPx is the time-based position (for calculations)
	const displayBottomPx = event.bottomPx;
	const ghostBottomPx = displayBottomPx + dragOffsetY;

	// Determine if ghost overlaps with original
	const ghostTop = ghostBottomPx + EVENT_HEIGHT_PX;
	const displayTop = displayBottomPx + EVENT_HEIGHT_PX;
	const isOverlapping =
		ghostBottomPx < displayTop && ghostTop > displayBottomPx;

	// Calculate connecting line positions (only when not overlapping)
	const showConnectingLine = isDragging && !isOverlapping;
	// Line connects the closer edges of ghost and original
	const ghostIsAbove = ghostBottomPx > displayBottomPx;
	const lineBottom = ghostIsAbove ? displayTop : ghostTop;
	const lineTop = ghostIsAbove ? ghostBottomPx : displayBottomPx;
	const lineHeight = Math.abs(lineTop - lineBottom);

	// Check if all aircraft in the event are selected (for badge outline)
	const allAircraftSelected =
		event.aircraftIds &&
		event.aircraftIds.length > 0 &&
		event.aircraftIds.every((id) => cwpStore.selectedAircraftIds.has(id));

	// Determine badge color based on severity and event type
	// Custom datablocks = purple, severe MTCD = orange, potential MTCD = yellow
	const getBadgeColorClass = () => {
		if (event.eventType === "custom-datablock") {
			return "bg-violet-400 text-black";
		}
		if (event.severity === "potential") {
			return "bg-yellow-300 text-black";
		}
		return "badge-warning"; // orange for severe
	};
	const badgeColorClass = getBadgeColorClass();

	// Card content (shared between original and ghost)
	const cardContent = (
		<>
			{/* Left badge */}
			{event.code && (
				<div
					className={`h-auto badge ${badgeColorClass} border-1.5 border-white rounded font-bold text-xs ml-0.75 px-0.5 aspect-square cursor-pointer hover:brightness-110 transition-all ${
						allAircraftSelected ? "outline outline-cyan-400" : ""
					}`}
					onMouseEnter={handleBadgeMouseEnter}
					onMouseLeave={handleBadgeMouseLeave}
					onClick={handleBadgeClick}
				>
					<div className="outline-1 outline-white rounded-full flex items-center justify-center w-7 h-7">
						{event.code}
					</div>
				</div>
			)}

			{/* Text labels */}
			<ul className="text-[10px] flex flex-col gap-0.5 mr-1 my-1">
				{event.labels.map((l, i) => {
					const aircraftId = event.aircraftIds?.[i];
					const aircraft = aircraftId
						? aircraftStore.aircrafts.get(aircraftId)
						: undefined;
					const isDegreased = aircraft?.degreased ?? false;
					const isSelected = aircraftId
						? cwpStore.selectedAircraftIds.has(aircraftId)
						: false;
					return (
						<li key={i} className="flex gap-0.5">
							<div
								className={`bg-neutral-800 pl-0.75 min-w-15 cursor-pointer hover:bg-neutral-700 transition-colors ${
									isDegreased ? "font-normal" : "font-bold"
								} ${isSelected ? "outline-1 outline-cyan-400" : ""}`}
								onMouseEnter={() => handleMouseEnter(i)}
								onMouseLeave={() => handleMouseLeave(i)}
								onClick={() => handleClick(i)}
								style={{
									color: aircraftId
										? roleConfigurationStore.getBaseColorOfAircraft(aircraftId)
										: undefined,
								}}
							>
								{l}
							</div>
							<div className="bg-neutral-800 flex items-center justify-center min-w-4 px-0.5">
								{aircraftId ? (
									<WarningIconById
										aircraftId={aircraftId}
										className="size-2.5"
									/>
								) : (
									<span className="text-center">+</span>
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);

	const cardClassName = `absolute left-1 right-1
		rounded-lg border-2 border-white/50
		bg-primary/40 font-mono
		shadow-sm backdrop-blur-[1px]
		flex justify-between items-center`;

	// Only apply transition when animating and not dragging/pressed
	const shouldAnimate = animatePosition && !isDragging && !isPressed;

	return (
		<>
			{/* Original card (stays in place, wrapped in DraggableCore) */}
			<DraggableCore
				nodeRef={nodeRef}
				onStart={handleDragStart}
				onDrag={handleDrag}
				onStop={handleDragStop}
			>
				<div
					ref={nodeRef}
					className={`${cardClassName} ${isDragging ? "opacity-50" : ""} ${shouldAnimate ? "transition-[bottom] duration-300 ease-out" : ""} cursor-grab`}
					style={{
						bottom: displayBottomPx,
						height: EVENT_HEIGHT_PX,
					}}
				>
					{cardContent}
				</div>
			</DraggableCore>

			{/* Connecting line (only when dragging and not overlapping) */}
			{showConnectingLine && (
				<div
					className="absolute left-1/2 w-0.5 bg-white/70 pointer-events-none z-5"
					style={{
						bottom: Math.min(lineBottom, lineTop),
						height: lineHeight,
						transform: "translateX(-50%)",
					}}
				/>
			)}

			{/* Ghost card (visual feedback during drag) */}
			{isDragging && (
				<div
					className={`${cardClassName} opacity-70 cursor-grabbing z-10 pointer-events-none`}
					style={{
						bottom: ghostBottomPx,
						height: EVENT_HEIGHT_PX,
					}}
				>
					{cardContent}
				</div>
			)}
		</>
	);
});

export default TimelineEventCard;
