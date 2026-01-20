import { observer } from "mobx-react-lite";
import { brainStore } from "../../state";

/**
 * BrainIndicator - Small badge displaying current Autonomy Profile
 *
 * Shows:
 * - AP1 (green) or AP2 (blue) based on current calculated autonomy profile
 * - ERROR (red) if data is missing or stale
 */
const BrainIndicator = observer(() => {
	const ap = brainStore.autonomyProfile;
	const hasError = brainStore.hasError;

	if (hasError) {
		return (
			<div
				className="badge badge-soft badge-error badge-sm"
				title="Error: Missing or stale data (Agent or ISA not received)"
			></div>
		);
	}

	return (
		<div
			className={`badge badge-soft badge-sm ${ap === 2 ? "badge-primary" : "badge-success"}`}
			title={`Autonomy Profile ${ap} (normalized AP: ${brainStore.normalizedAP.toFixed(3)})`}
		>
			{ap}
		</div>
	);
});

export default BrainIndicator;
