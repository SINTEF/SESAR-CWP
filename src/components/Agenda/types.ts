/**
 * Shared types for the Agenda timeline component.
 */

/** Conflict severity for timeline events */
export type ConflictSeverity = "severe" | "potential";

/** Event type for custom datablocks (manual aircraft pairing) */
export type EventType = "mtcd" | "custom-datablock";

/** An event to display on the timeline */
export type TimelineEvent = {
	id: string;
	startMin: number; // minutes from now (positive = future)
	code: string | undefined; // the badge text (flight level or separation distance)
	labels: string[]; // lines of text inside the chip
	aircraftIds?: string[]; // optional aircraft IDs for hover functionality
	severity?: ConflictSeverity; // conflict severity: severe (orange) or potential (yellow)
	eventType?: EventType; // type of event for styling (mtcd vs custom-datablock)
};

/** Event with computed pixel position */
export type PositionedEvent = TimelineEvent & {
	bottomPx: number; // distance from container bottom in pixels (may be adjusted for stacking)
	originalBottomPx: number; // original time-based position before stacking adjustment
};

/** Scale presets in minutes (total visible window) */
export const SCALE_PRESETS = [5, 10, 15, 30, 60, 120, 240] as const;
export type ScalePreset = (typeof SCALE_PRESETS)[number];

/** Fixed height for event labels in pixels */
export const EVENT_HEIGHT_PX = 42;

/** Gap between stacked events */
export const EVENT_GAP_PX = 2;

/** Bottom padding to prevent content being cropped at the bottom */
export const BOTTOM_PADDING_PX = 16;
