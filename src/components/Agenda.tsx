import { observer } from "mobx-react-lite";
import React, { memo, useCallback, useEffect, useState } from "react";
import { setCurrentAircraftId } from "../model/CurrentAircraft";
import { aircraftStore, cwpStore, simulatorStore } from "../state";
import { convertMetersToFlightLevel } from "../utils";
import { WarningIconById } from "./AircraftLabelParts";

/**
 * VerticalTimeline — Tailwind + DaisyUI
 *
 * - Creates a fixed-width vertical scheduler column that fills screen height.
 * - Renders events positioned by time relative to "now" (bottom of timeline).
 * - Zoomable via mouse wheel or range slider.
 * - Separator lines adapt to current scale.
 * - Events have fixed height and stack vertically to avoid overlaps.
 */

// Types
export type TimelineEvent = {
	id: string;
	startMin: number; // minutes from now (positive = future)
	endMin: number; // minutes from now
	code: string | undefined; // the orange badge text
	labels: string[]; // lines of text inside the chip
	aircraftIds?: string[]; // optional aircraft IDs for hover functionality
};

// Scale presets in minutes (total visible window)
const SCALE_PRESETS = [5, 10, 15, 30, 60, 120, 240] as const;
type ScalePreset = (typeof SCALE_PRESETS)[number];

// Fixed height for event labels in pixels
const EVENT_HEIGHT_PX = 42;
// Gap between stacked events
const EVENT_GAP_PX = 2;
// Bottom padding to prevent content being cropped at the bottom
const BOTTOM_PADDING_PX = 16;

/**
 * Determine separator interval based on scale
 * Returns interval in minutes
 */
function getSeparatorInterval(scaleMinutes: number): number {
	if (scaleMinutes <= 10) {
		return 1;
	}
	if (scaleMinutes <= 15) {
		return 3;
	}
	if (scaleMinutes <= 30) {
		return 5;
	}
	if (scaleMinutes <= 60) {
		return 10;
	}
	if (scaleMinutes <= 120) {
		return 15;
	}
	return 30;
}

/**
 * Format timestamp to HH:mm (24h)
 */
function formatTime(timestampSeconds: number): string {
	const date = new Date(timestampSeconds * 1000);
	return date.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}

type PositionedEvent = TimelineEvent & {
	bottomPx: number; // distance from container bottom in pixels
};

/**
 * Stack events vertically to avoid overlaps.
 * Events are positioned from bottom (now) upward (future).
 * Returns events with adjusted bottom positions.
 */
function stackEvents(events: PositionedEvent[]): PositionedEvent[] {
	if (events.length === 0) {
		return [];
	}

	// Sort by bottomPx ascending (events closer to bottom/now first)
	const sorted = [...events].sort((a, b) => a.bottomPx - b.bottomPx);
	const result: PositionedEvent[] = [];

	for (const event of sorted) {
		let adjustedBottom = event.bottomPx;

		// Check for overlaps with already placed events and shift up if needed
		for (const placed of result) {
			const eventTop = adjustedBottom + EVENT_HEIGHT_PX;
			const placedTop = placed.bottomPx + EVENT_HEIGHT_PX;

			// Events overlap if their vertical ranges intersect
			// Event range: [adjustedBottom, eventTop]
			// Placed range: [placed.bottomPx, placedTop]
			if (adjustedBottom < placedTop && eventTop > placed.bottomPx) {
				// Shift this event up (higher bottomPx = higher on screen)
				adjustedBottom = placedTop + EVENT_GAP_PX;
			}
		}

		result.push({ ...event, bottomPx: adjustedBottom });
	}

	return result;
}

// ============================================================================
// Memoized Sub-components for performance
// ============================================================================

type SeparatorProps = {
	bottomPx: number;
	time: string;
};

const TimelineSeparator = memo(function TimelineSeparator({
	bottomPx,
	time,
}: SeparatorProps) {
	return (
		<div
			className="absolute left-0 right-0 border-t border-base-content/20 pointer-events-none transition-[bottom] duration-300 ease-out"
			style={{ bottom: bottomPx }}
		>
			<span
				className="absolute left-1 text-[8px] bg-base-300 px-0.5 text-base-content/60 select-none"
				style={{ transform: "translateY(-50%)" }}
			>
				{time}
			</span>
		</div>
	);
});

type EventCardProps = {
	event: PositionedEvent;
};

const TimelineEventCard = memo(function TimelineEventCard({
	event,
}: EventCardProps) {
	// Get the aircraft ID for a given label index (if available)
	const getAircraftId = (index: number): string | undefined => {
		return event.aircraftIds?.[index];
	};

	const handleMouseEnter = (index: number) => {
		const aircraftId = getAircraftId(index);
		if (aircraftId) {
			cwpStore.setHoveredMarkerAircraftId(aircraftId);
			cwpStore.setFlightRouteForAircraft(aircraftId, true);
		}
	};

	const handleMouseLeave = (index: number) => {
		const aircraftId = getAircraftId(index);
		if (aircraftId) {
			cwpStore.removeHoveredMarkerAircraftId();
			if (!cwpStore.selectedAircraftIds.has(aircraftId)) {
				cwpStore.setFlightRouteForAircraft(aircraftId, false);
			}
		}
	};

	const handleClick = (index: number) => {
		const aircraftId = getAircraftId(index);
		if (aircraftId) {
			const wasSelected = cwpStore.selectedAircraftIds.has(aircraftId);
			cwpStore.toggleSelectedAircraftId(aircraftId);
			setCurrentAircraftId(aircraftId);
			// Clear hover state after click, like the map marker behavior
			cwpStore.removeHoveredMarkerAircraftId();
			// Only keep flight route visible if aircraft is now selected
			cwpStore.setFlightRouteForAircraft(aircraftId, !wasSelected);
		}
	};

	// Hover handlers for the badge - shows both flight routes
	// Note: Only one aircraft can be "hovered" at a time in the current model,
	// so we hover the first one but show both routes
	const handleBadgeMouseEnter = () => {
		const ids = event.aircraftIds;
		if (ids && ids.length > 0) {
			cwpStore.setHoveredMarkerAircraftId(ids[0]);
			for (const id of ids) {
				cwpStore.setFlightRouteForAircraft(id, true);
			}
		}
	};

	const handleBadgeMouseLeave = () => {
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
		const ids = event.aircraftIds;
		if (ids && ids.length > 0) {
			// Check if all aircraft are currently selected
			const allSelected = ids.every((id) =>
				cwpStore.selectedAircraftIds.has(id),
			);
			for (const id of ids) {
				if (allSelected) {
					// Deselect all
					cwpStore.selectedAircraftIds.delete(id);
					cwpStore.setFlightRouteForAircraft(id, false);
				} else {
					// Select all
					cwpStore.selectedAircraftIds.add(id);
					cwpStore.setFlightRouteForAircraft(id, true);
				}
			}
			// Set the first aircraft as current
			setCurrentAircraftId(ids[0]);
			// Clear hover state after click
			cwpStore.removeHoveredMarkerAircraftId();
		}
	};

	return (
		<div
			className="absolute left-1 right-1
			rounded-lg border-2 border-white/50
			bg-primary/40
			shadow-sm backdrop-blur-[1px]
			transition-[bottom] duration-300 ease-out
			flex justify-between items-center
			"
			style={{
				bottom: event.bottomPx,
				height: EVENT_HEIGHT_PX,
			}}
		>
			{/* Left badge */}
			{event.code && (
				<div
					className="h-auto badge badge-warning rounded font-bold text-xs ml-0.75 px-1 aspect-square cursor-pointer hover:brightness-110 transition-all"
					onMouseEnter={handleBadgeMouseEnter}
					onMouseLeave={handleBadgeMouseLeave}
					onClick={handleBadgeClick}
				>
					{event.code}
				</div>
			)}

			{/* Text */}
			<ul className="text-[10px] flex flex-col gap-0.5 mr-1 my-1">
				{event.labels.map((l, i) => {
					const aircraftId = event.aircraftIds?.[i];
					return (
						<li key={i} className="flex gap-0.5">
							<div
								className="bg-neutral-800 pl-0.75 min-w-15 font-bold cursor-pointer hover:bg-neutral-700 transition-colors"
								onMouseEnter={() => handleMouseEnter(i)}
								onMouseLeave={() => handleMouseLeave(i)}
								onClick={() => handleClick(i)}
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
		</div>
	);
});

// ============================================================================
// Main Component
// ============================================================================

export default observer(function Agenda({
	events = [],
}: {
	events?: TimelineEvent[];
}) {
	const [scaleMinutes, setScaleMinutes] = useState<ScalePreset>(30);
	const [containerHeight, setContainerHeight] = useState(600);
	const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

	const currentTimestamp = simulatorStore.timestamp;
	const { mtcdConflictIds } = aircraftStore;

	// Measure container height
	useEffect(() => {
		if (!containerRef) {
			return;
		}
		const updateHeight = () => {
			setContainerHeight(containerRef.clientHeight);
		};
		updateHeight();
		const resizeObserver = new ResizeObserver(updateHeight);
		resizeObserver.observe(containerRef);
		return () => resizeObserver.disconnect();
	}, [containerRef]);

	// Pixels per minute based on container height (minus padding) and scale
	const effectiveHeight = containerHeight - BOTTOM_PADDING_PX;
	const pxPerMinute = effectiveHeight / scaleMinutes;

	// Convert MTCD conflicts to timeline events
	const datablocks: TimelineEvent[] = Array.from(mtcdConflictIds.entries()).map(
		([id, conflict], index) => {
			// Use actual conflict time if available, otherwise use placeholder
			const conflictTime = conflict.conflictingFlightPosition?.time;
			const conflictTimestamp = conflictTime
				? Number(conflictTime.seconds)
				: currentTimestamp + (index + 1) * 5 * 60; // Placeholder: 5min intervals

			const minutesFromNow = (conflictTimestamp - currentTimestamp) / 60;

			return {
				id: id,
				startMin: minutesFromNow,
				endMin: minutesFromNow + 2, // Event duration placeholder
				code:
					conflict.conflictingFlightPosition?.altitude !== undefined
						? String(
								convertMetersToFlightLevel(
									conflict.conflictingFlightPosition.altitude,
								),
							)
						: undefined,
				labels: [conflict.callSign, conflict.conflictingFlightCallSign],
				aircraftIds: [conflict.flightId, conflict.conflictingFlightId],
			};
		},
	);

	const allEvents = [...events, ...datablocks];

	// Handle mouse wheel zoom
	const handleWheel = useCallback((e: React.WheelEvent) => {
		e.preventDefault();
		setScaleMinutes((current) => {
			const currentIndex = SCALE_PRESETS.indexOf(current);
			if (e.deltaY > 0) {
				// Scroll down = zoom out (more minutes visible)
				return SCALE_PRESETS[
					Math.min(currentIndex + 1, SCALE_PRESETS.length - 1)
				];
			}
			// Scroll up = zoom in (fewer minutes visible)
			return SCALE_PRESETS[Math.max(currentIndex - 1, 0)];
		});
	}, []);

	// Handle range slider change
	const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const index = Number.parseInt(e.target.value, 10);
		setScaleMinutes(SCALE_PRESETS[index]);
	};

	// Calculate separator lines with smooth scrolling
	// Separators are positioned relative to "now" (exact current time)
	const separatorInterval = getSeparatorInterval(scaleMinutes);
	const separators: Array<{
		bottomPx: number;
		time: string;
		minuteKey: number;
	}> = [];

	// Current time in minutes (floating point for sub-minute precision)
	const currentTimeMinutes = currentTimestamp / 60;
	// Round down to the nearest interval to find the base separator
	const baseMinute =
		Math.floor(currentTimeMinutes / separatorInterval) * separatorInterval;
	// How far past the last interval mark we are (causes the "scrolling" effect)
	const offsetFromBase = currentTimeMinutes - baseMinute;

	// Generate separators, starting from the one at or before "now"
	// We go one interval before and after the visible range to ensure smooth transitions
	for (
		let i = -separatorInterval;
		i <= scaleMinutes + separatorInterval;
		i += separatorInterval
	) {
		const absoluteMinute = baseMinute + i;
		// Position relative to "now": subtract the offset so separators slide down over time
		const minutesFromNow = i - offsetFromBase;
		const bottomPx = minutesFromNow * pxPerMinute + BOTTOM_PADDING_PX;

		// Only include separators within the visible area
		if (bottomPx >= 0 && bottomPx <= containerHeight) {
			separators.push({
				bottomPx,
				time: formatTime(absoluteMinute * 60),
				minuteKey: absoluteMinute,
			});
		}
	}

	// Prepare event positions in pixels (filter events within time range)
	const eventPositions: PositionedEvent[] = allEvents
		.filter((ev) => ev.startMin >= 0 && ev.startMin <= scaleMinutes)
		.map((ev) => {
			// Position from bottom in pixels, with bottom padding offset
			const bottomPx = ev.startMin * pxPerMinute + BOTTOM_PADDING_PX;
			return { ...ev, bottomPx };
		});

	// Stack events to avoid overlaps
	const stackedEvents = stackEvents(eventPositions);

	// Filter out events that are pushed outside the visible area after stacking
	const visibleEvents = stackedEvents.filter(
		(ev) => ev.bottomPx >= -EVENT_HEIGHT_PX && ev.bottomPx < containerHeight,
	);

	return (
		<div className="w-44 h-screen bg-base-300 text-base-content border-l-[1.5px] border-base-200 z-40 flex flex-col">
			{/* Header */}
			<div className="px-2 py-1 border-b border-base-200 shrink-0 bg-neutral-800">
				<h2 className="text-xs font-semibold text-base-content/80">Agenda</h2>
			</div>

			{/* Scale slider control */}
			<div className="p-2 border-b border-base-200 flex items-center gap-2 shrink-0">
				<span className="text-[10px] text-base-content/70">
					{scaleMinutes}m
				</span>
				<input
					type="range"
					min="0"
					max={SCALE_PRESETS.length - 1}
					value={SCALE_PRESETS.indexOf(scaleMinutes)}
					onChange={handleRangeChange}
					className="range range-xs flex-1 [--range-fill:0] [--range-bg:#666] text-primary"
				/>
			</div>

			{/* Timeline container - fills remaining height */}
			<div
				ref={setContainerRef}
				className="relative flex-1 overflow-hidden"
				onWheel={handleWheel}
			>
				{/* Separator lines with time labels */}
				{separators.map(({ bottomPx, time, minuteKey }) => (
					<TimelineSeparator key={minuteKey} bottomPx={bottomPx} time={time} />
				))}

				{/* Events with fixed height, positioned absolutely */}
				{visibleEvents.map((ev) => (
					<TimelineEventCard key={ev.id} event={ev} />
				))}
			</div>
		</div>
	);
});
