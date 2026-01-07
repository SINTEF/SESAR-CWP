import { Marker } from "react-map-gl/maplibre";

export default function CenterTextOverlay() {
	return (
		<Marker longitude={6.75} latitude={44} anchor="center">
			<div className="pointer-events-nonetext-left text-2xl font-bold text-[#666]">
				<span>B1 + B2 + B3 + B4</span>
				<br />
				<span className="border-b-2 border-[#666]">FL660</span>
				<br />
				FL245
			</div>
		</Marker>
	);
}
