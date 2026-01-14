import { useCallback } from "react";
import { useMap } from "react-map-gl/maplibre";

// Predefined viewport configurations
// You can edit these values manually to adjust the viewports
const VIEWPORT_PRESETS = [
	{
		id: 1,
		label: "1",
		title: "Vue 1",
		longitude: 7,
		latitude: 44,
		zoom: 7.0,
	},
	{
		id: 2,
		label: "2",
		title: "Vue 2",
		longitude: 6.75,
		latitude: 44.125,
		zoom: 8.0,
	},
	{
		id: 3,
		label: "3",
		title: "Vue 3",
		longitude: 6.75,
		latitude: 44.125,
		zoom: 8.5,
	},
];

export default function ViewportPresetsControl() {
	const { current: map } = useMap();

	const handleViewportClick = useCallback(
		(preset: (typeof VIEWPORT_PRESETS)[number]) => {
			if (!map) {
				return;
			}

			map.flyTo({
				center: [preset.longitude, preset.latitude],
				zoom: preset.zoom,
				duration: 1000,
			});
		},
		[map],
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
