import { observer } from "mobx-react-lite";
import React from "react";
import type AircraftModel from "../../model/AircraftModel";
import { adminStore, configurationStore, cwpStore } from "../../state";
import AddRequestDialog from "./AddRequestDialog";

interface AddRequestButtonProps {
	aircraft: AircraftModel;
}

/**
 * A small "+TA" button that opens a dialog to create test Team Assistant requests.
 * Only visible when pseudo-pilot mode is enabled.
 */
export default observer(function AddRequestButton({
	aircraft,
}: AddRequestButtonProps) {
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);

	// Show when pseudo-pilot mode, admin mode, or master mode is enabled
	const showAddButton =
		cwpStore.pseudoPilot ||
		adminStore.adminModeEnabled ||
		configurationStore.currentCWP === "All";

	if (!showAddButton) {
		return null;
	}

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsDialogOpen(true)}
				className="btn btn-xs btn-ghost border border-dashed border-base-content/30 text-base-content/60 hover:border-primary hover:text-primary px-2"
				title="Add test Team Assistant request"
			>
				+TA
			</button>
			{isDialogOpen && (
				<AddRequestDialog
					aircraft={aircraft}
					onClose={() => setIsDialogOpen(false)}
				/>
			)}
		</div>
	);
});
