import classNames from "classnames";
import { observer } from "mobx-react-lite";
import type AircraftModel from "../../model/AircraftModel";
import { adminStore, configurationStore, cwpStore } from "../../state";

interface AddRequestButtonProps {
	aircraft: AircraftModel;
}

/**
 * A small "+TA" button that opens a dialog to create test Team Assistant requests.
 * Only visible when pseudo-pilot mode is enabled.
 *
 * Uses CWPStore to track dialog open state, which keeps the parent AircraftPopup
 * in expanded mode while the dialog is open.
 */
export default observer(function AddRequestButton({
	aircraft,
}: AddRequestButtonProps) {
	const { aircraftId } = aircraft;

	// Use store state instead of local state to keep popup expanded while dialog is open
	const isDialogOpen = cwpStore.aircraftsWithAddRequestDialog.has(aircraftId);

	// TA flow is active when this aircraft is in the middle of selecting a value
	const isTaFlowActive = cwpStore.taRequestAircraftId === aircraftId;

	// Button should appear active when dialog is open OR TA flow is in progress
	const isActive = isDialogOpen || isTaFlowActive;

	// Show when pseudo-pilot mode, admin mode, or master mode is enabled
	const showAddButton =
		cwpStore.pseudoPilot ||
		adminStore.adminModeEnabled ||
		configurationStore.currentCWP === "All";

	if (!showAddButton) {
		return null;
	}

	const handleToggle = () => {
		if (isDialogOpen) {
			handleClose();
		} else {
			cwpStore.openAddRequestDialogForAircraft(aircraftId);
		}
	};

	const handleClose = () => {
		cwpStore.closeAddRequestDialogForAircraft(aircraftId);
		// Also clear hover state since the dialog is outside the popup bounds,
		// and mouseLeave might not have fired
		cwpStore.removeHoveredFlightLabelId();
	};

	return (
		<button
			type="button"
			onClick={handleToggle}
			className={classNames(
				"absolute top-1 right-1 btn btn-xs",
				isActive ? "btn-neutral" : "btn-ghost",
			)}
			title="Manually add Team Assistant request"
		>
			+TA
		</button>
	);
});
