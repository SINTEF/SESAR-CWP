import type { LineLayerSpecification } from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import { aircraftStore, cwpStore, fixStore } from "../state";

/** Dotted white line style matching other preview lines in the application */
const paintLine: LineLayerSpecification["paint"] = {
	"line-color": "#FFFFFF",
	"line-width": 1.5,
	"line-dasharray": [2, 2],
};

interface NextFixPreviewLineProps {
	beforeId?: string;
}

/**
 * Renders a dotted white line from an aircraft to a fix when previewing
 * a next fix selection in the ChangeNextFixPopup.
 */
export default observer(function NextFixPreviewLine({
	beforeId,
}: NextFixPreviewLineProps) {
	const preview = cwpStore.nextFixPreview;

	// No preview active
	if (!preview) {
		return null;
	}

	const { aircraftId, fixName } = preview;

	// Get aircraft position
	const aircraft = aircraftStore.aircrafts.get(aircraftId);
	if (!aircraft) {
		return null;
	}

	// Get fix position
	const fix = fixStore.fixes.get(fixName);
	if (!fix) {
		return null;
	}

	const geoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				properties: {},
				geometry: {
					type: "LineString",
					coordinates: [
						[aircraft.lastKnownLongitude, aircraft.lastKnownLatitude],
						[fix.longitude, fix.latitude],
					],
				},
			},
		],
	};

	return (
		<Source id="nextfix_preview_source" type="geojson" data={geoJson}>
			<Layer
				id="nextfix_preview_line"
				type="line"
				paint={paintLine}
				beforeId={beforeId}
			/>
		</Source>
	);
});
