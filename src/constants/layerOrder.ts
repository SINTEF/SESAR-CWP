/**
 * Layer ordering anchor IDs for react-map-gl.
 *
 * Due to limitations in react-map-gl, dynamically toggled layers don't maintain
 * their order. We use empty "anchor" layers as reference points, and dynamic
 * layers use the `beforeId` prop to position themselves relative to these anchors.
 *
 * Layers are rendered bottom-to-top, so a layer with beforeId="X" will appear BELOW layer X.
 * The order below represents the visual stacking from bottom to top:
 *
 * BOTTOM (rendered first, appears below)
 * ├─ SECTOR_BACKGROUND (sector fill, edges)
 * ├─ SECTOR_POLYGONS (sector outlines, names)
 * ├─ CENTER_TEXT (center text overlay)
 * ├─ FIXES (navigation fixes)
 * ├─ FLIGHT_ROUTES (flight route lines)
 * ├─ SPEED_VECTORS (speed vector lines)
 * ├─ TRAJECTORY_PREDICTION (predicted paths)
 * ├─ DISTANCE_MEASUREMENTS (distance lines)
 * ├─ SEP_QDM_LINES (SEP/QDM measurement lines)
 * └─ INTERACTIVE_LINES (current SEP/QDM line, next fix preview)
 * TOP (rendered last, appears on top)
 *
 * @see https://github.com/visgl/react-map-gl/issues/939
 */
export const LAYER_ORDER = {
	/** Background sector fill and edges - lowest layer */
	SECTOR_BACKGROUND: "anchor-sector-background",
	/** Sector polygon outlines and names */
	SECTOR_POLYGONS: "anchor-sector-polygons",
	/** Center text overlay showing current sector info */
	CENTER_TEXT: "anchor-center-text",
	/** Navigation fixes/waypoints */
	FIXES: "anchor-fixes",
	/** Flight route lines showing planned paths */
	FLIGHT_ROUTES: "anchor-flight-routes",
	/** Speed vector lines showing aircraft movement */
	SPEED_VECTORS: "anchor-speed-vectors",
	/** Trajectory prediction lines */
	TRAJECTORY_PREDICTION: "anchor-trajectory-prediction",
	/** Distance measurement lines */
	DISTANCE_MEASUREMENTS: "anchor-distance-measurements",
	/** SEP/QDM saved measurement lines */
	SEP_QDM_LINES: "anchor-sep-qdm-lines",
	/** Interactive lines (current drawing, previews) - highest layer */
	INTERACTIVE_LINES: "anchor-interactive-lines",
} as const;
