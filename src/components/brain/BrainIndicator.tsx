import { observer } from "mobx-react-lite";
import { brainStore } from "../../state";

/**
 * BrainIndicator - Small badge displaying current Autonomy Profile
 *
 * Shows:
 * - AP1 (green) or AP2 (blue) based on current autonomy profile
 * - Empty red badge if no data and no manual override
 */
const BrainIndicator = observer(() => {
	const ap = brainStore.autonomyProfile;

	if (ap === null) {
		return (
			<div
				className="badge badge-soft badge-error badge-sm"
				title="No data: Agent or ISA workload not received yet"
			/>
		);
	}

	return (
		<div
			className={`badge badge-soft badge-sm ${ap === 2 ? "badge-primary" : "badge-success"}`}
			title={`Autonomy Profile ${ap}${brainStore.manualAP !== null ? " (manual)" : ` (auto: ${brainStore.normalizedAP.toFixed(3)})`}`}
		>
			{ap}
		</div>
	);
});

export default BrainIndicator;
