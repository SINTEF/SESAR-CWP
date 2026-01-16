import type {
	CircleLayerSpecification,
	LineLayerSpecification,
	SymbolLayerSpecification,
} from "maplibre-gl";
import { observer } from "mobx-react-lite";
import { Layer, Source } from "react-map-gl/maplibre";
import type AircraftModel from "../model/AircraftModel";
import type Trajectory from "../model/Trajectory";
import { getAircraftsWithFlightRoutes } from "../selectors/flightRouteSelectors";
import { aircraftStore, cwpStore, simulatorStore } from "../state";
import { formatSimulatorTimeHMS } from "../utils";

function buildGeoJsonFlightRoute(
	aircraft: AircraftModel,
	trajectories: Trajectory[],
): GeoJSON.Feature[] {
	const locations = trajectories.map((trajectory) => [
		trajectory.trajectoryCoordinate.longitude,
		trajectory.trajectoryCoordinate.latitude,
	]);

	const aircraftLocation = [
		aircraft.lastKnownLongitude,
		aircraft.lastKnownLatitude,
	];

	const points: GeoJSON.Feature[] = trajectories.map((trajectory) => ({
		type: "Feature",
		geometry: {
			type: "Point",
			coordinates: [
				trajectory.trajectoryCoordinate.longitude,
				trajectory.trajectoryCoordinate.latitude,
			],
		},
		properties: {
			title: trajectory.objectId
				? `${trajectory.objectId}\n${formatSimulatorTimeHMS(trajectory.timestamp)}`
				: undefined,
		},
	}));

	return [
		{
			type: "Feature",
			properties: {},
			geometry: {
				type: "LineString",
				coordinates: [aircraftLocation, ...locations],
			},
		},
		...points,
	];
}

const paintLine: LineLayerSpecification["paint"] = {
	"line-color": "#00FFFF",
	"line-width": 1.5,
};

const paintCircle: CircleLayerSpecification["paint"] = {
	"circle-color": "#00FFFF",
	"circle-radius": 2.5,
};

const paintSymbol: SymbolLayerSpecification["paint"] = {
	"text-color": "#00FFFF",
	"text-halo-color": "#3E3E3E",
	"text-halo-width": 1,
};

const layoutSymbol: SymbolLayerSpecification["layout"] = {
	"text-field": ["get", "title"],
	"text-allow-overlap": true,
	"text-font": ["IBM Plex Mono Bold"],
	"text-size": 9,
	"text-offset": [0, 0.45],
	"text-anchor": "top",
};

interface FlightRoutesProps {
	beforeId?: string;
}

export default observer(function FlightRoutes({ beforeId }: FlightRoutesProps) {
	// Load data from states
	const { aircraftsWithFlightRoutes } = cwpStore;
	const flightRoutes = getAircraftsWithFlightRoutes({
		aircraftStore,
		selectedAircraftIds: aircraftsWithFlightRoutes,
	});

	const features = flightRoutes.flatMap(({ aircraft, route }) =>
		buildGeoJsonFlightRoute(
			aircraft,
			route.trajectory.filter(
				(trajectory) => trajectory.timestamp >= simulatorStore.timestamp,
			),
		),
	);

	const geoJson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features,
	};

	return (
		<Source id="flightroutes_source" type="geojson" data={geoJson}>
			<Layer
				id="flightroutesline"
				type="line"
				paint={paintLine}
				beforeId={beforeId}
			/>
			<Layer
				id="flightroutespoint"
				type="circle"
				paint={paintCircle}
				beforeId="flightroutesline"
			/>
			<Layer
				id="flightroutesnames"
				type="symbol"
				layout={layoutSymbol}
				paint={paintSymbol}
				beforeId="flightroutespoint"
			/>
		</Source>
	);
});
