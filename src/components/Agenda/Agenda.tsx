import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	aircraftStore,
	cwpStore,
	datablockStore,
	simulatorStore,
} from "../../state";
import { convertMetersToFlightLevel } from "../../utils";
import TimelineEventCard from "./TimelineEventCard";
import TimelineSeparator from "./TimelineSeparator";
import {
	BOTTOM_PADDING_PX,
	EVENT_GAP_PX,
	EVENT_HEIGHT_PX,
	type PositionedEvent,
	SCALE_PRESETS,
	type ScalePreset,
	type TimelineEvent,
} from "./types";

/** Placeholder interval between conflicts when real time is unavailable (5 minutes in seconds) */
const PLACEHOLDER_CONFLICT_INTERVAL_SEC = 5 * 60;

/**
 * VerticalTimeline — Tailwind + DaisyUI
 *
 * - Creates a fixed-width vertical scheduler column that fills screen height.
 * - Renders events positioned by time relative to "now" (bottom of timeline).
 * - Zoomable via mouse wheel or range slider.
 * - Separator lines adapt to current scale.
 * - Events have fixed height and stack vertically to avoid overlaps.
 * - Events can be dragged up/down to adjust their time offset.
 */

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

		// Preserve originalBottomPx for time calculation, only update display position
		result.push({ ...event, bottomPx: adjustedBottom });
	}

	return result;
}

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
	const timelineContainerRef = useRef<HTMLDivElement | null>(null);
	// Track whether we should animate positions (only on scale change, not on drag)
	const [animatePosition, setAnimatePosition] = useState(true);
	const prevScaleRef = useRef<ScalePreset>(scaleMinutes);
	// Track if any card is being dragged (to disable hover on other cards)
	const [isDraggingAny, setIsDraggingAny] = useState(false);

	const currentTimestamp = simulatorStore.timestamp;
	const { mtcdConflictIds } = aircraftStore;

	// Enable animation only when scale changes
	useEffect(() => {
		if (prevScaleRef.current !== scaleMinutes) {
			setAnimatePosition(true);
			prevScaleRef.current = scaleMinutes;
		}
	}, [scaleMinutes]);

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

	// Handle mouse wheel zoom with non-passive listener to allow preventDefault
	// Uses threshold-based accumulation to smooth trackpad scrolling while
	// allowing quick mouse wheel notches
	useEffect(() => {
		const container = timelineContainerRef.current;
		if (!container) {
			return;
		}

		let accumulatedDelta = 0;
		let resetTimeout: ReturnType<typeof setTimeout> | null = null;
		const THRESHOLD = 30; // Mouse wheel notches are ~100-120, trackpad events are small
		const RESET_TIMEOUT_MS = 150; // Reset accumulated delta after pause

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();

			// Clear any existing reset timeout
			if (resetTimeout) {
				clearTimeout(resetTimeout);
			}

			// Accumulate the delta
			accumulatedDelta += e.deltaY;

			// Check if we've accumulated enough to trigger a scale change
			if (Math.abs(accumulatedDelta) >= THRESHOLD) {
				const direction = accumulatedDelta > 0 ? 1 : -1;
				// Reset accumulator after triggering
				accumulatedDelta = 0;

				setScaleMinutes((current) => {
					const currentIndex = SCALE_PRESETS.indexOf(current);
					if (direction > 0) {
						// Scroll down = zoom out (more minutes visible)
						return SCALE_PRESETS[
							Math.min(currentIndex + 1, SCALE_PRESETS.length - 1)
						];
					}
					// Scroll up = zoom in (fewer minutes visible)
					return SCALE_PRESETS[Math.max(currentIndex - 1, 0)];
				});
			}

			// Reset accumulator after a pause in scrolling
			resetTimeout = setTimeout(() => {
				accumulatedDelta = 0;
			}, RESET_TIMEOUT_MS);
		};

		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			container.removeEventListener("wheel", handleWheel);
			if (resetTimeout) {
				clearTimeout(resetTimeout);
			}
		};
	}, []);

	// Pixels per minute based on container height (minus padding) and scale
	const effectiveHeight = containerHeight - BOTTOM_PADDING_PX;
	const pxPerMinute = effectiveHeight / scaleMinutes;

	// Convert MTCD conflicts to timeline events
	const mtcdEvents: TimelineEvent[] = Array.from(mtcdConflictIds.entries()).map(
		([id, conflict], index) => {
			// Use actual conflict time if available, otherwise use placeholder
			const conflictTime = conflict.conflictingFlightPosition?.time;
			const conflictTimestamp = conflictTime
				? Number(conflictTime.seconds)
				: currentTimestamp + (index + 1) * PLACEHOLDER_CONFLICT_INTERVAL_SEC;

			const minutesFromNow = (conflictTimestamp - currentTimestamp) / 60;

			// Determine severity based on conflictType:
			// 3 = MTCDInputSevere (severe), 4 = MTCDInputPotential (potential)
			const severity =
				conflict.conflictType === 4
					? ("potential" as const)
					: ("severe" as const);

			return {
				id: id,
				startMin: minutesFromNow,
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
				severity,
			};
		},
	);

	// Convert custom datablocks to timeline events
	const customDatablockEvents: TimelineEvent[] =
		datablockStore.allDatablocks.map((db) => {
			// Get callsigns for the labels
			const labels = db.aircraftIds
				.map((id) => aircraftStore.aircrafts.get(id)?.callSign ?? id)
				.slice(0, 2); // Limit to 2 labels

			return {
				id: db.id,
				startMin: db.startMin,
				code: undefined, // No flight level badge for custom datablocks
				labels,
				aircraftIds: db.aircraftIds,
				severity: undefined, // No severity for custom datablocks (neutral color)
			};
		});

	const allEvents = [...events, ...mtcdEvents, ...customDatablockEvents];

	// Handle range slider change
	const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const index = Number.parseInt(e.target.value, 10);
		setScaleMinutes(SCALE_PRESETS[index]);
	};

	// Handle time offset changes from dragging events
	const handleTimeOffsetChange = useCallback(
		(eventId: string, offsetMin: number) => {
			// Disable animation when dragging completes to prevent jarring movement
			setAnimatePosition(false);
			cwpStore.setAgendaEventTimeOffset(eventId, offsetMin);
		},
		[],
	);

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
	// Apply time offsets from cwpStore
	const eventPositions: PositionedEvent[] = allEvents
		.map((ev) => {
			// Apply the stored time offset
			const timeOffset = cwpStore.getAgendaEventTimeOffset(ev.id);
			const adjustedStartMin = ev.startMin + timeOffset;
			return { ...ev, startMin: adjustedStartMin };
		})
		.filter((ev) => ev.startMin >= 0 && ev.startMin <= scaleMinutes)
		.map((ev) => {
			// Position from bottom in pixels, with bottom padding offset
			const bottomPx = ev.startMin * pxPerMinute + BOTTOM_PADDING_PX;
			// Store original position for accurate time offset calculation during drag
			return { ...ev, bottomPx, originalBottomPx: bottomPx };
		});

	// Stack events to avoid overlaps
	const stackedEvents = stackEvents(eventPositions);

	// Filter out events that are pushed outside the visible area after stacking
	const visibleEvents = stackedEvents.filter(
		(ev) => ev.bottomPx >= -EVENT_HEIGHT_PX && ev.bottomPx < containerHeight,
	);

	return (
		<div className="w-44 h-screen bg-base-300 text-base-content border-l-[1.5px] border-base-200 z-40 flex flex-col font-mono">
			{/* Header */}
			<div className="px-2 py-1 border-b border-base-200 shrink-0 bg-neutral-800">
				<h2 className="text-xs font-semibold text-base-content/80">Agenda</h2>
			</div>

			{/* Scale slider control */}
			<div className="p-2 border-b border-base-200 flex items-center gap-2 shrink-0 bg-[#333]">
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
				ref={(el) => {
					setContainerRef(el);
					timelineContainerRef.current = el;
				}}
				className="relative flex-1 overflow-hidden"
			>
				{/* Separator lines with time labels */}
				{separators.map(({ bottomPx, time, minuteKey }) => (
					<TimelineSeparator key={minuteKey} bottomPx={bottomPx} time={time} />
				))}

				{/* Events with fixed height, positioned absolutely */}
				{visibleEvents.map((ev) => (
					<TimelineEventCard
						key={ev.id}
						event={ev}
						timeOffsetMin={cwpStore.getAgendaEventTimeOffset(ev.id)}
						pxPerMinute={pxPerMinute}
						onTimeOffsetChange={handleTimeOffsetChange}
						animatePosition={animatePosition}
						isDraggingAny={isDraggingAny}
						setIsDraggingAny={setIsDraggingAny}
					/>
				))}
			</div>
		</div>
	);
});

// Re-export types for external use
export type { TimelineEvent } from "./types";
