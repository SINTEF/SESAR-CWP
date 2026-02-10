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
	const { autonomyProfile, manualAP, workloadAgent, ISA, accuracy, delta } =
		brainStore;

	/** Update manual AP locally and broadcast to all instances via MQTT */
	function setManualAP(value: number | null) {
		brainStore.setManualAP(value);
		handlePublishPromise(persistManualAP(value));
	}

	return (
		<div className="p-3 bg-neutral-800 space-y-3">
			{/* Manual AP Control */}
			<div className="flex items-center gap-2">
				<span className="text-xs text-gray-400">AP:</span>
				<div className="btn-group">
					<button
						type="button"
						className={`btn btn-xs ${manualAP === null ? "btn-active" : ""}`}
						onClick={() => setManualAP(null)}
					>
						Auto
					</button>
					<button
						type="button"
						className={`btn btn-xs ${manualAP === 1 ? "btn-active" : ""}`}
						onClick={() => setManualAP(1)}
					>
						1
					</button>
					<button
						type="button"
						className={`btn btn-xs ${manualAP === 2 ? "btn-active" : ""}`}
						onClick={() => setManualAP(2)}
					>
						2
					</button>
				</div>
				<span className="text-xs text-gray-500">
					Current: {autonomyProfile ?? "—"}
				</span>
			</div>

			{/* MQTT Data */}
			<div className="text-xs space-y-1 text-gray-400">
				<div>Workload: {workloadAgent ?? "—"}</div>
				<div>Accuracy: {accuracy ?? "—"}</div>
				<div>ISA: {ISA ?? "—"}</div>
				<div>Delta: {delta.toFixed(3)}</div>
			</div>
		</div>
	);
});
