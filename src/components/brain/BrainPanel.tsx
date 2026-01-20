import { observer } from "mobx-react-lite";
import { brainStore } from "../../state";

/**
 * BrainPanel - Simple admin panel for Brain
 */
export default observer(function BrainPanel() {
	const {
		autonomyProfile,
		manualAP,
		workloadAgent,
		workloadISA,
		reliabilityAgent,
		delta,
	} = brainStore;

	return (
		<div className="p-3 bg-neutral-800 space-y-3">
			{/* Manual AP Control */}
			<div className="flex items-center gap-2">
				<span className="text-xs text-gray-400">AP:</span>
				<div className="btn-group">
					<button
						type="button"
						className={`btn btn-xs ${manualAP === null ? "btn-active" : ""}`}
						onClick={() => brainStore.setManualAP(null)}
					>
						Auto
					</button>
					<button
						type="button"
						className={`btn btn-xs ${manualAP === 1 ? "btn-active" : ""}`}
						onClick={() => brainStore.setManualAP(1)}
					>
						1
					</button>
					<button
						type="button"
						className={`btn btn-xs ${manualAP === 2 ? "btn-active" : ""}`}
						onClick={() => brainStore.setManualAP(2)}
					>
						2
					</button>
				</div>
				<span className="text-xs text-gray-500">
					Current: {autonomyProfile}
				</span>
			</div>

			{/* MQTT Data */}
			<div className="text-xs space-y-1 text-gray-400">
				<div>TAS WL: {workloadAgent ?? "—"}</div>
				<div>TAS Rel: {reliabilityAgent ?? "—"}</div>
				<div>ISA WL: {workloadISA ?? "—"}</div>
				<div>Delta: {delta.toFixed(3)}</div>
			</div>
		</div>
	);
});
