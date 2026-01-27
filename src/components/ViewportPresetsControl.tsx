import type { LngLatBoundsLike } from "maplibre-gl";
import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";
import { useMap } from "react-map-gl/maplibre";

// Predefined viewport configurations
// Each preset defines a center point and a span (in degrees) representing the geographic area to display.
// The zoom level is automatically calculated by MapLibre's fitBounds to adapt to any screen size.
// - center: [longitude, latitude] - the center point of the viewport
// - span: degrees of geographic area to show (larger = more zoomed out)
const VIEWPORT_PRESETS: {
	id: number;
	label: string;
	title: string;
	center: [number, number];
	span: number;
}[] = [
	{
		id: 1,
		label: "1",
		title: "Vue 1",
		center: [7, 44],
		span: 3.0, // ~3° around center (overview)
	},
	{
		id: 2,
		label: "2",
		title: "Vue 2",
		center: [6.75, 44.18],
		span: 1.6, // ~1.5° around center (medium)
	},
	{
		id: 3,
		label: "3",
		title: "Vue 3",
		center: [6.75, 44.125],
		span: 1.0, // ~1° around center (close-up)
	},
];

/**
 * Calculate bounds from a center point and span (in degrees).
 * The bounds will show approximately `span` degrees of area around the center.
 */
function calculateBounds(
	center: [number, number],
	span: number,
): LngLatBoundsLike {
	const [lng, lat] = center;
	const halfSpan = span / 2;
	// Return as [[west, south], [east, north]]
	return [
		[lng - halfSpan, lat - halfSpan],
		[lng + halfSpan, lat + halfSpan],
	];
}

export default function ViewportPresetsControl() {
	const { current: map } = useMap();
	const posthog = usePostHog();

	const handleViewportClick = useCallback(
		(preset: (typeof VIEWPORT_PRESETS)[number]) => {
			if (!map) {
				return;
			}

			const bounds = calculateBounds(preset.center, preset.span);

			posthog.capture("viewport_preset_clicked", {
				preset_id: preset.id,
				preset_label: preset.label,
				center: preset.center,
				span: preset.span,
			});

			map.fitBounds(bounds, {
				padding: 20,
				duration: 1000,
			});
		},
		[map, posthog],
	);

	return (
		<div className="maplibregl-ctrl maplibregl-ctrl-group absolute bottom-2.5 left-12.25 z-10">
			{VIEWPORT_PRESETS.map((preset) => (
				<button
					key={preset.id}
					type="button"
					title={preset.title}
					aria-label={preset.title}
					onClick={() => handleViewportClick(preset)}
					className="flex items-center justify-center text-sm font-bold text-neutral-300"
				>
					{preset.label}
				</button>
			))}
		</div>
	);
}
