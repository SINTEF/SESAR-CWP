/* ATCMenu.tsx */
import { observer } from "mobx-react-lite";
import { usePostHog } from "posthog-js/react";
import type AircraftModel from "../model/AircraftModel";
import {
	acceptFlight,
	handlePublishPromise,
	persistFrontendFlightController,
} from "../mqtt-client/publishers";
import { aircraftStore, configurationStore, cwpStore } from "../state";

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
	};

	const handleIntegreClick = (aircraftId: string): void => {
		//aircraftStore.aircrafts.get(aircraftId)?.setCallSignBold(true);
		// What does integre mean?

		posthog?.capture("atc_menu_action", {
			action: "integre",
			aircraft_id: aircraftId,
			callsign: callSign,
			current_cwp: configurationStore.currentCWP,
		});
	};

	const handleButtonClick = (action: string): void => {
		posthog?.capture("atc_menu_action", {
			action: action.toLowerCase(),
			aircraft_id: aircraftId,
			callsign: callSign,
			current_cwp: configurationStore.currentCWP,
		});
	};

	return (
		<div className="bg-gray-800 p-4 w-36 text-gray-200 font-sans flex flex-col items-center">
			<div className="space-y-2 w-full">
				<div className="space-y-2 w-full">
					{controlledBy === configurationStore.currentCWP && (
						<button
							onClick={() => handleTrfClick(aircraftId)}
							className="btn btn-sm w-full btn-secondary"
						>
							TRF 130.165
						</button>
					)}
					<button
						onClick={toggleAssumeFlight}
						className={`btn btn-sm w-full ${controlledBy === configurationStore.currentCWP ? "btn-disabled" : "btn-primary"}`}
					>
						{controlledBy === configurationStore.currentCWP
							? "DE ASSUME"
							: "ASSUME"}
					</button>
					<button
						onClick={() => handleIntegreClick(aircraftId)} // Changing callsign to bold font
						className="btn btn-sm w-full btn-secondary"
					>
						INTEGRE
					</button>
				</div>

				<div className="space-y-2 w-full">
					<button
						onClick={() => handleButtonClick("TP")}
						className="btn btn-sm w-full btn-accent"
					>
						TP
					</button>
					<button
						onClick={() => handleButtonClick("SEP")}
						className="btn btn-sm w-full btn-accent"
					>
						SEP
					</button>
					<button
						onClick={() => handleButtonClick("QDM")}
						className="btn btn-sm w-full btn-accent"
					>
						QDM
					</button>
				</div>
			</div>
		</div>
	);
});
