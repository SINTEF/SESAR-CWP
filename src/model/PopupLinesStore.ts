import type { ObservableMap } from "mobx";
import { makeAutoObservable, observable } from "mobx";

export interface PopupLineData {
	id: string;
	/** Longitude of the popup anchor point */
	longitude: number;
	/** Latitude of the popup anchor point */
	latitude: number;
	/** Start X offset from anchor (accounts for LINE_START_OFFSET) */
	lineStartX: number;
	/** Start Y offset from anchor (accounts for LINE_START_OFFSET) */
	lineStartY: number;
	/** Length of the line in pixels */
	lineLength: number;
	/** Angle of the line in radians */
	lineAngle: number;
	/** Color of the line */
	color: string;
	/** Whether the line should be displayed */
	visible: boolean;
}

/**
 * Store for managing popup connector lines.
 * Lines are rendered in a separate global layer (PopupLines component)
 * so that all lines appear below all popup contents, regardless of
 * individual popup z-indices.
 */
export default class PopupLinesStore {
	lines: ObservableMap<string, PopupLineData> = observable.map(undefined, {
		deep: false,
	});

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	registerLine(id: string, data: PopupLineData): void {
		this.lines.set(id, data);
	}

	updateLine(id: string, data: Partial<PopupLineData>): void {
		const existing = this.lines.get(id);
		if (existing) {
			this.lines.set(id, { ...existing, ...data });
		}
	}

	unregisterLine(id: string): void {
		this.lines.delete(id);
	}

	get visibleLines(): PopupLineData[] {
		return [...this.lines.values()].filter((line) => line.visible);
	}
}
