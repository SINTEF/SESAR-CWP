/**
 * Shared types for the Agenda timeline component.
 */

/** An event to display on the timeline */
export type TimelineEvent = {
	id: string;
	startMin: number; // minutes from now (positive = future)
	endMin: number; // minutes from now
	code: string | undefined; // the orange badge text
	labels: string[]; // lines of text inside the chip
	aircraftIds?: string[]; // optional aircraft IDs for hover functionality
};

/** Event with computed pixel position */
export type PositionedEvent = TimelineEvent & {
	bottomPx: number; // distance from container bottom in pixels
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
