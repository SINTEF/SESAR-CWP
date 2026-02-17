import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
	handlePublishPromise,
	persistManualAP,
} from "../../mqtt-client/publishers";
import { brainStore } from "../../state";

function NumberInput({
	label,
	value,
	onChange,
}: {
	label: string;
	value: number;
	onChange: (v: number) => void;
}) {
	return (
		<label className="flex items-center gap-2 text-xs text-gray-400">
			<span className="w-28">{label}</span>
			<input
				type="number"
				className="input input-xs w-20 bg-neutral-700 text-gray-200"
				value={value}
				min={1}
				onChange={(e) => {
					const v = Number(e.target.value);
					if (v > 0) {
						onChange(v);
					}
				}}
			/>
		</label>
	);
}

/**
 * BrainPanel - Admin panel for Brain with full visibility into AP calculation
 */
export default observer(function BrainPanel() {
	const [expanded, setExpanded] = useState(false);
	const {
		autonomyProfile,
		manualAP,
		workloadAgent,
		ISA,
		accuracy,
		delta,
		alpha,
		beta,
		gamma,
		numberOfAssumedFlights: numberOfFlights,
		numberOfRequests,
		numberOfConflicts,
		normalizedFlights,
		normalizedRequests,
		normalizedConflicts,
		taskLoad,
		normalizedISA,
		computedAP,
		normalizedAP,
		swapValue,
		maxNumberOfFlights,
		maxNumberOfRequests,
		maxNumberOfConflicts,
	} = brainStore;

	/** Update manual AP locally and broadcast to all instances via MQTT */
	function setManualAP(value: number | null) {
		brainStore.setManualAP(value);
		handlePublishPromise(persistManualAP(value));
	}

	return (
		<div className="p-3 bg-neutral-800 space-y-3 relative overflow-hidden">
			{/* Manual AP Control */}
			<div className="flex items-center gap-2">
				<span className="text-xs text-gray-400">AP:</span>
				<div className="join">
					<button
						type="button"
						className={`btn btn-xs join-item ${manualAP === null ? "btn-primary" : ""}`}
						onClick={() => setManualAP(null)}
					>
						Auto
					</button>
					<button
						type="button"
						className={`btn btn-xs join-item ${manualAP === 1 ? "btn-primary" : ""}`}
						onClick={() => setManualAP(1)}
					>
						AP 1
					</button>
					<button
						type="button"
						className={`btn btn-xs join-item ${manualAP === 2 ? "btn-primary" : ""}`}
						onClick={() => setManualAP(2)}
					>
						AP 2
					</button>
				</div>
				<span className="text-xs font-mono text-gray-500">
					&rarr; {autonomyProfile ? `AP ${autonomyProfile}` : "\u2014"}
				</span>
			</div>

			{/* Toggle details */}
			<button
				type="button"
				className="btn btn-xs btn-ghost text-gray-400 w-full"
				onClick={() => setExpanded((v) => !v)}
			>
				{expanded ? "Hide Brian's details" : "Show Brian's details"}
			</button>

			{expanded && (
				<>
					{/* Task Load breakdown */}
					<div className="text-xs text-gray-400 space-y-1">
						<div className="font-semibold text-gray-300">Task Load</div>
						<table className="table table-xs text-gray-400 w-full">
							<thead>
								<tr>
									<th />
									<th>Raw</th>
									<th>Max</th>
									<th>Norm</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Assumed Flights</td>
									<td>{numberOfFlights}</td>
									<td>{maxNumberOfFlights}</td>
									<td>{normalizedFlights.toFixed(3)}</td>
								</tr>
								<tr>
									<td>Requests (last 5 min)</td>
									<td>{numberOfRequests}</td>
									<td>{maxNumberOfRequests}</td>
									<td>{normalizedRequests.toFixed(3)}</td>
								</tr>
								<tr>
									<td>Conflicts (MTCD + TCT)</td>
									<td>{numberOfConflicts}</td>
									<td>{maxNumberOfConflicts}</td>
									<td>{normalizedConflicts.toFixed(3)}</td>
								</tr>
							</tbody>
						</table>
						<div className="font-mono">
							TL = ({normalizedFlights.toFixed(3)} +{" "}
							{normalizedRequests.toFixed(3)} + {normalizedConflicts.toFixed(3)}
							) / 3 ={" "}
							<span className="text-gray-200">{taskLoad.toFixed(3)}</span>
						</div>
					</div>

					{/* MQTT Data & Weights */}
					<div className="text-xs text-gray-400 space-y-1">
						<div className="font-semibold text-gray-300">Weights & MQTT</div>
						<table className="table table-xs text-gray-400">
							<thead>
								<tr>
									<th>WL</th>
									<th>Accuracy(&beta;)</th>
									<th>ISA</th>
									<th>normISA</th>
									<th>&delta;</th>
									<th>&alpha;</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{workloadAgent ?? "\u2014"}</td>
									<td>
										{accuracy?.toFixed(3) ?? "\u2014"} ({beta.toFixed(3)})
									</td>
									<td>{ISA ?? "\u2014"}</td>
									<td>{normalizedISA.toFixed(3)}</td>
									<td>{delta.toFixed(3)}</td>
									<td>{alpha.toFixed(3)}</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Computed AP */}
					<div className="text-xs text-gray-400 space-y-1">
						<div className="font-semibold text-gray-300">
							Computed AP (urgency=0)
						</div>
						<div className="font-mono">
							{alpha.toFixed(3)}*{taskLoad.toFixed(3)} + {beta.toFixed(3)}*
							{workloadAgent ?? 0} + {delta.toFixed(3)}*
							{normalizedISA.toFixed(3)} + {gamma.toFixed(3)}*0
						</div>
						<div className="font-mono">
							= {computedAP.toFixed(3)} / 3 ={" "}
							<span className="text-gray-200">{normalizedAP.toFixed(3)}</span>{" "}
							{normalizedAP > swapValue ? ">" : "<="} {swapValue} &rarr;{" "}
							<span className="font-bold text-gray-100">
								AP {normalizedAP > swapValue ? 2 : 1}
							</span>
						</div>
					</div>

					{/* Max Values Config */}
					<div className="text-xs text-gray-400 space-y-1">
						<div className="font-semibold text-gray-300">Max Values</div>
						<NumberInput
							label="Max Flights"
							value={maxNumberOfFlights}
							onChange={(v) => brainStore.setMaxNumberOfFlights(v)}
						/>
						<NumberInput
							label="Max Requests"
							value={maxNumberOfRequests}
							onChange={(v) => brainStore.setMaxNumberOfRequests(v)}
						/>
						<NumberInput
							label="Max Conflicts"
							value={maxNumberOfConflicts}
							onChange={(v) => brainStore.setMaxNumberOfConflicts(v)}
						/>
					</div>

					{/* Gamma Slider */}
					<div className="text-xs text-gray-400 space-y-1">
						<div className="font-semibold text-gray-300">
							Gamma (urgency weight): {gamma.toFixed(2)}
						</div>
						<input
							type="range"
							className="range range-xs range-primary w-full"
							min={0}
							max={1}
							step={0.05}
							value={gamma}
							onChange={(e) => brainStore.setGamma(Number(e.target.value))}
						/>
					</div>

					{/* Swap Threshold */}
					<div className="text-xs text-gray-400 space-y-1">
						<div className="font-semibold text-gray-300">
							Swap Threshold: {swapValue.toFixed(2)}
						</div>
						<input
							type="range"
							className="range range-xs range-primary w-full"
							min={0}
							max={1}
							step={0.01}
							value={swapValue}
							onChange={(e) => brainStore.setSwapValue(Number(e.target.value))}
						/>
					</div>
				</>
			)}

			{/** Brain SVG */}
			<svg
				width="3em"
				height="3em"
				viewBox="0 0 24 24"
				strokeWidth="1"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				stroke="white"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="absolute right-1 top-1 opacity-25 pointer-events-none"
			>
				<path d="M7 14C5.34315 14 4 15.3431 4 17C4 18.6569 5.34315 20 7 20C7.35064 20 7.68722 19.9398 8 19.8293" />
				<path d="M4.26392 15.6046C2.9243 14.9582 2.00004 13.587 2.00004 12C2.00004 10.7883 2.53877 9.70251 3.38978 8.96898" />
				<path d="M3.42053 8.8882C3.1549 8.49109 3 8.01363 3 7.5C3 6.11929 4.11929 5 5.5 5C6.06291 5 6.58237 5.18604 7.00024 5.5" />
				<path d="M7.23769 5.56533C7.08524 5.24215 7 4.88103 7 4.5C7 3.11929 8.11929 2 9.5 2C10.8807 2 12 3.11929 12 4.5V20" />
				<path d="M8 20C8 21.1046 8.89543 22 10 22C11.1046 22 12 21.1046 12 20" />
				<path d="M12 7C12 8.65685 13.3431 10 15 10" />
				<path d="M17 14C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20C16.6494 20 16.3128 19.9398 16 19.8293" />
				<path d="M19.7361 15.6046C21.0757 14.9582 22 13.587 22 12C22 10.7883 21.4612 9.70251 20.6102 8.96898" />
				<path d="M20.5795 8.8882C20.8451 8.49109 21 8.01363 21 7.5C21 6.11929 19.8807 5 18.5 5C17.9371 5 17.4176 5.18604 16.9998 5.5" />
				<path d="M12 4.5C12 3.11929 13.1193 2 14.5 2C15.8807 2 17 3.11929 17 4.5C17 4.88103 16.9148 5.24215 16.7623 5.56533" />
				<path d="M16 20C16 21.1046 15.1046 22 14 22C12.8954 22 12 21.1046 12 20" />
			</svg>
		</div>
	);
});
