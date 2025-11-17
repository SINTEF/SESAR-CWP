import { Marker } from "react-map-gl/maplibre";

export default function CenterTextOverlay() {
	return (
		<Marker longitude={7} latitude={44} anchor="center">
			<div className="pointer-events-none whitespace-pre-line text-center text-3xl font-bold text-gray-800">
				{"B1 + B2 + B3 + B4\nFL660\nFL245"}
			</div>
		</Marker>
	);
}
