import { observer } from "mobx-react-lite";
import React from "react";
// import type { FlightConflictUpdateMessage } from "../proto/ProtobufAirTrafficSimulator";
import { aircraftStore, simulatorStore } from "../state";
import { convertMetersToFlightLevel } from "../utils";

/**
 * VerticalTimeline — Tailwind + DaisyUI
 *
 * - Creates a fixed-width vertical scheduler column.
 * - Uses CSS grid rows for consistent slot heights.
 * - Renders events positioned by start/end (in minutes) within the visible window.
 * - Positioned on the right side of the screen.
 */

// Types
export type TimelineEvent = {
	id: string;
	startMin: number; // minutes from the top of the window
	endMin: number; // minutes from the top of the window
	code: string | undefined; // the orange badge text
	labels: string[]; // lines of text inside the chip
};

// Helpers
const clamp = (n: number, min = 0, max = 10_000) =>
	Math.max(min, Math.min(n, max));

// The height (px) of 1 minute on the grid. Change to scale timeline density.
const PX_PER_MINUTE = 2.4; // 60min -> 144px

// Number of major rows (e.g., 6 rows as in the screenshot)
const MAJOR_ROWS = 6;
const MINUTES_PER_ROW = 60; // one hour rows

// Example data
// const SAMPLE_EVENTS: TimelineEvent[] = [
// 	{
// 		id: "e1",
// 		startMin: 60 + 6, // 1:06 from top of window
// 		endMin: 60 + 20, // 1:20
// 		code: "380",
// 		labels: ["TUI1FX", "TAR718"],
// 	},
// ];

export default observer(function Agenda({
	events = [],
	startLabel = simulatorStore.timestamp.toLocaleString(),
}: {
	events?: TimelineEvent[];
	startLabel?: string;
}) {
	const { mtcdConflictIds } = aircraftStore; // Will be MTCD in future
	let count = 0;
	const datablocks: TimelineEvent[] = Array.from(mtcdConflictIds.entries()).map(
		([id, conflict]) => {
			count++;
			return {
				id: id,
				startMin: 60 + 6 + count * 20, // 1:06 from top of window - will be conflict.conflictingFlightPosition?.time
				endMin: 60 + 20 + count * 20, // 1:20
				code:
					conflict.conflictingFlightPosition?.altitude !== undefined
						? String(
								convertMetersToFlightLevel(
									conflict.conflictingFlightPosition.altitude,
								),
							)
						: undefined,
				labels: [conflict.callSign, conflict.conflictingFlightCallSign],
			};
		},
	);

	// Grid height in minutes
	const WINDOW_MINUTES = MAJOR_ROWS * MINUTES_PER_ROW;
	const gridStyle: React.CSSProperties = {
		gridTemplateRows: `repeat(${WINDOW_MINUTES}, ${PX_PER_MINUTE}px)`,
	};

	return (
		<div className="fixed right-0 top-0 h-screen w-44 bg-base-300 text-base-content border-l border-base-200 z-500">
			{/* Bottom time label (on right side) */}
			<div className="absolute bottom-1 right-1 text-[10px] text-base-content/70 select-none">
				{startLabel}
			</div>

			{/* Minute grid */}
			<div className="h-full grid" style={gridStyle}>
				{/* Major hour separators */}
				{Array.from({ length: MAJOR_ROWS + 1 }).map((_, i) => (
					<div
						key={i}
						className="pointer-events-none col-span-full border-b border-base-white"
						style={{ gridRow: `${i * MINUTES_PER_ROW + 1}` }}
					/>
				))}

				{/* Events */}
				{events.map((ev) => {
					const topRow = clamp(Math.floor(ev.startMin) + 1, 1);
					const bottomRow = clamp(Math.ceil(ev.endMin) + 1, topRow + 1);
					return (
						<article
							key={ev.id}
							className="relative mx-1 mt-[2px] rounded-xl border border-primary/60 bg-primary/15 shadow-sm backdrop-blur-[1px]"
							style={{ gridRow: `${topRow} / ${bottomRow}` }}
						>
							<div className="flex items-stretch overflow-hidden rounded-xl">
								{/* Left rail */}
								<div className="w-1.5 bg-primary rounded-l-xl my-1 ml-1" />

								{/* Text */}
								<div className="flex-1 px-2 py-1 leading-tight text-[10px] text-right">
									{ev.labels.map((l, i) => (
										<div key={i} className="truncate">
											{l}
										</div>
									))}
								</div>

								{/* Right badge */}
								<div className="badge badge-warning rounded-r-xl rounded-l-none font-bold text-[10px] px-2 py-1 my-auto mr-1">
									{ev.code}
								</div>
							</div>
						</article>
					);
				})}
				{datablocks.map((ev) => {
					const topRow = clamp(Math.floor(ev.startMin) + 1, 1);
					const bottomRow = clamp(Math.ceil(ev.endMin) + 1, topRow + 1);
					return (
						<article
							key={ev.id}
							className="relative mx-1 mt-[2px] rounded-xl border border-primary/60 bg-primary/15 shadow-sm backdrop-blur-[1px]"
							style={{ gridRow: `${topRow} / ${bottomRow}` }}
						>
							<div className="flex items-stretch overflow-hidden rounded-xl">
								{/* Left rail */}
								<div className="w-1.5 bg-primary rounded-l-xl my-1 ml-1" />

								{/* Text */}
								<div className="flex-1 px-2 py-1 leading-tight text-[10px] text-right">
									{ev.labels.map((l, i) => (
										<div key={i} className="truncate">
											{l}
										</div>
									))}
								</div>

								{/* Right badge */}
								<div className="badge badge-warning rounded-r-xl rounded-l-none font-bold text-[10px] px-2 py-1 my-auto mr-1">
									{ev.code}
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</div>
	);
});
