import { observer } from "mobx-react-lite";
import React from "react";
import {
	CartesianGrid,
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
import CustomDotWithLabel from "./CustomDotWithLabel";

export default observer(function SectorSideView() {
	const { selectedAircraftIds } = cwpStore;
	const simulatorTime = simulatorStore.timestamp;

	// Generate X ticks every 10 min
	const xDomain = [simulatorTime, simulatorTime + 3600]; // 1 hour later
	const xTicks = Array.from({ length: 7 }, (_, i) => xDomain[0] + i * 600);

	// Generate Y ticks every 10
	const yDomain = [250, 420];
	const yTicks = Array.from(
		{ length: Math.round((yDomain[1] - yDomain[0]) / 10) },
		(_, i) => yDomain[0] + i * 10,
	);
	// Show Y tick labels every 50 (but not the first one)
	const shouldShowLabel = (value: number) =>
		value !== yDomain[0] && value % 50 === 0;
	const yTickFormatter = (value: number) =>
		shouldShowLabel(value) ? `F${value}` : "";

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
		selectedAircraftIds,
	}).map(({ aircraft, route }) => ({
		aircraftId: aircraft.aircraftId,
		callSign: aircraft.callSign,
		trajectories: route.trajectory
			// Get the trajectories only within the xDomain period (1h)
			.filter(
				(trajectory) =>
					trajectory.timestamp >= xDomain[0] &&
					trajectory.timestamp <= xDomain[1],
			)
			.map((t) => ({
				wayPoint: t.objectId,
				timestamp: t.timestamp,
				flightLevel: 300, // TODO: where to get altitude from???
			})),
	}));

	const selectedAircraft =
		flightRoutesData.length === 0
			? undefined
			: flightRoutesData[flightRoutesData.length - 1]; // For now just get the last one clicked, but in the future show several

	let labelIndex = 0;

	const data = selectedAircraft?.trajectories
		.slice() // copy to avoid mutating original
		.sort((a, b) => a.timestamp - b.timestamp) // sort for alternating label to be correct
		.map((t) => {
			const label = t.wayPoint ?? "";
			const item = {
				timestamp: t.timestamp,
				fl: t.flightLevel,
				label,
				labelIndex: label ? labelIndex++ : null, // add index
			};
			return item;
		});

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
						// Draw custom ticks to get lighter line colours
						tick={({ x, y, payload }) => (
							<g transform={`translate(${x},${y})`}>
								<line y1={0} y2={-400} stroke="#cccccc" strokeWidth={1} />
								<text y={15} textAnchor="middle" fill="#ccc" fontSize={12}>
									{formatSimulatorTimeHM(payload.value)}
								</text>
							</g>
						)}
					/>
					<YAxis
						domain={yDomain}
						ticks={yTicks}
						tickFormatter={yTickFormatter}
						// Draw custom ticks to get lighter line colours
						tick={({ x, y, payload }) => {
							return (
								<g transform={`translate(${x},${y})`}>
									{shouldShowLabel(payload.value) && (
										<line
											x1={0}
											x2={450} // Adjust based on your chart width
											stroke="#cccccc"
											strokeWidth={1}
										/>
									)}
									{shouldShowLabel(payload.value) && (
										<text
											x={-5}
											textAnchor="end"
											fill="#ccc"
											fontSize={12}
											dy={5}
										>
											{`F${payload.value}`}
										</text>
									)}
								</g>
							);
						}}
					/>
					<Line
						type="monotone"
						dataKey="fl"
						stroke="#ff6b6b"
						dot={<CustomDotWithLabel />}
						isAnimationActive={false}
					></Line>
				</LineChart>
			</ResponsiveContainer>
			<BottomLeftLabel scale={0.7} />
		</div>
	);
});
