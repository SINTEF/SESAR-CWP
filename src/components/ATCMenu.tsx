/* ATCMenu.tsx */
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import type AircraftModel from "../model/AircraftModel";
import {
	acceptFlight,
	handlePublishPromise,
	persistFrontendFlightController,
} from "../mqtt-client/publishers";
import {
	aircraftStore,
	configurationStore,
	cwpStore,
	datablockStore,
	sepQdmStore,
} from "../state";

export default observer(function ATCMenu(properties: {
	aircraft: AircraftModel;
}) {
	const posthog = usePostHog();
	const { aircraftId, assignedFlightId, controlledBy, callSign } =
		properties.aircraft;

	if (cwpStore.ATCMenuAircraftId !== aircraftId) {
		return null;
	}

	const toggleAssumeFlight = (): void => {
		const flightIsAlreadyAssumed =
			controlledBy === configurationStore.currentCWP;

		posthog?.capture("atc_menu_action", {
			action: flightIsAlreadyAssumed ? "de_assume" : "assume",
			aircraft_id: aircraftId,
			callsign: callSign,
			previous_controller: controlledBy,
			new_controller: flightIsAlreadyAssumed
				? null
				: configurationStore.currentCWP,
			current_cwp: configurationStore.currentCWP,
		});

		if (flightIsAlreadyAssumed) {
			// Handle flight de-assume logic here.
		} else {
			aircraftStore.aircrafts
				.get(aircraftId)
				?.setController(configurationStore.currentCWP);
			handlePublishPromise(
				acceptFlight(
					controlledBy,
					configurationStore.currentCWP,
					assignedFlightId,
				),
			);
			handlePublishPromise(
				persistFrontendFlightController(
					aircraftId,
					configurationStore.currentCWP,
				),
			);
		}

		cwpStore.clearATCMenuAircraftId();
	};

	const handleTrfClick = (aircraftId: string): void => {
		aircraftStore.aircrafts.get(aircraftId)?.setController("NS"); // Setting transfering to next sector as NS for DIALOG
		// change controlledBy to no longer currentCWP

		posthog?.capture("atc_menu_action", {
			action: "transfer",
			aircraft_id: aircraftId,
			callsign: callSign,
			transfer_to: "NS",
			frequency: "130.165",
			current_cwp: configurationStore.currentCWP,
		});

		cwpStore.clearATCMenuAircraftId();
	};

	const handleIntegreClick = (aircraftId: string): void => {
		aircraftStore.aircrafts.get(aircraftId)?.degrease();

		posthog?.capture("atc_menu_action", {
			action: "integre",
			aircraft_id: aircraftId,
			callsign: callSign,
			current_cwp: configurationStore.currentCWP,
		});

		cwpStore.clearATCMenuAircraftId();
	};

	const handleDeIntegreClick = (aircraftId: string): void => {
		aircraftStore.aircrafts.get(aircraftId)?.undegrease();

		posthog?.capture("atc_menu_action", {
			action: "de_integre",
			aircraft_id: aircraftId,
			callsign: callSign,
			current_cwp: configurationStore.currentCWP,
		});

		cwpStore.clearATCMenuAircraftId();
	};

	const handleButtonClick = (action: string): void => {
		posthog?.capture("atc_menu_action", {
			action: action.toLowerCase(),
			aircraft_id: aircraftId,
			callsign: callSign,
			current_cwp: configurationStore.currentCWP,
		});

		cwpStore.clearATCMenuAircraftId();
	};

	const handleMeasurementClick = (mode: "sep" | "qdm"): void => {
		// Get selected aircraft IDs, excluding the menu aircraft itself
		const selectedIds = Array.from(cwpStore.selectedAircraftIds).filter(
			(id) => id !== aircraftId,
		);

		// If we have at least one other selected aircraft, create multiple lines immediately
		if (selectedIds.length > 0) {
			if (mode === "sep") {
				sepQdmStore.createMultipleSepLines(aircraftId, selectedIds);
			} else {
				sepQdmStore.createMultipleQdmLines(aircraftId, selectedIds);
			}

			posthog?.capture("atc_menu_action", {
				action: `${mode}_multiple`,
				aircraft_id: aircraftId,
				callsign: callSign,
				target_count: selectedIds.length,
				current_cwp: configurationStore.currentCWP,
			});
		} else {
			// Otherwise, enter the drag-to-select mode
			if (mode === "sep") {
				sepQdmStore.enableSep(aircraftId);
			} else {
				sepQdmStore.enableQdm(aircraftId);
			}

			posthog?.capture("atc_menu_action", {
				action: mode,
				aircraft_id: aircraftId,
				callsign: callSign,
				current_cwp: configurationStore.currentCWP,
			});
		}

		// Close the ATC menu
		cwpStore.clearATCMenuAircraftId();
	};

	const handleSepClick = (): void => {
		handleMeasurementClick("sep");
	};

	const handleQdmClick = (): void => {
		handleMeasurementClick("qdm");
	};

	// +DB button logic: need exactly 1 other aircraft selected to form a pair
	const otherSelectedId = Array.from(cwpStore.selectedAircraftIds).find(
		(id) => id !== aircraftId,
	);
	const hasExactlyOneOther =
		cwpStore.selectedAircraftIds.size === 1 ||
		(cwpStore.selectedAircraftIds.size === 2 &&
			cwpStore.selectedAircraftIds.has(aircraftId));

	// Check if we can create: need a valid pair that doesn't already exist
	const canCreateDatablock =
		hasExactlyOneOther &&
		otherSelectedId !== undefined &&
		!datablockStore.hasPair(aircraftId, otherSelectedId) &&
		!aircraftStore.hasMtcdConflictForPair(aircraftId, otherSelectedId);

	const handleDatablockClick = (): void => {
		if (!canCreateDatablock || !otherSelectedId) {
			return;
		}

		const aircraftIds = [aircraftId, otherSelectedId];
		datablockStore.createDatablock(aircraftIds);

		posthog?.capture("atc_menu_action", {
			action: "create_datablock",
			aircraft_ids: aircraftIds,
			callsigns: aircraftIds
				.map((id) => aircraftStore.aircrafts.get(id)?.callSign)
				.filter(Boolean),
			current_cwp: configurationStore.currentCWP,
		});

		cwpStore.clearATCMenuAircraftId();
	};

	return (
		<div className="bg-neutral-900/60 p-2.5 w-30 ml-1 rounded-b-sm text-gray-200 font-sans flex flex-col items-center border-t border-t-neutral-800">
			<div className="space-y-2 w-full">
				{controlledBy === configurationStore.currentCWP && (
					<button
						onClick={() => handleTrfClick(aircraftId)}
						className="btn btn-xs btn-primary w-full rounded-xs"
					>
						TRF 130.165
					</button>
				)}
				<button
					onClick={toggleAssumeFlight}
					className={`btn btn-xs btn-primary w-full rounded-xs ${controlledBy === configurationStore.currentCWP ? "opacity-50 cursor-not-allowed" : ""}`}
					disabled={controlledBy === configurationStore.currentCWP}
				>
					{controlledBy === configurationStore.currentCWP
						? "DE ASSUME"
						: "ASSUME"}
				</button>
				{!properties.aircraft.degreased ? (
					<button
						onClick={() => handleIntegreClick(aircraftId)}
						className="btn btn-xs btn-primary w-full rounded-xs"
					>
						INTEGRE
					</button>
				) : (
					<button
						onClick={() => handleDeIntegreClick(aircraftId)}
						className="btn btn-xs btn-primary w-full rounded-xs"
					>
						DE INTEGRE
					</button>
				)}
				<hr className="border-t-2 border-neutral-700 w-full" />
				<button
					onClick={() => handleButtonClick("TP")}
					className="btn btn-xs btn-primary w-full rounded-xs"
				>
					TP
				</button>
				<button
					onClick={handleSepClick}
					className="btn btn-xs btn-primary w-full rounded-xs"
				>
					SEP
				</button>
				<button
					onClick={handleQdmClick}
					className="btn btn-xs btn-primary w-full rounded-xs"
				>
					QDM
				</button>
				<hr className="border-t-2 border-neutral-700 w-full" />
				<button
					onClick={handleDatablockClick}
					className={`btn btn-xs btn-primary w-full rounded-xs ${!canCreateDatablock ? "opacity-50 cursor-not-allowed" : ""}`}
					disabled={!canCreateDatablock}
					title="Create datablock with selected aircraft pair"
				>
					+DB
				</button>
			</div>
		</div>
	);
});
