import { observer } from "mobx-react-lite";
import {
	handlePublishPromise,
	persistManualAP,
} from "../../mqtt-client/publishers";
import { brainStore } from "../../state";

/**
 * BrainPanel - Simple admin panel for Brain
 */
export default observer(function BrainPanel() {
	const { manualAP, workloadAgent, ISA, accuracy, delta } = brainStore;

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
			</div>

			{/* MQTT Data */}
			<table className="table table-xs text-gray-400">
				<thead>
					<tr>
						<th>Workload</th>
						<th>Accuracy</th>
						<th>ISA</th>
						<th>Delta</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{workloadAgent ?? "—"}</td>
						<td>{accuracy ?? "—"}</td>
						<td>{ISA ?? "—"}</td>
						<td>{delta.toFixed(3)}</td>
					</tr>
				</tbody>
			</table>

			{/** Brain SVG */}
			<svg
				width="3em"
				height="3em"
				viewBox="0 0 24 24"
				stroke-width="1"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				stroke="white"
				stroke-linecap="round"
				stroke-linejoin="round"
				className="absolute right-1 top-1 opacity-25 pointer-events-none"
			>
				<path d="M7 14C5.34315 14 4 15.3431 4 17C4 18.6569 5.34315 20 7 20C7.35064 20 7.68722 19.9398 8 19.8293"></path>
				<path d="M4.26392 15.6046C2.9243 14.9582 2.00004 13.587 2.00004 12C2.00004 10.7883 2.53877 9.70251 3.38978 8.96898"></path>
				<path d="M3.42053 8.8882C3.1549 8.49109 3 8.01363 3 7.5C3 6.11929 4.11929 5 5.5 5C6.06291 5 6.58237 5.18604 7.00024 5.5"></path>
				<path d="M7.23769 5.56533C7.08524 5.24215 7 4.88103 7 4.5C7 3.11929 8.11929 2 9.5 2C10.8807 2 12 3.11929 12 4.5V20"></path>
				<path d="M8 20C8 21.1046 8.89543 22 10 22C11.1046 22 12 21.1046 12 20"></path>
				<path d="M12 7C12 8.65685 13.3431 10 15 10"></path>
				<path d="M17 14C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20C16.6494 20 16.3128 19.9398 16 19.8293"></path>
				<path d="M19.7361 15.6046C21.0757 14.9582 22 13.587 22 12C22 10.7883 21.4612 9.70251 20.6102 8.96898"></path>
				<path d="M20.5795 8.8882C20.8451 8.49109 21 8.01363 21 7.5C21 6.11929 19.8807 5 18.5 5C17.9371 5 17.4176 5.18604 16.9998 5.5"></path>
				<path d="M12 4.5C12 3.11929 13.1193 2 14.5 2C15.8807 2 17 3.11929 17 4.5C17 4.88103 16.9148 5.24215 16.7623 5.56533"></path>
				<path d="M16 20C16 21.1046 15.1046 22 14 22C12.8954 22 12 21.1046 12 20"></path>
			</svg>
		</div>
	);
});
