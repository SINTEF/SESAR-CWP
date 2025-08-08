import { observer } from "mobx-react-lite";
import React from "react";
import { Layer, Source } from "react-map-gl/maplibre";

import { configurationStore } from "../state";

const sectorLinePaint = {
	"line-color": "#323232",
	"line-width": 2,
};
const sectorFillPaint = {
	"fill-color": "#3c3c3c",
	"fill-opacity": 0.8,
};

export default observer(function SectorEdgesPolygon(/* properties */) {
	const { edgesPolygon } = configurationStore;
	const coordinates =
		edgesPolygon?.length > 0 ? [...edgesPolygon, edgesPolygon[0]] : [];

	const geoJson: GeoJSON.Feature = {
		type: "Feature",
		properties: {},
		geometry: {
			type: "Polygon",
			coordinates: [coordinates],
		},
	};

	return (
		<Source id="sector_edges_polygon_source" type="geojson" data={geoJson}>
			<Layer id="sector_edges_polygon" type="line" paint={sectorLinePaint} />
			<Layer
				id="sector_edges_polygon_fill"
				type="fill"
				paint={sectorFillPaint}
			/>
		</Source>
	);
});
