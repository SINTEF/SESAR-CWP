import { observer } from "mobx-react-lite";
import React from "react";
import {
	CartesianGrid,
	LabelList,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { aircraftStore, cwpStore, simulatorStore } from "../../state";
import BottomLeftLabel from "./BottomLeftLabel";
import { getAircraftsWithFlightRoutes } from "../../selectors/flightRouteSelectors";
import { formatSimulatorTimeHM } from "../../utils";

export default observer(function SectorSideView() {
	interface FlightData {
		aircraftId: string;
		callSign: string;
		trajectories: {
			wayPoint: string | undefined;
			timestamp: number;
			flightLevel: number;
		}[];
	}

	const flightRoutesData: FlightData[] = getAircraftsWithFlightRoutes({
		aircraftStore,
		cwpStore,
	}).map(({ aircraft, route }) => ({
		aircraftId: aircraft.aircraftId,
		callSign: aircraft.callSign,
		trajectories: route.trajectory
			.filter((trajectory) => trajectory.timestamp >= simulatorStore.timestamp)
			.map((t) => ({
				wayPoint: t.objectId,
				timestamp: t.timestamp,
				flightLevel: 300, // TODO: where to get altitude from???
			})),
	}));

	const selectedAircraft =
		flightRoutesData.length === 0 ? undefined : flightRoutesData[0]; // or however you select it

	const data = selectedAircraft?.trajectories.map((t) => ({
		timestamp: t.timestamp,
		fl: t.flightLevel,
		label: t.wayPoint ?? "",
	}));

	// Generate X ticks every 10 min
	const xDomain = [simulatorStore.timestamp, simulatorStore.timestamp + 3600]; // 1 hour later
	const xTicks = Array.from({ length: 7 }, (_, i) => xDomain[0] + i * 600);

	// Generate Y ticks every 10
	const yDomain = [250, 420];
	const yTicks = Array.from(
		{ length: Math.round((yDomain[1] - yDomain[0]) / 10) },
		(_, i) => yDomain[0] + i * 10,
	);
	// Show Y tick labels every 50 (but not the first one)
	const yTickFormatter = (value: number) =>
		value !== yDomain[0] && value % 50 === 0 ? `F${value}` : "";

	return (
		<div>
			<div
				style={{
					fontSize: "12px",
					fontWeight: "bold",
					margin: "8px",
					color: "#ffffff",
				}}
			>
				Vertical Window | {selectedAircraft?.callSign}
			</div>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart
					data={data}
					margin={{ top: 15, right: 15, bottom: 15, left: -5 }}
				>
					<CartesianGrid stroke="#555555" strokeDasharray="1 0" />
					<XAxis
						dataKey="timestamp"
						domain={xDomain}
						type="number"
						ticks={xTicks}
						tickFormatter={formatSimulatorTimeHM}
					/>
					<YAxis
						domain={yDomain}
						ticks={yTicks}
						tickFormatter={yTickFormatter}
					/>
					<Line
						type="monotone"
						dataKey="fl"
						stroke="#ff6b6b"
						dot={{ r: 3, fill: "#ff6b6b", stroke: "#cccccc", strokeWidth: 1 }}
						isAnimationActive={false}
					>
						<LabelList dataKey="label" position="top" />
					</Line>
				</LineChart>
			</ResponsiveContainer>
			<BottomLeftLabel scale={0.7} />
		</div>
	);
});
